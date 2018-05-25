import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  item:any = {name: '', price: '', category: '', description: ''};
  base64Image: any;
  base64Image1: any;
  base64Image2: any;
  base64Image3: any;
  loggedInUser: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: HttpClient,
    private toast: ToastProvider,
    private httpProvider: HttpProvider ) {
  }

  ionViewDidLoad() {
    this.loggedInUser = this.navParams.get('user');
  }

  getImage() {
    
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.toast.presentToast("Image Capture Error!");
    });
  }

  addMore() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {

      if(!this.base64Image1)
        this.base64Image1 = 'data:image/jpeg;base64,' + imageData;
      else if(!this.base64Image2)
        this.base64Image2 = 'data:image/jpeg;base64,' + imageData;
      else
        this.base64Image3 = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
      this.toast.presentToast("Error while taking picture");
    });
  }

  upload() {

    if(this.base64Image){
      let url = "http://ec2-13-127-19-135.ap-south-1.compute.amazonaws.com/olx/form.php";
      let postData = new FormData();
      postData.append('file', this.base64Image);

      if(this.base64Image1) postData.append('file1', this.base64Image1);
      if(this.base64Image2) postData.append('file2', this.base64Image2);
      if(this.base64Image3) postData.append('file3', this.base64Image3);

      postData.append('item_name', this.item.name);
      postData.append('item_category', this.item.category);
      postData.append('item_description', this.item.description);
      postData.append('item_price', this.item.price);
      postData.append('uploader', this.loggedInUser);

      this.http.post(url, postData)
      .subscribe(res => {
        this.toast.presentToast("Image Uploaded succesfully");
        this.navCtrl.pop();
      }, err => {
        this.toast.presentToast("Error wrong while uploading!");
      });
    }
    
  }
}
