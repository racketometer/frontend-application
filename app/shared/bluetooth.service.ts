import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs/Rx";

import * as Timer from "timer";
import * as bluetooth from "nativescript-bluetooth";

type ScanCallback = (peripheral: bluetooth.Peripheral) => void;

export interface IServiceCharacteristics {
  peripheralUUID?: string;
  serviceUUID: string;
  characteristicsUUID: string;
}

@Injectable()
export class BluetoothService {
  public requestStream: Observable<bluetooth.ReadResult>;

  private connectedUUID: string;
  private scanTime = 5; // seconds

  constructor() {
    this.requestStream = this.createObservable();
  }

  /**
   * Scans for nearby bluetooth sensors
   */
  public connect(item: bluetooth.Peripheral): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      bluetooth.connect({
        UUID: item.UUID,
        onConnected: (peripheral) => {
          this.setup(item.UUID).then(() => {
            observer.next(true);
          }).catch((err) => {
            observer.next(false);
          });
        },
        onDisconnected: (peripheral) => {
          observer.next(false);
        },
      });
      return (() => {
        const options: bluetooth.DisconnectOptions = {
          UUID: item.UUID,
        };
        bluetooth.disconnect(options);
        observer.complete();
      });
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
   * Configures motion sensor to enable all sensors
   * Configures accelerometer to 16G +-
   * Sets the resolution speed to 100ms
   */
  public setup(UUID: string): Promise<any> {
    this.connectedUUID = UUID;
    return this.initializeAccelerometer()
      .then(() => this.initializeResolution(), (err) => {
        console.log("Accelerometer write error: " + err);
      }).catch((err) => {
        console.log("Resolution write error: " + err);
      });
  }

  /**
   * Reads data from a service on a specific bluetooth sensor
   */
  public read(device: IServiceCharacteristics): Promise<bluetooth.ReadResult> {
    return bluetooth.read({
      peripheralUUID: this.connectedUUID,
      serviceUUID: device.serviceUUID,
      characteristicUUID: device.characteristicsUUID,
    });
  }

  /**
   * Sets the resolution speed to 100ms
   */
  private initializeAccelerometer(): Promise<any> {
    console.log("INITIALIZING SENSOR");
    return bluetooth.write({
      peripheralUUID: this.connectedUUID,
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicUUID: "f000aa82-0451-4000-b000-000000000000",
      value: "0xFF, 0xC0",
    });
  }

  /**
   * Sets the resolution speed to 100ms
   */
  private initializeResolution(): Promise<any> {
    return bluetooth.write({
      peripheralUUID: this.connectedUUID,
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicUUID: "f000aa83-0451-4000-b000-000000000000",
      value: "0x0A",
    });
  }

  /**
   * Creates observable that calls read every 500 ms
   */
  private createObservable(): Observable<bluetooth.ReadResult> {
    const config: IServiceCharacteristics = {
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicsUUID: "f000aa81-0451-4000-b000-000000000000",
    };

    return Observable.create((observer: Observer<bluetooth.ReadResult>) => {
      const clock = Timer.setInterval(() => {

        this.read(config)
          .then((result) => {
            observer.next(result);
          })
          .catch(err => observer.error(err));
      }, 500);

      return (() => {
        Timer.clearInterval(clock);
        observer.complete();
      });
    });
  }
}
