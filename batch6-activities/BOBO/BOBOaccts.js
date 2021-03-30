const acctList = [];

function create_user(user, type, no, bal) {
    let accounts = {};
    accounts['acctName'] = user;
    accounts['acctType'] = type;
    accounts['acctNo'] = no;
    accounts['acctBal'] = bal;
    acctList.push(accounts);
    return acctList;
}

function list_users() {
    for (let x in acctList) {
        console.log(acctList[x].acctName);
    }
}