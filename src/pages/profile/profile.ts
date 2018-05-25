import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { CallNumber } from '@ionic-native/call-number';

import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {name: '' , cpf: '', designation: '', mobile: ''};
  offers = [{item_name: '', item_price: '', item_category: '', description: '', imageurl: ''}];

  constructor(public navCtrl: NavController, 
    private http: HttpProvider,
    private call: CallNumber,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let cpf = this.navParams.get('user');

    this.http.get('profile.php?cpf=' + cpf)
    .subscribe( res => this.user = res['results'] );

    this.http.get('viewall.php?cpf=' + cpf)
    .subscribe( res => {this.offers = res['results']; console.log(res);} );

  }

  openOffer(offer){
    this.navCtrl.push(DetailsPage, {item: offer})
  }

  doCall(){
    this.call.callNumber( "+91" + this.user.mobile, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log(err) );
  }

}
