import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { Observable, Subscription } from "rxjs/Rx";
import { Peripheral } from "nativescript-bluetooth";
import * as Timer from "timer";

import { BluetoothService, IServiceCharacteristics, SessionService, User } from "../shared";


import * as bluetooth from "nativescript-bluetooth";

export interface IAccelerometer {
  X: number;
  Y: number;
  Z: number;
  Time: number;
}

@Component({
  selector: "rom-session-live",
  templateUrl: "session-live/session-live.component.html",
  styleUrls: ["session-live/session-live-common.css"],
})
export class SessionLiveComponent implements OnInit {
  public source: ObservableArray<IAccelerometer>;

  private observer: Observable<bluetooth.ReadResult>;
  private requestStream: Observable<bluetooth.ReadResult>;
  private responseStream: Subscription;

  private counter: number;

  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private sessionService: SessionService,
  ) { }

  public ngOnInit() {
    this.source = new ObservableArray(this.getCategoricalSource());

    let config: IServiceCharacteristics = {
      serviceUUID: "f000aa80-0451-4000-b000-000000000000",
      characteristicsUUID: "f000aa81-0451-4000-b000-000000000000",
    }

    this.observer = Observable.create(observer => {
      Timer.setInterval(() => {

        this.bluetoothService.read(config)
          .then((result) => {
            observer.next(result);
          })
          .catch(err => observer.error(err));
      }, 500);
    });
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }

  public stream(): void {
    this.responseStream = this.observer.subscribe(response => {
      if (response) {
        const data = new Int16Array(response.value);
        let reading: IAccelerometer = {
          X: (data[3] * 1.0) / (32768 / 16),
          Y: (data[4] * 1.0) / (32768 / 16),
          Z: (data[5] * 1.0) / (32768 / 16),
          Time: ++this.counter,
        };
        this.source.unshift(reading);

        if (this.source.length > 25) {
          this.source.pop();
        }
      }
    });
  }

  public stopStreaming(): void {
    this.responseStream.unsubscribe();
  }

  public connect(): void {
    this.bluetoothService.connect(this.sessionService.getCurrentSession().racket);
  }

  public initialize(): void {
    this.bluetoothService.setup();
  }

  // taken from nativescript-ui angular chart "getting started" guide
  // http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/Chart/getting-started
  public getCategoricalSource(): Array<IAccelerometer> {
    return [
      { Time: 0, X: 0, Y: 0, Z: 0 },
    ];
  }
}
