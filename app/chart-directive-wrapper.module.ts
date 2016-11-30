import { NgModule } from "@angular/core";
import { CHART_DIRECTIVES } from "nativescript-telerik-ui-pro/chart/angular";

@NgModule({
  exports: [
    CHART_DIRECTIVES,
  ],
  declarations: [
    CHART_DIRECTIVES,
  ],
})
export class ChartDirectiveWrapper { }
