export class Miner
{
  private _minerId:String;
  private _minerName:String;
  private _temp:[{
    gpuTemperature:Number,
    fanSpeed:Number
  }];
  private _ethereum:{
    speed:String,
    acceptedShares:Number,
    rejectedShares:Number,
    incorrect:Number,
    ratio:Number
  };
  private _decret:{
    speed:String,
    acceptedShares:Number,
    rejectedShares:Number,
    incorrect:Number,
    ratio:Number
  };
  private _uptime:String;
  private _pool:String;
  private _failover:Number;
  private _version:String;
  private _comments:String;


  constructor(minerId: String, minerName: String, temp: [{ gpuTemperature: Number; fanSpeed: Number }], uptime: String, ethereum: { speed: String; acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number }, decret: { speed: String; acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number }, pool: String, failover: Number, version: String, comments: String) {
    this._minerId = minerId;
    this._minerName = minerName;
    this._temp = temp;
    this._uptime = uptime;
    this._ethereum = ethereum;
    this._decret = decret;
    this._pool = pool;
    this._failover = failover;
    this._version = version;
    this._comments = comments;
  }

  get minerId(): String {
    return this._minerId;
  }

  set minerId(value: String) {
    this._minerId = value;
  }

  get minerName(): String {
    return this._minerName;
  }

  set minerName(value: String) {
    this._minerName = value;
  }


  get temp(): [{ gpuTemperature: Number; fanSpeed: Number }] {
    return this._temp;
  }

  set temp(value: [{ gpuTemperature: Number; fanSpeed: Number }]) {
    this._temp = value;
  }

  get uptime(): String {
    return this._uptime;
  }

  set uptime(value: String) {
    this._uptime = value;
  }

  get ethereum(): {  speed:String,acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number } {
    return this._ethereum;
  }

  set ethereum(value: {  speed:String,acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number }) {
    this._ethereum = value;
  }

  get decret(): {  speed:String,acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number } {
    return this._decret;
  }

  set decret(value: {  speed:String,acceptedShares: Number; rejectedShares: Number; incorrect: Number; ratio: Number }) {
    this._decret = value;
  }

  get pool(): String {
    return this._pool;
  }

  set pool(value: String) {
    this._pool = value;
  }

  get failover(): Number {
    return this._failover;
  }

  set failover(value: Number) {
    this._failover = value;
  }

  get version(): String {
    return this._version;
  }

  set version(value: String) {
    this._version = value;
  }

  get comments(): String {
    return this._comments;
  }

  set comments(value: String) {
    this._comments = value;
  }
}
