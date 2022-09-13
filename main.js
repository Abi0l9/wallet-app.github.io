import { log } from './logger'

log('Import works!')
//User Accounts 
const account1 = {
  owner: 'Ibrahim Qaasim Ajagbe',
  acctNumber: 1234567890,
  location: 'Lagos',
  transactions: [2000, -600, 150, 20, -850, -99, 5]
};

const account2 = {
  owner: 'Akintunde Cadet Yetunde',
  acctNumber: 1234567891,
  location: 'Ondo',
  transactions: [15, -5, 100, 200, -50, 19, -12]
}

const account3 = {
  owner: 'Oyedeji Monsur Oyewale',
  acctNumber: 1234567892,
  location: 'Ogun State',
  transactions: [15000, 340, -5000, 3000],
}

const account4 = {
  owner: 'Kate Williams Ngozi',
  acctNumber: 1234567893,
  location: 'Anambra',
  transactions: [2500, 1000, -500, -500, -500, -800],
}

const account5 = {
  owner: 'Audu Kifayah Danjuma',
  acctNumber: 1234567894,
  location: 'Kaduna',
  transactions: [3000, 200, 650, 180 , -870 - 320],
}

const accounts = [account1, account2, account3, account4, account5];


//Objects 
const welcome = document.getElementById('welcome');
const user = document.querySelector('.user');
const firstMsg = document.getElementById('message');


//Login Form Container
const loginForm = document.getElementById('login--form');

//LogIn Inputs 
const usernameInput = document.getElementById('username--input');
const passwordInput = document.querySelector('#password--input');
const remember = document.getElementById('remember');
const errorMsg = document.getElementById('errorMsg');


//Login Button
const btnLogin = document.querySelector('.login--btn');

//App UI 
//App UI container
const appUI = document.getElementById('appUI');

//All App UI Menu buttons
const allMenuBtns = document.querySelectorAll('.app--items');
const nameHolder = document.getElementById('nameHolder');


//Account Details Tab
const accDetTab = document.querySelector('#acct--details--tab');
const acctBalance1 = document.querySelector('#acctBal');
const acctBalance2 = document.querySelector('#acctBal1');
const acctName = document.querySelector('#acctName');
const acctNumber = document.querySelector('#acctNum');
const allIncomes = document.querySelector('#acctIns');
const allWithdrawals = document.querySelector('#acctOuts');


//SEND MONEY TAB
const sendMoneyTab = document.getElementById('send--money--tab');
const benAcctNumInput = document.getElementById('ben--input--number');
const benAcctName = document.getElementById('ben--acct--name');
const amount = document.getElementById('send--amount');
const inputPin = document.querySelector('.enter--pin'); 
// log(inputPin.value = '1234')
const firstSendBtn = document.getElementById('sendBtn');

/////////////////////////////////////////
let beneficiary;
/////////////////////////////////////////
//Current Account User
let currAccount; 
/////////////////////
log(accounts)

//create username for all accounts
accounts.forEach((acc,idx) => {
  acc.username = acc.owner.toLowerCase().split(' ').map((initials) => initials.at(0)).join('') + `123${idx}`;
})
//create logIn pin 
accounts.forEach((acc,idx) => acc.pin = `111${idx + 1}`);


////////////////
//Login Button Events
btnLogin.addEventListener('click', function(event){
  event.preventDefault();
  
  
  currAccount = accounts.find(acc => acc.username === usernameInput.value);
  const usernameToLower = usernameInput.value.toLowerCase();
  
  
  
  if(currAccount && usernameToLower === currAccount.username && passwordInput.value === currAccount.pin) {
    //Display Menu
    return setTimeout(menuDisplay(), 4000)
    
  } else {
     errorMsgFn();
    //errorLogin();
  }
})


/////////////////////////////
//Get account balance, Incomes and withdrawals

const displayAccountSummary = () => {
  //create account income
  const incomes = accounts.filter(acc => acc['incomes'] = acc.transactions.filter(amount => amount > 0).reduce((a,b) => a + b));
  //account withdrawals
  const withdrawals = accounts.filter(acc => acc['withdrawals'] = acc.transactions.filter(amount => amount < 0).reduce((a,b) => a + b));  
  //account balance 
  const balance = accounts.forEach(acc => acc['balance'] = acc.incomes + acc.withdrawals);
}
displayAccountSummary()


