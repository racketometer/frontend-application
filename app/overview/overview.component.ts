import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { action } from "ui/dialogs";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import * as SocialShare from "nativescript-social-share";

import { LoginService, OverviewService, setHintColor } from "../shared";

@Component({
  selector: "gr-overview",
  templateUrl: "overview/overview.component.html",
  styleUrls: ["overview/overview-common.css", "overview/overview.component.css"],
})
export class OverviewComponent implements OnInit {
  grocery: string = "";
  isAndroid;
  isShowingRecent = false;
  isLoading = false;

  @ViewChild("overviewHeader") overviewHeaderField: ElementRef;

  constructor(private router: Router,
    private store: OverviewService,
    private loginService: LoginService,
    private page: Page) {}

  ngOnInit() {
    this.isAndroid = !!this.page.android;
    this.page.actionBarHidden = true;
    this.page.className = "list-page";
  }

  setTextFieldHintColor(textField) {
    // TODO: Why is it necessary to defer this code on iOS?
    // It should work without the setTimeout like it does on Android.
    setTimeout(() => {
      setHintColor({
        view: <TextField>textField,
        color: new Color("white")
      });
    });
  }

  // Prevent the first textfield from receiving focus on Android
  // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
  handleAndroidFocus(textField, container) {
    if (container.android) {
      container.android.setFocusableInTouchMode(true);
      container.android.setFocusable(true);
      textField.android.clearFocus();
    }
  }

  showActivityIndicator() {
    this.isLoading = true;
  }
  hideActivityIndicator() {
    this.isLoading = false;
  }

  logoff() {
    this.loginService.logoff();
    this.router.navigate(["/login"]);
  }
}
