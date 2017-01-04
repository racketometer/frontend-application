import { Injectable } from "@angular/core";
import * as Timer from "timer";

import * as bluetooth from "nativescript-bluetooth";

type ScanCallback = (peripheral: bluetooth.Peripheral) => void;

export interface serviceCharacteristics {
  peripheralUUID: string;
  serviceUUID: string;
  characteristicsUUID: string;
}

@Injectable()
export class BluetoothService {
  private scanTime = 5; // seconds
  private timer: any;

  public connected: boolean;


  /**
   * Scans for nearby bluetooth sensors
   */
  public connect(item: bluetooth.Peripheral): void {
    bluetooth.connect({
      UUID: item.UUID,
      onConnected: (peripheral) => {
        this.connected = true;
      },
      onDisconnected: (peripheral) => {
        this.connected = false;
        console.log("disconnected");
      },
    });
  }

  /**
   * Scans for nearby bluetooth sensors
   */
  public scan(callback: ScanCallback): Promise<void> {
    return this.permission().then(() => {
      return bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: this.scanTime,
        onDiscovered: (peripheral: bluetooth.Peripheral) => callback(peripheral),
      });
    });
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
  * Starts reading every 500 ms
  */
  public startReading(UUID: string) {
    const dataRead: serviceCharacteristics = {
      peripheralUUID: UUID,
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicsUUID: "f000aa81-0451-4000-b000-000000000000",
    };


    this.timer = Timer.setInterval(() => {
      this.read(dataRead);
    }, 500);
  }

 /**
  * Stops reading
  */
  public stopReading() {
    Timer.clearTimeout(this.timer);
  }

 /**
  * Configures motion sensor to enable all sensors
  * Configures accelerometer to 16G +-
  * Sets the resolution speed to 100ms
  */
  public setup(UUID: string) {
    bluetooth.write({
      peripheralUUID: UUID,
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicUUID: "f000aa82-0451-4000-b000-000000000000",
      value: "0xFF, 0xC0",
    }).then(function (result) {
      console.log("value written");
    }).catch(function (err) {
      console.log("write error: " + err);
    });

    bluetooth.write({
      peripheralUUID: UUID,
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicUUID: "f000aa83-0451-4000-b000-000000000000",
      value: "0x0A",
    }).then(function (result) {
      console.log("value written");
    }).catch(function (err) {
      console.log("write error: " + err);
    });
  }

  /**
   * Reads data from a predefined service on a specific bluetooth sensor
   */
  private read(device: serviceCharacteristics): void {
    bluetooth.read({
      peripheralUUID: device.peripheralUUID,
      serviceUUID: device.serviceUUID,
      characteristicUUID: device.characteristicsUUID,
    }).then((result) => {
      var data = new Int16Array(result.value);
      console.log((data[3] * 1.0) / (32768 / 16));
      console.log((data[4] * 1.0) / (32768 / 16));
      console.log((data[5] * 1.0) / (32768 / 16));
    }, (err) => {
      console.log("read error: " + err);
    });
  }
}
