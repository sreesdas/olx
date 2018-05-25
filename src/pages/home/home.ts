import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

import { HttpProvider } from '../../providers/http/http';
import { DetailsPage } from '../details/details';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  filterActive = false;
  rangeValue:any;
  categories = ['Electronics', 'Vehicle', 'Furniture', 'Books', 'Fashion', 'Other'];
  selectedCategory = '';

  loggedInUser: string;
  items: [{ item_name:string, item_price: number, imageurl: string }] ;
  itemRight: any;
  itemLeft: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private http: HttpClient,
    private httpProvider : HttpProvider,
    private camera: Camera,
    private nativeStorage: NativeStorage,
    public toast: ToastProvider) {

  }

  ionViewDidLoad(){
    
    
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('loggedInUser')
      .then(
        data => { this.loggedInUser = data.cpf } ,
        error => {
          this.navCtrl.setRoot('LoginPage');
        }
      );
    });
    

    this.httpProvider.get('getitems.php')
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;
      this.itemLeft = this.items.slice(0,size/2);
      this.itemRight = this.items.slice(size/2, size);

    });
  }

  toggleFilter(){
    this.filterActive = !this.filterActive;
  }

  selectEvent(cat){
    this.selectedCategory = cat;
    console.log(cat);
  }

  doFilter(){
    let url = "filter.php?range=" + this.rangeValue + "&category=" + this.selectedCategory;
    this.httpProvider.get(url)
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;
      
      if(size > 0){
        this.itemLeft = this.items.slice(0, Math.ceil(size/2));
        this.itemRight = this.items.slice( Math.ceil(size/2) , size);
      } else {
        this.toast.presentToast("No result!")
      }
      
      this.filterActive = !this.filterActive;
    });
  }

  sell() {
    this.navCtrl.push('SellPage', { user: this.loggedInUser } );
  }

  showDetails(item:any){
    this.navCtrl.push(DetailsPage, {item: item} );
  }

  doRefresh(refresher:any){
    this.httpProvider.get('getitems.php')
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;

      this.itemLeft = this.items.slice(0,size/2);
      this.itemRight = this.items.slice(size/2, size);
      refresher.complete();
    })
  }

}
