import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemEventData } from "ui/list-view";
import { ObservableArray } from "data/observable-array";

import {
  User,
  SessionService,
} from "../shared";

import { UsersService } from "./users.service";

@Component({
  selector: "rom-users",
  templateUrl: "users/users.component.html",
  styleUrls: ["users/users-common.css", "users/users.component.css"],
})
export class UsersComponent implements OnInit {
  public users: ObservableArray<User>;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private sessionService: SessionService,
  ) { }

  public ngOnInit() {
    this.users = new ObservableArray<User>();
    this.usersService.getUsers().subscribe((array) => {
      this.users.push(...array);
    });
  }

  public onUserTap(userItem: ItemEventData): void {
    let user = this.users.getItem(userItem.index);
    this.sessionService.setCurrentUser(user);
    this.router.navigate(["bluetooth"]);
  }
}
