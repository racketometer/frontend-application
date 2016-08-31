import { nativeScriptBootstrap } from "nativescript-angular/application";
import { APOLLO_PROVIDERS, defaultApolloClient } from "angular2-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";

import { APP_ROUTER_PROVIDERS } from "./app.routes";
import { AppComponent } from "./app.component";
import { setStatusBarColors, LoginService } from "./shared";

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://192.168.84.1:8080/graphql'),
})

setStatusBarColors();
nativeScriptBootstrap(AppComponent, [
  LoginService,
  APOLLO_PROVIDERS,
  defaultApolloClient(client),
  APP_ROUTER_PROVIDERS
]);
