import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

import { Angular2Apollo } from "angular2-apollo";
import gql from "graphql-tag";

@Injectable()
export class OverviewService {

  constructor(private angularApollo: Angular2Apollo) {
  }

}
