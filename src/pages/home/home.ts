import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NativeStorage } from '@ionic-native/native-storage';

import { HttpProvider } from '../../providers/http/http';
import { DetailsPage } from '../details/details';
import { ToastProvider } from '../../providers/toast/toast';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  filterActive = false;
  rangeValue:any;
  categories = ['Electronics', 'Vehicle', 'Household Goods', 'Furniture',  'Books', 'House Rent/Sell', 'Other'];
  selectedCategory = '';

  loggedInUser: string;
  items: [{ item_name:string, item_price: number, imageurl: string }] ;
  itemRight: any;
  itemLeft: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private httpProvider : HttpProvider,
    private nativeStorage: NativeStorage,
    public toast: ToastProvider) {

  }

  ionViewDidLoad(){

    /*this.platform.ready().then(() => {
      this.nativeStorage.getItem('loggedInUser')
      .then(
        data => { this.loggedInUser = data.cpf } ,
        error => {
          this.navCtrl.setRoot('LoginPage');
        }
      );
    });*/

    // OLD API without a leftarray and rightarray
    /*this.httpProvider.get('getitems.php')
    .subscribe(res => {
      this.items = res['results'];
      let size = this.items.length;
      this.itemLeft = this.items.slice(0,size/2);
      this.itemRight = this.items.slice(size/2, size);

    });*/

    //new API where left-right array gen is done by the server 
    this.httpProvider.get('apis/getitems.php')
    .subscribe(res => {
      this.itemLeft = res['results']['left'];
      this.itemRight = res['results']['right'];
    });

  }

  toggleFilter(){
    this.filterActive = !this.filterActive;
    if(this.filterActive) this.content.scrollToTop();
  }

  selectEvent(cat){
    this.selectedCategory = cat;
    console.log(cat);
  }

  // OLD Filter API
  /* doFilter(){
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
  }*/

  doFilter() {
    let url = "apis/filter.php?range=" + this.rangeValue + "&category=" + this.selectedCategory;
    this.httpProvider.get(url)
    .subscribe(res => {
      this.itemLeft = res['results']['left'];
      this.itemRight = res['results']['right'];

      let size = this.itemLeft.length + this.itemRight.length;
      if(size == 0 )
        this.toast.presentToast("No result!")

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
    this.httpProvider.get('apis/getitems.php')
    .subscribe(res => {
      this.itemLeft = res['results']['left'];
      this.itemRight = res['results']['right'];
      
      refresher.complete();
    })
  }

}
