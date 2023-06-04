import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import MapStyles from "./styles/mapsStyles.json";
import {LocationService} from "../../service/user/location.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SocketService} from "../../service/user/socket.service";

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

  defaultLat = 52;
  defaultLng = 22;

  currentGeoPosition: any;

  marker = {
    position: {lat: this.defaultLat, lng: this.defaultLng},
  }

  map: google.maps.Map | undefined = undefined;

  private currentUserMarker: any;

  private mapCenteredOnUser: boolean = false;

  constructor(private locationService: LocationService, private socketService: SocketService) {
  }

  ngAfterContentInit(): void {
    var $this = this;
    this.initMap();
    if (!this.templateMode) {
      this.getFriendsLocations();
      this.locationService.getUserLocationSub().subscribe((loc: GeolocationPosition) => {
          if (loc) {
            this.updateLocation(loc);
            this.socketService.updateUserLocation(loc);
          }
        }, () => {
        },
        () => {
          if (!this.mapCenteredOnUser) {
            this.map?.setCenter({
              lat: this.currentGeoPosition?.coords.latitude,
              lng: this.currentGeoPosition?.coords.longitude
            })
            $this.mapCenteredOnUser = true;
          }
        })
    }

    this.map?.setZoom(4)
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
      this.map?.setCenter({
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
          console.log('maps mouse event', mapsMouseEvent)
          $this.setLocationMarker(mapsMouseEvent)
        });
      }
    })
  }

  setLocationMarker(location) {
    console.log('location va', location.Va.x)
    const point = {
      lat: location.Va.x,
      lng: location.Va.y
    } as google.maps.MapOptions;

    console.log('point set', point)

    console.log('this ,maps', this.map)
    new google.maps.Marker({
      // @ts-ignore
      position: point,
      map: this.map,
      title: this.title,
      animation: 0.0
    })
  }

  getFriendsLocations() {
    this.locationService.fetchFriendsLocation().subscribe({
      next: value => {
      }
    })
  }
}
