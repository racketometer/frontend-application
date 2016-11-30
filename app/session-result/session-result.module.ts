import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { sessionResultRouting } from "./session-result.routing";
import { SessionResultComponent } from "./session-result.component";
import { ChartDirectiveWrapper } from "../chart-directive-wrapper.module";

@NgModule({
  imports: [
    ChartDirectiveWrapper,
    NativeScriptModule,
    sessionResultRouting,
  ],
  declarations: [
    SessionResultComponent,
  ],
})
export class SessionResultModule {}
