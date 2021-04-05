function depositClick() {
	document.getElementById('modalDeposit').reset();
    document.getElementById('modalDeposit').style.display = 'flex';
    document.getElementById('darkBG').style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';
}

function withdrawClick() {
	document.getElementById('modalWithdraw').reset();
    document.getElementById('modalWithdraw').style.display = 'flex';
    document.getElementById('darkBG').style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';
}

function transferClick() {
	document.getElementById('modalTransfer').reset();
    document.getElementById('modalTransfer').style.display = 'flex';
    document.getElementById('darkBG').style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';
}


function acctCheck(choice) {
	let currentAcct = acctList[activeID];
	let no;

	if (parseInt(choice) === 1) no = parseInt(document.getElementById('depositContent').value);
	else if (parseInt(choice) === 2) no = parseInt(document.getElementById('withdrawContent').value);
	else no = parseInt(document.getElementById('transferAcctContent').value);

	if (no !== parseInt(currentAcct.acctNo)) return alert("Incorrect Account Number");
	else {
		if (parseInt(choice) === 1) {
			document.getElementById('modalDeposit').reset();
			document.getElementById('depositLabel').innerHTML = 'INPUT DEPOSIT AMOUNT';
			document.getElementById('depositContent').setAttribute('placeholder','AMOUNT IN PHP');
			document.getElementById('deposit').setAttribute('onclick','deposit()');
		} else if (parseInt(choice) === 2) {
			document.getElementById('modalWithdraw').reset();
			document.getElementById('withdrawLabel').innerHTML = 'INPUT WITHDRAW AMOUNT';
			document.getElementById('withdrawContent').setAttribute('placeholder','AMOUNT IN PHP');
			document.getElementById('withdraw').setAttribute('onclick','withdraw()');
		} else {
			document.getElementById('modalTransfer').reset();
			document.getElementById('transferLabelAcct').innerHTML = 'RECIPIENT ACCOUNT NUMBER';
			document.getElementById('transferAcctContent').setAttribute('placeholder','RECIPIENT ACCOUNT NUMBER');
			document.getElementById('transferLabelAmt').style.display = 'block';
			document.getElementById('transferAmtContent').style.display = 'block';
			document.getElementById('transfer').setAttribute('onclick','send()');
		}
	}
}

function deposit() {
	let amount = parseInt(document.getElementById('depositContent').value);
	let currentAcct = acctList[activeID];
	let currBal = (currentAcct.acctBal) + parseInt(amount);
	currentAcct.acctBal = currBal;
	let action = {};
	action['event'] = 'DEPOSIT';
	action['actionBy'] = 'SELF';
	action['amount'] = amount;
	action['balance'] = currBal;
	action['date'] = getCurrentDate();
	currentAcct.acctActions.unshift(action);
    document.getElementById('profBal').innerHTML = currentAcct.acctBal + ' php';
    personClick('a'+activeID);
    document.getElementById('depositLabel').innerHTML = 'INPUT ACCOUNT NUMBER';
	document.getElementById('depositContent').setAttribute('placeholder','ACCOUNT NUMBER');
	document.getElementById('deposit').setAttribute('onclick','acctCheck(1)');
    closeModal();
    return alert("Deposit Success");
}

function withdraw() {
	let amount = parseInt(document.getElementById('withdrawContent').value);
	let currentAcct = acctList[activeID];
	let currBal = (currentAcct.acctBal) - parseInt(amount);
	
	if (currBal < 0) return alert("Insufficient Amount to Withdraw");
	else {
		currentAcct.acctBal = currBal;
		let action = {};
		action['event'] = 'WITHDRAW';
		action['actionBy'] = 'SELF';
		action['amount'] = amount;
		action['balance'] = currBal;
		action['date'] = getCurrentDate();
		currentAcct.acctActions.unshift(action);
	    document.getElementById('profBal').innerHTML = currentAcct.acctBal + ' php';
	    personClick('a'+activeID);
	    document.getElementById('withdrawLabel').innerHTML = 'INPUT ACCOUNT NUMBER';
		document.getElementById('withdrawContent').setAttribute('placeholder','ACCOUNT NUMBER');
		document.getElementById('withdraw').setAttribute('onclick','acctCheck(2)');
	    closeModal();
	    return alert("Withdraw Success");
	}
}

