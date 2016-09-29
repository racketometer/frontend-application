import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { overviewRouting } from "./overview.routing";
import { OverviewComponent } from "./overview.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    overviewRouting
  ],
  declarations: [
    OverviewComponent
  ]
})
export class OverviewModule {}