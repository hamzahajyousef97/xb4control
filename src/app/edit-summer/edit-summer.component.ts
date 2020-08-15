import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FirebaseService } from '../services/firebase.service';

import { Summer } from '../shared/summer';


@Component({
  selector: 'app-edit-summer',
  templateUrl: './edit-summer.component.html',
  styleUrls: ['./edit-summer.component.scss']
})
export class EditSummerComponent implements OnInit {

  item: any;
  id: any;
  files: File[] = [];
  file: File;
  NotTouched: boolean = true;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  summerForm: FormGroup;
  product: Summer;

  images: any[];

  formErrors = {
    'code': '',
    'nameEN': '',
    'nameAR': '',
    'descriptionEN': '',
    'descriptionAR': '',
    'colorCode': ''
  };

  validationMessages = {
    'code': {
      'required': 'code is required.',
    },
    'nameEN': {
      'required': 'nameEN is required.',
    },
    'nameAR': {
      'required': 'nameAR is required.',
    },
    'descriptionEN': {
      'required': 'descriptionEN is required.',
    },
    'descriptionAR': {
      'required': 'descriptionAR is required.',
    },
    'colorCode': {
      'required': 'colorEN is required.',
    }
  };

  @ViewChild('fform') summerFormDirective;

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.id = data.payload.id;
        console.log(this.id)
        console.log("asd " + this.item.image)
      }
    })

    this.firebaseService.getImage('summer', this.id)
    .subscribe(images => {
      this.images = images;
      console.log(this.images)
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
        this.files = [];
        this.NotTouched = false;
      }),
    );
  }
  
  createForm() {
    this.summerForm = this.fb.group({
      code: ['', [Validators.required]],
      nameEN: ['', [Validators.required]],
      nameAR: ['', [Validators.required]],
      descriptionEN: ['', [Validators.required]],
      descriptionAR: ['', [Validators.required]],
      colorCode: ['', [Validators.required]],
      size: ['', [Validators.required]],
    });

    this.summerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.summerForm) {
      return;
    }
    const form = this.summerForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous erroe message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let image: string;
    if(this.NotTouched) {
      image = this.item.image;
      console.log(image)
    }
    else {
      image = this.downloadURL;
      console.log(image)
    }
    const formData = {
      ...this.summerForm.value,
      image: image
    };
    this.product = formData;
    console.log(this.product);
    this.firebaseService.updateProduct('summer', this.id, this.product)
    .then(
      res => {
        this.openSnackBar("Summer product Updated Successfully", '🙂')
        setTimeout(() => { this.router.navigate(['/summer']); }, 3000);
      }
    )
    this.summerForm.reset({
      code: '',
      nameEN: '',
      nameAR: '',
      descriptionEN: '',
      descriptionAR: '',
      colorCode: '',
      size: ''
    });
    this.summerFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }

}
