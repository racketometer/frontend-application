import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { AuthGuard } from "../auth-guard.service";

const loginRoutes: Routes = [
  { path: "login", component: LoginComponent },
];
export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);