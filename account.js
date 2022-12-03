// Custom exception
class AbortTransaction extends Error {
  constructor(message) {
    super(message);
    this.name = 'Transaction aborted';
  }
}

// Account
class Account {
  constructor(userName, userStartingAmount, userPassword) {
    this.name = userName;
    this.balance = this.validateAmount(userStartingAmount);
    this.password = userPassword;

    if (Object.keys(arguments).length != 3)
      throw new AbortTransaction('All fields required');
  }

  validateAmount(amount) {
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
