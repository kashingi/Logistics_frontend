export interface SalesOrderModel {

    id?: number;
    soNumber?: string;
    date?: string;
    customerId?: number;
    customer?: any;
    kraPin?: string;
    salespersonName?: string;
    salespersonCode?: string;
    sourceQuotationId?: number;
    sourceQuotation?: any;
    origin?: string;
    dispatchType?: string;
    status?: string;
    totalAmount?: number;
    notes?: string;
    terms?: string;
    buildingLandmark?: string;
    street?: string;
    houseNo?: string;
    contactPerson?: string;
    contactPhone?: string;
    lines?: SalesOrderLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SalesOrderLine {
    id?: number;
    productId?: number;
    product?: any;
    quantity: number;
    uom?: string;
    priceTier?: string;
    unitPrice?: number;
    discount?: number;
    amount?: number;
    fulfilment?: string;
}

export interface SalesOrderCreateRequest {
    customerId?: number;
    customerName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    kraPin?: string;
    salespersonName?: string;
    salespersonCode?: string;
    sourceQuotationId?: number;
    date?: string;
    notes?: string;
    terms?: string;
    buildingLandmark?: string;
    street?: string;
    houseNo?: string;
    contactPerson?: string;
    contactPhone?: string;
    lines: {
        productId: number;
        quantity: number;
        priceTier?: string;
        discount?: number;
        fulfilment?: string;
    }[];
}