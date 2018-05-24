import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  item:any = {name: '', price: '', category: '', description: ''};
  base64Image: any;
  loggedInUser: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: HttpClient,
    private httpProvider: HttpProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellPage');

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
      alert(err);
    });
  }

  upload() {
    
    let url = "http://ec2-13-127-19-135.ap-south-1.compute.amazonaws.com/olx/form.php";
    let postData = new FormData();
    postData.append('file', this.base64Image);
    postData.append('item_name', this.item.name);
    postData.append('item_category', this.item.category);
    postData.append('item_price', this.item.price);
    postData.append('uploader', this.loggedInUser);

    this.http.post(url, postData)
    .subscribe(res => {
      alert("Image Uploaded");
    })
  }
}
