import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { DialogService } from "../nativescript-services";
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
  public peripherals: ObservableArray<bluetooth.Peripheral>;
  public isScanning = false;

  constructor(
    private router: Router,
    private page: Page,
    private bluetoothService: BluetoothService,
    private dialogService: DialogService
  ) {
    this.peripherals = new ObservableArray<bluetooth.Peripheral>();
  }

  public ngOnInit() {
    this.page.actionBarHidden = true;
  }

  /**
   * Scan after Peripherals.
   */
  public scan(): void {
    this.isScanning = true;
    this.peripherals.length = 0;
    this.bluetoothService.isBluetoothEnabled().then( (enabled) => {
      if (!enabled) {
        this.dialogService.alert("bluetooth is not enabled", "Bluetooth");
        return;
      }
      this.bluetoothService.scan((peripheral: bluetooth.Peripheral) => {
        this.peripherals.push(peripheral);
      }).catch((err) => {
        this.dialogService.alert(err, "Bluetooth");
      });
    }).then( () => {
      this.isScanning = false;
    });
  }

  /**
   * Handle Peripheral tap.
   */
  public onPeripheralTap(event: ItemEventData): void {
    const peripheral = this.peripherals.getItem(event.index);
    // TODO: SAVE UUID ON SESSION SERVICE
    this.router.navigate(["bluetoothDetails"]);
  }
}
