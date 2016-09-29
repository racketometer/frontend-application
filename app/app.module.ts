import { 
  platformNativeScriptDynamic, 
  NativeScriptModule 
} from "nativescript-angular/platform";

import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { APOLLO_PROVIDERS, defaultApolloClient } from "angular2-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";

import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

import { 
  setStatusBarColors, 
  LoginService, 
  OverviewService
} from "./shared";

import { LoginModule } from "./login/Login.module";
import { OverviewModule } from "./overview/overview.module";

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://192.168.84.1:8080/graphql'),
})

setStatusBarColors();

@NgModule({
  providers: [
    LoginService,
    OverviewService,
    authProviders,
    APOLLO_PROVIDERS,
    defaultApolloClient(client),
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    OverviewModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
