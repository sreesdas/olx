import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Native Plugins
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { HttpProvider } from '../providers/http/http';
import { IonicImageLoader } from 'ionic-image-loader';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    NativeStorage,
    HttpProvider
  ]
})
export class AppModule {}
