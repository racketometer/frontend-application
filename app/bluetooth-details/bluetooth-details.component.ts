import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Animation } from "ui/animation";
import { Page } from "ui/page";

import { ItemEventData } from "ui/list-view";
import { ObservableArray } from "data/observable-array";

import * as bluetooth from "nativescript-bluetooth";

import { alert, setHintColor} from "../shared";

@Component({
  selector: "rom-bluetooth-details",
  templateUrl: "bluetooth-details/bluetooth-details.component.html",
  styleUrls: ["bluetooth-details/bluetooth-details-common.css"],
})
export class BluetoothDetailsComponent implements OnInit {
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
