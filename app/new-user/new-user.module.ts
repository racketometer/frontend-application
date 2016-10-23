import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { newUserRouting } from "./new-user.routing";
import { NewUserComponent } from "./new-user.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    newUserRouting,
  ],
  declarations: [
    NewUserComponent,
  ],
})
export class NewUserModule { }
