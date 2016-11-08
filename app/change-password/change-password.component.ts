import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { TextField } from "ui/text-field";

import { DialogService } from "../nativescript-services";
import { LoginService } from "../shared";

@Component({
  selector: "rom-change-password",
  templateUrl: "change-password/change-password.component.html",
  styleUrls: ["change-password/change-password-common.css", "change-password/change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  public isChanging: boolean;
  public model: {
    newPassword?: string,
    repeatedPassword?: string,
  };

  @ViewChild("newPassword") public newPassword: ElementRef;
  @ViewChild("repeatPassword") public repeatPassword: ElementRef;

  constructor(
    private routerExtensions: RouterExtensions,
    private loginService: LoginService,
    private dialogService: DialogService
  ) {
  }

  public ngOnInit(): void {
    this.model = {};
  }

  /**
   * Submit new passwords if valid.
   */
  public submit(): void {
    this.validatePasswords()
      .catch((err) => {
        return Promise.reject("not valid");
      })
      .then(() => {
        this.isChanging = true;
        return this.loginService.changePassword(this.model.newPassword)
          .catch((error) => {
            this.isChanging = false;
            return this.dialogService.alert("Change password failed");
          })
          .then(() => this.routerExtensions.backToPreviousPage());
      });
  }

  /**
   * Focus repeat password field and clear inputs.
   */
  public focusRepeat(): void {
    const repeatPasswordField = this.repeatPassword.nativeElement as TextField;
    repeatPasswordField.text = undefined;
    repeatPasswordField.focus();
  }

  /**
   * Validate password inputs.
   * Rules:
   * - Both inputs must be filled
   * - Inputs must be identical
   */
  private validatePasswords(): Promise<void> {
    if (!this.model.newPassword || !this.model.repeatedPassword) {
      return this.dialogService
        .alert("Fill in both passwords")
        .then(() => Promise.reject("Field empty"));
    }

    if (this.model.newPassword !== this.model.repeatedPassword) {
      return this.dialogService
        .alert("The passwords are not identical.")
        .then(() => this.clearFields())
        .then(() => Promise.reject("No match"));
    }

    return Promise.resolve();
  }

  /**
   * Clear input fields.
   */
  private clearFields(): void {
    (this.newPassword.nativeElement as TextField).text = undefined;
    (this.repeatPassword.nativeElement as TextField).text = undefined;
  }
}
