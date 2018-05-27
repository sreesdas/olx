import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { HttpProvider } from '../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  user = {cpf: '', name: '', designation: ''};

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, 
    private storage: NativeStorage,
    private http: HttpProvider,
    splashScreen: SplashScreen, 
    private imageLoaderConfig: ImageLoaderConfig) {

    this.pages = [
        { title: 'My Profile', component: 'ProfilePage', icon: 'person' },
        { title: 'Notifications', component: 'NotificationPage', icon: 'notifications' },
        { title: 'Logout', component: '', icon: 'power' },
    ];

    platform.ready().then(() => {
      
      this.storage.getItem('loggedInUser')
      .then(
        data => { 
          this.http.get('profile.php?cpf=' + data.cpf )
          .subscribe( res => {
            this.user = res['results'];
            this.user.cpf = data.cpf;
          })
         } ,
        error => {
          console.log(error);
        }
      );

      //this.imageLoaderConfig.enableDebugMode();
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      this.imageLoaderConfig.setFallbackUrl('assets/loading.gif');
      //this.imageLoaderConfig.enableSpinner(false);
      //this.imageLoaderConfig.setSpinnerColor('primary');
      //this.imageLoaderConfig.setSpinnerName('bubbles');
      this.imageLoaderConfig.setMaximumCacheAge(24*60*60*1000);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page:any) {
    this.nav.push(page.component, {user: this.user.cpf, isAdmin: true} )
  }
}

