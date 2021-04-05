 const acctList = [];
 let activeID = 0;
 let searchArr = [];

function create_user(lname, fname, type, bal, sex) {
    let accounts = {};
    let no = giveAcctNo();
    accounts['acctLName'] = lname;
    accounts['acctFName'] = fname;
    accounts['acctType'] = type;
    accounts['acctNo'] = no;
    accounts['acctBal'] = bal;
    accounts['acctSex'] = sex;
    accounts['acctActions'] = [];
    let check = checkIfSameUser(fname,lname,type);
    if (check === false) acctList.push(accounts);
    if (acctList.length > 1) sortUsers(); 
    personClick('a'+activeID);
}

function sortUsers() {
    acctList.sort(function(a,b){
        let aa = a.acctLName.toLowerCase() + ', ' + a.acctFName.toLowerCase();
        let bb = b.acctLName.toLowerCase() + ', ' + b.acctFName.toLowerCase();
        if (aa > bb) return 1;
        if (aa < bb) return -1;
        return 0;
    });
}

function refresh_users() {
    userLength = parseInt(document.getElementById('cxAcctNo').children.length);

    for (let x = 0; x <= userLength-1; x++) {
        document.getElementById('cxName').children[0].remove();
        document.getElementById('cxAcctNo').children[0].remove();
        document.getElementById('cxType').children[0].remove();
        document.getElementById('cxBal').children[0].remove();
        document.getElementById('php').children[0].remove();
    }
}

function checkIfSameUser(fname,lname,type) {
    for (let x in acctList) {
        if (fname === acctList[x].acctFName&&lname === acctList[x].acctLName&&type === acctList[x].acctType) {
            return true; 
        } 
    }
    return false;
}

function giveAcctNo() {
    let array = [];

    for (let x = 0; x<=6; x++) {
        if (x===0) {
            let noTest = String(Math.floor(Math.random() * 9) + 1);
            array.push(noTest); 
        } else {
            let noTest = String(Math.floor(Math.random() * 9) + 0);
            array.push(noTest); 
        }
    }

    let joinedNo = array.join('');

    if (acctList[0] === undefined) return joinedNo;
    else {
        for (let x in acctList) {
            if (joinedNo === acctList[x].acctNo) {
                giveAcctNo();
            }
            else {
                return joinedNo;
            }
        }
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
        newName.className = 'content contentHeadL contentMouseHover padded';
        newName.innerHTML = acctList[x].acctLName + ', ' + acctList[x].acctFName;
        newName.id = 'a'+x;
        newName.setAttribute('onclick','personClick(this.id)');
        let newNo = document.createElement('p');
        newNo.className = 'content contentHeadC contentMouseHover padded';
        newNo.innerHTML = acctList[x].acctNo;
        newNo.id = 'b'+x;
        newNo.setAttribute('onclick','personClick(this.id)');
        let newType = document.createElement('p');  
        newType.className = 'content contentHeadC contentMouseHover padded';
        newType.innerHTML = acctList[x].acctType;
        newType.id = 'c'+x;
        newType.setAttribute('onclick','personClick(this.id)');
        let newBal = document.createElement('p');
        newBal.className = 'content contentHeadC contentMouseHover padded';
        newBal.innerHTML = acctList[x].acctBal;
        newBal.id = 'd'+x;
        newBal.setAttribute('onclick','personClick(this.id)');
        let newPhp = document.createElement('p');
        newPhp.className = 'content contentHeadL contentMouseHover padded toTheLeft';
        newPhp.innerHTML = 'php';
        newPhp.id = 'e'+x;
        newPhp.setAttribute('onclick','personClick(this.id)');

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

function createBtn() {
    document.getElementById('modalCreateAcct').reset();
    document.getElementById('modalCreateAcct').style.display = 'flex';
    document.getElementById('darkBG').style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';
}

function closeModal() {
    document.getElementById('darkBG').style.display = 'none';
    document.getElementById('closeBtn').style.display = 'none';
    document.getElementById('modalCreateAcct').style.display = 'none';
    document.getElementById('modalDeposit').style.display = 'none';
    document.getElementById('modalWithdraw').style.display = 'none';
    document.getElementById('modalTransfer').style.display = 'none';
}

function submit() {
    let lname = document.getElementById('lname').value;
    let fname = document.getElementById('fname').value;
    let type = document.getElementById('type').value;
    let sex = document.getElementById('sex').value;
    let balance = document.getElementById('balance').value;

    if (lname === '') return alert("Wrong value for Last Name");
    if (fname === '') return alert("Wrong value for Firs Nname");
    if (balance === '') return alert("Wrong value for Balance");

    create_user(lname,fname,type,balance,sex);
    closeModal();
}

function personClick(clicked) {
    refresh_users();
    list_users();
    refresh_transaction();
    let id = parseInt(clicked.match(/(\d+)/));
    activeID = id;
    list_transaction();
    document.getElementById('a'+id).style.backgroundColor = 'rgba(144,238,144,1)';
    document.getElementById('b'+id).style.backgroundColor = 'rgba(144,238,144,1)';
    document.getElementById('c'+id).style.backgroundColor = 'rgba(144,238,144,1)';
    document.getElementById('d'+id).style.backgroundColor = 'rgba(144,238,144,1)';
    document.getElementById('e'+id).style.backgroundColor = 'rgba(144,238,144,1)';

    let account = acctList[id];
    document.getElementById('profName').innerHTML = account.acctFName + ' ' + account.acctLName;
    document.getElementById('profSex').innerHTML = account.acctSex;
    document.getElementById('profNo').innerHTML = account.acctNo;
    document.getElementById('profType').innerHTML = account.acctType;
    document.getElementById('profBal').innerHTML = account.acctBal + ' php';
    if (account.acctSex === 'Female') document.getElementById('pic').setAttribute('src','boboAssets/woman.png');
    else document.getElementById('pic').setAttribute('src','boboAssets/man.png');
}

window.onload = function() {
    personClick('a0');
};