export interface RiderModel {

    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    nationalIdOrPassport?: string;
    dateJoined?: string;
    passportPhotoUrl?: string;
    vehicleRegistrationNo?: string;
    vehicleType?: string;
    carryingCapacityKg?: number;
    contractDurationMonths?: number;
    status?: string;
    currentZoneId?: number;
    currentZone?: any;
    isAvailable?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
