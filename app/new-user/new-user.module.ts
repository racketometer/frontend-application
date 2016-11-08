import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { newUserRouting } from "./new-user.routing";
import { NewUserComponent } from "./new-user.component";
import { BaseViewModule } from "../base-view";
import { NewUserService } from "./new-user.service";

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
  providers: [
    NewUserService,
  ],
})
export class NewUserModule { }
