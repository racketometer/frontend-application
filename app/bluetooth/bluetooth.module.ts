import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { bluetoothRouting } from "./bluetooth.routing";
import { BluetoothComponent } from "./bluetooth.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    bluetoothRouting,
    NativeScriptModule,
  ],
  declarations: [
    BluetoothComponent,
  ],
})
export class BluetoothModule {}
