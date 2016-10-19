import { Injectable } from "@angular/core";
import { Peripheral } from "nativescript-bluetooth";

import {
  Session,
} from "./";

import {
  User,
} from "../";

@Injectable()
export class SessionService {
  private startedSessions: Array<Session>;
  private currentSession: Session;

  constructor() {
    this.startedSessions = [];

    // TODO: Remove when persisted data can be fetched, related to #105 on thesis repo.
    this.mockedData();
  }

  /**
   * Set current racket selection for session.
   * @param racket The racket peripheral.
   */
  public setCurrentRacket(racket: Peripheral): void {
    this.currentSession.racket = racket;
  }

  /**
   * Set current user for session.
   * @param user The user.
   */
  public setCurrentUser(user: User): void {
    this.currentSession.user = user;
  }

  /**
   * Start current session.
   */
  public startCurrentSession(): void {
    this.currentSession.startedAt = new Date();
    this.startedSessions.push(this.currentSession);

    this.clearCurrentSession();
  }

  /**
   * Get started sessions.
   */
  public getStartedSessions(): Array<Session> {
    return this.startedSessions;
  }

  /**
   * Gets the current session.
   */
  public getCurrentSession(): Session {
    return this.currentSession;
  }

  /**
   * Clear current session.
   */
  private clearCurrentSession(): void {
    this.currentSession.racket = undefined;
    this.currentSession.user = undefined;
    this.currentSession.startedAt = undefined;
    this.currentSession.stoppedAt = undefined;
  }

  private mockedData(): void {
    // mock sessions
    console.warn("SessionService: Using mockes started sessions");
    const user1 = new User();
    user1.firstName = "John";
    user1.lastName = "Johnson";
    user1.email = "john@johnson.com";
    const session1 = new Session();
    session1.racket = { UUID: "1id", name: "Racket #1", RSSI: 1, services: [] };
    session1.user = user1;
    session1.startedAt = new Date();
    this.startedSessions.push(session1);

    const user2 = new User();
    user2.firstName = "Bear";
    user2.lastName = "Man";
    user2.email = "bear@m2an.com";
    const session2 = new Session();
    session2.racket = { UUID: "2id", name: "Racket #2", RSSI: 2, services: [] };
    session2.user = user2;
    session2.startedAt = new Date();
    this.startedSessions.push(session2);
  }
}
