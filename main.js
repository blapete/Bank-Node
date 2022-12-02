const { Bank } = require('./bank');
const readline = require('readline');

// bank instance
const oBank = new Bank({
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
  console.log(`
  To get an account balance, press b
  To close an account, press c
  To make a deposit, press d
  To get bank information, press i
  To open a new accout, press o
  To quit, press q
  To show all accounts, press s
  To make a withdrawal, press w
`);
  let decision = await promptUser('What would you like to do? ');
  // do something

  if (decision === 'b') {
    startBank();
  } else if (decision === 'q') {
    process.exit();
  } else {
    console.log('else');
    process.exit();
  }
};

startBank();
