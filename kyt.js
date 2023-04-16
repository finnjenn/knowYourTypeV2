let userTypes = [];
let oppTypes = [];
const MAX_USER_TYPES = 4;
const MAX_OPP_TYPES = 2;

function toggleChart() {
    let chart = document.getElementById("chart");
    if (chart.style.display === "none") chart.style.display = "block";
    else chart.style.display = "none";
}
//Fires anytime a regular checkbox is clicked
function checkCtrl() {
    let totalBoxesChecked = 0;
    const userBoxes = document.querySelectorAll("[name='typeCheckBox']");
    //loops through all regular checkboxes 
    for (let i = 0; i < userBoxes.length; i++) {
        if (userBoxes[i].checked) totalBoxesChecked += 1;
        //If random is already checked and you've just checked some other box, uncheck random (to prevent users from checking random along with a type)
        if (userBoxes[0].checked && totalBoxesChecked > 1) userBoxes[0].checked = false;
        //Unchecks anything once 4 have already been checked 
        if (totalBoxesChecked > MAX_USER_TYPES) userBoxes[i].checked = false;
    }
    //Forces default behavior of random being checked when nothing else is checked 
    if (totalBoxesChecked === 0) {
        userBoxes[0].checked = true;
        totalBoxesChecked += 1;
        console.log('Checking random because nothing else is selected');
    }
}
//Fires anytime an opponent checkbox is clicked
function checkCtrlOpp() {
    let total = 0;
    const oppBoxes = document.querySelectorAll("[name='oppType']");
    //loops through all regular checkboxes
    for (let i = 0; i < oppBoxes.length; i++) {
        if (oppBoxes[i].checked) total += 1;
        //If Dual is already checked and you've just checked some other box, uncheck Dual (to prevent users from checking Dual along with a type)
        if (oppBoxes[0].checked && total > 1) oppBoxes[0].checked = false;
        //If Mono is already checked and you've just checked some other box, uncheck Mono (to prevent users from checking Mono along with a type)
        if (oppBoxes[1].checked && total > 1) oppBoxes[1].checked = false;
        //Unchecks anything once 2 have already been checked 
        if (total > MAX_OPP_TYPES) oppBoxes[i].checked = false;
    }
    //Forces default behavior of Dual being checked when nothing else is checked
    if (total === 0) {
        oppBoxes[0].checked = true;
        total += 1;
        console.log('Checking dual-random because nothing else is selected');
    }
}
//Gets all user-checked boxes and pushes their value into userTypes array
//Stores copy of array into localStorage
function storeUserData() {
    const userBoxes = document.querySelectorAll("[name='typeCheckBox']");
    for (let i = 0; i < userBoxes.length; i++) {
        if (userBoxes[i].checked) userTypes.push(userBoxes[i].value);
    }
    localStorage.setItem('userTypesArray', JSON.stringify(userTypes));
}
//Gets all opponent-checked boxes and pushes their value into oppTypes array
//Stores copy of array into localStorage
function storeOppData() {
    const oppBoxes = document.querySelectorAll("[name='oppType']");
    for (let i = 0; i < oppBoxes.length; i++) {
        if (oppBoxes[i].checked) oppTypes.push(oppBoxes[i].value);
    }
    localStorage.setItem('oppTypesArray', JSON.stringify(oppTypes));
}
//Fires when FIGHT button is clicked
function storeBoth() {
    localStorage.clear();
    storeUserData();
    storeOppData();
    window.location.href = 'battle.html';
}

