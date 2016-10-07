import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

import { User } from "./user.model";
import { ILogin } from "./ILogin.model";

import { Angular2Apollo } from "angular2-apollo";
import gql from "graphql-tag";

const tokenKey = "token";

@Injectable()
export class LoginService {
  get isLoggedIn(): boolean {
    return !!getString(tokenKey);
  }

  private get token(): string {
    return getString(tokenKey);
  }
  private set token(theToken: string) {
    setString(tokenKey, theToken);
  }

  constructor(private angularApollo: Angular2Apollo) {
  }

  public register(user: User): Promise<User> {
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
        }
      }).then(({ data }) => {
        console.log(JSON.stringify(data));
        if (data != null) {
          return data.user;
        }
      }).catch((e, c) => {
        console.error("error", e, c);
        return c;
      });
  }

  public login(user: ILogin): Promise<User> {
    console.log("trying to log in with ", user);
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
        }
      }).then(({ data }) => {
        console.log(JSON.stringify(data));
        if (data != null) {
          this.token = "2131";
          return data.login;
        }
      }).catch((e, c) => {
        console.error("error", e, c);
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
}
