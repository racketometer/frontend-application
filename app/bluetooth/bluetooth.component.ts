import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { connectionType, getConnectionType } from "connectivity";
import { prompt } from "ui/dialogs";
import { ItemEventData } from "ui/list-view";
import { ObservableArray } from "data/observable-array";

import * as bluetooth from "nativescript-bluetooth";

import { alert, setHintColor} from "../shared";

@Component({
  selector: "gr-bluetooth",
  templateUrl: "bluetooth/bluetooth.component.html",
  styleUrls: ["bluetooth/bluetooth.css"],
})
export class BluetoothComponent implements OnInit {
  periperhal: ObservableArray<bluetooth.Peripheral>;
  scanBtn: Button;

  @ViewChild("scanButton") scanButton: ElementRef;

  constructor(
    private router: Router
  ) {
    this.periperhal = new ObservableArray<bluetooth.Peripheral>();
  }

  ngOnInit() {
    this.scanBtn = this.scanButton.nativeElement as Button;
  }

  public scan(): void {
    this.scanBtn.isEnabled = false;
    this.periperhal.length = 0;
    this.permission().then(() => 
      bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: 5,
        onDiscovered: (peripheral: bluetooth.Peripheral) => {
          this.periperhal.push(peripheral);
        }
      })
    ).catch((err) => {
      console.log("scan: catch", err);
    }).then(() => {
      this.scanBtn.isEnabled = true;
    });
  }

  public onPeripheralTap(event: ItemEventData): void {
    console.log("reading: " + this.isReading)
    let item  = this.periperhal.getItem(event.index);
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
      serviceUUID: 'F000AA00-0451-4000-B000-000000000000',
      characteristicUUID: "F000AA01-0451-4000-B000-000000000000" // 3?
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
