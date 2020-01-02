import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  ListOfOrbitTypes: string[] = ['LOW', 'HIGH'];
  ListOfTypes: string[] = ['Space Debris', 'Communication', 'Probe', 'Positioning', 'Space Station', 'Telescope'];
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.displayList = [];
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    window.fetch(satellitesUrl).then(function (response) {
      response.json().then(function (data) {
        let fetchedSatellites = data.satellites;

        for (let i = 0; i < fetchedSatellites.length; i++) {
          let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          this.sourceList.push(satellite);
        }
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));

  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for (let i = 0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }

    //Find matches using the type property.
    for (let i = 0; i < this.ListOfTypes.length; i++) {
      let name = this.ListOfTypes[i].toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites = this.removeDuplicates(matchingSatellites.concat(this.subArrayOfSpecificType(this.sourceList, name)));
      }
    }

    //Find matches using the orbitType property.
    for (let i = 0; i < this.ListOfOrbitTypes.length; i++) {
      let name = this.ListOfOrbitTypes[i].toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites = this.removeDuplicates(matchingSatellites.concat(this.subArrayOfSpecificOrbitType(this.sourceList, name)));
      }
    }

    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }

  subArrayOfSpecificType(arr: Satellite[], type: string): Satellite[] {
    return arr.filter(function (el) {
      return el.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
    });
  }

  subArrayOfSpecificOrbitType(arr: Satellite[], orbitType: string): Satellite[] {
    return arr.filter(function (el) {
      return el.orbitType.toLowerCase().indexOf(orbitType.toLowerCase()) !== -1;
    });
  }

  /**
   * Remove duplicates in an array of satellites while considering the 'name' attribute as unique
   */
  removeDuplicates(array: Satellite[]): Satellite[] {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].name === a[j].name)
          a.splice(j--, 1);
      }
    }
    return a;
  }
}
