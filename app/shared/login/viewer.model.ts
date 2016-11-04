import { Measurement, User } from "../";

/**
 * Query viewer.
 */
export interface IViewer {
  /**
   * The authenticated users id.
   */
  _id?: string;

  /**
   * The authentication token.
   */
  token?: string;

  /**
   * The authenticated user
   */
  user?: User;

  /**
   * A users measurements. Can be the authenticated users or a specific users.
   */
  measurements?: Array<Measurement>;
}
