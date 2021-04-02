const acctList = [];

function create_user(user, type, no, bal) {
    let accounts = {};
    accounts['acctName'] = user;
    accounts['acctType'] = type;
    accounts['acctNo'] = no;
    accounts['acctBal'] = bal;
    if (acctList[0] !== undefined) refresh_users();
    acctList.push(accounts);
    list_users();
}

function refresh_users() {
    userLength = parseInt(document.getElementById('cxAcctNo').children.length);

    for (let x = 1; x <= userLength-1; x++) {
        console.log(x);
        document.getElementById('cxName').children[1].remove();
        document.getElementById('cxAcctNo').children[1].remove();
        document.getElementById('cxType').children[1].remove();
        document.getElementById('cxBal').children[1].remove();
        document.getElementById('php').children[1].remove();
    }
}

function list_users() {
    for (let x in acctList) {
        let name = document.getElementById('cxName');
        let acctNo = document.getElementById('cxAcctNo');
        let type = document.getElementById('cxType');
        let bal = document.getElementById('cxBal');
        let php = document.getElementById('php');
        let newName = document.createElement('p');
        newName.className = 'content contentHeadL';
        newName.innerHTML = acctList[x].acctName;
        let newNo = document.createElement('p');
        newNo.className = 'content contentHeadR';
        newNo.innerHTML = acctList[x].acctNo;
        let newType = document.createElement('p');
        newType.className = 'content contentHeadR';
        newType.innerHTML = acctList[x].acctType;
        let newBal = document.createElement('p');
        newBal.className = 'content contentHeadR';
        newBal.innerHTML = acctList[x].acctBal;
        let newPhp = document.createElement('p');
        newPhp.className = 'content contentHeadC';
        newPhp.innerHTML = 'php';

        name.appendChild(newName);
        acctNo.appendChild(newNo);
        type.appendChild(newType);
        bal.appendChild(newBal);
        php.appendChild(newPhp);
    }
}

function showinvest() {
    document.getElementById('acctPage').style.display = 'none';
    document.getElementById('accts').style.color = '#eefdf1';
    document.getElementById('invest').style.color = '#1c502f';
}

function showaccts() {
    document.getElementById('acctPage').style.display = 'grid';
    document.getElementById('accts').style.color = '#1c502f';
    document.getElementById('invest').style.color = '#eefdf1';
}