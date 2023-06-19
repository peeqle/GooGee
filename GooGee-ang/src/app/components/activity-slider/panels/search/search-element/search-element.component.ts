import {AfterContentInit, Component, EventEmitter, Input, Output, ViewChild, ViewRef} from '@angular/core';
import {ImageService} from "../../../../../service/system/image.service";
import {UserService} from "../../../../../service/user/user.service";
import {RoomService} from "../../../../../service/user/room.service";
import {RoomDTO} from "../../../../../service/models/DTO/RoomDTO";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.css']
})
export class SearchElementComponent implements AfterContentInit {
  @ViewChild("joinButton")
  joinButton: any;

  @Input("searchElement")
  searchElement: any;

  @Output("addElement")
  elementEmitter: EventEmitter<any> = new EventEmitter<any>();

  searchImageSrc: any;

  entity: {
    id: any,
    name: any,
    type: any,
    imageKey: undefined
  } = {
    id: undefined,
    name: undefined,
    type: undefined,
    imageKey: undefined
  }

  canAdd: boolean = false;

  constructor(private imageService: ImageService,
              private userService: UserService,
              private roomService: RoomService,
              private sanitizer: DomSanitizer) {
  }

  ngAfterContentInit(): void {
    let user = this.userService.getCurrentUserInfo();
    let userId = user.id;
    if (this.searchElement) {
      switch (this.searchElement.elementType) {
        case "USER":
          this.userService.fetchUserInfo(this.searchElement.refId).subscribe({
            next: value => {
              this.entity.id = value.id;
              this.getImageSrc(value.imageKey)
              this.canAdd = true;
            }
          })
          break;
        case "ROOM":
          this.roomService.fetchRoomById(this.searchElement.refId).subscribe({
            next: (value: RoomDTO) => {
              this.entity.id = value.uuid
              this.getImageSrc(value.roomOptions.roomImageKey)
              if (!value.creators.includes(userId) && !value.members.includes(userId)) {
                this.canAdd = true;
              }
            }
          })
          break;
        default:
          break;
      }
      this.entity.type = this.searchElement.elementType;
    }
  }

  getImageSrc(roomImageKey: any) {
    if (roomImageKey) {
      this.imageService.fetchImage(roomImageKey).subscribe({
        next: value => {
          let objectURL = URL.createObjectURL(value);
          this.searchImageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      })
    }
  }

  addElement() {
    this.elementEmitter.emit(this.entity)
    this.joinButton.nativeElement.parentNode.removeChild(this.joinButton.nativeElement);
  }
}
