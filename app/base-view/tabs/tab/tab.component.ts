import {
  ElementRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

import { StackLayout } from "ui/layouts/stack-layout";
import { AnimationCurve } from "ui/enums";

@Component({
  selector: "rom-tab",
  templateUrl: "base-view/tabs/tab/tab.component.html",
  styleUrls: ["base-view/tabs/tab/tab-common.css"],
})
export class TabComponent implements OnInit {
  @ViewChild("line") public line: ElementRef;
  @Input() public text: string;
  @Input() public route: string;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    const active = this.router.isActive(this.route, true);

    if (active) {
      this.showActive();
    }
  }

  /**
   * Show active indication.
   */
  public showActive(): void {
    const line = this.line.nativeElement as StackLayout;
    line.opacity = 1;

    if (line.ios) {
      line.animate({
        duration: 1000,
        delay: 5000,
        scale: { x: 1.0, y: 1.0 },
        curve: AnimationCurve.easeInOut,
      });
    } else {
      line.scaleX = 1;
    }
  }
}
