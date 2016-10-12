import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Animation } from "ui/animation";
import { Page } from "ui/page";
import { connectionType, getConnectionType } from "connectivity";
import { prompt } from "ui/dialogs";
import { ItemEventData } from "ui/list-view";
import { ObservableArray } from "data/observable-array";

import * as bluetooth from "nativescript-bluetooth";

import { alert, setHintColor} from "../shared";

@Component({
  selector: "rom-bluetooth",
  templateUrl: "bluetooth/bluetooth.component.html",
  styleUrls: ["bluetooth/bluetooth-common.css"],
})
export class BluetoothComponent implements OnInit {
  peripherals: ObservableArray<bluetooth.Peripheral>;
  isScanning = false;

  constructor(
    private router: Router,
    private page: Page
  ) {
    this.peripherals = new ObservableArray<bluetooth.Peripheral>();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  public scan(): void {
    this.isScanning = true;
    this.peripherals.length = 0;
    this.permission().then(() =>
      bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: 5,
        onDiscovered: (peripheral: bluetooth.Peripheral) => {
          this.peripherals.push(peripheral);
        }
      })
    ).catch((err) => {
      console.log("scan: catch", err);
    }).then(() => {
      this.isScanning = false;
    });
  }

  public onPeripheralTap(event: ItemEventData): void {
    const item  = this.peripherals.getItem(event.index);
    bluetooth.connect({
      UUID: item.UUID,
      onConnected: (peripheral) => {
        console.log("connected");
        this.read(item.UUID);
      },
      onDisconnected: (peripheral) => {
        console.log("disconnected");
      }
    });
  }

  //  showSensorContent() {
  //   let initialContainer = <View>this.initialContainer.nativeElement;
  //   let mainContainer = <View>this.mainContainer.nativeElement;
  //   let logoContainer = <View>this.logoContainer.nativeElement;
  //   let formControls = <View>this.formControls.nativeElement;
  //   let signUpStack = <View>this.signUpStack.nativeElement;
  //   let animations = [];

  //   // Fade out the initial content over one half second
  //   initialContainer.animate({
  //     opacity: 0,
  //     duration: 500
  //   }).then(function () {
  //     // After the animation completes, hide the initial container and
  //     // show the main container and logo. The main container and logo will
  //     // not immediately appear because their opacity is set to 0 in CSS.
  //     initialContainer.style.visibility = "collapse";
  //     mainContainer.style.visibility = "visible";
  //     logoContainer.style.visibility = "visible";

  //     // Fade in the main container and logo over one half second.
  //     animations.push({ target: mainContainer, opacity: 1, duration: 500 });
  //     animations.push({ target: logoContainer, opacity: 1, duration: 500 });

  //     // Slide up the form controls and sign up container.
  //     animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
  //     animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

  //     // Kick off the animation queue
  //     new Animation(animations, false).play();
  //   });
  //  }

  private read(ID: string): void {
    bluetooth.read({
      peripheralUUID: ID,
      serviceUUID: "F000AA00-0451-4000-B000-000000000000",
      characteristicUUID: "F000AA01-0451-4000-B000-000000000000"
    }).then( (result) => {
      console.log(JSON.stringify(result));
    }, (err) => {
      console.log("read error: " + err);
    });
  }

  private permission(): Promise<boolean> {
    return bluetooth.hasCoarseLocationPermission().then((granted) => {
      if (!granted) {
        return bluetooth.requestCoarseLocationPermission();
      } else {
        return true;
      }
    });
  }
}
