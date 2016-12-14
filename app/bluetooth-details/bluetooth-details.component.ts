import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Peripheral } from "nativescript-bluetooth";

import { BluetoothService, SessionService, User } from "../shared";

@Component({
  selector: "rom-bluetooth-details",
  templateUrl: "bluetooth-details/bluetooth-details.component.html",
  styleUrls: ["bluetooth-details/bluetooth-details-common.css"],
})
export class BluetoothDetailsComponent implements OnInit {
  public user: User;
  public racket: Peripheral;

  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private sessionService: SessionService,
  ) {  }

  public ngOnInit() {
    const {racket, user} = this.sessionService.getCurrentSession();
    this.racket = racket;
    this.user = user;
  }

  /**
   * Start session.
   */
  public start(): void {
    this.sessionService.startCurrentSession();
    this.router.navigate(["startedSessions"]);
  }
}
