const { AbortTransaction, Account } = require('./account');

// Bank class - Object manager object
class Bank {
  #password;

  constructor({ name, hours, address, phone, adminPassword }) {
    this.accountsObj = {};
    this.nextAccountNumber = 0;
    this.name = name;
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
  async admin(promptUser) {
    console.log('*** Admin Login ***');
    let access = await promptUser('What is the admin password? ');
    if (access != this.#bankAdminPassword)
      throw new AbortTransaction('Incorrect Password');
    if (!Object.keys(this.accountsObj).length)
      return console.log(`There are no accounts yet at ${this.name}`);
    for (const key of Object.keys(this.accountsObj)) {
      console.log(`Account # ${key}: `, this.accountsObj[key]);
    }
  }
}

module.exports = { Bank };
