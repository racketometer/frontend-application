import { Injectable } from "@angular/core";

import * as bluetooth from "nativescript-bluetooth";

type ScanCallback = (peripheral: bluetooth.Peripheral) => void;

@Injectable()
export class BluetoothService {
  private scanTime = 5; // seconds

  /**
   * Scans for nearby bluetooth sensors
   */
  public connect(item: bluetooth.Peripheral): void {
    bluetooth.connect({
      UUID: item.UUID,
      onConnected: (peripheral) => {
        console.log("connected");
        this.read(item.UUID);
      },
      onDisconnected: (peripheral) => {
        console.log("disconnected");
      },
    });
  }

  /**
   * Scans for nearby bluetooth sensors
   */
  public scan(callback: ScanCallback): Promise<any> {
    return this.permission().then(() =>
      bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: this.scanTime,
        onDiscovered: (peripheral: bluetooth.Peripheral) => callback(peripheral)
      })
    );
  }

  /**
   * Checks if bluetooth is enabled on the device
   */
  public isBluetoothEnabled(): Promise<boolean> {
    return bluetooth.isBluetoothEnabled();
  }

  /**
   * Checks if Coarse location permissions
   */
  public permission(): Promise<boolean> {
    return bluetooth.hasCoarseLocationPermission().then((granted) => {
      if (!granted) {
        return bluetooth.requestCoarseLocationPermission();
      } else {
        return true;
      }
    });
  }

  /**
   * Reads data from a predefined service on a specific bluetooth sensor
   */
  private read(ID: string): void {
    bluetooth.read({
      peripheralUUID: ID,
      serviceUUID: "F000AA00-0451-4000-B000-000000000000",
      characteristicUUID: "F000AA01-0451-4000-B000-000000000000"
    }).then((result) => {
      console.log(JSON.stringify(result));
    }, (err) => {
      console.log("read error: " + err);
    });
  }

}
