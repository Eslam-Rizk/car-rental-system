import { savedCars } from "../mock/storage/seedStorage.js";
import { savedBookings } from "../mock/storage/seedStorage.js";
import { savedCustomers, seedStorage } from "../mock/storage/seedStorage.js";

// Initialize storage
seedStorage();


// todo: counts bookings by status (cancelled/pending/completed)
export function getBookingStatusCounts() {
    const statusCounts = {
        Cancelled: 0,
        Pending: 0,
        Completed: 0
    };


    savedBookings.get().forEach(booking => {
        if (booking.paymentStatus === 'Cancelled') statusCounts.Cancelled++;
        else if (booking.paymentStatus === 'Pending') statusCounts.Pending++;
        else if (booking.paymentStatus === 'Completed') statusCounts.Completed++;
    });

    return statusCounts;
}

//todo: formats a date (ex: 2025-04-27) --> "Apr 2025"
function formatDateToMonthYear(dateString) {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}


//todo: groups data by month ---> items is an array of objects (bookings) and dateField is the property name in each object that contains the date 
//ex) if 10 bookings happened in "April 2025", it will store "Apr 2025": 10. 
//using it for chart to show bookings in each month

function groupByMonthYear(items, dateField) {
    const groups = {};
    for (const item of items) {
        const key = formatDateToMonthYear(item[dateField]);
        if (!groups[key]) {
            groups[key] = 1; // if key doesn't exist yet,  initialize with 1
        } else {
            groups[key]++;   // otherwise, increment by 1
        }
    }
    return groups;
}

export function getBookingsPerMonth() {
    return groupByMonthYear(savedBookings.get(), "startDate");
}


//todo: counts how many cars bookings and customers exist.
export function getTotalAnalytics() {
    const totalCars = savedCars.get().length || 0;
    const totalBookings = savedBookings.get().length || 0;
    const totalCustomers = savedCustomers.get().length || 0;
    return { totalCars, totalBookings, totalCustomers };
}



//todo: counts how many cars are in each category (SUV, Sedan, etc..). 
export function getCarCategory() {
    const categoryCounts = {}; // store counts of each category

    const allCars = savedCars.get();
    for (const car of allCars) {
        // get car's category, default to "unknown" if missing
        const category = car.category || "Unknown";

        // if this category doesn't exist in our object yet, initialize it with 0
        if (!categoryCounts[category]) {
            categoryCounts[category] = 0;
        }

        // increment the count for this category
        categoryCounts[category]++;
    }

    return categoryCounts;
}



//todo: sums total revenue per month based on booking's totalAmount.
export function getRevenueOverTime() {
    const revenueByMonth = {}; // store monthly revenue

    const allBookings = savedBookings.get();
    for (const booking of allBookings) {
        // format the booking date 
        const monthYear = formatDateToMonthYear(booking.startDate);

        // if this month doesn't exist in our object yet, initialize it with 0
        if (!revenueByMonth[monthYear]) {
            revenueByMonth[monthYear] = 0;
        }

        // add the booking's amount to the month's total
        // (use 0 if booking.totalAmount is missing or undefined)
        revenueByMonth[monthYear] += booking.totalAmount || 0;
    }

    return revenueByMonth;
}



//todo: counts how many times each car was booked --> sorts and shows top 5 cars. 
export function getMostBookedCars() {

    const bookingCounts = {};
    //1. get all booking data
    const allBookings = savedBookings.get();

    for (const booking of allBookings) {
        const carId = booking.carId;

        // if this car hasn't been booked before --> itnitialize count = 0
        if (!bookingCounts[carId]) {
            bookingCounts[carId] = 0;
        }

        //else; increment booking count for this car
        bookingCounts[carId]++;
    }

    //2. get all car data
    const allCars = savedCars.get();

    // console.log("All car IDs in inventory:", allCars.map(c => c.carId));
    // console.log("Car IDs in bookings:", [...new Set(allBookings.map(b => b.carId))]);

    // array with car names and booking counts
    const carsWithCounts = [];

    for (const carId in bookingCounts) {
        const count = bookingCounts[carId];
        const car = allCars.find(c => c.carId === carId);

        carsWithCounts.push({
            carName: car ? `${car.make} ${car.model} ${car.year}` : "Unknown Car",
            count: count
        });
    }

    // sort desc
    carsWithCounts.sort((a, b) => b.count - a.count);

    // return top 5 most booked cars
    return carsWithCounts.slice(0, 5);
}




//todo: customer signups month-by-month
export function getCustomerRegistrationsOverTime() {
    //get all saved customers
    const allCustomers = savedCustomers.get();

    // grouping by their registration month/year
    const registrationsByMonth = groupByMonthYear(allCustomers, "registrationDate");

    // return the result ex: { "Jan 2023": 5, "Feb 2023": 8 }
    return registrationsByMonth;
}

