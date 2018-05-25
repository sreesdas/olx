import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  price=0;
  loggedInUser;

  constructor(public navCtrl: NavController, 
    private http: HttpProvider,
    private viewCtrl: ViewController,
    private nativeStorage: NativeStorage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');

    this.nativeStorage.getItem('loggedInUser')
    .then(
      data => { this.loggedInUser = data.cpf } ,
      error => {
        console.log(error);
      }
    );
  }

  doSubmitOffer(){
    let url = "offer.php?price=" + this.price + "&uid=" + this.navParams.data.item.uid + "&buyer=" + this.loggedInUser;
    console.log(url);
    this.http.get(url)
    .subscribe(res => {console.log(res); this.viewCtrl.dismiss();});
  }
}
