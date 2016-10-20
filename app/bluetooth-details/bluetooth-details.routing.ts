import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BluetoothDetailsComponent } from "./bluetooth-details.component";

const bluetoothDetailsRoutes: Routes = [
  { path: "bluetoothDetails", component: BluetoothDetailsComponent },
];
export const bluetoothDetailsRouting: ModuleWithProviders = RouterModule.forChild(bluetoothDetailsRoutes);
