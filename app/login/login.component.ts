import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { GridLayout } from "ui/layouts/grid-layout";

import { ConnectivityService, DialogService } from "../nativescript-services";
import { setHintColor, LoginService, Login } from "../shared";

@Component({
  selector: "rom-login",
  templateUrl: "login/login.component.html",
  styleUrls: ["login/login-common.css", "login/login.component.css"],
})
export class LoginComponent implements OnInit {
  public user: Login;
  public isLoggingIn = true;
  public isAuthenticating = false;

  @ViewChild("mainContainer") public mainContainer: ElementRef;
  @ViewChild("formControls") public formControls: ElementRef;
  @ViewChild("signUpStack") public signUpStack: ElementRef;
  @ViewChild("email") public email: ElementRef;
  @ViewChild("password") public password: ElementRef;
  @ViewChild("background") public background: ElementRef;

  constructor(
    private router: Router,
    private page: Page,
    private loginService: LoginService,
    private connectivityService: ConnectivityService,
    private dialogService: DialogService
  ) {
    this.user = new Login();
    this.user.email = "johnny@test.dk";
    this.user.password = "1234";
  }

  public ngOnInit() {
    this.page.actionBarHidden = true;
    this.showMainContent();
  }

  public newUser(): void {
    this.router.navigate(["newUser"]);
  }

  public focusPassword() {
    this.password.nativeElement.focus();
  }

  public submit() {
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

  public forgotPassword() {
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

  public toggleDisplay() {
    if (this.isAuthenticating) {
      return;
    }

    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
    const mainContainer = this.mainContainer.nativeElement as View;
    mainContainer.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#220c08"),
      duration: 200,
    });
  }

  public startBackgroundAnimation() {
    const background = this.background.nativeElement as GridLayout;

    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000,
    });
  }

  private login() {
    if (!this.connectivityService.isOnline()) {
      this.dialogService.alert("Racket'O'Meter requires an internet connection to log in.");
      return;
    }

    this.loginService.login(this.user)
      .then((data) => {
        this.isAuthenticating = false;
        if (data) {
          this.router.navigate(["newUser"]);
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

  private showMainContent() {
    const mainContainer = this.mainContainer.nativeElement as View;
    const formControls = this.formControls.nativeElement as View;
    const signUpStack = this.signUpStack.nativeElement as View;
    const animations = [];

    // Show the main container. The main container will
    // not immediately appear because their opacity is set to 0 in CSS.
    mainContainer.style.visibility = "visible";

    // Fade in the main container over one half second.
    animations.push({ target: mainContainer, opacity: 1, duration: 500 });

    // Slide up the form controls and sign up container.
    animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
    animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

    // Kick off the animation queue
    new Animation(animations, false).play();
  }

  private setTextFieldColors() {
    const emailTextField = this.email.nativeElement as TextField;
    const passwordTextField = this.password.nativeElement as TextField;

    const mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    const hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }
}
