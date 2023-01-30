import { Component, OnInit } from '@angular/core';
import { Product } from "../../../assets/interface/interface";
import { ProductService } from "../../_sevices/product/product.service";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import { NzMessageService } from "ng-zorro-antd/message";
import { createMessage } from "../../../environments/helper";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,private message: NzMessageService) {
    document.title = "Sản Phẩm";
    this.valueSearchInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.productService.searchProduct(value).subscribe((res) => {
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
      color: this.editCache[id].data.color,
      description: this.editCache[id].data.description,
      gender: this.editCache[id].data.gender,
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
    this.productService.getAllProduct().subscribe(res => {
      this.totalItem = res.length;
      const data: any = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          id_product: res[i].id_product,
          name: res[i].name,
          color: res[i].color,
          price: res[i].price,
          description: res[i].description,
          trending: res[i].trending,
          gender: res[i].gender,
          img: res[i].img,
          sub_img: res[i].sub_img,
          stock: res[i].stock,
        });
      }
      this.listOfData = data;
      console.log(this.listOfData);
      this.updateEditCache();
    });
  }

  ngOnInit(): void {
    this.displayData();
  }

  handleRecord(item : any) {
    this.openDrawerDetail = true;
    this.productSelected = item;
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
  }
}
