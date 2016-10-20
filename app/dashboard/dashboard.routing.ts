import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../auth-guard.service";

const dashboardRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
];
export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
