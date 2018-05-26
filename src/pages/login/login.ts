import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { NativeStorage } from '@ionic-native/native-storage';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { cpf: '', password: '' };
  errorText= '';

  constructor(public navCtrl: NavController, 
    private nativeStorage: NativeStorage,
    private http: HttpProvider,
    public navParams: NavParams) {
  }

  doLogin() {

    if(this.user.cpf == '' || this.user.password == '')
      this.errorText = "Username or Password can't be blank!";
    else {

      let url = 'login.php?cpf=' + this.user.cpf + '&mobile=' + this.user.password;
      this.http.get(url)
      .subscribe(res => {

        if(res['login'] == 'failed') this.errorText = "Invalid Credentials!";
        else{
          this.nativeStorage.setItem('loggedInUser', { cpf: this.user.cpf })
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
          this.navCtrl.setRoot(HomePage);
        }
        
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
