// document.addEventListener("DOMContentLoaded", function () {
//     const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));
//     const loginBtn = document.getElementById("loginBtn");
//     const profileDropdown = document.getElementById("profileDropdown");
//     const nameDisplay = document.getElementById("nameDisplay");
//     const logoutBtn = document.getElementById("logoutBtn");

//     if (loggedInCustomer) {
//         loginBtn.style.display = "none";
//         profileDropdown.style.display = "flex";
//         nameDisplay.textContent = loggedInCustomer.name;

//         // logout
//         logoutBtn.addEventListener("click", function (e) {
//             e.preventDefault();
//             localStorage.removeItem("loggedInCustomer");
//             window.location.href = "index.html";
//         });
//     } else {
//         loginBtn.style.display = "block";
//         profileDropdown.style.display = "none";
//     }
// });

//car listings functionality
// function carListingsPreview() {
//     for (let i = 0; i < 3; i++) {
//         const car = cars[i];
//         const carId = `car${i + 1}`;
//         const carCard = `
//         <div class="car-card p-3">
//           <img src="${car.imageUrl[0]}" alt="${car.make} ${car.model}" />
//           <div class="car-details mt-3">
//             <div class="car-headline d-flex justify-content-between mb-3">
//               <h3 class="m-0">${car.make} ${car.model}</h3>
//               <div class="car-type"><span>${car.category}</span></div>
//             </div>
//             <div class="car-details-icons mb-2">
//               <i class="bi bi-person-fill me-4"><span class="ms-1">${car.passengerCapacity}</span></i>
//               <i class="bi bi-suitcase me-4"><span class="ms-1">${car.luggageCapacity}</span></i>
//               <i class="bi bi-car-front-fill me-4"><span class="ms-1">${car.transmission}</span></i>
//             </div>
//           </div>

//           <div class="car-price mt-3 d-flex align-items-center justify-content-between">
//             <h4 class="fs-5 m-0">
//               ${car.dailyRate} EGP <span class="fs-6 darkgrey">/Per Day</span>
//             </h4>
//             <a href="car-details.html?id=${car.carId}" class="text-black"><i class="bi bi-arrow-up-right-circle fs-4"></i></a>
//           </div>
//         </div>
//       `;

//         // populate dynamically into the homepage 
//         document.getElementById(carId).innerHTML = carCard;
//     }
// }
// carListingsPreview()

import { checkLogin, logout } from "../../utils/navUtils.js";
import { cars } from "../../mock/data/carsSeed.js";
import { setElementText, setImage, setElementHref } from "../../utils/carUtils.js"
import { seedStorage } from "../../mock/storage/seedStorage.js";
// Initialize storage
seedStorage();

//nav bar functionality
checkLogin();
logout();

// car preview
function displayTopRatedCars(cars) {
  const topRatedCars = cars
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  topRatedCars.forEach((topCar, index) => {
    const carName = `${topCar.make} ${topCar.model} ${topCar.year}`;

    setImage(`top${index + 1}-img`, topCar.imageUrl[0], carName);
    setElementText(`top${index + 1}-name`, carName);
    setElementText(`top${index + 1}-category`, topCar.category || 'N/A');
    setElementText(`top${index + 1}-seats`, `${topCar.passengerCapacity || 'N/A'} people`);
    setElementText(`top${index + 1}-luggage`, `${topCar.luggageCapacity || 'N/A'} bags`);
    setElementText(`top${index + 1}-transmission`, topCar.transmission || 'N/A');
    setElementText(`top${index + 1}-price`, `$${topCar.dailyRate || 'N/A'}`);
    setElementHref(`top${index + 1}-id`, topCar.carId ? `car-details.html?id=${topCar.carId}` : '#');
  });
}
displayTopRatedCars(cars)