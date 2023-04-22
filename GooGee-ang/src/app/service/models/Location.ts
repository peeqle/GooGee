export class Location {
  private lngPosition: number = 52;

  private latPosition: number = 22;

  constructor(lngPosition: number, latPosition: number) {
    this.latPosition = latPosition;

    this.lngPosition = lngPosition;
  }

  setLocation(lngPosition: number, latPosition: number) {
    this.latPosition = latPosition;

    this.lngPosition = lngPosition;
  }

  setLongitude(lngPosition:number){
    this.lngPosition = lngPosition;
  }

  setLatitude(latPosition:number){
    this.latPosition = latPosition;
  }

  getLongitude(){
    return this.lngPosition;
  }

  getLatitude(){
    return this.latPosition;
  }
}
