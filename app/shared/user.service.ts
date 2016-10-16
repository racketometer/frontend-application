import { Injectable } from "@angular/core";
import { Angular2Apollo } from "angular2-apollo";
import gql from "graphql-tag";

import { ConnectivityService }from "../nativescript-services";
import { User } from "./";

@Injectable()
export class UserService {
  private createUserQuery = gql`
    mutation newUser($user: AutoUser!) {
      createAutoUser(user: $user) {
        _id
      }
    }
  `;

  constructor(
    private apollo: Angular2Apollo,
    private connectivityService: ConnectivityService
  ) { }

  /**
   * Create new user with type player.
   * @param user The user.
   */
  public newUser(user: User): Promise<User> {
    if (!this.connectivityService.isOnline()) {
      this.storeForLaterPush(user);
      return Promise.resolve(user);
    }

    return this.apollo
      .mutate({
        mutation: this.createUserQuery,
        variables: {
          user,
        },
      })
      .catch((error) => {
        console.error("UserService.newUser(): Error:", error);
        return Promise.reject(error);
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
