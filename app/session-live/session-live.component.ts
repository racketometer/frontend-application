import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { Peripheral } from "nativescript-bluetooth";

import { BluetoothService, SessionService, User } from "../shared";

@Component({
  selector: "rom-session-live",
  templateUrl: "session-live/session-live.component.html",
  styleUrls: ["session-live/session-live-common.css"],
})
export class SessionLiveComponent implements OnInit {
  public source: ObservableArray<Country>;

  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private sessionService: SessionService,
  ) { }

  public ngOnInit() {
    this.source = new ObservableArray(this.getCategoricalSource());
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }

  // taken from nativescript-ui angular chart "getting started" guide
  // http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/Chart/getting-started
  public getCategoricalSource(): Array<Country> {
    return [
      { Time: 0, Force: 0, X: 15, Y: 14, Z: 24 },
      { Time: 1, Force: 0, X: 10, Y: 14, Z: 24 },
      { Time: 2, Force: 0, X: 5, Y: 14, Z: 24 },
      { Time: 3, Force: 0, X: 15, Y: 14, Z: 24 },
    ];
  }
}

// taken from nativescript-ui angular chart "getting started" guide
// http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/Chart/getting-started
export class Country {
  constructor(
    public Time?: number,
    public Force?: number,
    public X?: number,
    public Y?: number,
    public Z?: number
  ) {
  }
}
