import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { changePasswordRouting } from "./change-password.routing";
import { ChangePasswordComponent } from "./change-password.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    changePasswordRouting,
    NativeScriptFormsModule,
    NativeScriptModule,
  ],
  declarations: [
    ChangePasswordComponent,
  ],
})
export class ChangePasswordModule {}
