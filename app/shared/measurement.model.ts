export class Measurement {
  public _id?: number;
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
  public user_id: string;
}
