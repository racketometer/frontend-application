import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { bluetoothDetailsRouting } from "./bluetooth-details.routing";
import { BluetoothDetailsComponent } from "./bluetooth-details.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    bluetoothDetailsRouting,
    NativeScriptModule,
  ],
  declarations: [
    BluetoothDetailsComponent,
  ],
})
export class BluetoothDetailsModule {}
