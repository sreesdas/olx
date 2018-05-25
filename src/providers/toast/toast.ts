import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
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
