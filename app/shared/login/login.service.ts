import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Angular2Apollo } from "angular2-apollo";
import { ApolloQueryResult } from "apollo-client";
import gql from "graphql-tag";

import {
  IViewer,
  Login,
  PersistenceService,
  User,
} from "../";

@Injectable()
export class LoginService {
  public oldPassword: string;
  public user: User;
  private tokenKey: string = "loginToken";
  private token: string;

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  constructor(
    private apollo: Angular2Apollo,
    private persistence: PersistenceService,
    private router: Router,
  ) {
    persistence.read<string>(this.tokenKey)
      .then(token => this.token = token);
  }
  /**
   * Get authentication token.
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * Perform a user login.
   * @param user The user credentials.
   */
  public login(user: Login): Promise<IViewer> {
    return (this.apollo
      .query({
        query: gql`
          query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              user {
                autoGenerated
                isConsultant
                isCoach
              }
              token
            }
          }
        `,
        variables: {
          email: user.email,
          password: user.password,
        },
      }) as Promise<ApolloQueryResult>)
      .then((result) => {
        const viewer = result.data.login as IViewer;
        if (!viewer) {
          return Promise.reject<IViewer>("User not found");
        }
        this.token = viewer.token;
        this.user = viewer.user;
        this.persistence.write(this.tokenKey, this.token)
          .catch(err => this.log("login", "Persist token failed", err));

        if (viewer.user.autoGenerated) {
          this.oldPassword = user.password;
        }

        return Promise.resolve(viewer);
      });
  }

  public logoff() {
    this.clearToken();
  }

  public resetPassword(email) {
    return Promise.resolve();
  }

  /**
   * Change password for user. Uses stored user information.
   * @param newPassword The new password.
   */
  public changePassword(newPassword: string): Promise<void> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation changePassword($token: String!, $oldPassword: String!, $newPassword: String!) {
            viewer(token: $token) {
              changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
                autoGenerated
                updatedAt
              }
            }
          }
        `,
        variables: {
          token: this.token,
          oldPassword: this.oldPassword,
          newPassword,
        },
      })
      .then(() => {
        this.oldPassword = undefined;
        return this.clearToken();
      })
      .catch((error) => {
        this.oldPassword = undefined;
        return Promise.reject(error);
      });
  }

  /**
   * Clear stored token.
   */
  private clearToken(): Promise<string> {
    this.token = "";
    return this.persistence.write(this.tokenKey, "")
      .catch(err => this.log("logoff", "Failed clear token", err));
  }

  /**
   * Utility log method.
   * @param method The method logging is done frome.
   * @param message The log message.
   * @param data Any additional data to log.
   */
  private log(method: string, message: string, ...data: Array<any>): void {
    console.log(`LoginService.${method}(): ${message}`, ...data);
  }
}
