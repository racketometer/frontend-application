import { expect } from "chai";
import { User } from "../../shared/user.model";

describe("UserModel", () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  describe("isValidEmail()", () => {
    it("should reject an empty email address", () => {
      user.email = "";
      expect(user.isValidEmail()).to.be.false;
    });

    it("should reject a malformed email addresses", () => {
      user.email = "nativescript";
      expect(user.isValidEmail()).to.be.false;

      user.email = "nativescript@";
      expect(user.isValidEmail()).to.be.false;

      user.email = "nativescript@isawesome";
      expect(user.isValidEmail()).to.be.false;
    });

    it("should accept valid email addresses", () => {
      user.email = "nativescript@isawesome.com";
      expect(user.isValidEmail()).to.be.true;
    });
  });

  describe("isValid()", () => {
    beforeEach(() => {
      user.firstName = "John";
      user.lastName = "Doe";
      user.email = "john@doe.com";
      user.birthday = new Date("2016-11-26");
    });

    it("should return true if fields are valid", () => {
      expect(user.isValid()).to.be.true;
    });

    it("should require first name", () => {
      user.firstName = undefined;

      expect(user.isValid()).to.be.false;
    });

    it("should require last name", () => {
      user.lastName = undefined;

      expect(user.isValid()).to.be.false;
    });

    it("should require email", () => {
      user.email = undefined;

      expect(user.isValid()).to.be.false;
    });

    it("should require birthday", () => {
      user.birthday = undefined;

      expect(user.isValid()).to.be.false;
    });
  });

  describe("name()", () => {
    it("should return display name if available", () => {
      const name = "TestName";
      user.displayName = name;

      expect(user.name).to.be.eq(name);
    });

    it("should return first and last name if no display name", () => {
      const firstName = "John";
      const lastName = "Doe";
      user.firstName = firstName;
      user.lastName = lastName;

      expect(user.name).to.be.eq(`${firstName} ${lastName}`);
    });
  });
});
