const readline = require('readline');
const { Bank } = require('./bank');

// bank instance
const theBank = new Bank({
  hours: 10 - 2,
  address: '123 Michigan Ave',
  phone: '1234567890',
});

// main program--------------------------------------------------------
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = (questionText) => {
  return new Promise((resolve) => {
    readlineInterface.question(questionText, (input) => resolve(input));
  });
};

const startBank = async () => {
  while (true) {
    console.log();
    console.log('To get an account balance, press b');
    console.log('To close an account, press c');
    console.log('To make a deposit, press d');
    console.log('To get bank information, press i');
    console.log('To open a new accout, press o');
    console.log('To quit, press q');
    console.log('To show all accounts, press s');
    console.log('To make a withdrawal, press w');
    console.log();

    let action = await promptUser('What would you like to do? ');
    console.log();

    try {
      if (action === 'b') {
        theBank.balance();
      } else if (action === 'c') {
        theBank.closeAccount();
      } else if (action === 'd') {
        theBank.deposit();
      } else if (action === 'i') {
        theBank.getInfo();
      } else if (action === 'o') {
        theBank.openAccount(promptUser);
        let thing = await promptUser('What would you like to do? ');
      } else if (action === 'q') {
        process.exit();
      } else if (action === 's') {
        theBank.show();
      } else if (action === 'w') {
        theBank.withdraw();
      } else {
        process.exit();
      }
    } catch (e) {}
  }
};

startBank();
