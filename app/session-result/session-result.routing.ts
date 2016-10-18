import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SessionResultComponent } from "./session-result.component";

const sessionResultRoutes: Routes = [
  { path: "bluetooth", component: SessionResultComponent },
];

export const sessionResultRouting: ModuleWithProviders = RouterModule.forChild(sessionResultRoutes);
