import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SubCategoryModel } from 'src/models/SubCategoryModel';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategories!:SubCategoryModel[];
  categoryId!:number
  constructor(private service:AdminService , private router:Router,private activateRoute: ActivatedRoute)
  {}
  ngOnInit(): void {
    this.getSubCategories();
    
  }
  getSubCategories(){
    this.service.getAllSubCategories().subscribe({
      next:(list)=>{
        this.subCategories=list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  AddSubCategory()
  {
    this.router.navigate(['subcategory']);
  }
  EditSubCategory(id:number ,subCategoryName : string , categoryId:number)
  {
    this.router.navigate(['/editsubcategory',id,subCategoryName,categoryId]);
  }
  DeleteCategory(id : number)
  {
    this.service.DeleteSubCategory(id).subscribe({
      next:(res)=>{
        console.log("Delete");
        this.router.navigate(['controlpanel']).then(() => {window.location.reload();});
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  Showthis(id:number)
  {
    this.service.GetSubCategoryById(id).subscribe({
      next: (data) => {
      this.categoryId = data.id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
