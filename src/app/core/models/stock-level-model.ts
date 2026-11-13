export interface StockLevelModel {

    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    batchId?: number;
    batch?: any;
    quantityOnHand?: number;
    quantityReserved?: number;
    quantityAvailable?: number;
    updatedAt?: string;
}
