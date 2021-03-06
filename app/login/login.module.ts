import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { loginRouting } from "./login.routing";
import { LoginComponent } from "./login.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    loginRouting,
    NativeScriptFormsModule,
    NativeScriptModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {}
