import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    IonicImageLoader.forRoot(),
  ],
})
export class NotificationPageModule {}
