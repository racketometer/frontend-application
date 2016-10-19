import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { ObservableArray } from "data/observable-array";

import { Measurement } from "../shared/measurement.model";
import { User } from "../shared";

@Component({
  selector: "rom-session-result",
  templateUrl: "session-result/session-result.component.html",
  styleUrls: [
      "session-result/session-result-common.css",
      "session-result/session-result.component.css",
    ],
})
export class SessionResultComponent implements OnInit {
  public measurement: Measurement;
  public categoricalSource: ObservableArray<Country>;
  public user: User;

  constructor(
    private router: Router,
    private page: Page,
  ) {
    this.measurement = new Measurement();
    this.measurement.strokes = 120;
    this.measurement.date = new Date();
    this.measurement.maxRacketSpeed = 89;
    this.measurement.maxShuttlecockSpeed = 102;
    this.user = new User();
    this.user.firstName = "Johnny";
    this.user.lastName = "Johnson";
  }

  public ngOnInit() {
    this.categoricalSource = new ObservableArray(this.getCategoricalSource());
    this.page.actionBarHidden = true;
  }

 // taken from nativescript-ui angular chart "getting started" guide
 // http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/Chart/getting-started
  public getCategoricalSource(): Array<Country> {
    return [
      { Country: "Clear", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: "Smash", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
      { Country: "Layup", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
      { Country: "Hit", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: "Snap", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
    ];
  }
}
 // taken from nativescript-ui angular chart "getting started" guide
 // http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/Chart/getting-started
export class Country {
  constructor(
    public Country?: string,
    public Amount?: number,
    public SecondVal?: number,
    public ThirdVal?: number,
    public Impact?: number,
    public Year?: number) {
  }
}
