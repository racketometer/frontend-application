import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { bluetoothRouting } from "./bluetooth.routing";
import { BluetoothComponent } from "./bluetooth.component";

@NgModule({
  imports: [
    NativeScriptModule,
    bluetoothRouting
  ],
  declarations: [
    BluetoothComponent
  ]
})
export class BluetoothModule {}