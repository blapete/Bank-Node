// Custom exception
class AbortTransaction extends Error {
  constructor(message) {
    super(message);
    this.name = 'Transaction aborted';
  }
}

class Account {
  constructor(name, balance, password) {
    this.name = name;
    this.balance = this.validateAmount(balance);
    this.password = password;
  }

  validateAmount(amount) {
    console.log(amount);
  }

  checkPasswordMatch(password) {
    if (password != this.password) {
      throw new AbortTransaction('Incorrect Password');
    }
  }

  deposit(amountToDeposit) {
    amountToDeposit = this.validateAmount(amountToDeposit);
    this.balance = this.balance + amountToDeposit;
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  withdraw(amountToWithdraw) {
    amountToWithdraw = this.validateAmount(amountToWithdraw);
    if (amountToWithdraw > this.balance) throw new AbortTransaction('Insufficient funds');

    this.balance = this.balance - amountToWithdraw;
  }

  show() {
    console.log('       Name:', this.name);
    console.log('       Balance:', this.balance);
    console.log('       Password:', this.password);
  }
}

const oAccount = new Account('test');

// console.log(oAccount);

// console.log(oAccount.checkPasswordMatch('test1'));

// console.log(oAccount.show());
