import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryModel } from 'src/models/CategoryModel';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  title: string = 'Add Category';
  id!: number;
  message!: string;
  userForm!: FormGroup;
  categories!: CategoryModel;
  categorie!: CategoryModel[];
  messageValidate = {
    categoryName: {
      required: 'اسم المستخدم مطلوب',
      matchUserName: 'اسم المستخدم مستعمل',
    },
  };
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categories = {
      id: 0,
      categoryName: '',
    };
    this.id = 0;
    this.userForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
    this.activateRoute.paramMap.subscribe((param) => {
      var idParam = Number(param.get('id'));
      var name = param.get('id1');
      console.log(idParam);
      console.log(name);
      if (idParam && name) {
        this.title = 'Edit Category';
        this.id = idParam;
        this.userForm.patchValue({
          categoryName: name,
        });
      }
    });
    console.log(this.id);
  }
  AddCategory() {
    var name = this.userForm.value.categoryName;
    if (name) {
      if (this.id > 0) {
        this.categories.categoryName = name;
        this.categories.id = this.id;
        this.service.EditCategory(this.categories).subscribe({
          next: (succ) => {
            this.GoToList();
            this.categories.id = 0;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.categories.categoryName = name;
        this.categories.id = 0;
        this.service.AddCategory(this.categories).subscribe({
          next: (succ) => {
            console.log('Added');
            this.router.navigate(['controlpanel']).then((x) => {
              window.location.reload();
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
  GoToList() {
    sessionStorage.setItem('cat', 'cat');
    this.router.navigate(['/controlpanel']);
  }
}
