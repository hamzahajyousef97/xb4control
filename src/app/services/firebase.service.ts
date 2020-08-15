import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  get_product(collection, id){
    return this.db.collection(collection).doc(id).snapshotChanges();
  }

  get_products(collection){
    return this.db.collection(collection).snapshotChanges();
  }

  addProduct(collection, value){
    return this.db.collection(collection).add({
      code: value.code,
      nameEN: value.nameEN,
      nameAR: value.nameAR,
      descriptionEN: value.descriptionEN,
      descriptionAR: value.descriptionAR,
      colorCode: value.colorCode,
      size: value.size,
      image: value.image
    });
  }

  updateProduct(collection, name, value){
    return this.db.collection(collection).doc(name).set(value);
  }

  deleteProuct(collection, name){
    return this.db.collection(collection).doc(name).delete();
  }

  postFeedback(value){
    return this.db.collection('feedbacks').add({
      firstname: value.firstname,
      lastname: value.lastname,
      telnum: value.telnum,
      email: value.email,
      message: value.message,
    });
  }

  getFeedback(){
    return this.db.collection('feedbacks').snapshotChanges();
  }

  DeleteFeedback(message){
    return this.db.collection('feedbacks').doc(message).delete();
  }

  addImage(collection, id, value){
    return this.db.collection(collection + '/' + id + '/images').add({
      image: value
    });
  }

  getImage(collection, id){
    return this.db.collection(collection + '/' + id + '/images').snapshotChanges();
  }

  deleteImage(collection, id, image_id){
    return this.db.doc(collection + '/' + id + '/images/' + image_id).delete();
  }

}
