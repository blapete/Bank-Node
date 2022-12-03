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

  createAccount({ name, password, amount }) {
    let theAccount = new Account(name, password, amount);
    let newAccountNumber = this.nextAccountNumber;
    this.accountsObj[newAccountNumber] = theAccount;
    this.nextAccountNumber = this.nextAccountNumber + 1;
    return newAccountNumber;
  }

  async openAccount(promptUser) {
    console.log('*** Open Account ***');
    let userName = await promptUser('What is your username? ');
    let userPassword = await promptUser('Create a new password ');
    let userStartingAmount = await promptUser('How much is your initial deposit? ');
    let userAccountNumber = this.createAccount({
      name: userName,
      password: userPassword,
      amount: userStartingAmount,
    });
    console.log('Account created, account # ', userAccountNumber);
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
