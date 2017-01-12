import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SessionLiveComponent } from "./session-live.component";
import { AuthGuard } from "../auth-guard.service";

const sessionLiveRoutes: Routes = [
  { path: "session-live", component: SessionLiveComponent, canActivate: [AuthGuard] },
];
export const sessionLiveRouting: ModuleWithProviders = RouterModule.forChild(sessionLiveRoutes);
