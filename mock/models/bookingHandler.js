const bookingHandler = function({bookingId , saveData, getData, validator}){
    return {
    save: (bookings) => {
      if (!Array.isArray(bookings)) {
        console.error("Invalid bookings format.");
        return;
      }
      saveData("bookings", bookings);
    },
    get: () => getData("bookings"),
    getBookingById: (bookingId) => {
      const booking = getData("bookings").find((booking) => {
        return booking.bookingId === bookingId;
      });
      return booking ? booking : null;
    },
    addBooking: function (booking) {
      console.log(validator.checkBookingFields(booking))
      if (!validator.checkBookingFields(booking)) {
        return;
      }
      const bookingObj = { ...booking, bookingId: bookingId() };
      const bookings = this.get();
      this.save([...bookings, bookingObj]);
    },
    editBooking: function (obj, booking, checkBookingExist) {
      console.log("here edt", obj, booking);
      if (checkBookingExist(booking.bookingId)) {
        const bookings = this.get();
        const index = bookings.findIndex(
          (boo) => boo.bookingId === booking.bookingId
        );
        console.log(index);
        if (index !== -1) {
          const editedBooking = { ...bookings[index], ...obj };
          bookings[index] = editedBooking;
          this.save(bookings);
          console.log(
            `Booking with id ${booking.bookingId} updated for user ${booking.customerName}`,
            this.get()
          );
        } else {
          console.log(
            `Booking with id ${booking.bookingId} not found in the list.`
          );
        }
      } else {
        console.log("booking is not found");
      }
    },

    remove: function (booking, checKBookingExist = ()=>true) {
      if (checKBookingExist(booking.bookingId)) {
        const bookings = this.get();
        const index = bookings.findIndex(
          (boo) => boo.bookingId === booking.bookingId
        );
        console.log(index);
        if (index !== -1) {
          const bookingsAfterDelete = [
            ...bookings.slice(0, index),
            ...bookings.slice(index + 1),
          ];
          this.save(bookingsAfterDelete);
          console.log(`Booking with ID ${booking.bookingId} removed.`);
          return true; 
        }
      } else {
        console.log(`Booking with ID ${booking.bookingId} does not exist.`);
        return false; 
      }
    },
  };
}

export default bookingHandler; 