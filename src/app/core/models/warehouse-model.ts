export interface WarehouseModel {

    id?: number;
    warehouseNo?: string;
    name: string;
    category?: string;
    street?: string;
    city?: string;
    postal?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    remark?: string;
    allowNegativeInventory?: boolean;
    status?: string;          // ACTIVE | INACTIVE
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
