import { Injectable } from "@angular/core";
import { Angular2Apollo } from "angular2-apollo";
import { Observable } from "rxjs";
import gql from "graphql-tag";

import { ConnectivityService } from "../nativescript-services";
import { LoginService, User } from "../shared";

@Injectable()
export class UsersService {
  constructor(
    private apollo: Angular2Apollo,
    private connectivityService: ConnectivityService,
    private login: LoginService
  ) { }

  /**
   * Get users created by logged in user.
   */
  public getUsers(): Observable<Array<User>> {
    const token = this.login.getToken();
    if (!token) {
      return Observable.throw("No authentication token");
    }
    console.log("--- GET USERS ---")
    return this.apollo
      .query({
        query: gql`
          query getUsers($token: String!) {
            viewer(token: $token) {
              users {
                _id
                firstName
                lastName
                email
                allowSharing
                startedPlaying
                birthday
              }
            }
          }
        `,
        variables: {
          token,
        },
      }).catch((error, caught) => {
        console.error("UsersService.getUsers(): Error:", error);
        return caught;
      })
      .map(result => {
        return result.data.viewer.users.map((user) => {
          return new User(user);
        });
      });
  }
}
