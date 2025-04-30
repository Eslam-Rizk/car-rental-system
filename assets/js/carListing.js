const carsData = [
    {
        carId: "car_001",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        dailyRate: 30,
        category: "Sedan",
        color: "Red",
        imageUrl: ["./assets/images/car1.png"],
        rating: 4.5,
        fuelCapacity: 2.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_002",
        make: "Honda",
        model: "Civic",
        year: 2021,
        dailyRate: 35,
        category: "Sedan",
        color: "Blue",
        imageUrl: ["./assets/images/car2.png"],
        rating: 4.3,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_003",
        make: "BMW",
        model: "X5",
        year: 2022,
        dailyRate: 50,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car3.png"],
        rating: 4.7,
        fuelCapacity: 3.9,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["Menofia", "Paris", "Tokyo"],
    },
    {
        carId: "car_004",
        make: "Ford",
        model: "Focus",
        year: 2019,
        dailyRate: 28,
        category: "Sedan",
        color: "White",
        imageUrl: ["./assets/images/car4.png"],
        rating: 4.0,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Alexandria", "Paris"],
    },
    {
        carId: "car_005",
        make: "Chevrolet",
        model: "Malibu",
        year: 2020,
        dailyRate: 32,
        category: "Sedan",
        color: "Gray",
        imageUrl: ["./assets/images/car5.png"],
        rating: 4.2,
        fuelCapacity: 3.8,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_006",
        make: "Nissan",
        model: "Altima",
        year: 2021,
        dailyRate: 34,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car6.png"],
        rating: 4.1,
        fuelCapacity: 3.2,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_007",
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        dailyRate: 70,
        category: "Electric",
        color: "White",
        imageUrl: ["./assets/images/car7.png"],
        rating: 4.9,
        fuelCapacity: 0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Electric",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_008",
        make: "Hyundai",
        model: "Elantra",
        year: 2022,
        dailyRate: 29,
        category: "Sedan",
        color: "Red",
        imageUrl: ["./assets/images/car8.png"],
        rating: 4.2,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_009",
        make: "Kia",
        model: "Sorento",
        year: 2021,
        dailyRate: 45,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car9.png"],
        rating: 4.4,
        fuelCapacity: 3.7,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_010",
        make: "Audi",
        model: "A4",
        year: 2020,
        dailyRate: 55,
        category: "Sedan",
        color: "Blue",
        imageUrl: ["./assets/images/car10.png"],
        rating: 4.6,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_011",
        make: "Mercedes",
        model: "C-Class",
        year: 2022,
        dailyRate: 60,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car11.png"],
        rating: 4.8,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Diesel",
        availableLocations: ["Menofia commission", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_012",
        make: "Volkswagen",
        model: "Passat",
        year: 2021,
        dailyRate: 33,
        category: "Sedan",
        color: "Gray",
        imageUrl: ["./assets/images/car12.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Diesel",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_013",
        make: "Subaru",
        model: "Outback",
        year: 2020,
        dailyRate: 40,
        category: "SUV",
        color: "Green",
        imageUrl: ["./assets/images/car13.png"],
        rating: 4.5,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_014",
        make: "Mazda",
        model: "CX-5",
        year: 2022,
        dailyRate: 42,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car14.png"],
        rating: 4.6,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_015",
        make: "Jeep",
        model: "Wrangler",
        year: 2021,
        dailyRate: 65,
        category: "SUV",
        color: "Yellow",
        imageUrl: ["./assets/images/car15.png"],
        rating: 4.7,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_016",
        make: "Volvo",
        model: "XC90",
        year: 2022,
        dailyRate: 58,
        category: "SUV",
        color: "Blue",
        imageUrl: ["./assets/images/car16.png"],
        rating: 4.8,
        fuelCapacity: 3.8,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_017",
        make: "Porsche",
        model: "Macan",
        year: 2023,
        dailyRate: 95,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car17.png"],
        rating: 4.9,
        fuelCapacity: 3.8,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_018",
        make: "Lexus",
        model: "RX 350",
        year: 2021,
        dailyRate: 75,
        category: "SUV",
        color: "White",
        imageUrl: ["./assets/images/car18.png"],
        rating: 4.7,
        fuelCapacity: 3.2,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_019",
        make: "Acura",
        model: "MDX",
        year: 2020,
        dailyRate: 55,
        category: "SUV",
        color: "Gray",
        imageUrl: ["./assets/images/car19.png"],
        rating: 4.5,
        fuelCapacity: 3.5,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Menofia", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_020",
        make: "Infiniti",
        model: "QX60",
        year: 2021,
        dailyRate: 57,
        category: "SUV",
        color: "Silver",
        imageUrl: ["./assets/images/car20.png"],
        rating: 4.4,
        fuelCapacity: 3.5,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_021",
        make: "Toyota",
        model: "RAV4",
        year: 2022,
        dailyRate: 38,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car21.png"],
        rating: 4.4,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_022",
        make: "Honda",
        model: "CR-V",
        year: 2023,
        dailyRate: 39,
        category: "SUV",
        color: "Green",
        imageUrl: ["./assets/images/car22.png"],
        rating: 4.5,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_023",
        make: "Ford",
        model: "Escape",
        year: 2021,
        dailyRate: 36,
        category: "SUV",
        color: "Blue",
        imageUrl: ["./assets/images/car23.png"],
        rating: 4.2,
        fuelCapacity: 3.7,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_024",
        make: "Chevrolet",
        model: "Equinox",
        year: 2022,
        dailyRate: 37,
        category: "SUV",
        color: "White",
        imageUrl: ["./assets/images/car24.png"],
        rating: 4.1,
        fuelCapacity: 3.6,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_025",
        make: "Hyundai",
        model: "Tucson",
        year: 2022,
        dailyRate: 35,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car25.png"],
        rating: 4.3,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_026",
        make: "Kia",
        model: "Sportage",
        year: 2023,
        dailyRate: 36,
        category: "SUV",
        color: "Gray",
        imageUrl: ["./assets/images/car26.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_027",
        make: "Mazda",
        model: "CX-30",
        year: 2021,
        dailyRate: 34,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car27.png"],
        rating: 4.2,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Menofia", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_028",
        make: "Toyota",
        model: "Camry",
        year: 2022,
        dailyRate: 37,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car28.png"],
        rating: 4.5,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_029",
        make: "Nissan",
        model: "Rogue",
        year: 2023,
        dailyRate: 39,
        category: "SUV",
        color: "Orange",
        imageUrl: ["./assets/images/car29.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_030",
        make: "Ford",
        model: "Mustang",
        year: 2021,
        dailyRate: 65,
        category: "Sports",
        color: "Yellow",
        imageUrl: ["./assets/images/car30.png"],
        rating: 4.8,
        fuelCapacity: 3.0,
        passengerCapacity: 4,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_031",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        dailyRate: 30,
        category: "Sedan",
        color: "Red",
        imageUrl: ["./assets/images/car1.png"],
        rating: 4.5,
        fuelCapacity: 2.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_032",
        make: "Honda",
        model: "Civic",
        year: 2021,
        dailyRate: 35,
        category: "Sedan",
        color: "Blue",
        imageUrl: ["./assets/images/car2.png"],
        rating: 4.3,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_033",
        make: "BMW",
        model: "X5",
        year: 2022,
        dailyRate: 50,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car3.png"],
        rating: 4.7,
        fuelCapacity: 3.9,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["Menofia", "Paris", "Tokyo"],
    },
    {
        carId: "car_034",
        make: "Ford",
        model: "Focus",
        year: 2019,
        dailyRate: 28,
        category: "Sedan",
        color: "White",
        imageUrl: ["./assets/images/car4.png"],
        rating: 4.0,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Alexandria", "Paris"],
    },
    {
        carId: "car_035",
        make: "Chevrolet",
        model: "Malibu",
        year: 2020,
        dailyRate: 32,
        category: "Sedan",
        color: "Gray",
        imageUrl: ["./assets/images/car5.png"],
        rating: 4.2,
        fuelCapacity: 3.8,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_036",
        make: "Nissan",
        model: "Altima",
        year: 2021,
        dailyRate: 34,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car6.png"],
        rating: 4.1,
        fuelCapacity: 3.2,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_037",
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        dailyRate: 70,
        category: "Electric",
        color: "White",
        imageUrl: ["./assets/images/car7.png"],
        rating: 4.9,
        fuelCapacity: 0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Electric",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_038",
        make: "Hyundai",
        model: "Elantra",
        year: 2022,
        dailyRate: 29,
        category: "Sedan",
        color: "Red",
        imageUrl: ["./assets/images/car8.png"],
        rating: 4.2,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_039",
        make: "Kia",
        model: "Sorento",
        year: 2021,
        dailyRate: 45,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car9.png"],
        rating: 4.4,
        fuelCapacity: 3.7,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_040",
        make: "Audi",
        model: "A4",
        year: 2020,
        dailyRate: 55,
        category: "Sedan",
        color: "Blue",
        imageUrl: ["./assets/images/car10.png"],
        rating: 4.6,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_041",
        make: "Mercedes",
        model: "C-Class",
        year: 2022,
        dailyRate: 60,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car11.png"],
        rating: 4.8,
        fuelCapacity: 3.4,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Diesel",
        availableLocations: ["Menofia", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_042",
        make: "Volkswagen",
        model: "Passat",
        year: 2021,
        dailyRate: 33,
        category: "Sedan",
        color: "Gray",
        imageUrl: ["./assets/images/car12.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Diesel",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_043",
        make: "Subaru",
        model: "Outback",
        year: 2020,
        dailyRate: 40,
        category: "SUV",
        color: "Green",
        imageUrl: ["./assets/images/car13.png"],
        rating: 4.5,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_044",
        make: "Mazda",
        model: "CX-5",
        year: 2022,
        dailyRate: 42,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car14.png"],
        rating: 4.6,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_045",
        make: "Jeep",
        model: "Wrangler",
        year: 2021,
        dailyRate: 65,
        category: "SUV",
        color: "Yellow",
        imageUrl: ["./assets/images/car15.png"],
        rating: 4.7,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Manual",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_046",
        make: "Volvo",
        model: "XC90",
        year: 2022,
        dailyRate: 58,
        category: "SUV",
        color: "Blue",
        imageUrl: ["./assets/images/car16.png"],
        rating: 4.8,
        fuelCapacity: 3.8,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Diesel",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_047",
        make: "Porsche",
        model: "Macan",
        year: 2023,
        dailyRate: 95,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car17.png"],
        rating: 4.9,
        fuelCapacity: 3.8,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_048",
        make: "Lexus",
        model: "RX 350",
        year: 2021,
        dailyRate: 75,
        category: "SUV",
        color: "White",
        imageUrl: ["./assets/images/car18.png"],
        rating: 4.7,
        fuelCapacity: 3.2,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_049",
        make: "Acura",
        model: "MDX",
        year: 2020,
        dailyRate: 55,
        category: "SUV",
        color: "Gray",
        imageUrl: ["./assets/images/car19.png"],
        rating: 4.5,
        fuelCapacity: 3.5,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Menofia", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_050",
        make: "Infiniti",
        model: "QX60",
        year: 2021,
        dailyRate: 57,
        category: "SUV",
        color: "Silver",
        imageUrl: ["./assets/images/car20.png"],
        rating: 4.4,
        fuelCapacity: 3.5,
        passengerCapacity: 7,
        transmission: "Automatic",
        luggageCapacity: 4,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_051",
        make: "Toyota",
        model: "RAV4",
        year: 2022,
        dailyRate: 38,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car21.png"],
        rating: 4.4,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_052",
        make: "Honda",
        model: "CR-V",
        year: 2023,
        dailyRate: 39,
        category: "SUV",
        color: "Green",
        imageUrl: ["./assets/images/car22.png"],
        rating: 4.5,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    },
    {
        carId: "car_053",
        make: "Ford",
        model: "Escape",
        year: 2021,
        dailyRate: 36,
        category: "SUV",
        color: "Blue",
        imageUrl: ["./assets/images/car23.png"],
        rating: 4.2,
        fuelCapacity: 3.7,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Paris", "Alexandria", "Dubai"],
    },
    {
        carId: "car_054",
        make: "Chevrolet",
        model: "Equinox",
        year: 2022,
        dailyRate: 37,
        category: "SUV",
        color: "White",
        imageUrl: ["./assets/images/car24.png"],
        rating: 4.1,
        fuelCapacity: 3.6,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["London", "Menofia", "Mansoura"],
    },
    {
        carId: "car_055",
        make: "Hyundai",
        model: "Tucson",
        year: 2022,
        dailyRate: 35,
        category: "SUV",
        color: "Black",
        imageUrl: ["./assets/images/car25.png"],
        rating: 4.3,
        fuelCapacity: 3.3,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Tokyo", "Cairo", "Paris"],
    },
    {
        carId: "car_056",
        make: "Kia",
        model: "Sportage",
        year: 2023,
        dailyRate: 36,
        category: "SUV",
        color: "Gray",
        imageUrl: ["./assets/images/car26.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Alexandria", "Dubai", "London"],
    },
    {
        carId: "car_057",
        make: "Mazda",
        model: "CX-30",
        year: 2021,
        dailyRate: 34,
        category: "SUV",
        color: "Red",
        imageUrl: ["./assets/images/car27.png"],
        rating: 4.2,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Menofia", "Mansoura", "Tokyo"],
    },
    {
        carId: "car_058",
        make: "Toyota",
        model: "Camry",
        year: 2022,
        dailyRate: 37,
        category: "Sedan",
        color: "Silver",
        imageUrl: ["./assets/images/car28.png"],
        rating: 4.5,
        fuelCapacity: 3.0,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Cairo", "Paris", "Alexandria"],
    },
    {
        carId: "car_059",
        make: "Nissan",
        model: "Rogue",
        year: 2023,
        dailyRate: 39,
        category: "SUV",
        color: "Orange",
        imageUrl: ["./assets/images/car29.png"],
        rating: 4.3,
        fuelCapacity: 3.5,
        passengerCapacity: 5,
        transmission: "Automatic",
        luggageCapacity: 3,
        fuelType: "Gasoline",
        availableLocations: ["Dubai", "London", "Menofia"],
    },
    {
        carId: "car_060",
        make: "Ford",
        model: "Mustang",
        year: 2021,
        dailyRate: 65,
        category: "Sports",
        color: "Yellow",
        imageUrl: ["./assets/images/car30.png"],
        rating: 4.8,
        fuelCapacity: 3.0,
        passengerCapacity: 4,
        transmission: "Manual",
        luggageCapacity: 2,
        fuelType: "Gasoline",
        availableLocations: ["Mansoura", "Tokyo", "Cairo"],
    }
];

const newLocations = ["Cairo", "London", "Mansoura", "Menofia", "Alexandria", "Paris", "Dubai", "Tokyo"];
carsData.forEach(car => {
    car.availableLocations = [
        newLocations[Math.floor(Math.random() * newLocations.length)],
        newLocations[Math.floor(Math.random() * newLocations.length)],
        newLocations[Math.floor(Math.random() * newLocations.length)],
    ].filter((loc, index, self) => self.indexOf(loc) === index); 
});

if (localStorage.getItem('carsData')) {
    const storedCarsData = JSON.parse(localStorage.getItem('carsData'));
    storedCarsData.forEach((storedCar, index) => {
        if (carsData[index]) {
            carsData[index].bookedPeriods = storedCar.bookedPeriods || [];
        }
    });
} else {
    carsData.forEach((car, index) => {
        if (!car.bookedPeriods) {
            car.bookedPeriods = index % 3 === 0
                ? [
                    { startDate: "2025-05-01", endDate: "2025-05-05" },
                    { startDate: "2025-05-10", endDate: "2025-05-15" },
                ]
                : index % 3 === 1
                ? [{ startDate: "2025-05-03", endDate: "2025-05-07" }]
                : [];
        }
    });
    localStorage.setItem('carsData', JSON.stringify(carsData));
}

function saveBookingsToLocalStorage() {
    localStorage.setItem('carsData', JSON.stringify(carsData));
}

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let filteredCars = [...carsData];

// Function to check if a car's availability overlaps with the selected date range
function isCarAvailable(car, pickupDate, dropoffDate) {
    if (!pickupDate || !dropoffDate) return true; // If no dates selected, consider all cars available for counting

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    if (pickup >= dropoff) return false;

    if (!car.bookedPeriods || car.bookedPeriods.length === 0) return true;

    for (let period of car.bookedPeriods) {
        const bookedStart = new Date(period.startDate);
        const bookedEnd = new Date(period.endDate);

        if (pickup <= bookedEnd && dropoff >= bookedStart) {
            return false;
        }
    }
    return true;
}

// Function to update the car counts in the Pick-up Location filter and Car Type filter
function updateLocationCounts(pickupDate, dropoffDate) {
    const locationCounts = {
        cairo: 0,
        london: 0,
        mansoura: 0,
        menofia: 0,
        alexandria: 0,
        paris: 0,
        dubai: 0,
        tokyo: 0
    };

    const carTypeCounts = {
        'all-cars': 0,
        sedans: 0,
        suvs: 0,
        coupes: 0,
        'electric-cars': 0,
        luxury: 0,
        'sport-cars': 0,
        convertibles: 0
    };

    carsData.forEach(car => {
        if (isCarAvailable(car, pickupDate, dropoffDate)) {
            car.availableLocations.forEach(loc => {
                const locationKey = loc.toLowerCase();
                if (locationCounts.hasOwnProperty(locationKey)) {
                    locationCounts[locationKey]++;
                }
            });

            const carTypeKey = car.category.toLowerCase() === 'sports' ? 'sport-cars' :
                              car.category.toLowerCase() === 'electric' ? 'electric-cars' :
                              car.category.toLowerCase() + 's';
            if (carTypeCounts.hasOwnProperty(carTypeKey)) {
                carTypeCounts[carTypeKey]++;
            }
            carTypeCounts['all-cars']++;
        }
    });

    for (const [location, count] of Object.entries(locationCounts)) {
        const countElement = document.getElementById(`count-${location}`);
        if (countElement) {
            countElement.textContent = count;
        }
    }

    for (const [carType, count] of Object.entries(carTypeCounts)) {
        const countElement = document.getElementById(`count-${carType}`);
        if (countElement) {
            countElement.textContent = count;
        }
    }
}

// Function to filter cars based on all selected filters
function filterCars(pickupDate, dropoffDate) {
    const carTypeFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(1) .form-check-input:checked'))
        .map(input => {
            if (input.id === 'all-cars') return '';
            if (input.id === 'sedans') return 'sedan';
            if (input.id === 'suvs') return 'suv';
            if (input.id === 'sport') return 'sports';
            if (input.id === 'electric') return 'electric';
            if (input.id === 'coupes') return 'coupes';
            if (input.id === 'luxury') return 'luxury';
            if (input.id === 'convertible') return 'convertibles';
            return input.id;
        });
    const priceFilter = document.querySelector('.form-range').value;
    const fuelTypeFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(3) .form-check-input:checked'))
        .map(input => input.id.replace('all-fuel', '').replace('fuel-', '').replace('-fuel', ''));
    const locationFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(4) .form-check-input:checked'))
        .map(input => input.id.replace('pickup-', ''));
    const transmissionFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(5) .form-check-input:checked'))
        .map(input => input.id.replace('all-transmission', ''));
    const yearFilter = document.getElementById('year-range').value;
    const destination = document.querySelector('.form-select').value;

    filteredCars = carsData.filter(car => {
        const matchesCarType = carTypeFilters.length === 0 || carTypeFilters.includes('') || carTypeFilters.includes(car.category.toLowerCase());
        const matchesPrice = car.dailyRate <= priceFilter;
        const matchesFuelType = fuelTypeFilters.length === 0 || fuelTypeFilters.includes('') || fuelTypeFilters.includes(car.fuelType.toLowerCase());
        const matchesLocation = (locationFilters.length === 0 && destination === 'Add your location') ||
            car.availableLocations.some(loc => {
                const locKey = loc.toLowerCase();
                return (destination !== 'Add your location' && locKey === destination.toLowerCase()) ||
                       locationFilters.includes(locKey);
            });
        const matchesTransmission = transmissionFilters.length === 0 || transmissionFilters.includes('') || transmissionFilters.includes(car.transmission.toLowerCase());
        const matchesYear = car.year >= yearFilter;
        const matchesAvailability = isCarAvailable(car, pickupDate, dropoffDate);

        return matchesCarType && matchesPrice && matchesFuelType && matchesLocation && matchesTransmission && matchesYear && matchesAvailability;
    });

    currentPage = 1;
    renderCarListings();
    renderPagination();
}

// Function to sort cars based on the selected sorting option
function sortCars() {
    const sortOption = document.getElementById('sortOptions').value;
    if (sortOption === 'price-asc') {
        filteredCars.sort((a, b) => a.dailyRate - b.dailyRate);
    } else if (sortOption === 'price-desc') {
        filteredCars.sort((a, b) => b.dailyRate - a.dailyRate);
    }
    renderCarListings();
}

// Function to render car listings for the current page
function renderCarListings() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const carsToDisplay = filteredCars.slice(startIndex, endIndex);

    const carListings = document.getElementById('carListings');
    carListings.innerHTML = '';

    if (carsToDisplay.length === 0) {
        carListings.innerHTML = '<p>No cars available for the selected filters.</p>';
        return;
    }
    
    carsToDisplay.forEach(car => {
        const carCard = `
            <div class="col-md-4 mb-4 car-card-item">
                <div class="car-card p-3">
                    <div class="image-wrapper position-relative">
                        <img src="${car.imageUrl[0]}" alt="${car.make} ${car.model}" />
                        <div class="rating-overlay position-absolute top-0 end-0 m-2">
                            <i class="bi bi-star-fill" style="color: #FFD700;"></i>
                            <span class="ms-1">${car.rating}</span>
                        </div>
                    </div>
                    <div class="car-details mt-2">
                        <div class="car-headline d-flex justify-content-between align-items-center mb-2">
                            <h3 class="m-0">${car.make} ${car.model} ${car.year}</h3>
                            <div class="car-type"><span>${car.category}</span></div>
                        </div>
                        <div class="car-details-icons d-flex gap-3">
                            <div class="icon-item"><i class="bi bi-person-fill"></i><span class="ms-1">${car.passengerCapacity}</span></div>
                            <div class="icon-item"><i class="bi bi-suitcase"></i><span class="ms-1">${car.luggageCapacity}</span></div>
                            <div class="icon-item"><i class="bi bi-car-front-fill"></i><span class="ms-1">${car.transmission.toLowerCase()}</span></div>
                            <div class="icon-item"><i class="bi bi-fuel-pump"></i><span class="ms-1">${car.fuelType.toLowerCase()}</span></div>
                        </div>
                    </div>
                    <div class="car-price d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-baseline">
                            <h4 class="fs-5 m-0">$${car.dailyRate}</h4>
                            <span class="fs-6 darkgrey ms-1">/Per Day</span>
                        </div>
                        <a href="car-details.html?carId=${car.carId}" class="btn text-white details-btn">Details</a>
                    </div>
                </div>
            </div>
        `;
        carListings.innerHTML += carCard;
    });

    attachBookNowListeners();
}

// Attach event listeners to "Book Now" buttons
function attachBookNowListeners() {
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const carIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
            const car = filteredCars[carIndex];
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            const destination = document.querySelector('.form-select').value;

            if (!pickupDate || !dropoffDate || destination === 'Add your location') {
                alert('Please fill out the search form before booking a car.');
                return;
            }

            const carInData = carsData.find(c => c.carId === car.carId);
            if (carInData) {
                carInData.bookedPeriods.push({
                    startDate: pickupDate,
                    endDate: dropoffDate,
                });
               
                saveBookingsToLocalStorage();
              
                filterCars(pickupDate, dropoffDate);
                updateLocationCounts(pickupDate, dropoffDate);

                alert(`Successfully booked ${car.make} ${car.model} from ${pickupDate} to ${dropoffDate}!`);
            }
        });
    });
}

// Function to render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" id="prevPage">Previous</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" id="nextPage">Next</a>
        </li>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.id === 'prevPage' && currentPage > 1) {
                currentPage--;
            } else if (link.id === 'nextPage' && currentPage < totalPages) {
                currentPage++;
            } else if (link.dataset.page) {
                currentPage = parseInt(link.dataset.page);
            }
            renderCarListings();
            renderPagination();
        });
    });
}

