export interface RoomDTO {
  uuid: any;

  roomName: any;

  roomDescription: any;

  maxMembers: any;

  roomOptions: {};

  isEvent: boolean;

  closingAt: any;

  creators: number[];

  members: number[];

  location: { latitude: number, longitude: number };
}
