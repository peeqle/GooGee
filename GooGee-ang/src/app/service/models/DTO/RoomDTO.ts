export interface RoomDTO {
  uuid: any;

  roomName: any;

  roomDescription: any;

  maxMembers: any;

  roomOptions: {
    createChatRoomCreate: boolean
  };

  isEvent: boolean;

  closingAt: any;

  creators: number[];

  members: number[];

  location: { coords: { latitude: number, longitude: number } };
}
