import { Injectable } from "@angular/core";
import { Angular2Apollo } from "angular2-apollo";
import { Observable } from "rxjs";
import gql from "graphql-tag";

import { ConnectivityService } from "../nativescript-services";
import { LoginService, User } from "../shared";

@Injectable()
export class NewUserService {
  constructor(
    private apollo: Angular2Apollo,
    private connectivityService: ConnectivityService,
    private login: LoginService
  ) { }

  /**
   * Create new user with type player.
   * @param user The user.
   */
  public newUser(user: User): Observable<User> {
    const token = this.login.getToken();
    if (!token) {
      return Observable.throw("No authentication token");
    }

    if (!this.connectivityService.isOnline()) {
      this.storeForLaterPush(user);
      return Observable.from([user]);
    }
    return this.apollo
      .mutate({
        mutation: gql`
          mutation newUser($token: String!, $user: AutoUser!) {
            viewer(token: $token) {
              createAutoUser(user: $user) {
                _id
              }
            }
          }
        `,
        variables: {
          token,
          user,
        },
      }).map(result => {
        return result.data as User;
      }).catch((error, caught) => {
        console.error("UserService.newUser(): Error:", error);
        return caught;
      });
  }

  /**
   * Store user for later push to backend.
   * @param user The user.
   */
  private storeForLaterPush(user: User): void {
    console.log("Storing user for later push to backend");
  }
}
