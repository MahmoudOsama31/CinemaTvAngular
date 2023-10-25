import { SubCategoryModel } from "./SubCategoryModel";

export interface Movie {
    id: number;
    movieName: string;
    movieStory: string;
    movieTrailer: string;
    moviePost: string;
    subCategory: SubCategoryModel;
}