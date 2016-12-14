import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { usersRouting } from "./users.routing";
import { UsersComponent } from "./users.component";
import { BaseViewModule } from "../base-view";
import { UsersService } from "./users.service";

@NgModule({
  imports: [
    BaseViewModule,
    NativeScriptModule,
    usersRouting,
  ],
  declarations: [
    UsersComponent,
  ],
  providers: [
    UsersService,
  ],
})
export class UsersModule { }
