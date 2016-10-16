import { validate } from "email-validator";

export class Login {
  public email: string;
  public password: string;

  /**
   * Validate the user email.
   */
  public isValidEmail(): boolean {
    return validate(this.email);
  }
}