/////////////////////////////////////
//Callbacks///MENU DISPLAY///////////
const menuDisplay = () => {
  loginForm.style.display = 'none';
  loginForm.style.opacity = '0';
  appUI.style.display = "block";
  appUI.style.opacity = '100';
  nameHolder.textContent = currAccount.owner.split(' ')[0];
  
}
//Hide Menu 
const menuHide = () => {
  appUI.style.opacity = '0';
  appUI.style.display = 'none';
  welcome.style.display = 'none';
  firstMsg.style.display = 'none';
}



//Error Login Message
const errorMsgFn = () => {
  errorMsg.style.display = 'block';
}

//Account balance panel
const accountInfoDisplay = () => {
  accDetTab.style.display = 'flex';
  accDetTab.style.opacity = '100';
  
}


const allAccountsSummary = () => {
  
  acctBalance1.textContent = `$${currAccount.balance}`;
  acctBalance2.textContent = `$${currAccount.balance}`;
  acctName.textContent = currAccount.owner;
  acctNumber.textContent = currAccount.acctNumber;
  acctIns.textContent = `$${currAccount.incomes}`;
  acctOuts.textContent = `$${Math.abs(currAccount.withdrawals)}`;
}

//Send Money Function
const sendMoneyTabDisplay = () => {
  sendMoneyTab.style.display = 'block';
  sendMoneyTab.style.opacity = '100';
}

//All menu Buttons Destructure
const [acctInfo,sendMoney,...others] = allMenuBtns;

//acctInfo Display Tab Event
acctInfo.addEventListener('click', () => {
    menuHide();
    accountInfoDisplay();
    allAccountsSummary();
})
//Send Money Tab events 
sendMoney.addEventListener('click', ()=> {
  menuHide();
  sendMoneyTabDisplay();
  acctBalance2.textContent = `$${currAccount.balance}`;
})

//BENEFICIARY ACCOUNT NUMBER INPUT EVENT 
benAcctNumInput.addEventListener('input', (event) =>{
  // log(event.target.value)
  beneficiary = accounts.find(acc => acc.acctNumber === +benAcctNumInput.value);
  
  if(benAcctNumInput.value.length >= 10 && beneficiary && beneficiary.owner !== currAccount.owner ) {
    benAcctName.value = beneficiary.owner;
    return benAcctName.style.color = 'green';
    
  } else if(benAcctNumInput.value.length >= 10 && !beneficiary){
    benAcctName.value = "Invalid account Number";
    return benAcctName.style.color = 'red';


  } else if (beneficiary.owner === currAccount.owner)
    benAcctName.value = "Can't transfer to yourself!";
    return benAcctName.style.color = 'red';

  
  log(beneficiary)
  
})

//First Money Send Button Event
firstSendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputAmount = +amount.value;

   if(inputAmount <= currAccount.balance && beneficiary.owner !== currAccount.owner && inputPin.value === currAccount.pin){

    acctBalance2.textContent = `$${currAccount.balance - inputAmount}`;
    acctBalance1.textContent = `$${currAccount.balance - inputAmount}`;

    

   }
})

/////////////////////////////////////
//Menu Buttons Events//
/*
allMenuBtns.forEach((btn,i,arr) => {
  
  //add event listeners to buttons
  btn.addEventListener('click', function(event){
    
    //Account Information Tab
    if(i === 0) {
      accountInfoDisplay();
      allAccountsSummary();
    }
    if(i === 1){
      log('clicked')
            
    }
  })
})
*/


/////////////////////////////////////
//Add Event handlers to the UI Menu buttons
/*
for (const [i, btn] of allMenuBtns.entries()){
  btn.addEventListener('click', ()=> {
    //log(i);
    if(i === 0) {
      accountInfoDisplay();
      allAccountsSummary();  
    }
    if(i === 1) {
      sendMoneyTabDisplay();
    }
    if(i === 2) log('third button clicked');
  })
}

*/
