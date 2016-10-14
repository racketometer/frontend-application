import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import { alert, setHintColor, LoginService, User } from "../shared";

@Component({
  selector: "rom-new-user",
  templateUrl: "new-user/new-user.component.html",
  styleUrls: ["new-user/new-user-common.css", "new-user/new-user.component.css"],
})
export class NewUserComponent implements OnInit {
  public user: User;
  public yearsOfExperience: number;

  constructor(
    private router: Router,
    private page: Page
  ) {
  }

  public ngOnInit() {
    this.page.actionBarHidden = true;
    this.user = new User();
  }

  public submit(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    this.user.startedPlaying = new Date(currentYear - this.yearsOfExperience, currentMonth);

    console.log(this.user, this.yearsOfExperience);
  }

  public startBackgroundAnimation(background): void {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000,
    });
  }
}
