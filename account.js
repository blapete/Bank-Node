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
        this.balance = userStartingAmount;
    }

    checkPasswordMatch(password) {
        if (password != this.password) throw new AbortTransaction('Incorrect Password');
    }

    deposit(amountToDeposit) {
        amountToDeposit = amountToDeposit;
        this.balance = parseFloat(this.balance) + parseFloat(amountToDeposit);
        return { amountDeposited: amountToDeposit, newBalance: this.balance };
    }

    withdraw(amountToWithdraw) {
        amountToWithdraw = amountToWithdraw;
        if (parseFloat(amountToWithdraw) > parseFloat(this.balance)) throw new AbortTransaction('Insufficient funds');
        this.balance = parseFloat(this.balance) - parseFloat(amountToWithdraw);
        return this.balance;
    }

    getBalance() {
        return this.balance;
    }

    show() {
        console.log('\n       Name:', this.name);
        console.log('       Balance:', this.balance);
        console.log('       Password:', this.password);
    }
}

module.exports = {
    AbortTransaction,
    Account,
};
