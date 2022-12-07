/* custom exception */
class AbortTransaction extends Error {
    constructor(message) {
        super(message);
        this.name = 'Transaction aborted';
    }
}

/* account class*/
class Account {
    constructor(userName, userPassword, userStartingAmount) {
        if (!userName || !userPassword || !userStartingAmount) throw new AbortTransaction('All fields required');

        this.name = userName;
        this.password = userPassword;
        this.balance = this.validateAmount(userStartingAmount);
    }

    validateAmount(amount) {
        if (isNaN(Number(amount))) throw new AbortTransaction('Amount must be a valid value');
        if (amount < 0) throw new AbortTransaction('Amount must be positive');
        return Math.round(Number(amount) * 1e2) / 1e2;
    }

    checkPasswordMatch(password) {
        if (password != this.password) throw new AbortTransaction('Incorrect Password');
    }

    deposit(amountToDeposit) {
        amountToDeposit = this.validateAmount(amountToDeposit);
        this.balance = this.balance + Number(amountToDeposit);
        return this.balance.toFixed(2);
    }

    withdraw(amountToWithdraw) {
        amountToWithdraw = this.validateAmount(amountToWithdraw);
        if (amountToWithdraw > this.balance) throw new AbortTransaction('Insufficient funds');
        this.balance = this.balance - amountToWithdraw;
        return this.balance.toFixed(2);
    }

    getBalance() {
        return this.balance.toFixed(2);
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
