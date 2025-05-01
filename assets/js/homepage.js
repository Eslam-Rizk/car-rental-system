import { attachNavAndFooter } from "./utils/navUtils.js";
import { cars } from "../../mock/data/carsSeed.js";
import { displayTopRatedCars } from "./utils/carUtils.js";
import { seedStorage } from "../../mock/storage/seedStorage.js";

seedStorage();

//nav bar functionality
attachNavAndFooter();

document.querySelectorAll(".car-listings-btn").forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = "listings.html";
  });
});

displayTopRatedCars(cars);