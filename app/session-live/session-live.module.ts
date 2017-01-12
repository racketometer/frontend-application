import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { sessionLiveRouting } from "./session-live.routing";
import { SessionLiveComponent } from "./session-live.component";
import { BaseViewModule } from "../base-view";
import { TileComponent } from "./tile/tile.component";
import { ChartDirectiveWrapper } from "../chart-directive-wrapper.module";

@NgModule({
  imports: [
    BaseViewModule,
    ChartDirectiveWrapper,
    NativeScriptModule,
    NativeScriptFormsModule,
    sessionLiveRouting,
  ],
  declarations: [
    SessionLiveComponent,
    TileComponent,
  ],
})
export class SessionLiveModule { }
