import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { bluetoothDetailsRouting } from "./bluetooth-details.routing";
import { BluetoothDetailsComponent } from "./bluetooth-details.component";

@NgModule({
  imports: [
    NativeScriptModule,
    bluetoothDetailsRouting
  ],
  declarations: [
    BluetoothDetailsComponent
  ]
})
export class BluetoothDetailsModule {}
