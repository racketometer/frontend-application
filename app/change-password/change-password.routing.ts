import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChangePasswordComponent } from "./change-password.component";
import { AuthGuard } from "../auth-guard.service";

const changePasswordRoutes: Routes = [
  { path: "changePassword", component: ChangePasswordComponent, canActivate: [AuthGuard] },
];
export const changePasswordRouting: ModuleWithProviders = RouterModule.forChild(changePasswordRoutes);
