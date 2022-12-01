class Account {
  constructor(name, balance, password) {
    this.name = name;
    this.balance = validateAmount(balance);
    this.password = password;
  }

  validateAmount(amount) {}

  checkPasswordMatch(password) {
    if (password != this.password) {
    }
  }

  deposit() {}

  getBalance() {
    return this.balance;
  }

  withdraw() {}

  show() {
    console.log('       Name:', this.name);
    console.log('       Balance:', this.balance);
    console.log('       Password:', this.password);
  }
}
