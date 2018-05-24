import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  item:any = { item_name: 'Default' };
  item_details: any = {};

  constructor(public navCtrl: NavController,
    private http: HttpProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');

    this.http.get('item.php?uid='+this.item.uid)
    .subscribe(res => {
      console.log(this.item);
      this.item_details = res['results'][0];
      console.log(this.item_details);
    })
  }

}
