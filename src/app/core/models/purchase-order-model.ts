export interface PurchaseOrderModel {

    id?: number;
    poNumber?: string;
    supplierId?: number;
    supplier?: any;
    orderDate?: string;
    expectedDeliveryDate?: string;
    status?: string;              // PENDING_APPROVAL | APPROVED | REJECTED
    invoiceStatus?: string;
    receiptStatus?: string;
    totalAmount?: number;
    lines?: PurchaseOrderLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PurchaseOrderLine {
    id?: number;
    productId?: number;
    product?: any;
    warehouseId?: number;
    warehouse?: any;
    quantity: number;
    unitPrice: number;
    discount?: number;
    taxRate?: number;
    amount?: number;
}

/** Used when creating a new Purchase Order */
export interface PurchaseOrderCreateRequest {
    supplierId: number;
    orderDate: string;
    expectedDeliveryDate?: string;
    lines: {
        productId: number;
        warehouseId: number;
        quantity: number;
        unitPrice: number;
        discount?: number;
        taxRate?: number;
    }[];
}