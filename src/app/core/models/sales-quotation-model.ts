export interface SalesQuotationModel {
    id?: number;
    sqNumber?: string;
    date?: string;
    customerId?: number;
    customer?: any;
    kraPin?: string;
    salespersonName?: string;
    salespersonCode?: string;
    status?: string;         // DRAFT | CREATED | CANCELLED | CONVERTED
    totalAmount?: number;
    notes?: string;
    terms?: string;
    buildingLandmark?: string;
    street?: string;
    houseNo?: string;
    contactPerson?: string;
    contactPhone?: string;
    lines?: SalesQuotationLine[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface SalesQuotationLine {
    id?: number;
    productId?: number;
    product?: any;
    quantity: number;
    uom?: string;
    priceTier?: string;      // RETAIL | WHOLESALE
    unitPrice?: number;
    discount?: number;
    amount?: number;
    fulfilment?: string;     // PICKUP | DELIVERY
}

export interface SalesQuotationCreateRequest {
    customerId?: number;
    customerName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    kraPin?: string;
    salespersonName: string;
    salespersonCode: string;
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