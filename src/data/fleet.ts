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
        pricePerDay: 6000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/2020_Toyota_Yaris_Hybrid_Design_1.5_Front.jpg/1280px-2020_Toyota_Yaris_Hybrid_Design_1.5_Front.jpg',
        available: true,
        features: ['AC', 'Bluetooth', 'Airbags', 'Apple CarPlay']
    },
    {
        id: 'honda-civic-2023',
        name: 'Honda Civic 2023',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 8000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/2022_Honda_Civic_LX_Sedan%2C_front_right%2C_11-02-2022.jpg/1280px-2022_Honda_Civic_LX_Sedan%2C_front_right%2C_11-02-2022.jpg',
        available: true,
        features: ['Sunroof', 'Adaptive Cruise', 'Leather Seats', 'Lane Assist']
    },
    {
        id: 'kia-sorento',
        name: 'KIA Sorento',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 7,
        pricePerDay: 18000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/2021_Kia_Sorento_SX_AWD_in_Snow_White_Pearl%2C_front_11.17.21.jpg/1280px-2021_Kia_Sorento_SX_AWD_in_Snow_White_Pearl%2C_front_11.17.21.jpg',
        available: true,
        features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Premium Audio', '7 Seater']
    },
    {
        id: 'toyota-revo',
        name: 'Toyota Hilux Revo',
        type: 'Pickup / 4x4',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 14000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2020_Toyota_Hilux_Revo_4x4_Double-Cab_2.8_Rocco.jpg/1280px-2020_Toyota_Hilux_Revo_4x4_Double-Cab_2.8_Rocco.jpg',
        available: true,
        features: ['4x4', 'Off-road Capability', 'Turbo Diesel', 'Tow Bar']
    },
    {
        id: 'mg-hs',
        name: 'MG HS Trophy',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 12000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/2022_MG_HS_X.jpg/1280px-2022_MG_HS_X.jpg',
        available: true,
        features: ['Turbo Engine', 'Ambient Lighting', '360 Camera', 'Panoramic Roof']
    },
    {
        id: 'hiace-10',
        name: 'Toyota Hiace',
        type: 'Van',
        transmission: 'Manual',
        seats: 10,
        pricePerDay: 10000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2019_Toyota_HiAce_%28front%29.jpg/1280px-2019_Toyota_HiAce_%28front%29.jpg',
        available: true,
        features: ['10 Seater', 'Dual AC', 'Large Luggage Space', 'Group Travel']
    }
];

