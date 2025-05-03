import {
    getBookingsPerMonth,
    getCarCategory,
    getRevenueOverTime,
    getMostBookedCars,
    getCustomerRegistrationsOverTime,
    getBookingStatusCounts,
    getTotalAnalytics

} from './utils/dashboardAnalytics.js';
import { authDashboard } from './utils/dashboardUtils.js';
import { getAdminSettings } from './utils/dashboardUtils.js';
import { logout } from "./utils/navUtils.js";

// auth
authDashboard()

// ========SIDEBAR========
// logout 
logout();

//for settings tab
getAdminSettings()

//manage tab
// *insert functions here*

// ================= CHART RENDERING =================
document.addEventListener('DOMContentLoaded', () => {
    renderBookingsChart();
    renderRevenueChart();
    renderTopCarsChart();
    renderCarCategoryChart();
    renderCustomerSignupsChart();
});

//cards for Status 
const statusCounts = getBookingStatusCounts();
document.getElementById("cancelled-count").textContent = statusCounts.Cancelled;
document.getElementById("pending-count").textContent = statusCounts.Pending;
document.getElementById("completed-count").textContent = statusCounts.Completed;

const allMonths = [
    'Jan 2025', 'Feb 2025', 'Mar 2025',
    'Apr 2025', 'May 2025', 'Jun 2025',
    'Jul 2025', 'Aug 2025', 'Sep 2025',
    'Oct 2025', 'Nov 2025', 'Dec 2025'
];


//chart.js to show bookings in each month 
function renderBookingsChart() {
    const data = getBookingsPerMonth();
    const ctx = document.getElementById('bookingsChart').getContext('2d');

    const values = allMonths.map(month =>
        data[month] || 0
    );

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allMonths,
            datasets: [{
                data: values,
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                tension: 0.1,
                borderRadius: 4,
                barThickness: 16,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: false },
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        callback: function (value) {
                            if (value % 1 === 0) return value;
                        },
                        color: '#5f5f5f'
                    },
                    title: {
                        display: true,
                        text: 'Number of Bookings',
                        color: '#4f46e5',
                        font: {
                            weight: 'bold',
                            size: 12,
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months',
                        color: '#4f46e5',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    },
                    ticks: {
                        color: '#5f5f5f'
                    }
                }
            }
        }
    });
}

// donught chart for car categories 
function renderCarCategoryChart() {
    const data = getCarCategory();
    const ctx = document.getElementById('carCategoriesChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgb(117, 111, 228)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',

                },
                title: {
                    display: false,
                    text: 'Car Categories Distribution'
                }
            }
        }

    });
}


//show total analytics for cars customers and bookings
const totalAnalytics = getTotalAnalytics()
document.getElementById("cars-count").textContent = totalAnalytics.totalCars;
document.getElementById("customers-count").textContent = totalAnalytics.totalCustomers;
document.getElementById("bookings-count").textContent = totalAnalytics.totalBookings;


// monthly revenue
function renderRevenueChart() {
    const data = getRevenueOverTime();
    const ctx = document.getElementById('revenueChart').getContext('2d');

    const values = allMonths.map(month =>
        data[month]
    )

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: allMonths,
            datasets: [{
                label: 'Revenue ($)',
                data: values,
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                borderWidth: 2,
                pointRadius: 5,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: false },
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }

            },

        },

    });
}

// top 5 booked cars (horizontal bar chart)
function renderTopCarsChart() {
    const data = getMostBookedCars();
    const ctx = document.getElementById('top5Cars').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.carName),
            datasets: [{
                data: data.map(item => item.count),
                backgroundColor: '#4f46e5'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: { display: false },
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            }
        }
    });
}



//customer signups per month
function renderCustomerSignupsChart() {
    const data = getCustomerRegistrationsOverTime();
    const ctx = document.getElementById('customerSignUps').getContext('2d');

    const values = allMonths.map(month =>
        data[month]
    )

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: allMonths,
            datasets: [{
                label: 'Revenue ($)',
                data: values,
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                borderWidth: 2,
                pointRadius: 5,
                spanGaps: true

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: false },
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }

            },

        },

    });
}

