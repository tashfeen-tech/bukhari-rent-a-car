export interface Car {
    id: string;
    name: string;
    type: string; // Sedan, SUV, etc.
    transmission: 'Manual' | 'Automatic';
    seats: number;
    pricePerDay: number;
    image: string;
    available: boolean;
    features: string[];
}

export const FLEET_DATA: Car[] = [
    {
        id: 'toyota-yaris-1',
        name: 'Toyota Yaris',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 8000,
        image: '/cars/yaris.jpg',
        available: true,
        features: ['AC', 'Bluetooth', 'Airbags']
    },
    {
        id: 'honda-civic-2023',
        name: 'Honda Civic 2023',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 15000,
        image: '/cars/civic.jpg',
        available: true,
        features: ['Sunroof', 'Adaptive Cruise', 'Leather Seats']
    },
    {
        id: 'kia-sorento',
        name: 'KIA Sorento',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 7,
        pricePerDay: 25000,
        image: '/cars/sorento.jpg',
        available: true,
        features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Premium Audio']
    },
    {
        id: 'toyota-revo',
        name: 'Toyota Hilux Revo',
        type: 'Pickup / 4x4',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 22000,
        image: '/cars/revo.jpg',
        available: true,
        features: ['4x4', 'Off-road capability', 'Turbo Diesel']
    },
    {
        id: 'mg-hs',
        name: 'MG HS Trophy',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 18000,
        image: '/cars/mghs.jpg',
        available: true,
        features: ['Turbo Engine', 'Ambient Lighting', '360 Camera']
    },
    {
        id: 'hiace-10',
        name: 'Toyota Hiace',
        type: 'Van',
        transmission: 'Manual',
        seats: 10,
        pricePerDay: 12000,
        image: '/cars/hiace.jpg',
        available: true,
        features: ['10 Seater', 'Dual AC', 'Large Luggage Space']
    }
];
