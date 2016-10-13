import { validate } from "email-validator";

export class User {
  public username: string;
  public email: string;
  public password: string;
  public key: string;
  public role: string;
  public age: number;
  public joinedAt: string;

  public isValidEmail() {
    return validate(this.email);
  }
}
