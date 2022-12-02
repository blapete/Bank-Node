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

  openAccount() {
    console.log('*** Open Account ***');
  }

  closeAccount() {
    console.log('*** Close Account ***');
  }

  balance() {
    console.log('*** Get Balance ***');
  }

  deposit() {
    console.log(' *** Deposit ***');
  }

  withdraw() {
    console.log(' *** Withdraw ***');
  }

  getInfo() {
    console.log(`hours: ${this.hours} \nAddress: ${this.address} \nPhone: ${this.phone}`);
  }

  // For bank admin
  show() {}
}

module.exports = { Bank };
