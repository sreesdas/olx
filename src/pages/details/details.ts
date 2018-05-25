import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { CallNumber } from '@ionic-native/call-number';

import { AlertController } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  loggedInUser:any;
  item:any = { item_name: 'Default' };
  item_details: any = {};
  photoes = {urls: [], size: 0};

  expand = false;
  offer = 0;
  offerActive = false;

  constructor(public navCtrl: NavController,
    private http: HttpProvider,
    private toast: ToastProvider,
    private call: CallNumber,
    private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');

    this.http.get('item.php?uid='+this.item.uid)
    .subscribe(res => {
      this.item_details = res['results'][0];

      if(this.item_details.imgurl1){ this.photoes.urls.push(this.item_details.imgurl1); this.photoes.size += 1 }
      if(this.item_details.imgurl2){ this.photoes.urls.push(this.item_details.imgurl2); this.photoes.size += 1 }
      if(this.item_details.imgurl3){ this.photoes.urls.push(this.item_details.imgurl3); this.photoes.size += 1 }
    });

    this.nativeStorage.getItem('loggedInUser')
    .then(
      data => { this.loggedInUser = data.cpf } ,
      error => {
        console.log(error);
      }
    );
  }

  doCall(){
    this.call.callNumber( "+91" + this.item_details.uploader_contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => this.toast.presentToast("Error dialing number!") );
  }

  viewProfile(){
    this.navCtrl.push('ProfilePage', {user: this.item_details.uploader_cpf} )
  }

  toggleExpand(){
    this.expand = !this.expand;
  }

  prompt() {
    let alert = this.alertCtrl.create({
      title: 'Make Offer',
      inputs: [
        {
          name: 'price',
          placeholder: 'I would like to pay ₹ '
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let url = "offer.php?price=" + data.price + "&uid=" + this.item.uid + "&buyer=" + this.loggedInUser;
            console.log(url);
            this.http.get(url)
            .subscribe(res => { 
              this.toast.presentToast("Your offer has been sent!");
             });
          }
        }
      ]
    });
    alert.present();
  }

}
