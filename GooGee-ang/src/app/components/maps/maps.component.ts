import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import MapStyles from "./styles/mapsStyles.json";
import {LocationService} from "../../service/user/location.service";
import {SocketService} from "../../service/user/socket.service";
import {ImageService} from "../../service/system/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {logCumulativeDurations} from "@angular-devkit/build-angular/src/builders/browser-esbuild/profiling";
import {UserService} from "../../service/user/user.service";

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

  @Input("location")
  location: any;

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

  private userCircle: google.maps.Circle;

  constructor(private locationService: LocationService,
              private socketService: SocketService,
              private imageService: ImageService,
              private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  ngAfterContentInit(): void {
    this.initMap();
  }

  private updateLocation(loc: any) {
    if(this.userCircle) {
      this.userCircle.setMap(null)
    }
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
    let userInfo = this.userService.getCurrentUserInfo();
    if (userInfo) {
      let maxDistance = userInfo.appUserAdditionalInfo.maxEventDistance;

      this.userCircle = new google.maps.Circle({
        strokeColor: "#ffffff",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#017216",
        fillOpacity: 0.1,
        map: this.map,
        center: {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude
        },
        radius: maxDistance,
      });
    }
  }

  ngOnInit(): void {
    this.locationService.runLocationChecker();
  }

  initMap() {
    var $this = this;
    let loader = new Loader({
      apiKey: '',
      region: 'pl',
      version: 'weekly'
    })
    loader.load().then(() => {
        $this.map = new google.maps.Map(
          document.getElementById(`map-${this.from}`) as HTMLElement,
          {
            zoom: 8,// @ts-ignore
            styles: MapStyles.retro
          }
        )
        if ($this.templateMode) {
          $this.map.addListener("click", (mapsMouseEvent) => {
            $this.setLocationMarker(mapsMouseEvent)
          });
        }
        if (!this.templateMode) {
          this.getRoomsNearLocation();
        }

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

        this.map.setZoom(7)
        this.updateLocation({
          coords: {
            latitude: this.location ? this.location.location.x : this.defaultLat,
            longitude: this.location ? this.location.location.y : this.defaultLng,
          }
        })
      }
    )
  }

  setLocationMarker(location) {
    const point = {
      lat: location.latLng.lat(),
      lng: location.latLng.lng()
    } as google.maps.MapOptions;

    this.selectedPoint.emit(point);
  }

  getFriendsLocations() {
    this.locationService.fetchFriendsLocation().subscribe({
      next: value => {
      }
    })
  }

  getRoomsNearLocation() {
    var $this = this;
    this.locationService.fetchRoomsLocation().subscribe({
      next: (rooms: any) => {
        for (let room of rooms) {
          let roomLocation = room.geolocation.coords.location

          let icon = {
            url: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(50, 50)
          };
          this.imageService.fetchImage(room.roomOptions.roomImageKey).subscribe({
            next: value => {
              let objectURL = URL.createObjectURL(value);
              icon.url = this.sanitizer.bypassSecurityTrustUrl(objectURL).toString();
            }, complete: () => {

            }
          })
          var shape = {
            coords: [60, 0, 90, 15, 120, 60, 90, 120, 60, 180, 30, 120, 0, 60, 30, 15, 60, 0],
            type: 'poly'
          };
          const marker = new google.maps.Marker(
            {
              animation: 0,
              clickable: true,
              draggable: false,
              label: room.roomName,
              map: this.map,
              shape: shape,
              optimized: true,
              position: new google.maps.LatLng(roomLocation.x, roomLocation.y),
              title: room.roomDescription,
              visible: true
            }
          )
          $this.addListener(marker)
        }
      }
    })
  }

  addListener(marker) {
    google.maps.event.addListener(marker, 'click', function (e) {
    });
  }
}
