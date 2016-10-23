import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { dashboardRouting } from "./dashboard.routing";
import { DashboardComponent } from "./dashboard.component";
import { BaseViewModule } from "../base-view";
import { TileComponent } from "./tile/tile.component";

@NgModule({
  imports: [
    BaseViewModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    dashboardRouting,
  ],
  declarations: [
    DashboardComponent,
    TileComponent,
  ],
})
export class DashboardModule { }
