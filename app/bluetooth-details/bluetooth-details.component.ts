import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import { BluetoothService } from "../shared/bluetooth.service";

@Component({
  selector: "rom-bluetooth-details",
  templateUrl: "bluetooth-details/bluetooth-details.component.html",
  styleUrls: ["bluetooth-details/bluetooth-details-common.css"],
})
export class BluetoothDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private page: Page,
    private bluetoothService: BluetoothService,
  ) {  }

  public ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
