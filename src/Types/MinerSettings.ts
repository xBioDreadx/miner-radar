export  class  MinerSettings{
  public enableAlert:boolean = true;
  public enableTemperatureAlert:boolean = true;
  public overheatTemperature:number = 100;
  public enableSpeedEthAlert:boolean = true;
  public minimumEthSpeed:number = 1;
  public enableSpeedDcrAlert:boolean = true;
  public minimumDcrSpeed:number = 1;

  constructor(enableAlert: boolean, enableTemperatureAlert: boolean, overheatTemperature: number, enableSpeedEthAlert: boolean, minimumEthSpeed: number, enableSpeedDcrAlert: boolean, minimumDcrSpeed: number) {
    this.enableAlert = enableAlert;
    this.enableTemperatureAlert = enableTemperatureAlert;
    this.overheatTemperature = overheatTemperature;
    this.enableSpeedEthAlert = enableSpeedEthAlert;
    this.minimumEthSpeed = minimumEthSpeed;
    this.enableSpeedDcrAlert = enableSpeedDcrAlert;
    this.minimumDcrSpeed = minimumDcrSpeed;
  }
}
