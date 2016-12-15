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
    this.currentSession = {};
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
    this.currentSession = {};
  }
}
