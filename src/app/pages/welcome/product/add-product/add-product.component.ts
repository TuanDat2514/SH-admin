import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../../../_sevices/product/product.service";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../../firebase/firebaseConfig";
import {createMessage, genRandonString} from "../../../../../environments/helper";
import {categoryProduct, optionBrand} from "../../../../../environments/constant";
import {Product} from "../../../../../assets/interface/interface";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedProduct!: Product;
  @Output() refreshData = new EventEmitter();
  @Output() closeDrawer = new EventEmitter();
  loading = false;
  progress = [
    {progress: 0},
    {progress: 0},
    {progress: 0},
    {progress: 0},
    {progress: 0},
  ];
  file: any = [];
  imgNew = [
    {img: ''},
    {img: ''},
    {img: ''},
    {img: ''},
    {img: ''},
  ];
  newForm = this.fb.group({
    id_product: [''],
    region: [''],
    type: [''],
    name: [''],
    price: [''],
    description: [''],
    img: [''],
    sub_img:[''],
    sub_img1: [''],
    sub_img2: [''],
    sub_img3: [''],
  });
  optionBrand = optionBrand;
  categoryProduct = categoryProduct;
  isLoadingImage: boolean = false;

  constructor(private msg: NzMessageService, 
    private fb: FormBuilder, 
    private productService: ProductService,
    private sanitizer: DomSanitizer
    ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct'].currentValue !== '') {
      this.dataForm(changes['selectedProduct'].currentValue);
    }
  }

  dataForm(selectedProduct: Product) {
    if (selectedProduct) {

      this.newForm.controls.region.setValue(selectedProduct.region);
      this.newForm.controls.price.setValue(selectedProduct.price + '');
      this.newForm.controls.name.setValue(selectedProduct.name);
      this.newForm.controls.type.setValue(selectedProduct.type);
      this.newForm.controls.description.setValue(selectedProduct.description);
      this.newForm.controls.id_product.setValue(selectedProduct.id_product);
      this.newForm.controls.img.setValue(selectedProduct.img);
      this.newForm.controls.sub_img.setValue(selectedProduct.img);
      this.newForm.controls.sub_img1.setValue(selectedProduct.img);
      this.newForm.controls.sub_img2.setValue(selectedProduct.img);
      this.newForm.controls.sub_img3.setValue(selectedProduct.img);
      // this.newForm.setValue(selectedProduct);
      this.imgNew[0].img = selectedProduct.img;
      this.imgNew[1].img = selectedProduct.sub_img;
      this.imgNew[2].img = selectedProduct.sub_img1;
      this.imgNew[3].img = selectedProduct.sub_img2;
      this.imgNew[4].img = selectedProduct.sub_img3;
      this.progress.forEach(value => value.progress++)
    }
    console.log(this.progress);
  }

  ngOnDestroy(): void {
    this.newForm.reset();
    console.log(this.newForm.value);
  }

  chooseFile(event: any, int: number) {
    if (event.target.files.length > 0) {
      this.file[int] = event.target.files[0];
      this.addImageToFirebase(int);
    }
  }

  addImageToFirebase(int: number) {
    const storageRef = ref(storage, 'images/' + this.file[int].name);
    const uploadTask = uploadBytesResumable(storageRef, this.file[int]);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.progress[int].progress = progress;
        if (this.imgNew[int].img) {
          this.imgNew[int].img = '';
        }
        console.log('Upload is ' + progress + '% done');
        this.isLoadingImage = true;
      },
      (error) => {
        createMessage(this.msg, 'error', 'Tải ảnh')
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
          this.progress[int].progress = 1;
          this.imgNew[int].img = downloadURL;
          this.isLoadingImage = false;
          console.log(this.imgNew);
        });
      }
    );
  }

  ngSubmit() {
    /* this.newForm.controls.img.setValue(this.imgNew[0].img);
    this.newForm.controls.sub_img.setValue(this.imgNew[1].img);
    this.newForm.controls.sub_img1.setValue(this.imgNew[2].img);
    this.newForm.controls.sub_img2.setValue(this.imgNew[3].img);
    this.newForm.controls.sub_img3.setValue(this.imgNew[4].img);
    // this.newForm.value.img = this.imgNew;
    if (!this.newForm.controls.id_product.value) {
      this.newForm.controls.id_product.setValue(genRandonString(4));
    } 
    this.productService.addProduct(this.newForm.value).subscribe(res => {
      if (res.status === 200) {
        createMessage(this.msg, 'success', 'Thêm mới');
        this.refreshData.emit();
        this.closeDrawer.emit(false);
      }
    }) */
    // @ts-ignore
    console.log(this.sanitizer.bypassSecurityTrustHtml(this.newForm.controls.description.value as string)['changingThisBreaksApplicationSecurity']);
    
  }


}
