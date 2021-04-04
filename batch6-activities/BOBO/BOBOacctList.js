create_user('Dela Cruz', 'Aaron', 'Savings Account', 13000, 'Male');
create_user('Garcia', 'Belen', 'Savings Account', 28000, 'Female');
create_user('Reyes', 'Carl', 'Savings Account', 15000, 'Male');
create_user('Ramos', 'Daisy', 'Savings Account', 18000, 'Female');
create_user('Mendoza', 'Earl', 'Savings Account', 23000, 'Male');
create_user('Santos', 'Faith', 'Savings Account', 22000, 'Female');
create_user('Flores', 'Gale', 'Savings Account', 21000, 'Male');
create_user('Gonzales', 'Hannah', 'Savings Account', 17000, 'Female');
create_user('Bautista', 'Ian', 'Savings Account', 13000, 'Male');
create_user('Villanueva', 'Janine', 'Savings Account', 28000, 'Female');
create_user('Fernandez', 'Keith', 'Savings Account', 15000, 'Male');
create_user('Cruz', 'Lani', 'Savings Account', 18000, 'Female');
create_user('De Guzman', 'Marty', 'Savings Account', 23000, 'Male');
create_user('Lopez', 'Noreen', 'Savings Account', 22000, 'Female');
create_user('Perez', 'Oliver', 'Savings Account', 21000, 'Male');
create_user('Castillo', 'Paula', 'Savings Account', 17000, 'Female');
create_user('Francisco', 'Quincy', 'Savings Account', 13000, 'Male');
create_user('Rivera', 'Rachelle', 'Savings Account', 28000, 'Female');
create_user('Aquino', 'Shane', 'Savings Account', 15000, 'Male');
create_user('Castro', 'Tanya', 'Savings Account', 18000, 'Female');
create_user('Sanchez', 'Uriel', 'Savings Account', 23000, 'Male');
create_user('Torres', 'Valerie', 'Savings Account', 22000, 'Female');
create_user('De Leon', 'Walter', 'Savings Account', 21000, 'Male');
create_user('Domingo', 'Xena', 'Savings Account', 17000, 'Female');
create_user('Martinez', 'Yves', 'Savings Account', 21000, 'Male');
create_user('Rodriguez', 'Zofia', 'Savings Account', 17000, 'Female');

function setBankAction() {
	for (let x in acctList) {
		let action1 = {
			'event':'DEPOSIT',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal) + 12000,
			'date': '03/15/2020'
		};
		let action2 = {
			'event':'WITHDRAW',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal),
			'date': '07/13/2020'
		};
		let action3 = {
			'event':'DEPOSIT',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal) + 12000,
			'date': '10/28/2020'
		};
		let action4 = {
			'event':'WITHDRAW',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal),
			'date': '11/02/2020'
		};
		let action5 = {
			'event':'DEPOSIT',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal) + 12000,
			'date': '01/23/2021'
		};
		let action6 = {
			'event':'WITHDRAW',
			'actionBy': 'SELF',
			'amount':12000,
			'balance': parseInt(acctList[x].acctBal),
			'date': '03/17/2021'
		};
		acctList[x].acctActions.unshift(action6,action5,action4,action3,action2,action1);
	}
	personClick('a'+activeID);
}

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list