const { AbortTransaction, Account } = require('./account');

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

  // for bank admin
  show() {}
}

const oAccount = new Account({ name: 'peter', balance: 4.5, password: 'test' });

console.log(oAccount);
