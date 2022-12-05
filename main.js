const readline = require('readline');
const { Bank } = require('./bank');

/* bank instance for development*/
const theBank = new Bank({
   name: 'bank of chicago',
   hours: '10 - 2',
   address: '123 Michigan Ave',
   phone: '1234567890',
   adminPassword: 'testing',
});

/* user interface */
const selections = [
   '',
   'To open a new accout, press o',
   'To make a deposit, press d',
   'To make a withdrawal, press w',
   'To get an account balance, press b',
   'To close an account, press c',
   'To get bank information, press i',
   'To show all accounts, press s',
   'To quit, press q',
   '',
];

const readlineInterface = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const promptUser = (questionText) => {
   return new Promise((resolve) => {
      readlineInterface.question(questionText, (input) => resolve(input.toLowerCase()));
   });
};

/* main program-------------------------------------------------------- */
(async () => {
   while (true) {
      for (const selection of selections) {
         await new Promise((resolve) => setTimeout(resolve, 50));
         console.log(selection);
      }

      let action = await promptUser('What would you like to do? ');
      console.log();

      try {
         if (action === 'b') {
            await theBank.balance(promptUser);
         } else if (action === 'c') {
            theBank.closeAccount();
         } else if (action === 'd') {
            theBank.deposit();
         } else if (action === 'i') {
            theBank.getInfo();
         } else if (action === 'o') {
            await theBank.openAccount(promptUser);
         } else if (action === 's') {
            await theBank.admin(promptUser);
         } else if (action === 'w') {
            theBank.withdraw();
         } else if (action === 'q') {
            process.exit();
         } else {
            console.log('Please select a valid option');
         }
      } catch (e) {
         console.error(`\n${e.name}: ${e.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
   }
})();
