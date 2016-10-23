import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TabsComponent } from "./";
import { TabComponent } from "./tab";

@NgModule({
  imports: [
    NativeScriptRouterModule,
  ],
  exports: [
    TabComponent,
    TabsComponent,
  ],
  declarations: [
    TabComponent,
    TabsComponent,
  ],
})
export class TabsModule { }
