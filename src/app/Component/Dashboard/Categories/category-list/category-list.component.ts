import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryModel } from 'src/models/CategoryModel';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories!: CategoryModel[];
  categoryId:number = 0;
  constructor(private service: AdminService, private router: Router) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.service.GetAllCategories().subscribe({
      next: (List) => {
        this.categories = List;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  EditCategory(id:number,catName:string)
  {
    this.router.navigate(['/editcategory', id, catName]);
  }
  AddCategory()
  {
    this.router.navigate(['category']);
  }
  DeleteCategory(id:number)
  {
    this.service.DeleteCategory(id).subscribe({
      next: (succ) => {
        console.log("Delete");
    this.router.navigate(['controlpanel']).then(() => {window.location.reload();});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  Showthis(id:number)
  {
    this.service.GetCategoryById(id).subscribe({
      next: (data) => {
      this.categoryId = data.id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
