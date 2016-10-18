import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StartedSessionsComponent } from "./started-sessions.component";

const loginRoutes: Routes = [
  { path: "startedSessions", component: StartedSessionsComponent },
];
export const startedSessionsRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
