export interface GrnModel {

    id?: number;
    grnNumber?: string;
    supplierId?: number;
    supplier?: any;
    purchaseOrderId?: number;
    purchaseOrder?: any;
    receivedDate?: string;
    fulfilmentType?: string;   // PARTIAL | COMPLETE
    status?: string;           // PENDING_APPROVAL | APPROVED | ...
    totalAmount?: number;
    lines?: GrnLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface GrnLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
    amount?: number;
    batchNo?: string;
}

export interface GrnCreateRequest {
    supplierId: number;
    purchaseOrderId?: number;
    receivedDate?: string;
    fulfilmentType?: string;
    lines: {
        productId: number;
        warehouseId: number;
        quantity: number;
        unitPrice: number;
        taxRate?: number;
        batchNo?: string;
    }[];
}