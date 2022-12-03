// Custom exception
class AbortTransaction extends Error {
  constructor(message) {
    super(message);
    this.name = 'Transaction aborted';
  }
}

// Account
class Account {
  constructor({ name, balance, password }) {
    this.name = name;
    this.balance = this.validateAmount(balance);
    this.password = password;

    if (Object.keys(arguments[0]).length != 3)
      throw new AbortTransaction('All fields required');
  }

  validateAmount(amount) {
    console.log('amount:', amount);
    if (isNaN(parseFloat(amount)))
      throw new AbortTransaction('Amount must be an integer');
    if (amount < 0) throw new AbortTransaction('Amount must be positive');

    return amount;
  }

  checkPasswordMatch(password) {
    if (password != this.password) throw new AbortTransaction('Incorrect Password');
  }

  deposit(amountToDeposit) {
    amountToDeposit = this.validateAmount(amountToDeposit);
    this.balance = this.balance + amountToDeposit;
    return this.balance;
  }

  withdraw(amountToWithdraw) {
    amountToWithdraw = this.validateAmount(amountToWithdraw);
    if (amountToWithdraw > this.balance) throw new AbortTransaction('Insufficient funds');

    this.balance = this.balance - amountToWithdraw;
  }

  getBalance() {
    return this.balance;
  }

  show() {
    console.log('       Name:', this.name);
    console.log('       Balance:', this.balance);
    console.log('       Password:', this.password);
  }
}

module.exports = {
  AbortTransaction,
  Account,
};
