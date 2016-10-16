import { Injectable } from "@angular/core";
import { getConnectionType } from "connectivity";

/**
 * Connection type enum.
 * Defines possible connection states based on the `connectionType` enum from NativeScript.
 * See http://docs.nativescript.org/api-reference/modules/_connectivity_.connectiontype.html.
 */
export enum ConnectionType {
  none,
  wifi,
  mobile
}

@Injectable()
export class ConnectivityService {
  /**
   * Get connection type.
   */
  public getConnectionType(): ConnectionType {
    return getConnectionType();
  }

  /**
   * Detect if device is online.
   */
  public isOnline(): boolean {
    const connectionType = this.getConnectionType();

    return connectionType === ConnectionType.mobile || connectionType === ConnectionType.wifi;
  }
}
