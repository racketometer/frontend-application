import { Component, Input } from "@angular/core";

@Component({
  selector: "rom-tile",
  templateUrl: "dashboard/tile/tile.component.html",
  styleUrls: ["dashboard/tile/tile-common.css"],
})
export class TileComponent {
  @Input() private text: string;
  @Input() private value: string;
}
