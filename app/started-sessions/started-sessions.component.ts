import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemEventData } from "ui/list-view";
import { Page } from "ui/page";

import {
  Session,
  SessionService,
} from "../shared";

@Component({
  selector: "rom-started-sessions",
  templateUrl: "started-sessions/started-sessions.component.html",
  styleUrls: ["started-sessions/started-sessions-common.css", "started-sessions/started-sessions.component.css"],
})
export class StartedSessionsComponent implements OnInit {
  public startedSessions: Array<Session>;

  constructor(
    private router: Router,
    private page: Page,
    private sessionService: SessionService
  ) { }

  public ngOnInit() {
    this.page.actionBarHidden = true;
    this.startedSessions = this.sessionService.getStartedSessions();
  }

  public onSessionTap(sessionItem: ItemEventData): void {
    const session = this.startedSessions[sessionItem.index];
    console.log(session.toString());
    // TODO: Read data from racket and save to backend if internet is available
    // TODO: Go to details view
    this.router.navigate(["bluetooth"]);
  }
}
