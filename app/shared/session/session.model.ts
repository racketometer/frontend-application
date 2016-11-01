import { User } from "../";
import { Peripheral } from "nativescript-bluetooth";

export class Session {
  public racket?: Peripheral;
  public user?: User;
  public startedAt?: Date;
  public stoppedAt?: Date;

  public toString(): string {
    return `
      Racket:  ${this.racket.name} [${this.racket.UUID}]
      User:    ${this.user.name}
      Started: ${this.startedAt}
      Stopped: ${this.stoppedAt}
    `;
  }
}
