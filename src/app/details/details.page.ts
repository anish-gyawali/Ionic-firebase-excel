import { Component, OnInit } from '@angular/core';
import { LandingPagePage } from '../landing-page/landing-page.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
event:string;
  constructor(private home: LandingPagePage) { }

  ngOnInit() {
    this.home.cardButton(event=>{
      this.event=event.srcElement.id;
      console.log(event.srcElement.id)
    })
  }

}
