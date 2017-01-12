import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { Subscription } from "rxjs/Rx";

import { BluetoothService, SessionService } from "../shared";

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

  private responseStream: Subscription;
  private connectedStream: Subscription;
  private counter: number;

  constructor(
    private bluetoothService: BluetoothService,
    private sessionService: SessionService
  ) { }

  public ngOnInit() {
    this.source = new ObservableArray([]);
  }

  public stream(): void {
    this.responseStream = this.bluetoothService.requestStream.subscribe(response => {
      if (response) {
        const data = new Int16Array(response.value);
        const reading: IAccelerometer = {
          X: data[5] / (32768 / 16),
          Y: data[4] / (32768 / 16),
          Z: data[3] / (32768 / 16),
          Time: ++this.counter,
        };
        this.source.unshift(reading);

        if (this.source.length > 25) {
          this.source.pop();
        }
      }
    });
  }

  public connect(): void {
    this.connectedStream = this.bluetoothService.connect(this.sessionService.getCurrentSession().racket).subscribe((value) => {
      if (value) {
        this.stream();
      }
    });
  }
}
