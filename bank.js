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
        let userAccountNumber = await this.createAccount({
            name: userName,
            password: userPassword,
            amount: userStartingAmount,
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
        let theBalance = await theAccount.getBalance();
        console.log('Total balance: ', theBalance);
    }

    async deposit(promptUser) {
        console.log(' *** Deposit ***');
        let theAccount = await this.getUsersAccount(promptUser);
        let depositAmount = await promptUser('Amount: ');
        let theBalance = await theAccount.deposit(depositAmount);
        console.log(`\nDeposited: ${depositAmount}\nYour new balance is: ${theBalance}`);
    }

    async withdraw(promptUser) {
        console.log(' *** Withdraw ***');
        let theAccount = await this.getUsersAccount(promptUser);
        let userAmount = await promptUser('Amount: ');
        let theBalance = theAccount.withdraw(userAmount);
        console.log('You new balance is: ', theBalance);
    }

    getInfo() {
        return console.log(`hours: ${this.hours} \nAddress: ${this.address} \nPhone: ${this.phone}`);
    }

    /* for bank admin */
    async admin(promptUser) {
        console.log('*** Admin Login ***');
        let access = await promptUser('What is the admin password? ');
        if (access != this.#bankAdminPassword) throw new AbortTransaction('Authentication failed');
        if (!Object.keys(this.accountsObj).length) return console.log(`\nThere are no accounts yet at ${this.name}`);

        // print each account as a string to the terminal
        for (const acct of Object.keys(this.accountsObj)) {
            let out = `Account # ${acct} `;

            for (let i = 0; i < Object.keys(this.accountsObj[acct]).length; i++) {
                out += ` ${Object.keys(this.accountsObj[acct])[i]}: ${this.accountsObj[acct][Object.keys(this.accountsObj[acct])[i]]}`;
            }
            console.log(out);
        }
    }
}

module.exports = { Bank };
