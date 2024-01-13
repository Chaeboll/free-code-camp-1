let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// ini semua bende yang di hmtl tu
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText =  document.querySelector("#monsterHealth")

// ini weapon 
const weapons = [
    {
        name : "stick",
        power: 5
    },
    {
        name : "dagger",
        power: 30
    },
    {
        name : "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

// ini for monster
const monsters = [
    {
        name : "Slimeyy",
        level: 2,
        health: 15
    },
    {
        name : "Fanged Beast",
        level: 8,
        health: 60
    },
    {
        name : "dragon",
        level : 20,
        health : 303
    }
]

// ini location
const locations = [
    {
        name: "town square",
        // ini steps 55
        "button text" : ["Go to store", "Go to cave", "Fight dragon"],
        "button function" : [goStore, goCave, fightDragon],
        text : "You are in the town square, You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text" : ["Buy 10 health(10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button function" : [buyHealth, buyWeapon, goTown],
        text : "You have enter the store."
    },
    {
        name : "cave",
        "button text" : ["Fight slime", "Fight beast", "Go to town square"],
        "button function" : [fightSlime, fightBeast, goTown],
        text : "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button function": [ attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "defeat Monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button function": [goTown, goTown, easterEgg],
        text: "The monster screams Arg! as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["REPLAY??","REPLAY??","REPLAY??"],
        "button function": [restart, restart, restart],
        text: "You dieaddd."
    },
    {
        name: "win",
        "button text": ["REPLAY??","REPLAY??","REPLAY??"],
        "button function": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉."
    },
    {
        name: "easter egg",
        "button text": ["2","8","Go to town square"],
        "button function": [pickTwo, pickEight, goTown],
        text: "You will find a secret game, Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers , you win!"
    }

];

// initialized button
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// ini  first user encounter function 
function goStore(){
    update(locations[1])
}

function goCave() {
    update(locations[2])
}

function fightDragon() {
    fighting = 2;
    goFight()
}

// ini dalam store
function buyHealth(){
    if(gold >= 10){
    gold = gold - 10;
    health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    }else{
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon(){

    //tengok ni macam mana instead of saying less than 3 , kite letak bende camni ...
    if(currentWeapon < weapons.length-1){
    if(gold >= 30){
    gold = gold - 30;
    currentWeapon = currentWeapon + 1;
    goldText.innerText = gold;
    // kalau buang bracket to newWeapon akan malap 
    let newWeapon = weapons[currentWeapon].name;
    // try this out sebab weapons tu banyak , so hang nk yang mana satu
    text.innerText = "You now have a " + newWeapon + " .";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: "  + inventory;
    }else{
        text.innerText = "You do not have enough gold to buy a weapon. ";
    }
    }else{
        text.innerText = "You already have the most powerful weapons";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold = gold + 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You have sold a " + currentWeapon + " .";
        text.innerText += "In your inventory you have " + inventory;
    }
}

function goTown(){
    update(locations[0])
}

// ini untuk dalam cave
function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block" ;
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth
}

function attack(){
    text.innerText = "The "+ monsters[fighting].name + " is attacking you.";
    text.innerText += "You attack using " + weapons[currentWeapon].name + ". \n";
    health = health - getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()){
        monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random()*xp) +1;
    }else{
        text.innerText += "You miss.";
    }
    healthText.innerText = health;
    console.log(health,fighting,monsterHealth);
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    }else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : monsterDefeat();
    }
    if (Math.random() <=.1 && inventory.length !== 1){
        text.innerText += "Your " + inventory.pop()+ " breaks. "
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random()* xp));
    console.log(hit);
    return hit ? hit > hit : 0;
}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}


function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
// after effect aldy
function winGame(){
    update(locations[6]);
}

function lose(){
    update(locations[5]);
}

function monsterDefeat(){
    gold = gold + Math.floor( (monsters[fighting].level*6.7));
    xp = xp + monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4])
}

// ini style hebat punye tak nk repeat kan
function update(location){
    monsterStats.style.display ="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];
    text.innerText = location.text;
}

// ini restart
function restart(){
    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText =  gold;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pick(guess){
    const numbers = [];
    while( numbers.length < 10){
        numbers.push(Math.floor(Math.random()* 11));
    }
    text.innerText = "You picked " + guess + " . Here are the random number: \n";
    for(let i = 1; i < 10; i++){
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.includes(guess)){
        text.innerText  += "Right , You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += "Wrong, You lose 10 health";
        health -= 10;
        healthText.innerText = health;

    }
}


function pickTwo(){

}

function pickEight(){

}
