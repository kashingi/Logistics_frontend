export interface StockTransferModel {
    id?: number;
    transferNo?: string;
    date?: string;
    sourceWarehouseId?: number;
    sourceWarehouse?: any;
    destinationWarehouseId?: number;
    destinationWarehouse?: any;
    status?: string; // DRAFT | APPROVED | IN_TRANSIT | RECEIVED | CANCELLED
    totalQuantity?: number;
    lines?: StockTransferLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface StockTransferLine {
    id?: number;
    productId?: number;
    product?: any;
    quantity: number;
    batchNo?: string;
    notes?: string;
}

export interface StockTransferCreateRequest {
    date?: string;
    sourceWarehouseId: number;
    destinationWarehouseId: number;
    lines: {
        productId: number;
        quantity: number;
        batchNo?: string;
        notes?: string;
    }[];
}