import { NgModule } from "@angular/core";
import { BaseViewComponent } from "./base-view.component";
import { TabsModule } from "./tabs";

@NgModule({
  exports: [
    BaseViewComponent,
  ],
  imports: [
    TabsModule,
  ],
  declarations: [
    BaseViewComponent,
  ],
})
export class BaseViewModule { }
