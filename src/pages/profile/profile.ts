import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { CallNumber } from '@ionic-native/call-number';

import { DetailsPage } from '../details/details';
import { NativeStorage } from '@ionic-native/native-storage';

import { AlertController } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {name: '' , cpf: '', designation: '', mobile: ''};
  offers = [{item_name: '', item_price: '', item_category: '', description: '', imageurl: ''}];
  isAdmin = false;
  isLoaded = false;

  constructor(public navCtrl: NavController, 
    private http: HttpProvider,
    private storage: NativeStorage,
    private call: CallNumber,
    private alertCtrl: AlertController,
    private toast: ToastProvider,
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
    this.isAdmin = this.navParams.get('isAdmin');

    this.http.get('profile.php?cpf=' + cpf)
    .subscribe( res => { 
      this.user = res['results'];
    });

    this.http.get('viewall.php?cpf=' + cpf)
    .subscribe( res => {
      this.offers = res['results'];
      this.isLoaded = true;
    });

  }

  openOffer(offer){
    this.navCtrl.push(DetailsPage, {item: offer})
  }

  doCall(){
    this.call.callNumber( "+91" + this.user.mobile, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log(err) );
  }

  deleteOffer(offer){
    this.http.get('delete.php?uid=' + offer.uid)
    .subscribe( res => {
      this.toast.presentToast("Item delete " + res['result']);
      this.offers.splice(
        this.offers.findIndex(function(item,i){ return item['uid'] == offer.uid }), 1
      );
    });
  }

  presentDeleteConfirm(offer) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you really want to delete the item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteOffer(offer);
          }
        }
      ]
    });
    alert.present();
  }

}
