import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import { FormBuilder } from "@angular/forms";
import { optionBrand } from "../../../../environments/constant";
import { ProductService } from "../../../_sevices/product/product.service";
import { createMessage, genRandonString } from "../../../../environments/helper";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  file: any = {};
  imgNew!: string | null;
  newForm = this.fb.group({
    id_product: [''],
    id_brand:[''],
    name: [''],
    color:[''],
    price: [''],
    description: [''],
    trending:[''],
    gender:[''],
    img:[''],
    sub_img:[''],
  });
  optionBrand = optionBrand;
  id_brand?:string
  constructor(private msg: NzMessageService, private fb: FormBuilder,private productService:ProductService) { }

  ngOnInit(): void {
  }

  chooseFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.addImageToFirebase();
    }
  }

  addImageToFirebase() {
    const storageRef = ref(storage, 'images/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imgNew = downloadURL;
        });
      }
    );
  }

  ngSubmit() {
    this.newForm.value.img = this.imgNew;
    console.log(this.newForm);
    this.newForm.value.id_product = genRandonString(4);
    this.productService.addProduct(this.newForm.value).subscribe(res=>{
      if(res.status === 200){
        createMessage(this.msg,'success','Thêm mới');
      }
    })
  }
}
