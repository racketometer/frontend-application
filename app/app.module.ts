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
import { DashboardUserModule } from "./dashboard-user/dashboard-user.module";
import { LoginModule } from "./login/login.module";
import { NewUserModule } from "./new-user/new-user.module";
import { SessionResultModule } from "./session-result/session-result.module";
import { StartedSessionsModule } from "./started-sessions/started-sessions.module";

declare var process: any;
const BACKEND_URL = process.env.ROM_BACKEND_IP;

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: BACKEND_URL,
  }),
});

setStatusBarColors();

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    ApolloModule.withClient(client),
    BluetoothDetailsModule,
    BluetoothModule,
    ChangePasswordModule,
    DashboardModule,
    DashboardUserModule,
    LoginModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    NativeScriptServicesModule,
    NewUserModule,
    SessionResultModule,
    StartedSessionsModule,
  ],
  providers: [
    authProviders,
    BluetoothService,
    LoginService,
    OverviewService,
    PersistenceService,
    SessionService,
  ],
})
export class AppModule { }
