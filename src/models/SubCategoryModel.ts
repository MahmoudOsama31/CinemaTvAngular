import { CategoryModel } from "./CategoryModel";

export interface SubCategoryModel {
    id: number;
    subCategoryName: string;
    categoryId:number;
    category:CategoryModel;
  }
  