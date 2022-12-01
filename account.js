// Custom exception
const AbortTransaction = (message) => ({
  error: new Error(message),
  code: 'VALIDATION_ERROR',
});

class Account {
  constructor(password) {
    // this.name = name;
    // this.balance = validateAmount(balance);
    this.password = password;
  }

  //   validateAmount(amount) {}

  checkPasswordMatch(password) {
    if (password != this.password) {
      throw AbortTransaction('an example error');
    }
  }

  //   deposit() {}

  //   getBalance() {
  //     return this.balance;
  //   }

  //   withdraw() {}

  show() {
    console.log('       Name:', this.name);
    console.log('       Balance:', this.balance);
    console.log('       Password:', this.password);
  }
}

const oAccount = new Account('test');

// console.log(oAccount);

console.log(oAccount.checkPasswordMatch('test1'));
