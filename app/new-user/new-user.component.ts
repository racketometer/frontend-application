import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DialogService } from "../nativescript-services";
import { User, LoginService } from "../shared";

import { NewUserService } from "./new-user.service";

@Component({
  selector: "rom-new-user",
  templateUrl: "new-user/new-user.component.html",
  styleUrls: ["new-user/new-user-common.css", "new-user/new-user.component.css"],
})
export class NewUserComponent implements OnInit {
  public newUser = new User();
  public user: User;
  public yearsOfExperience: string;

  constructor(
    private router: Router,
    private userService: NewUserService,
    private dialogService: DialogService,
    private loginService: LoginService
  ) {
  }

  public ngOnInit(): void {
    this.newUser = new User();
    this.newUser.allowSharing = false;
    this.newUser.isCoach = false;
    this.user = this.loginService.user;
  }

  public back(): void {
    this.router.navigate(["dashboard"]);
  }

  /**
   * Submit form.
   */
  public submit(): void {
    if (!this.isFormValid()) {
      this.dialogService.alert("Please, fill in all inputs");
      return;
    }
    this.setStartedPlaying();
    this.userService.newUser(this.newUser).subscribe(() => {
      this.router.navigate(["startedSessions"]);
    }, (error) => {
      this.dialogService.alert("Email in use");
    });
  }

  /**
   * Set started playing date from years of experience.
   */
  private setStartedPlaying(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    this.newUser.startedPlaying = new Date(currentYear - parseInt(this.yearsOfExperience, 10), currentMonth);
  }

  /**
   * Validate form inputs.
   */
  private isFormValid(): boolean {
    const yearsOfExperience = parseInt(this.yearsOfExperience, 10);
    if (isNaN(yearsOfExperience)) {
      return false;
    }

    return this.newUser.isValid();
  }
}
