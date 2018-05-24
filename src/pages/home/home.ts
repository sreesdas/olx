import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

import { HttpProvider } from '../../providers/http/http';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  base64Image:any;
  loggedInUser: string;
  items: [{ item_name:string, item_price: number, imageurl: string }] ;

  itemRight: any;
  itemLeft: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private http: HttpClient,
    private httpProvider : HttpProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad(){

    /*this.platform.ready().then(() => {
      this.nativeStorage.getItem('loggedInUser')
      .then(
        data => { this.loggedInUser = data.cpf } ,
        error => {
          this.navCtrl.setRoot('LoginPage');
        }
      );
    });*/

    this.httpProvider.get('getitems.php')
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;

      this.itemLeft = this.items.slice(0,size/2);
      this.itemRight = this.items.slice(size/2, size);

    })
  }

  sell() {
    this.navCtrl.push('SellPage', { user: this.loggedInUser } );
  }

  refresh() {
    this.httpProvider.get('getitems.php')
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;

      this.itemLeft = this.items.slice(0,size/2);
      this.itemRight = this.items.slice(size/2, size);

    })
  }

  showDetails(item:any){
    this.navCtrl.push(DetailsPage, {item: item} );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
