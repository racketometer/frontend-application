import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { GridLayout } from "ui/layouts/grid-layout";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { Animation } from "ui/animation";

@Component({
  selector: "rom-base-view",
  templateUrl: "base-view/base-view.component.html",
  styleUrls: ["base-view/base-view-common.css", "base-view/base-view.component.css"],
})
export class BaseViewComponent implements OnInit {
  @ViewChild("background") public background: ElementRef;
  @ViewChild("mainContainer") public mainContainer: ElementRef;

  constructor(
    private page: Page
  ) { }

  public ngOnInit() {
    this.page.actionBarHidden = true;
    this.showMainContent();
  }

  public startBackgroundAnimation() {
    const background = this.background.nativeElement as GridLayout;

    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000,
    });
  }

  private showMainContent() {
    const mainContainer = this.mainContainer.nativeElement as View;
    const animations = [];

    animations.push({ target: mainContainer, opacity: 1, duration: 500 });

    // Kick off the animation queue
    new Animation(animations, false).play();
  }
}
