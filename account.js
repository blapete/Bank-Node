/* custom exception */
class AbortTransaction extends Error {
    constructor(message) {
        super(message);
        this.name = 'Transaction aborted';
    }
}

/* account class*/
class Account {
    constructor(userName, userPassword, userStartingAmount, formatter) {
        if (!userName || !userPassword || !userStartingAmount) throw new AbortTransaction('All fields required');

        this.name = userName;
        this.password = userPassword;
        this.formatter = formatter;
        this.balance = this.validateAmount(userStartingAmount);
    }

    validateAmount(amount) {
        if (isNaN(Number(amount))) throw new AbortTransaction('Amount must be a valid value');
        if (amount < 0) throw new AbortTransaction('Amount must be positive');
        return this.formatter(amount);
    }

    checkPasswordMatch(password) {
        if (password != this.password) throw new AbortTransaction('Incorrect Password');
    }

    deposit(amountToDeposit) {
        amountToDeposit = this.validateAmount(amountToDeposit);
        this.balance = parseFloat(this.balance) + parseFloat(amountToDeposit);
        return { amountDeposited: amountToDeposit, newBalance: this.balance };
    }

    withdraw(amountToWithdraw) {
        amountToWithdraw = this.validateAmount(amountToWithdraw);
        if (parseFloat(amountToWithdraw) > parseFloat(this.balance)) throw new AbortTransaction('Insufficient funds');
        this.balance = parseFloat(this.balance) - parseFloat(amountToWithdraw);
        return this.balance;
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
