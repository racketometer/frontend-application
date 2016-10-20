import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import { Animation } from "ui/animation";

import { ConnectivityService, DialogService } from "../nativescript-services";
import { LoginService, Login } from "../shared";

@Component({
  selector: "rom-login",
  templateUrl: "login/login.component.html",
  styleUrls: ["login/login-common.css", "login/login.component.css"],
})
export class LoginComponent implements OnInit {
  public user: Login;
  public isLoggingIn = true;
  public isAuthenticating = false;

  @ViewChild("formControls") public formControls: ElementRef;
  @ViewChild("signUpStack") public signUpStack: ElementRef;
  @ViewChild("email") public email: ElementRef;
  @ViewChild("password") public password: ElementRef;
  @ViewChild("background") public background: ElementRef;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private connectivityService: ConnectivityService,
    private dialogService: DialogService
  ) {
    this.user = new Login();
    this.user.email = "johnny@test.dk";
    this.user.password = "1234";
  }

  public ngOnInit(): void {
    this.showContent();
  }

  public focusPassword(): void {
    this.password.nativeElement.focus();
  }

  public submit(): void {
    if (!this.user.isValidEmail()) {
      this.dialogService.alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.isAuthenticating = true;
      this.login();
    } else {
      this.signUp();
    }
  }

  public forgotPassword(): void {
    if (this.isAuthenticating) {
      return;
    }

    this.dialogService.prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for Groceries to reset your password.",
      okButtonText: "Ok",
      cancelButtonText: "Cancel",
    }).then((data) => {
      if (data.result) {
        this.loginService.resetPassword(data.text.trim())
          .then(() => {
            this.dialogService
              .alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          })
          .catch(() => {
            this.dialogService.alert("Unfortunately, an error occurred resetting your password.");
          });
      }
    });
  }

  public toggleDisplay(): void {
    if (this.isAuthenticating) {
      return;
    }

    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
  }

  private login(): void {
    if (!this.connectivityService.isOnline()) {
      this.dialogService.alert("Racket'O'Meter requires an internet connection to log in.");
      return;
    }

    this.loginService.login(this.user)
      .then((data) => {
        this.isAuthenticating = false;
        if (data) {
          this.router.navigate(["dashboard"]);
        }
      })
      .catch((message) => {
        this.dialogService.alert("message: " + message);
        this.isAuthenticating = false;
      });
  }

  private signUp() {
    if (!this.connectivityService.isOnline()) {
      this.dialogService.alert("Internet is requried to register.");
      return;
    }

    this.dialogService.alert("Registration is not possible at the time.");
  }

  private showContent(): void {
    const formControls = this.formControls.nativeElement as View;
    const signUpStack = this.signUpStack.nativeElement as View;
    const animations = [];

    // Slide up the form controls and sign up container.
    animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
    animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

    // Kick off the animation queue
    new Animation(animations, false).play();
  }

  private setTextFieldColors() {
    const emailTextField = this.email.nativeElement as TextField;
    const passwordTextField = this.password.nativeElement as TextField;

    const mainTextColor = new Color(this.isLoggingIn ? "black" : "#003600");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;
  }
}
