const { AbortTransaction, Account } = require('./account');

// Bank class - Object manager object
class Bank {
  constructor({ hours, address, phone }) {
    this.accountsObj = {};
    this.nextAccountNumber = 0;
    this.hours = hours;
    this.address = address;
    this.phone = phone;
  }

  askForValidAccountNumber() {}

  getUsersAccount() {}

  askForValidPassword() {}

  createAccount() {}

  openAccount() {}

  closeAccount() {}

  balance() {}

  deposit() {}

  withdraw() {}

  getInfo() {}

  // For bank admin
  show() {}
}

module.exports = { Bank };
