import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BluetoothDetailsComponent } from "./bluetooth-details.component";
import { AuthGuard } from "../auth-guard.service";

const bluetoothDetailsRoutes: Routes = [
  { path: "bluetoothDetails", component: BluetoothDetailsComponent },
];
export const bluetoothDetailsRouting: ModuleWithProviders = RouterModule.forChild(bluetoothDetailsRoutes);
