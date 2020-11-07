//import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapsService } from './maps.service';
import { Marker } from './models/marker.model';
import { Location } from './models/location.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Courier web map';
  lat;
  lng;
  coordinates;
  markerLocations = [];
  location: Location;
  savedLocations: Array<Location> = [];
  selectedMarker: Marker;
  readonly rootURL = 'https://map-web-app-294820.firebaseio.com/savedLocations.json';

  aah = title;

  constructor(private map: MapsService, private http: HttpClient) { }

  ngOnInit() {
    //this.setCurrentPosition();    //Vres aut;omata tin topothesia

    this.location = {
      latitude: 37.99999556142096,
      longitude: 23.829345470004057,
      mapType: "satelite",
      zoom: 5,
      markers: [
        {
          lat: 37.99999556142096,
          lng: 23.829345470004057,
          label: "Athens"
        }
      ]
    }

    this.onGetLocationMarkers();
  }


  // onSelectLocation(event) {
  //   this.lat = event.coords.lat;
  //   this.lng = event.coords.lng;
  //   this.markerLocations.push([this.lat, this.lng]);
  //   console.log(this.markerLocations);
  // }

  addMarker(lat: number, lng: number, label: string) {
    this.location.markers.push({
      lat,
      lng,
      label //: 'lalala' //Date.now().toLocaleString()
    })
    console.log('irthaaaaaaaaaaaaaaaaaaaa');
  }

  onUpdateLocationMarkers(label, i) {
    this.location.markers[i].label = label;
    console.log(this.location.markers[i].label);
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      label: 'hurray!'
    }
  }

  markerDragEnd(coords: any, $event: MouseEvent) {
    this.location.latitude = coords.latitude
    this.location.longitude = coords.longitude
    console.log(this.location);
  }

  // setCurrentPosition() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       const { latitude, longitude } = position
  //       this.location = {
  //         latitude,
  //         longitude,
  //         mapType: "satelite",
  //         zoom: 14,
  //         markers: [
  //           {
  //             lat: longitude,
  //             lng: latitude,
  //             //label: "My current position"
  //           }
  //         ]
  //       }
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser, please use google chrome.");
  //   }
  // }

  onPostLocationMarkers() {
    //this.location.markers['label'] = label;
    this.map.postLocationMarkers(this.location).subscribe(
      res => {
        if ((res != null) || (res != undefined)) {

        }
      },
      err => {
        console.log(err);
      }
    )
  }

  onGetLocationMarkers() {
    this.http.get(this.rootURL).pipe(map(responseData => {
      const savedLocations: Location[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          savedLocations.push({ ...responseData[key], id: key });
        }
      }
      return savedLocations;
    })).subscribe(
      (res: any) => {
        if ((res != null) || (res != undefined)) {
          //console.log(res);
         
          const responseData = new Array<Location>(...res);

          for (const data of responseData) {
            const markers = data.markers;
            for (const marker of markers) {
              const resObj = new Location();

              console.log(marker.lat, marker.lng, marker.label);

              this.addMarker(marker.lat, marker.lng, marker.label);
            }
          }

        }
      },
      err => {
        //console.log(err);
      }
    )
  }


}