export interface Product {

    id?: number;
    productNo?: string;
    serialNumber?: string;
    name: string;
    brand?: string;
    description?: string;
    uom?: string;
    packagingUnit?: string;
    quantityPerUnit?: number;
    purchasePrice?: number;
    wholesalePrice?: number;
    retailPrice?: number;
    salesTaxRate?: string;
    purchaseTaxRate?: string;
    skuCode: string;
    batchManaged?: boolean;
    shelfLifeDays?: number;
    earlyWarningDays?: number;
    status?: string;
    categoryId?: number;
    category?: any;
    // createdBy?: string;
    // updatedBy?: string;
    // createdAt?: string;
    // updatedAt?: string;
}
