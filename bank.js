const { AbortTransaction, Account } = require('./account');

/* bank class - object manager object */
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

    getInfo() {
        return console.log(`hours: ${this.hours} \nAddress: ${this.address} \nPhone: ${this.phone}`);
    }

    currencyFormatter(amount) {
        return (
            Number(amount)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' USD'
        );
    }

    validateAmount(amount) {
        if (isNaN(Number(amount))) throw new AbortTransaction('Amount must be a valid value');
        if (amount < 0) throw new AbortTransaction('Amount must be positive');
        return this.currencyFormatter(amount);
    }

    async askForValidAccountNumber(promptUser) {
        let accountNumber = await promptUser('What is your account number? ');
        if (isNaN(parseInt(accountNumber))) throw new AbortTransaction('Amount must be an integer');
        if (!(accountNumber in this.accountsObj)) throw new AbortTransaction(`There is no account  ${accountNumber} `);
        return accountNumber;
    }

    async getUsersAccount(promptUser) {
        let accountNumber = await this.askForValidAccountNumber(promptUser);
        let theAccount = this.accountsObj[accountNumber];
        await this.askForValidPassword(promptUser, theAccount);
        return theAccount;
    }

    async askForValidPassword(promptUser, theAccount) {
        let password = await promptUser('Please enter your password ');
        theAccount.checkPasswordMatch(password);
    }

    async createAccount({ name, password, amount }) {
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
        let validatedAmount = this.validateAmount(userStartingAmount);
        let userAccountNumber = await this.createAccount({
            name: userName,
            password: userPassword,
            amount: validatedAmount,
        });
        console.log('Account created, account # ', userAccountNumber);
    }

    async closeAccount(promptUser) {
        console.log('*** Close Account ***');
        let userAccountNumber = await this.askForValidAccountNumber(promptUser);
        let theAccount = this.accountsObj[userAccountNumber];
        await this.askForValidPassword(promptUser, theAccount);
        let theBalance = theAccount.getBalance();
        console.log('You had ', theBalance, ' in your account, returned to you');
        delete this.accountsObj[userAccountNumber];
        console.log('You account is now closed');
    }

    async balance(promptUser) {
        console.log('*** Get Balance ***');
        let theAccount = await this.getUsersAccount(promptUser);
        await theAccount.getBalance();
    }

    async deposit(promptUser) {
        console.log(' *** Deposit ***');
        let theAccount = await this.getUsersAccount(promptUser);
        let depositAmount = await promptUser('Amount: ');
        let validatedAmount = this.validateAmount(depositAmount);
        let { amountDeposited, newBalance } = await theAccount.deposit(validatedAmount);
        console.log('\nDeposited: ', amountDeposited, '\nYour new balance is: ', this.currencyFormatter(newBalance));
    }

    async withdraw(promptUser) {
        console.log(' *** Withdraw ***');
        let theAccount = await this.getUsersAccount(promptUser);
        let userAmount = await promptUser('Amount: ');
        let validatedAmount = this.validateAmount(userAmount);
        let theBalance = theAccount.withdraw(validatedAmount);
        console.log('You new balance is: ', this.currencyFormatter(theBalance));
    }

    /* for bank admin */
    async admin(promptUser) {
        console.log('*** Admin Login ***');
        let access = await promptUser('What is the admin password? ');
        if (access != this.#bankAdminPassword) throw new AbortTransaction('Authentication failed');
        if (!Object.keys(this.accountsObj).length) return console.log(`\nThere are no accounts yet at ${this.name}`);

        // print out accounts
        for (const acctNum in this.accountsObj) {
            var str = `Account #  ${acctNum} --->`;
            for (const prop in this.accountsObj[acctNum]) {
                str += ` ${prop} ${this.accountsObj[acctNum][prop]}`;
            }
            console.log(str);
        }
    }
}

module.exports = { Bank };
