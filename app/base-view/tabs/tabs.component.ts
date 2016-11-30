import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "rom-tabs",
  templateUrl: "base-view/tabs/tabs.component.html",
  styleUrls: ["base-view/tabs/tabs-common.css"],
})


export class TabsComponent implements OnInit {

  /**
   * Hide User tabs.
   */
  @Input() public hideUserTab: boolean;

  public ngOnInit() {
    if (!this.hideUserTab) {
      this.hideUserTab = false;
    }
  }
}
