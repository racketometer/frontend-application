import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import {
  ConnectivityService,
  DialogService,
} from "./";

@NgModule({
  providers: [
    ConnectivityService,
    DialogService,
  ],
  imports: [
    NativeScriptModule,
  ],
})
export class NativeScriptServicesModule { }
