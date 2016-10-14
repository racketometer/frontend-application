import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NewUserComponent } from "./new-user.component";

const loginRoutes: Routes = [
  { path: "newUser", component: NewUserComponent },
];
export const newUserRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
