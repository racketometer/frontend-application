import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/platform";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";
import { NativeScriptServicesModule } from "./nativescript-services";
import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

import {
  LoginService,
  OverviewService,
  BluetoothService,
  SessionService,
  setStatusBarColors,
  UserService,
} from "./shared";

import { LoginModule } from "./login/Login.module";
import { NewUserModule } from "./new-user/new-user.module";
import { OverviewModule } from "./overview/overview.module";
import { BluetoothModule } from "./bluetooth/bluetooth.module";
import { BluetoothDetailsModule } from "./bluetooth-details/bluetooth-details.module";
import { SessionResultModule } from "./session-result/session-result.module";
import { StartedSessionsModule } from "./started-sessions/started-sessions.module";

declare var process: any;
const IP = process.env.IP;

const client = new ApolloClient({
  networkInterface: createNetworkInterface(`http://${IP}:8080/graphql`),
});

setStatusBarColors();

@NgModule({
  providers: [
    authProviders,
    LoginService,
    OverviewService,
    BluetoothService,
    authProviders,
    SessionService,
    UserService,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    NativeScriptServicesModule,
    ApolloModule.withClient(client),
    LoginModule,
    NewUserModule,
    OverviewModule,
    BluetoothModule,
    BluetoothDetailsModule,
    SessionResultModule,
    StartedSessionsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
