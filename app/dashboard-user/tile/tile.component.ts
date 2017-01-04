import { Component, Input } from "@angular/core";

@Component({
  selector: "rom-tile",
  templateUrl: "dashboard-user/tile/tile.component.html",
  styleUrls: ["dashboard-user/tile/tile-common.css"],
})
export class TileComponent {
  @Input() public text: string;
  @Input() public value: string;
}
