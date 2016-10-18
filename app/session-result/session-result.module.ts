import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { sessionResultRouting } from "./session-result.routing";
import { SessionResultComponent } from "./session-result.component";

@NgModule({
  imports: [
    NativeScriptModule,
    sessionResultRouting,
  ],
  declarations: [
    SessionResultComponent,
  ],
})
export class SessionResultModule {}
