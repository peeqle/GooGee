import {AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
    this.getFriendsLocations();

    this.locationService.getUserLocationSub().subscribe((loc: GeolocationPosition) => {
        if (loc) {
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
              title: 'your mum',
              animation: 0.0
            })
          } else {
            this.currentUserMarker.setPosition(point);
          }
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
          this.map?.setZoom(14)

          $this.mapCenteredOnUser = true;
        }
      })
    this.initMap();
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
        lat: 0,
        lng: 0
      } as google.maps.MapOptions;

      $this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 14,// @ts-ignore
          center: point,
          styles: MapStyles.retro
        }
      )
    })
  }

  getFriendsLocations() {
    this.locationService.fetchFriendsLocation().subscribe({
      next: value => {
        console.log('value', value)
      }
    })
  }
}