// Function to validate search form
function validateSearchForm() {
    const destination = document.querySelector('.form-select').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const dropoffDate = document.getElementById('dropoff-date').value;
    const searchError = document.getElementById('searchError');
    const today = new Date().toISOString().split('T')[0];

    if (destination === 'Add your location') {
        searchError.textContent = 'Please select a destination.';
        searchError.style.display = 'block';
        return false;
    }
    if (!pickupDate || pickupDate < today) {
        searchError.textContent = 'Please select a valid Pick-up Date.';
        searchError.style.display = 'block';
        return false;
    }
    if (!dropoffDate || dropoffDate <= pickupDate) {
        searchError.textContent = 'Drop-off date must be after pick-up date.';
        searchError.style.display = 'block';
        return false;
    }

    searchError.style.display = 'none';
    return true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    filteredCars = [...carsData];
    renderCarListings();
    renderPagination();
    updateLocationCounts(null, null);

    document.querySelectorAll('.filter-box:nth-child(1) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelector('.form-range').addEventListener('input', (e) => {
        document.querySelector('.d-flex span:nth-child(2)').textContent = `$${e.target.value}`;
        const pickupDate = document.getElementById('pickup-date').value;
        const dropoffDate = document.getElementById('dropoff-date').value;
        filterCars(pickupDate, dropoffDate);
        updateLocationCounts(pickupDate, dropoffDate);
    });

    document.querySelectorAll('.filter-box:nth-child(3) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelectorAll('.filter-box:nth-child(4) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelectorAll('.filter-box:nth-child(5) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    const yearRange = document.getElementById('year-range');
    const yearDisplay = document.getElementById('year-range-display');
    yearRange.addEventListener('input', () => {
        yearDisplay.textContent = yearRange.value;
    });
    document.getElementById('year-apply-btn').addEventListener('click', () => {
        const pickupDate = document.getElementById('pickup-date').value;
        const dropoffDate = document.getElementById('dropoff-date').value;
        filterCars(pickupDate, dropoffDate);
        updateLocationCounts(pickupDate, dropoffDate);
    });

    document.getElementById('sortOptions').addEventListener('change', sortCars);

    document.getElementById('bookCarBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (validateSearchForm()) {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        }
    });
});