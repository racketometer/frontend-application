import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "rom-dashboard",
  templateUrl: "dashboard/dashboard.component.html",
  styleUrls: ["dashboard/dashboard-common.css", "dashboard/dashboard.component.css"],
})
export class DashboardComponent {
  constructor(
    private router: Router
  ) { }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
