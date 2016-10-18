import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { sessionResultRouting } from "./session-result.routing";
import { SessionResultComponent } from "./session-result.component";
import { CHART_DIRECTIVES } from "nativescript-telerik-ui-pro/chart/angular";

@NgModule({
  imports: [
    NativeScriptModule,
    sessionResultRouting,
  ],
  declarations: [
    CHART_DIRECTIVES,
    SessionResultComponent,
  ],
})
export class SessionResultModule {}
