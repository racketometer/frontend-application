import { 
  platformNativeScriptDynamic, 
  NativeScriptModule 
} from "nativescript-angular/platform";

import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'angular2-apollo';

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
  networkInterface: createNetworkInterface('http://178.157.248.151:8080/graphql'),
})

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
    ApolloModule.withClient(client)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
