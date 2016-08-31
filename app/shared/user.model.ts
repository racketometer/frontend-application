const validator = require("email-validator");

export class User {
  username: string;
  email: string;
  password: string;
  key: string;
  role: string;
  age: number;
  joinedAt: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}