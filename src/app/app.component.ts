import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private imageLoaderConfig: ImageLoaderConfig) {

    this.pages = [
        { title: 'Profile', component: HomePage, icon: 'home' },
        { title: 'Logout', component: HomePage, icon: 'create' },
    ];

    platform.ready().then(() => {
      
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
    this.nav.setRoot(page.component)
  }
}

