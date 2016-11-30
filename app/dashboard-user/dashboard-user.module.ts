import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { dashboardRouting } from "./dashboard-user.routing";
import { DashboardUserComponent } from "./dashboard-user.component";
import { BaseViewModule } from "../base-view";
import { TileComponent } from "./tile/tile.component";
import { ChartDirectiveWrapper } from "../chart-directive-wrapper.module";


@NgModule({
  imports: [
    BaseViewModule,
    ChartDirectiveWrapper,
    NativeScriptModule,
    NativeScriptFormsModule,
    dashboardRouting,
  ],
  declarations: [
    DashboardUserComponent,
    TileComponent,
  ],
})
export class DashboardUserModule { }
