import { ICustomer } from "./ICustomer";
import { IMovie } from "./IMovie";

export interface IRental {
    movieId: string;
    customerId:string;
    movie?: IMovie;
    customer?:ICustomer;
    dateOut?:Date;
    dateReturned?:Date;
    rentalFee?:number;
}