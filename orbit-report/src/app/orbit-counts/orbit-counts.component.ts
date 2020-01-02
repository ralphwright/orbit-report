import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {

  @Input() satellites: Satellite[];
  constructor() { }

  ngOnInit() {
  }

  numberOfItems(arr: Satellite[], type: string): number {
    return arr.filter(function (el) {
      return el.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
    }).length;
  }

}
