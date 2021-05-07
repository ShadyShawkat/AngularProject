import { IGenre } from "./IGenre";

export interface IMovie {
    _id?: string;
    numberInStock: number;
    dailyRentalRate: number;
    title: string;
    genreId?: string;
    genre?:IGenre;
}