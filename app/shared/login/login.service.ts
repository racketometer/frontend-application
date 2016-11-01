import { Injectable } from "@angular/core";
import { Angular2Apollo } from "angular2-apollo";
import gql from "graphql-tag";

import { User, Login, PersistenceService } from "../";

@Injectable()
export class LoginService {
  private tokenKey: string = "loginToken";
  private token: string;

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  constructor(private angularApollo: Angular2Apollo, private persistence: PersistenceService) {
    persistence.read<string>(this.tokenKey)
      .then(token => this.token = token, err => console.log("LoginService.ctor(): No stored token", err));
  }

  public login(user: Login): Promise<User> {
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
        this.persistence.write(this.tokenKey, this.token)
          .catch(err => console.log("LoginService.login(): Persist token failed", err));
        return result.data.login;
      }
    }).catch((e, c) => {
      console.error("LoginService.login(): Error: ", e, c);
      return c;
    });
  }

  public logoff() {
    this.clearToken();
  }

  public resetPassword(email) {
    return Promise.resolve();
  }

  public handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }

  private clearToken(): Promise<string> {
    this.token = "";
    return this.persistence.write(this.tokenKey, "")
      .catch(err => console.log("LoginService.logoff(): Faild clear token", err));
  }
}
