const { AbortTransaction, Account } = require('./account');

// Bank class - Object manager object
class Bank {
  #password;

  constructor({ hours, address, phone, adminPassword }) {
    this.accountsObj = {};
    this.nextAccountNumber = 0;
    this.hours = hours;
    this.address = address;
    this.phone = phone;
    this.#bankAdminPassword = adminPassword;
  }

  get #bankAdminPassword() {
    return this.#password;
  }

  set #bankAdminPassword(adminPassword) {
    this.#password = adminPassword;
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
  show(password) {
    if (password === this.#bankAdminPassword) {
      return 'passwords match';
    } else {
      return 'not a match';
    }
  }
}

const theBank = new Bank({
  hours: 10 - 2,
  address: '123 Michigan Ave',
  phone: '1234567890',
  adminPassword: 'testing',
});

console.log(theBank.show('testing'));

module.exports = { Bank };