function send() {
	let sendingNo = parseInt(document.getElementById('transferAcctContent').value);
	let amount = parseInt(document.getElementById('transferAmtContent').value);
	let currentAcct = acctList[activeID];
	let check = 0;
	let sendingAcct = '';
	for (let x in acctList) {
		if (parseInt(sendingNo) === parseInt(acctList[x].acctNo)) {
			sendingAcct = acctList[x];
			check = 1;
		}
	}

	if (check === 1) {
		let sendBal = sendingAcct.acctBal + amount;
		let currBal = (currentAcct.acctBal) - amount;
		
		if (currBal < 0) return alert("Insufficient Balance for Transfer");
		else {
			currentAcct.acctBal = currBal;
			sendingAcct.acctBal = sendBal;
			let action1 = {};
			action1['event'] = 'TRANSFER';
			action1['actionBy'] = 'TO &nbsp' + sendingAcct.acctNo;
			action1['amount'] = amount;
			action1['balance'] = currBal;
			action1['date'] = getCurrentDate();
			let action2 = {};
			action2['event'] = 'TRANSFER';
			action2['actionBy'] = 'FROM &nbsp' + currentAcct.acctNo;
			action2['amount'] = amount;
			action2['balance'] = sendBal;
			action2['date'] = getCurrentDate();
			currentAcct.acctActions.unshift(action1);
			sendingAcct.acctActions.unshift(action2);
		    document.getElementById('profBal').innerHTML = currentAcct.acctBal + ' php';
		    personClick('a'+activeID);
		    document.getElementById('transferLabelAcct').innerHTML = 'INPUT ACCOUNT NUMBER';
			document.getElementById('transferAcctContent').setAttribute('placeholder','ACCOUNT NUMBER');
			document.getElementById('transferLabelAmt').style.display = 'none';
			document.getElementById('transferAmtContent').style.display = 'none';
			document.getElementById('transfer').setAttribute('onclick','acctCheck(3)');
		    closeModal();
		    return alert("Transfer Success");
		}
	} else return alert("No Account Found with Provided Account Number");
}


function getCurrentDate() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	return today;
}



function refresh_transaction() {
    transactionLength = parseInt(document.getElementById('cxEvent').children.length);

    for (let x = 0; x <= transactionLength-1; x++) {
        document.getElementById('cxEvent').children[0].remove();
        document.getElementById('cxActionBy').children[0].remove();
        document.getElementById('cxDate').children[0].remove();
        document.getElementById('cxAmount').children[0].remove();
        document.getElementById('cxRemBal').children[0].remove();
    }
}

function list_transaction() {
    for (let y in acctList[activeID].acctActions) {
    	let event = document.getElementById('cxEvent');
        let actionBy = document.getElementById('cxActionBy');
        let date = document.getElementById('cxDate');
        let amount = document.getElementById('cxAmount');
        let remBal = document.getElementById('cxRemBal');
        let newEvent = document.createElement('p');
        newEvent.className = 'content whiteText contentHeadL padded';
        newEvent.innerHTML = acctList[activeID].acctActions[y].event;
        let newActionBy = document.createElement('p');
        newActionBy.className = 'content whiteText contentHeadC padded';
        newActionBy.innerHTML = acctList[activeID].acctActions[y].actionBy;
        let newDate = document.createElement('p');
        newDate.className = 'content whiteText contentHeadC padded';
        newDate.innerHTML = acctList[activeID].acctActions[y].date;
        let newAmount = document.createElement('p');
        newAmount.className = 'content whiteText contentHeadC padded';
        newAmount.innerHTML = acctList[activeID].acctActions[y].amount + ' php';;
        let newBalance = document.createElement('p');
        newBalance.className = 'content whiteText contentHeadC padded';
        newBalance.innerHTML = acctList[activeID].acctActions[y].balance + ' php';
       
        if (acctList[activeID].acctActions[y].event === 'WITHDRAW') {
        	newEvent.className = 'content whiteText contentHeadL padded redBG';
        	newActionBy.className = 'content whiteText contentHeadC padded redBG';
        	newDate.className = 'content whiteText contentHeadC padded redBG';
        	newAmount.className = 'content whiteText contentHeadC padded redBG';
        	newBalance.className = 'content whiteText contentHeadC padded redBG';
        } else if (acctList[activeID].acctActions[y].event === 'TRANSFER') {
        	newEvent.className = 'content whiteText contentHeadL padded blueBG';
        	newActionBy.className = 'content whiteText contentHeadC padded blueBG';
        	newDate.className = 'content whiteText contentHeadC padded blueBG';
        	newAmount.className = 'content whiteText contentHeadC padded blueBG';
        	newBalance.className = 'content whiteText contentHeadC padded blueBG';
        }


        event.appendChild(newEvent);
        actionBy.appendChild(newActionBy);
        date.appendChild(newDate);
        amount.appendChild(newAmount);
        remBal.appendChild(newBalance);
    }
}