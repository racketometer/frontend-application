import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { startedSessionsRouting } from "./started-sessions.routing";
import { StartedSessionsComponent } from "./started-sessions.component";

@NgModule({
  imports: [
    NativeScriptModule,
    startedSessionsRouting,
  ],
  declarations: [
    StartedSessionsComponent,
  ],
})
export class StartedSessionsModule { }
