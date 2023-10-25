import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryModel } from 'src/models/CategoryModel';
import { SubCategoryModel } from 'src/models/SubCategoryModel';

@Component({
  selector: 'app-addsub-category',
  templateUrl: './addsub-category.component.html',
  styleUrls: ['./addsub-category.component.css'],
})
export class AddsubCategoryComponent implements OnInit {
  title!: string;
  subCatForm!: FormGroup;
  categories!: CategoryModel[];
  subCategory!: SubCategoryModel;
  id!:number;
  messageValidate = {
    subCatName: {
      required: 'اسم التصنيف مطلوب',
      max: 'الحد الأقصي لعدد الحروف هو 200',
    },
    catId: {
      required: 'التصنيف الفرعي مطلوب',
    },
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.title = 'Add Sub Category';
    this.categories = [];
    this.subCategory = {
      id: 0,
      subCategoryName: '',
      categoryId: 0,
      category: {
        id: 0,
        categoryName: '',
      },    
    };
    this.subCatForm = this.fb.group({
      subCatName: ['', [Validators.required, Validators.maxLength(200)]],
      catId: [0, [Validators.required]],
    });
    this.GetCategories();
    this.activateRoute.paramMap.subscribe(params => {
      //id for sub , name of sub , id if categoryid
      const _subCatId = Number(params.get('id'));
      const _subCatName = params.get('id1');
      const _catId = Number(params.get('id2'));

      if(_subCatId && _subCatName && _catId) {
        this.title = 'Edit Sub Category';
        this.id = _subCatId;
        this.subCatForm.patchValue({
          subCatName: _subCatName,
          catId: _catId,
        });
      }
    });
  }
  GetCategories()
  {
    this.service.GetAllCategories().subscribe({
      next:(list)=>{
        this.categories = list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  GoToList() {
    sessionStorage.setItem('subcat', 'subcat');
    this.router.navigate(['controlpanel']);
  }
  AddSubCategory() {
    var name = this.subCatForm.value.subCatName;
    var catId = this.subCatForm.value.catId;
    if (name && catId > 0) {
      if(this.id>0){
        this.subCategory.id = this.id;  //sub = > id name categoryid category
        this.subCategory.subCategoryName = name;
        this.subCategory.categoryId = catId;
        this.subCategory.category.id = catId;
        this.subCategory.category.categoryName = 'name';
        this.service.EditSubCategory(this.subCategory).subscribe({
          next:(succ)=>{
            this.GoToList();
          },
          error:(err)=>{
            console.log(err);
          }
        });
      }else{
        this.subCategory.id = 0;  //sub = > id name categoryid category
        this.subCategory.subCategoryName = name;
        this.subCategory.categoryId = catId;
        this.subCategory.category.id = catId;
        this.subCategory.category.categoryName = 'name';
        this.service.AddSubCategory(this.subCategory).subscribe({
          next: (succ) => {
            this.subCatForm.reset();
            console.log('added');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
