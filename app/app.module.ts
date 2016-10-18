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
  BluetoothService,
  UserService,
} from "./shared";

import { LoginModule } from "./login/Login.module";
import { NewUserModule } from "./new-user/new-user.module";
import { OverviewModule } from "./overview/overview.module";
import { BluetoothModule } from "./bluetooth/bluetooth.module";
import { BluetoothDetailsModule } from "./bluetooth-details/bluetooth-details.module";

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
    BluetoothService,
    authProviders,
    UserService,
  ],
  imports: [
    LoginModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    NativeScriptServicesModule,
    NewUserModule,
    OverviewModule,
    BluetoothModule,
    BluetoothDetailsModule,
    ApolloModule.withClient(client),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
