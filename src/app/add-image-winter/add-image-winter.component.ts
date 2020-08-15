import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-image-winter',
  templateUrl: './add-image-winter.component.html',
  styleUrls: ['./add-image-winter.component.scss']
})
export class AddImageWinterComponent implements OnInit {

  id: any;
  item: any;

  files: File[] = [];
  file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  images: any[];

  constructor(
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.id = data.payload.id;
        console.log(this.id)
      }
    })

    this.firebaseService.getImage('winter', this.id)
    .subscribe(images => {
      this.images = images;
    })
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.file = this.files[i];
      this.startUpload(this.file);
    }
  }

  startUpload(file) {
    const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.firebaseService.addImage('winter', this.id, this.downloadURL)
        this.openSnackBar(" Image Uploaded Successfully", '🙂')
        setTimeout(() => {
          this.percentage = null;
          this.snapshot = null;
          this.downloadURL = null;
        }, 2000);

        this.files = [];
      }),
    );
  }

  deleteImage(image_id) {
    this.firebaseService.deleteImage('winter', this.id, image_id)
    .then(
      res => {
        console.log("Image deleted succesfully")
      },
      err => {
        console.log(err);
      }
    )
  }


  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }
}
