export interface RoomDTO {
  uuid: any;

  roomName: any;

  roomDescription: any;

  maxMembers: any;

  roomOptions: {
    createChatRoomCreate: boolean,
    roomImageKey: string
  };

  isEvent: boolean;

  closingAt: any;

  creators: number[];

  members: number[];

  geolocation: {
    coords: {
      location: any
    }
  }
}
