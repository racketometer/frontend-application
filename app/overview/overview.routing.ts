import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OverviewComponent } from "./overview.component";
import { AuthGuard } from "../auth-guard.service";

const overviewRoutes: Routes = [
  { path: "overview", component: OverviewComponent, canActivate: [AuthGuard] },
];
export const overviewRouting: ModuleWithProviders = RouterModule.forChild(overviewRoutes);