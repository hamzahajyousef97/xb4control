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

import { Winter } from '../shared/winter';
 

@Component({
  selector: 'app-edit-winter',
  templateUrl: './edit-winter.component.html',
  styleUrls: ['./edit-winter.component.scss']
})
export class EditWinterComponent implements OnInit {

  item: any;
  id: any;
  files: File[] = [];
  file: File;
  NotTouched: boolean = true;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  winterForm: FormGroup;
  product: Winter;

  images: any[];

  @ViewChild('fform') winterFormDirective;

  formErrors = {
    'code': '',
    'nameEN': '',
    'nameAR': '',
    'descriptionEN': '',
    'descriptionAR': '',
    'colorEN': '',
    'colorAR': ''
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
    'colorEN': {
      'required': 'colorEN is required.',
    },
    'colorAR': {
      'required': 'colorAR is required.',
    }
  };

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
      }
    })

    this.firebaseService.getImage('winter', this.id)
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
    this.winterForm = this.fb.group({
      code: ['', [Validators.required]],
      nameEN: ['', [Validators.required]],
      nameAR: ['', [Validators.required]],
      descriptionEN: ['', [Validators.required]],
      descriptionAR: ['', [Validators.required]],
      colorEN: ['', [Validators.required]],
      colorAR: ['', [Validators.required]],
      size: ['', [Validators.required]],
    });

    this.winterForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.winterForm) {
      return;
    }
    const form = this.winterForm;
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
    }
    else {
      image = this.downloadURL;
    }
    const formData = {
      ...this.winterForm.value,
      image: image
    };
    this.product = formData;
    console.log(this.product);
    this.firebaseService.updateProduct('winter', this.id, this.product)
    .then(
      res => {
        this.openSnackBar("Winter product Updated Successfully", '🙂')
        setTimeout(() => { this.router.navigate(['/winter']); }, 3000);
      }
    )
    this.winterForm.reset({
      code: '',
      nameEN: '',
      nameAR: '',
      descriptionEN: '',
      descriptionAR: '',
      colorEN: '',
      colorAR: '',
      size: ''
    });
    this.winterFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }
}
