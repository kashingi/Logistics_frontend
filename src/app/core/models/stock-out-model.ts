export interface StockOutModel {

    id?: number;
    stockOutNo?: string;
    date?: string;
    reason?: string;
    approvalStatus?: string;   // PENDING | APPROVED | REJECTED
    notes?: string;
    lines?: StockOutLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface StockOutLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    quantity: number;
    batchNo?: string;
}

export interface StockOutCreateRequest {
    date?: string;
    reason: string;
    notes?: string;
    lines: {
        productId: number;
        warehouseId: number;
        quantity: number;
        batchNo?: string;
    }[];
}