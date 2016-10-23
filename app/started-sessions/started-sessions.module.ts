import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { startedSessionsRouting } from "./started-sessions.routing";
import { StartedSessionsComponent } from "./started-sessions.component";
import { BaseViewModule } from "../base-view";

@NgModule({
  imports: [
    BaseViewModule,
    NativeScriptModule,
    startedSessionsRouting,
  ],
  declarations: [
    StartedSessionsComponent,
  ],
})
export class StartedSessionsModule { }
