import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ObservableArray } from "data/observable-array";

@Component({
  selector: "rom-user-dashboard",
  templateUrl: "dashboard-user/dashboard-user.component.html",
  styleUrls: ["dashboard-user/dashboard-user-common.css", "dashboard-user/dashboard-user.component.css"],
})
export class DashboardUserComponent implements OnInit {
  public source: ObservableArray<Country>;

  constructor(
    private router: Router
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
