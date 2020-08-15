import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-summer',
  templateUrl: './summer.component.html',
  styleUrls: ['./summer.component.scss']
})
export class SummerComponent implements OnInit {

  products: Array<any>;
  website: string = 'https://www.xbfour.com/';
  errMess: string;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.get_products('summer')
    .subscribe(result => {
      this.products = result;
      console.log(this.products)
    },
    errmess => {
      this.products = null;
      this.errMess = <any>errmess;
    })
  }

  deleteProduct(name) {
    this.firebaseService.deleteProuct('summer', name)
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
