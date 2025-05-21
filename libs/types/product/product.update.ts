import { ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum';

export interface ProductUpdate {
	_id: string;
	productType?: ProductType;
	productStatus?: ProductStatus;
	productLocation?: ProductLocation;
	productAddress?: string;
	productTitle?: string;
	productPrice?: number;
	productSquare?: number;
	productYears?: number;
	productEngineSize?: number;
	productImages?: string[];
	productDesc?: string;
	productBarter?: boolean;
	productRent?: boolean;
	productSale?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
