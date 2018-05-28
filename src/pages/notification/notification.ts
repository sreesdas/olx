import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage'

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  offers = [{item_name: '', buyer: '', price: '', imageurl: ''}];
  isLoaded = false;

  constructor(public navCtrl: NavController, 
    private http: HttpProvider,
    private storage: NativeStorage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
 
    this.storage.getItem('loggedInUser')
    .then(
      data => { 
      },
      error => {
        this.navCtrl.setRoot('LoginPage');
      }
    );


    let cpf = this.navParams.get('user');

    this.http.get('getoffers.php?cpf=' + cpf )
    .subscribe(res => {
      this.offers = res['results'];
      this.isLoaded = this.offers.length > 0;
    });
  }

}
