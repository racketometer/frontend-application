import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Animation } from "ui/animation";
import { Page } from "ui/page";
import { connectionType, getConnectionType } from "connectivity";
import { prompt } from "ui/dialogs";
import { ItemEventData } from "ui/list-view";
import { ObservableArray } from "data/observable-array";
import { BluetoothService } from "../shared/bluetooth.service";

import * as bluetooth from "nativescript-bluetooth";

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
    private page: Page,
    private bluetoothService: BluetoothService
  ) {
    this.peripherals = new ObservableArray<bluetooth.Peripheral>();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  public scan(): void {
    this.isScanning = true;
    this.peripherals.length = 0;
    this.bluetoothService.scan( (peripheral: bluetooth.Peripheral) =>  {
      this.peripherals.push(peripheral);
    }).catch( () => {
      // TODO: some error handling
    }).then( () => {
      this.isScanning = false;
    });
  }

  public onPeripheralTap(event: ItemEventData): void {
    const peripheral = this.peripherals.getItem(event.index);
    // TODO: SAVE UUID ON SESSION SERVICE
    this.router.navigate(["bluetoothDetails"]);
  }
}
