import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class WinterResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.firebaseService.get_product('winter', userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
