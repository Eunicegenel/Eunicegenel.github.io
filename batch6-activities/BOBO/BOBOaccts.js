 const acctList = [];

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
    refresh_users();
    list_users();
}

function sortUsers() {
    acctList.sort(function(a,b){
        let aa = a.acctLName.toLowerCase() + ', ' + a.acctFName.toLowerCase();
        let bb = b.acctLName.toLowerCase() + ', ' + b.acctFName.toLowerCase();
        if (aa > bb) return 1;
        if (aa < bb) return -1;
        return 0;

        // if (a.acctLName.toLowerCase() < b.acctLName.toLowerCase()) return -1;
        // if (a.acctLName.toLowerCase() > b.acctLName.toLowerCase()) return 1;
        // return 0;
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
        let noTest = String(Math.floor(Math.random() * 9) + 0);
        array.push(noTest); 
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
        newName.className = 'content contentHeadL contentMouseHover';
        newName.innerHTML = acctList[x].acctLName + ', ' + acctList[x].acctFName;
        let newNo = document.createElement('p');
        newNo.className = 'content contentHeadC contentMouseHover';
        newNo.innerHTML = acctList[x].acctNo;
        let newType = document.createElement('p');  
        newType.className = 'content contentHeadC contentMouseHover';
        newType.innerHTML = acctList[x].acctType;
        let newBal = document.createElement('p');
        newBal.className = 'content contentHeadR contentMouseHover';
        newBal.innerHTML = acctList[x].acctBal;
        let newPhp = document.createElement('p');
        newPhp.className = 'content contentHeadC contentMouseHover';
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

function createBtn() {
    document.getElementById('modalCreateAcct').reset();
    document.getElementById('modalCreateAcct').style.display = 'flex';
    document.getElementById('darkBG').style.display = 'block';
}

function closeModal() {
    document.getElementById('darkBG').style.display = 'none';
    document.getElementById('modalCreateAcct').style.display = 'none';
}

function submit() {
    let lname = document.getElementById('lname').value;
    let fname = document.getElementById('fname').value;
    let type = document.getElementById('type').value;
    let sex = document.getElementById('sex').value;
    let balance = document.getElementById('balance').value;

    if (lname === '') return alert("Wrong value for Lastname");
    if (fname === '') return alert("Wrong value for Firstname");
    if (balance === '') return alert("Wrong value for Balance");

    create_user(lname,fname,type,balance,sex);
    closeModal();
}

