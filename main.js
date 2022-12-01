// Main program
// Controls a Bank made up of Accounts
const { Bank } = require('./bank');

// Bank instance
const oBank = new Bank({
  hours: 10 - 2,
  address: '123 Michigan Ave',
  phone: '1234567890',
});

// Main
while (true) {
  console.log('');
  console.log('To get an account balance, press b');
  console.log('To close an account, press c');
  console.log('To make a deposit, press d');
  console.log('To get bank information, press i');
  console.log('To open a new account, press o');
  console.log('To quit, press q');
  console.log('To show all accounts, press s');
  console.log('To make a withdrawal, press w ');
  console.log('');
}
