import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Winter } from '../shared/winter';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-add-winter',
  templateUrl: './add-winter.component.html',
  styleUrls: ['./add-winter.component.scss']
})
export class AddWinterComponent implements OnInit {

  winterForm: FormGroup;
  winter: Winter;
  collection: any;
  collectionAR: any;
  productForm: FormGroup;
  files: File[] = [];
  file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  @ViewChild('fform') winterFormDirective;

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
      'required': 'color is required.',
    }
  };
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
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
      colorCode: ['', [Validators.required]],
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

    const formData = {
      ...this.winterForm.value,
      image: this.downloadURL
    };


    this.winter = formData;
    console.log(this.winter);

    this.firebaseService.addProduct('winter', this.winter)
    .then(
      res => {
        this.openSnackBar("Winter " + this.winter.nameEN + " Product Added Successfully", '🙂')
        setTimeout(() => { this.router.navigate(['/' + 'winter']); }, 3000);
      }
    )

    this.winterForm.reset({
      code: '',
      nameEN: '',
      nameAR: '',
      descriptionEN: '',
      descriptionAR: '',
      colorCode: '',
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
