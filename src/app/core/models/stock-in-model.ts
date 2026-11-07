export interface StockInModel {

    id?: number;
    stockInNo?: string;
    supplierId?: number;
    supplier?: any;
    date?: string;
    totalExpense?: number;
    approvalStatus?: string;   // PENDING | APPROVED | REJECTED
    notes?: string;
    lines?: StockInLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface StockInLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    quantity: number;
    batchNo?: string;
    expense?: number;
}

export interface StockInCreateRequest {
    supplierId?: number;
    date?: string;
    notes?: string;
    lines: {
        productId: number;
        warehouseId: number;
        quantity: number;
        batchNo?: string;
        expense?: number;
    }[];
}
