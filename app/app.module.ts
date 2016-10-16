import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/platform";

import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";

import { NativeScriptServicesModule } from "./nativescript-services";

import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

import {
  setStatusBarColors,
  LoginService,
  OverviewService,
  UserService,
} from "./shared";

import { LoginModule } from "./login/Login.module";
import { NewUserModule } from "./new-user/new-user.module";
import { OverviewModule } from "./overview/overview.module";
import { BluetoothModule } from "./bluetooth/bluetooth.module";

declare var process: any;
const IP = process.env.IP;

const client = new ApolloClient({
  networkInterface: createNetworkInterface(`http://${IP}:8080/graphql`),
});

setStatusBarColors();

@NgModule({
  providers: [
    LoginService,
    OverviewService,
    authProviders,
    UserService,
  ],
  imports: [
    ApolloModule.withClient(client),
    BluetoothModule,
    LoginModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    NativeScriptServicesModule,
    NewUserModule,
    OverviewModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
