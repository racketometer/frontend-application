import { validate } from "email-validator";

export class User {
  public _id?: number;
  public displayName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public birthday: Date;
  public password?: string;
  public startedPlaying: Date;
  public allowsSharing: boolean;
  public isConsultant?: boolean;
  public isCoach?: boolean;
  public createdAt?: string;
  public updatedAt?: string;
  public measurements?: Array<any>;

  /**
   * Validate the user email.
   */
  public isValidEmail(): boolean {
    return validate(this.email);
  }

  /**
   * User name.
   * If display name is defined, it is used,
   * otherwise full name.
   */
  get name(): string {
    return this.displayName || `${this.firstName} ${this.lastName}`;
  }

  public toString(): string {
    return `
      Name:     ${this.firstName} ${this.lastName}
      Email:    ${this.email}
      Birthday: ${this.birthday}
      Started:  ${this.startedPlaying}
    `;
  }
}
