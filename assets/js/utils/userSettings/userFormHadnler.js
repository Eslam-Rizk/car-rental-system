import { savedCustomers, customersFilter } from '../../../../mock/storage/seedStorage.js';
import { updateUserProfileDisplay } from '../profileBookingHistoryUtils.js';
export class SettingsFormHandler {
    constructor(id) {
      this.currentCustomer = null;
      this.formElements = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address'),
        password: document.getElementById('password')
      };
  
      this.loadCustomerData(id);
    }
  
    loadCustomerData(customerId) {
      if (!customerId) {
        const loggedInCustomerData = localStorage.getItem('loggedInCustomer');
        if (loggedInCustomerData) {
          const customer = JSON.parse(loggedInCustomerData);
          customerId = customer.customerId;
        }
      }
  
      if (!customerId) {
        console.error('No customer ID provided');
        return;
      }
  
      this.currentCustomer = savedCustomers.getCustomerById(customerId);
  
      if (!this.currentCustomer) {
        console.error('Customer not found');
        return;
      }
  
      // Fill form fields with customer data
      this.formElements.fullName.value = this.currentCustomer.name || '';
      this.formElements.email.value = this.currentCustomer.email || '';
      this.formElements.phone.value = this.currentCustomer.phone || '';
      this.formElements.address.value = this.currentCustomer.address || '';
      // Don't populate password field for security
      this.formElements.password.value = '';
    }
  
    getChangedFormData() {
      const changes = {};
  
      // Only add fields that have changed
      if (this.formElements.fullName.value !== this.currentCustomer.name) {
        changes.name = this.formElements.fullName.value;
      }
  
      if (this.formElements.email.value !== this.currentCustomer.email) {
        changes.email = this.formElements.email.value;
      }
  
      if (this.formElements.phone.value !== this.currentCustomer.phone) {
        changes.phone = this.formElements.phone.value;
      }
  
      if (this.formElements.address.value !== this.currentCustomer.address) {
        changes.address = this.formElements.address.value;
      }
  
      // Only include password if it's not empty (user wants to change it)
      if (this.formElements.password.value) {
        changes.password = this.formElements.password.value;
      }
  
      return changes;
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
  
      if (!this.currentCustomer) {
        console.error('No customer loaded');
        return;
      }
  
      // Get only changed fields
      const changedData = this.getChangedFormData();
  
      // If email changed, check if new email already exists
      if (changedData.email && changedData.email !== this.currentCustomer.email) {
        if (customersFilter.checkCustomerExist(changedData.email)) {
          alert('A customer with this email already exists.');
          return;
        }
      }
  
      // Only proceed if there are actual changes
      if (Object.keys(changedData).length === 0) {
        alert('No changes detected.');
        return;
      }
  
      try {
        // Update customer with changed fields only
        savedCustomers.editCustomer(
          changedData,
          this.currentCustomer,
          customersFilter.checkCustomerExist
        );
  
        // Refresh customer data
        this.loadCustomerData(this.currentCustomer.customerId);
        updateUserProfileDisplay(this.currentCustomer.customerId);
  
        alert('Customer information updated successfully!');
      } catch (error) {
        console.error('Error updating customer:', error);
        alert('Failed to update customer information.');
      }
    }
  }