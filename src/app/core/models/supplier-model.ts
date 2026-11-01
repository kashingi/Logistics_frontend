export interface SupplierModel {

    id?: number;
    supplierNo?: string;
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    paymentTerms?: string;    // DUE_ON_RECEIPT | NET_15 | NET_30 | NET_60
    street?: string;
    city?: string;
    postal?: string;
    status?: string;          // ACTIVE | INACTIVE
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
