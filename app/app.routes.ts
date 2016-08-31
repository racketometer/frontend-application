import { RouterConfig } from "@angular/router";
import { nsProvideRouter } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { OverviewComponent } from "./overview/overview.component";
import { AuthGuard } from "./auth.guard";

export const routes: RouterConfig = [
  { path: "", component: OverviewComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, { enableTracing: false }),
  AuthGuard
];
