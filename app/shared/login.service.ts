import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

import {
  User,
  ILogin,
} from "./";

import { Angular2Apollo } from "angular2-apollo";
import gql from "graphql-tag";

const tokenKey = "token";

@Injectable()
export class LoginService {
  get isLoggedIn(): boolean {
    return !!getString(tokenKey);
  }

  constructor(private angularApollo: Angular2Apollo) {
  }

  public register(user: User): Promise<User> {
    console.log(`LoginService.register(): Email: '${user.email}' Pass: '${user.password}'`);

    return this.angularApollo.mutate({
      mutation: gql`
          mutation createUser($email: String!, $password: String!) {
            createUser(email: $email, password: $password) {
              age
              joinedAt
            }
          }
        `,
      variables: {
        email: user.email,
        password: user.password,
      },
    }).then((result) => {
      console.log("LoginService.register(): Success: ", JSON.stringify(result));
      if (result.data != null) {
        return result.data.user;
      }
    }).catch((e, c) => {
      console.error("LoginService.register(): Error: ", e, c);
      return c;
    });
  }

  public login(user: ILogin): Promise<User> {
    console.log(`LoginService.login(): Email: '${user.email}' Pass: '${user.password}'`);

    return this.angularApollo.query({
      query: gql`
          query getLogin($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              displayName
            }
          }
        `,
      variables: {
        email: user.email,
        password: user.password,
      },
    }).then((result) => {
      console.log("LoginService.login(): Success: ", JSON.stringify(result));
      if (result.data != null) {
        this.token = "2131";
        return result.data.login;
      }
    }).catch((e, c) => {
      console.error("LoginService.login(): Error: ", e, c);
      return c;
    });
  }

  public logoff() {
    this.token = "";
  }

  public resetPassword(email) {
    return Promise.resolve();
  }

  public handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }

  private get token(): string {
    return getString(tokenKey);
  }
  private set token(theToken: string) {
    setString(tokenKey, theToken);
  }
}
