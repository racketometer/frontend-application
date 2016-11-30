import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardUserComponent } from "./dashboard-user.component";
import { AuthGuard } from "../auth-guard.service";

const dashboardRoutes: Routes = [
  { path: "dashboard-user", component: DashboardUserComponent, canActivate: [AuthGuard] },
];
export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
