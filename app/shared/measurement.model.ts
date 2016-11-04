export class Measurement {
  // tslint:disable:variable-name
  public _id?: number;
  public user_id: string;
  // tslint:enable:variable-name
  public date: Date;
  public uploadedBy: string;
  public data: Array<Array<number>>;
  public strokes: number;
  public strokeTypes: Array<string>;
  public maxRacketSpeed: number;
  public maxShuttlecockSpeed: number;
  public sensorNo: string;
  public racketType: string;
  public algorithmVersion: string;
}
