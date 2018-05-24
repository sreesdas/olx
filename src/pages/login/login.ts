import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { cpf: '', password: '' };

  constructor(public navCtrl: NavController, 
    private nativeStorage: NativeStorage,
    public navParams: NavParams) {
  }

  doLogin() {
    if(this.user.password == 'admin'){
      this.nativeStorage.setItem('loggedInUser', { cpf: this.user.cpf })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
      this.navCtrl.push(HomePage, {user: this.user});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
