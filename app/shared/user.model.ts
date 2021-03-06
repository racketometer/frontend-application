import { validate } from "email-validator";

export class User {
  // tslint:disable:variable-name
  public _id?: number;
  // tslint:enable:variable-name
  public displayName: string;
  public autoGenerated?: boolean;
  public firstName: string;
  public lastName: string;
  public email: string;
  public birthday: Date;
  public password?: string;
  public startedPlaying: Date;
  public allowSharing: boolean;
  public isConsultant?: boolean;
  public isCoach?: boolean;
  public createdAt?: string;
  public updatedAt?: string;
  public measurements?: Array<any>;

  constructor(user?: User) {
    if (user) {
      for (let key in user) {
        if (user.hasOwnProperty(key)) {
          this[key] = user[key];
        }
      }
    }
  }

  /**
   * Validate the user email.
   */
  public isValidEmail(): boolean {
    return validate(this.email);
  }

  /**
   * Validate user model.
   */
  public isValid(): boolean {
    return !!(
      this.firstName &&
      this.lastName &&
      this.isValidEmail() &&
      this.birthday
    );
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
      Share:    ${this.allowSharing}
    `;
  }
}
