import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/platform";
import { ApolloClient, createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";
import { NativeScriptServicesModule } from "./nativescript-services";
import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

import {
  BluetoothService,
  LoginService,
  OverviewService,
  PersistenceService,
  SessionService,
  setStatusBarColors,
} from "./shared";

import { BluetoothDetailsModule } from "./bluetooth-details/bluetooth-details.module";
import { BluetoothModule } from "./bluetooth/bluetooth.module";
import { ChangePasswordModule } from "./change-password/change-password.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LoginModule } from "./login/login.module";
import { NewUserModule } from "./new-user/new-user.module";
import { SessionResultModule } from "./session-result/session-result.module";
import { StartedSessionsModule } from "./started-sessions/started-sessions.module";

declare var process: any;
const IP = process.env.IP;

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `http://${IP}:8080/graphql`,
  }),
});

setStatusBarColors();

@NgModule({
  providers: [
    authProviders,
    BluetoothService,
    LoginService,
    OverviewService,
    PersistenceService,
    SessionService,
  ],
  imports: [
    ApolloModule.withClient(client),
    BluetoothDetailsModule,
    BluetoothModule,
    ChangePasswordModule,
    DashboardModule,
    LoginModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    NativeScriptServicesModule,
    NewUserModule,
    SessionResultModule,
    StartedSessionsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
