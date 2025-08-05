export interface Room {
    _id?: string;
    title: string;
    description: string;
    location: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pincode: string;
    };
    price: number;
    images: string[];
    amenities: string[];
    isApproved?: boolean;
    maximumAllowedGuest: number;
    category: string;
}
