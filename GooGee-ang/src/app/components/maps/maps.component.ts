import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import MapStyles from "./styles/mapsStyles.json";
import {LocationService} from "../../service/user/location.service";
import {SocketService} from "../../service/user/socket.service";
import {ImageService} from "../../service/system/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterContentInit {

  @Input("templateMode")
  templateMode: boolean = false

  @Input("from")
  from: string = "";

  @Input("title")
  title: string = "title"

  @Output("selectedPoint")
  selectedPoint: EventEmitter<any> = new EventEmitter<any>();

  defaultLat = 52;
  defaultLng = 22;

  currentGeoPosition: any;

  marker = {
    position: {lat: this.defaultLat, lng: this.defaultLng},
  }

  map: google.maps.Map | undefined = undefined;

  private currentUserMarker: any;

  private mapCenteredOnUser: boolean = false;

  private roomsFetched: boolean = false;

  private lastCoords = {};

  constructor(private locationService: LocationService,
              private socketService: SocketService,
              private imageService: ImageService,
              private sanitizer: DomSanitizer) {
  }

  ngAfterContentInit(): void {
    var $this = this;
    this.initMap();
    if (!this.templateMode) {
      this.getFriendsLocations();
      this.locationService.getUserLocationSub().subscribe((loc: GeolocationPosition) => {
          if (loc) {
            this.lastCoords = loc.coords;
            $this.updateLocation(loc);
            $this.socketService.updateUserLocation(loc);
          }
        }, () => {
        },
        () => {
          if (!$this.mapCenteredOnUser) {
            $this.map.setCenter({
              lat: $this.currentGeoPosition.coords.latitude,
              lng: $this.currentGeoPosition.coords.longitude
            })
            $this.mapCenteredOnUser = true;
          }
        })
    }

    this.map.setZoom(4)
    this.updateLocation({
      coords: {
        latitude: this.defaultLat,
        longitude: this.defaultLng
      }
    })
  }

  private updateLocation(loc: any) {
    const point = {
      lat: loc.coords.latitude,
      lng: loc.coords.longitude
    } as google.maps.MapOptions;

    if (this.currentUserMarker === undefined) {
      this.map.setCenter({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      })
      this.currentUserMarker = new google.maps.Marker({// @ts-ignore
        position: point,
        map: this.map,
        title: this.title,
        animation: 0.0
      })
    } else {
      this.currentUserMarker.setPosition(point);
    }
  }

  ngOnInit(): void {
    this.locationService.runLocationChecker();
  }

  initMap() {
    var $this = this;
    let loader = new Loader({
      apiKey: 'AIzaSyD2TltWC2XmblzIuBUydKxBRUob39cPKiw',
      region: 'pl',
      version: 'weekly'
    })
    loader.load().then(() => {
      const point = {
        lat: this.defaultLat,
        lng: this.defaultLng
      } as google.maps.MapOptions;

      $this.map = new google.maps.Map(
        document.getElementById(`map-${this.from}`) as HTMLElement,
        {
          zoom: 14,// @ts-ignore
          center: point,
          styles: MapStyles.retro
        }
      )
      if ($this.templateMode) {
        $this.map.addListener("click", (mapsMouseEvent) => {
          $this.setLocationMarker(mapsMouseEvent)
        });
      }
      if(!this.templateMode) {
        this.getRoomsNearLocation();
      }
    })
  }

  setLocationMarker(location) {
    console.log('lcoation', location)
    const point = {
      lat: location.latLng.lat(),
      lng: location.latLng.lng()
    } as google.maps.MapOptions;

    this.selectedPoint.emit(point);
  }

  getFriendsLocations() {
    this.locationService.fetchFriendsLocation().subscribe({
      next: value => {
        console.log('vale', value)
      }
    })
  }

  getRoomsNearLocation() {
    this.locationService.fetchRoomsLocation().subscribe({
      next: (rooms: any) => {
        console.log('vale', rooms)

        for (let room of rooms) {
          console.log('room name', room)
          let roomLocation = room.location.coords

          let icon = {
            url: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(50, 50)
          };
          this.imageService.fetchImage(room.roomOptions.roomImageKey).subscribe({
            next: value => {
              let objectURL = URL.createObjectURL(value);
              icon.url = this.sanitizer.bypassSecurityTrustUrl(objectURL).toString();
            },complete: () => {

            }
          })
          var shape = {
            coords: [60,0, 90,15, 120,60, 90,120, 60, 180, 30,120, 0,60, 30,15, 60,0],
            type: 'poly'
          };
          let marker = new google.maps.Marker(
            {
              animation: 0,
              clickable: true,
              collisionBehavior: null,
              draggable: false,
              label: room.roomName,
              map: this.map,
              icon: icon,
              shape: shape,
              optimized: false,
              position: new google.maps.LatLng(roomLocation.latitude, roomLocation.longitude),
              title: room.roomDescription,
              visible: true
            }
          )
        }
      }
    })
  }
}
