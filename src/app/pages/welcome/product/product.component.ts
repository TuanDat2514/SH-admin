import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from "../../../_sevices/product/product.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { Product } from "../../../../assets/interface/interface";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import { createMessage } from "../../../../environments/helper";
import {optionBrand} from "../../../../environments/constant";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,private message: NzMessageService) {
    this.valueSearchInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.productService.searchProduct(value as string).subscribe((res:any) => {
          this.listOfData= res;
        })
      });
  }
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  listOfData: Product[] = [];
  list!: Product[];
  pageSize = 5;
  totalItem!: number;
  itemSelected!: Product;
  file: any = {};
  imgNew!: string | null;
  descriptionNew!:string;
  openDrawerDetail!:boolean;
  productSelected:any;
  openDrawerAddProduct:boolean = false;
  isUploading:boolean = false;
  progress!:number;
  valueSearchInput: string = '';
  valueSearchInputUpdate = new Subject<string>();
  isLoading:boolean = false;
  searchBrandSelected:string = "Nhãn hiệu";
  valueBrandSelected = "";
  optionBrand = optionBrand;
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
        this.progress = progress;
        this.isUploading = true;
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
          this.isUploading = false;
          createMessage(this.message,'success','Tải ảnh');
        });
      }
    );
  }

  deleteProduct(id_product:string){
    this.productService.deleteProduct(id_product).subscribe(res=>{
      if(res.status === 200){
        createMessage(this.message,'success','Xóa');
        this.displayData();
      }
    })
  }

  startEdit(id: string, product: Product): void {
    this.editCache[id].edit = true;
    this.itemSelected = product;

  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id_product === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id_product === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const body:any = {
      description: this.editCache[id].data.description,
      id_product: this.editCache[id].data.id_product,
      img: this.imgNew || null,
      name: this.editCache[id].data.name,
      price: this.editCache[id].data.price,
    }
    this.productService.updateProduct(body).subscribe(res=>{
      if(res.status === 200){
        this.editCache[id].edit = false;
        this.displayData();
        this.imgNew = null;
        createMessage(this.message,'success','Cập nhật');
      }
    })
    console.log(body);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id_product] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  displayData(){
    this.isLoading = true
    this.productService.getAllProduct().subscribe(res => {
      this.totalItem = res.length;
      const data: any = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          id_product: res[i].id_product,
          name: res[i].name,
          price: res[i].price,
          description: res[i].description,
          img: res[i].img,
          sub_img1: res[i].sub_img1,
          sub_img2: res[i].sub_img2,
          sub_img3: res[i].sub_img3,
          region:res[i].region,
          type:res[i].type
        });
      }
      this.listOfData = data;
      console.log(this.listOfData);
      this.updateEditCache();
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.displayData();
  }

  handleRecord(item : any) {
    //this.openDrawerDetail = true;
    this.productSelected = item;
    this.openDrawerAddProd();
  }

  closeDrawer($event: boolean) {
    this.openDrawerDetail = $event;
    this.openDrawerAddProduct = $event;
  }

  openDrawerAddProd(){
    this.openDrawerAddProduct = true;
  }

  closeDrawerAddProd(){
    this.openDrawerAddProduct = false;
    this.productSelected = '';
  }

  changeSelectedBrand(brand:any){
    this.searchBrandSelected = brand.label;
    this.valueBrandSelected = brand.value;
  }

  searchProduct(){
    this.isLoading = true;
    let body = {key:this.valueSearchInput,brand:this.valueBrandSelected};
    this.productService.searchProduct(body).subscribe((res:any) => {
      this.isLoading = false
      this.listOfData= res;
    })
  }
}
