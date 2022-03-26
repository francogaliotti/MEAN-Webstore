export class Product{
    _id?: string;
    tittle: string;
    price: number;
    
    n?: number;
    constructor(tittle: string, price: number, id?: string){
        this.tittle=tittle;
        this.price=price
        this._id=id;
    }
}