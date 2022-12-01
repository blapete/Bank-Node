const { AbortTransaction, Account } = require('./account');

const oAccount = new Account({ name: 'peter', balance: 4.5, password: 'test' });

console.log(oAccount);
