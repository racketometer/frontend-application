import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BluetoothComponent } from "./bluetooth.component";

const bluetoothRoutes: Routes = [
  { path: "bluetooth", component: BluetoothComponent },
];

export const bluetoothRouting: ModuleWithProviders = RouterModule.forChild(bluetoothRoutes);
