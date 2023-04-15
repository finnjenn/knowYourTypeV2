let userTypes = [];
let oppTypes = [];
const typeTable = [
    [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1],
    [1,0.5,0.5,2,1,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1],
    [1,2,0.5,0.5,1,1,1,1,2,1,1,1,2,1,0.5,1,1,1],
    [1,0.5,2,0.5,1,1,1,0.5,2,0.5,1,0.5,2,1,0.5,1,0.5,1],
    [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1,1],
    [1,0.5,0.5,2,1,0.5,1,1,2,2,1,1,1,1,2,1,0.5,1],
    [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2,0.5],
    [1,1,1,2,1,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0,2],
    [1,2,1,0.5,2,1,1,2,1,0,1,0.5,2,1,1,1,2,1],
    [1,1,1,2,0.5,1,2,1,1,1,1,2,0.5,1,1,1,0.5,1],
    [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5,1],
    [1,0.5,1,2,1,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5,0.5],
    [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5,1],
    [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5,0],
    [1,1,1,1,1,1,0.5,1,1,1,2,1,1,2,1,0.5,1,0.5],
    [1,0.5,0.5,1,0.5,2,1,1,1,1,1,1,2,1,1,1,0.5,2],
    [1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,2,2,0.5,1]
];
const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

function toggleChart() {
    let chart = document.getElementById("chart");
    if (chart.style.display === "none") chart.style.display = "block";
    else chart.style.display = "none";
}
//Gets userTypes array and oppTypes array stored in localStorage from kyt.html
function getUserAndOppTypes() {
    userTypes = JSON.parse(localStorage.getItem('userTypesArray'));
    oppTypes = JSON.parse(localStorage.getItem('oppTypesArray'));
}
function getRandomType() {
    //Pick random number between 0-17
    let random = Math.floor(Math.random() * 18);
    //Use random number to return a random type from types array
    return types[random];
}
function oppRandomType() {
    oppTypes.push(getRandomType());
        //If dual-random, push a second type to oppType array
        if (oppTypes[0] == 'Dual') {
            oppTypes.push(getRandomType());
            //Prevents second type from being the same as the first
            while (oppTypes[1] == oppTypes[2]) oppTypes[2] = getRandomType();
        }
        //Pops first oppType array value (which was either mono or dual)
        oppTypes.shift();
}
function createOppTypes() {
    //If opponent is mono-random or dual-random, we need at least one random type pushed to oppType array
    if (oppTypes[0] == 'Mono' || oppTypes[0] == 'Dual') {
        oppRandomType();
    }
    //If mono or dual isnt selected, then the correct types are already in the oppType array
    let oppFlex = document.querySelector('#oppFlex'); //__
    let type1 = document.createElement('span');       //|   get opponent flexbox, make a span
    type1.className = oppTypes[0];                    //|   use type value for span class and text
    type1.innerText = oppTypes[0];                    //|   append span to flexbox element 
    oppFlex.appendChild(type1);                       //__
    if (oppTypes.length === 2) {
        let type2 = document.createElement('span');   //__
        type2.className = oppTypes[1];                //|   make a span
        type2.innerText = oppTypes[1];                //|   use type value for span class and text
        oppFlex.appendChild(type2);                   //__  append span to flexbox element 
    }
}
//Puts unique randomly generated numbers into num array and pushes the type from the corresponding typeArray to userType array
function fourRandomTypes() {
    let numArr = [];
    userTypes = [];
    while(numArr.length < 4) {
        let r = Math.floor(Math.random() * 18);
        if (numArr.indexOf(r) === -1) { 
            numArr.push(r);
            userTypes.push(types[r]);
        }
    }
}
function createUserTypes() {
    let moveBox = document.querySelector('#moveBox');
    if (userTypes[0] == 'Random') fourRandomTypes();
    for (let i = 0; i < userTypes.length; i++) {
        //Make button for every pass through the loop
        let move = document.createElement('button');
        move.className = userTypes[i];
        move.innerText = userTypes[i];
        move.addEventListener('click', function () { useMove(userTypes[i]); });
        moveBox.appendChild(move);
    }
}
function getDamageModifier(userType, oppType) {
    let typeIndex = types.indexOf(userType);
    //Stores array of user type
    let moveTypeArray = typeTable[typeIndex];
    //Stores index of opponent type
    let oppTypeIndex = types.indexOf(oppType);
    //When there is no secondary type, return an empty string
    if (oppType == undefined) return '';
    //Stores modifier found in userTypeArray using opponent type index 
    let modifier = moveTypeArray[oppTypeIndex];
    return modifier;
}
function useMove(userType) {
    let modifier1 = getDamageModifier(userType,oppTypes[0]);
    let modifier2 = getDamageModifier(userType,oppTypes[1]);
    let multiplied = modifier1 * modifier2;
    if (modifier2.length == 0) {
        document.querySelector('h1').innerText = `x${modifier1} Damage`;
        return;
    }
    document.querySelector('h1').innerText = `${modifier1} x ${modifier2} = ${multiplied}x Damage`;
}
function getSprite() {
    let type1Index = types.indexOf(oppTypes[0]);
    let type2Index = types.indexOf(oppTypes[1]);
    let img = document.querySelector('#sprite');
    if (oppTypes.length == 1) {
        img.src = `types/${type1Index}_${type1Index}.png`;
        return;
    }
    //Type index needs to be smaller value first, these statements ensure that
    if (type1Index > type2Index){
        let temp = type1Index;
        type1Index = type2Index;
        type2Index = temp;
    }
    img.src = `types/${type1Index}_${type2Index}.png`;
}
getUserAndOppTypes();
createOppTypes();
createUserTypes();
getSprite();