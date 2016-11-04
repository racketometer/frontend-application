import { Component, Input } from "@angular/core";

@Component({
  selector: "rom-tile",
  templateUrl: "dashboard/tile/tile.component.html",
  styleUrls: ["dashboard/tile/tile-common.css"],
})
export class TileComponent {
  @Input() public text: string;
  @Input() public value: string;
}
