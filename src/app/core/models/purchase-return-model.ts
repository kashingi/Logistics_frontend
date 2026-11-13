export interface PurchaseReturnModel {

    id?: number;
    returnNo?: string;
    supplierId?: number;
    supplier?: any;
    grnId?: number;
    grn?: any;
    purchaseOrderId?: number;
    returnDate?: string;
    status?: string;
    totalAmount?: number;
    notes?: string;
    lines?: PurchaseReturnLine[];
    createdBy?: string;
    createdAt?: string;
}


export interface PurchaseReturnLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    quantity: number;
    unitPrice?: number;
    reason?: string;
    batchNo?: string;
    amount?: number;
}

export interface PurchaseReturnCreateRequest {
    supplierId: number;
    grnId?: number;
    purchaseOrderId?: number;
    returnDate?: string;
    notes?: string;
    lines: {
        productId: number;
        warehouseId: number;
        quantity: number;
        unitPrice?: number;
        reason?: string;
        batchNo?: string;
    }[];
}