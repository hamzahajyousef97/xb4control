import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-winter',
  templateUrl: './winter.component.html',
  styleUrls: ['./winter.component.scss']
})
export class WinterComponent implements OnInit {

  products: Array<any>;
  website: string = 'https://www.xbfour.com/';
  errMess: string;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.get_products('winter')
    .subscribe(result => {
      this.products = result;
      console.log(this.products)
    },
    errmess => {
      this.products = null;
      this.errMess = <any>errmess;
    });
  }

  deleteProduct(name) {
    this.firebaseService.deleteProuct('winter', name)
    .then(
      res => {
        console.log("Product deleted succesfully")
      },
      err => {
        console.log(err);
      }
    )
  }

}
