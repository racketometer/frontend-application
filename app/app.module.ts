import { NativeScriptModule } from "nativescript-angular/platform";

import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";

import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

import {
  setStatusBarColors,
  LoginService,
  OverviewService,
} from "./shared";

import { LoginModule } from "./login/Login.module";
import { OverviewModule } from "./overview/overview.module";
import { BluetoothModule } from "./bluetooth/bluetooth.module";

const client = new ApolloClient({
  networkInterface: createNetworkInterface("http://192.168.1.46:8080/graphql"),
});

setStatusBarColors();

@NgModule({
  providers: [
    LoginService,
    OverviewService,
    authProviders,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    OverviewModule,
    BluetoothModule,
    ApolloModule.withClient(client),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
