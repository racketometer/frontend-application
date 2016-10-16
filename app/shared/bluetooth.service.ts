import { Injectable } from "@angular/core";

import * as bluetooth from "nativescript-bluetooth";

type ScanCallback = (peripheral: bluetooth.Peripheral) => void;

@Injectable()
export class BluetoothService {
  scanTime = 5; // seconds
  isEnabled: boolean;

  constructor() {
    this.isBluetoothEnabled();
  }

  public connect(item: bluetooth.Peripheral): void {
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

  public scan(callback: ScanCallback): Promise<any> {
    return this.permission().then(() =>
      bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: this.scanTime,
        onDiscovered: (peripheral: bluetooth.Peripheral) => callback(peripheral)
      })
    );
  }

  public isBluetoothEnabled(): void {
    bluetooth.isBluetoothEnabled().then( (enabled: boolean) => {
      this.isEnabled = enabled;
     });
  }

  public permission(): Promise<boolean> {
    return bluetooth.hasCoarseLocationPermission().then((granted) => {
      if (!granted) {
        return bluetooth.requestCoarseLocationPermission();
      } else {
        return true;
      }
    });
  }

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
