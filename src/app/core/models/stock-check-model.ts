export interface StockCheckModel {

    id?: number;
    stockCheckNo?: string;
    warehouseId?: number;
    warehouse?: any;
    checkDate?: string;
    status?: string; // DRAFT | PENDING | APPROVED | CANCELLED
    notes?: string;
    lines?: StockCheckLine[];
    createdBy?: string;
    createdAt?: string;
}

export interface StockCheckLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    batchNo?: string;
    systemQty?: number;
    countedQty?: number;
    variance?: number;
    notes?: string;
}

export interface StockCheckCreateRequest {
    warehouseId: number;
    checkDate?: string;
    notes?: string;
    lines: {
        productId: number;
        batchNo?: string;
        systemQty?: number;
        countedQty: number;
        notes?: string;
    }[];
}
