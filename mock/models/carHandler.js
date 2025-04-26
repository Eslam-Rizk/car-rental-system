// --------------------------------------------------Cars data handler
const carHandler = function ({ carId, saveData, getData, validator }) {
  return {
    save: (data) => saveData("cars", data),

    get: () => getData("cars"),

    getCarById: function (carId) {

      const car = this.get().find((car) => {
        return car.carId === carId;
      });

      return car ? car : null;
    },
    addCar: function (car, checkCarExist) {
      if (!validator.checkCarFields(car)) {
        return;
      }
      const make = car.make;
      const model = car.model;
      const year = car.year;
      console.log(checkCarExist(make, model, year));
      if (!checkCarExist(car.make, car.model, car.year)) {
        console.log(carId());
        const carObj = { ...car, carId: carId() };
        const cars = this.get();
        this.save([...cars, carObj]);
      }
    },

    editCar: function (obj, car, checkCarExist) {

      const make = car.make;
      const model = car.model;
      const year = car.year;

      if (checkCarExist(make, model, year)) {
        console.log("found in edit");
        const cars = this.get();
        const index = cars.findIndex((c) => c.make === car.make && c.model === car.model && c.year === car.year);
        console.log(index);
        if (index !== -1) {
          const editedCar = { ...cars[index], ...obj };
          cars[index] = editedCar;
          this.save(cars);
          console.log("Cars after edit:", this.get());
        }
      } else {
        console.log("Car not found in list for editing:", car);
      }
    },

    removeCar: function (carId) {
      if (!isNaN(carId)) {
        console.log("Car not found for removal:", carId);
        return;
      }

      const cars = this.get();
      const index = cars.findIndex((c) => c.carId === carId);

      if (index !== -1) {
        const afterDeletion = cars.filter((_, idx) => idx !== index);
        this.save(afterDeletion);
        console.log("Car removed:", afterDeletion);
      } else {
        console.log("Car not found for removal:", carId);
      }
    },
  };
};
export default carHandler;
