const customerHandler = function ({
  customerId,
  saveData,
  getData,
  validator,
}) {
  return {
    save: (customers) => saveData("customers", customers),
    get: () => getData("customers"),

    addCustomer: function (customer, checkCustomerExist) {
      console.log(validator.checkCustomerFields(customer));
      if (!validator.checkCustomerFields(customer)) {
        return;
      }
      if (!checkCustomerExist(customer.email)) {
        const customerObj = { ...customer, customerId: customerId() };
        const customers = this.get();
        this.save([...customers, customerObj]);
        console.log(
          `Customer with ID ${customerObj.customerId} added successfully.`
        );
      } else {
        console.log(`Customer with email ${customer.email} already exists.`);
      }
    },
    getCustomerById: (customerId) => {
      const customer = getData("bookings").find((customer) => {
        return customer.customerId === customerId;
      });
      return customer ? customer : null;
    },
    editCustomer: function (obj, customer, checkCustomerExist) {
      console.log("here edt", obj, customer);
      if (checkCustomerExist(customer.email)) {
        const customers = this.get();
        const index = customers.findIndex(
          (cust) => cust.email === customer.email
        );
        console.log(index);
        if (index !== -1) {
          const editedCustomer = { ...customers[index], ...obj };
          customers[index] = editedCustomer;
          this.save(customers);
          console.log(
            `Customer with ID ${customer.customerId} updated for user ${customer.customerName}`,
            this.get()
          );
        } else {
          console.log(
            `Customer with ID ${customer.customerId} not found in the list.`
          );
        }
      } else {
        console.log(`Customer with ID ${customer.customerId} does not exist.`);
      }
    },
    removeCustomer: function (customer, checKCustomerExist) {
      if (checKCustomerExist(customer.email)) {
        const customers = this.get();
        const index = customers.findIndex(
          (boo) => boo.email === customer.email
        );
        console.log(index);
        if (index !== -1) {
          const customersAfterDelete = [
            ...customers.slice(0, index),
            ...customers.slice(index + 1),
          ];
          this.save(customersAfterDelete);
          console.log(`Customer with email ${customer.email} removed.`);
        }
      } else {
        console.log(
          `Customer with email ${customer.customerId} does not exist.`
        );
      }
    },
  };
};

export default customerHandler; 