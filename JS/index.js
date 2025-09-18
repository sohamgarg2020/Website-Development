let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterNameText = document.querySelector("#monsterName");

const weapons = [
    { name: "stick",       power: 5 },
    { name: "dagger",      power: 30 },
    { name: "claw hammer", power: 50 },
    { name: "sword",       power: 100 }
  ];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]


const locations = [

    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town store"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to square", "Go to square", "Go to square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster dies after you killed it. You gain experience points and gold!"
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You died."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You killed the dragon! You won the game!"
    }
]

// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goStore() {
    update(locations[1]);
}
function goTown() {
    update(locations[0]);
}
function goCave() {
    update(locations[2])
}


function buyHealth(){
    if (gold >= 10){
        health += 10;

        gold -= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = `You bought 10 health for 10 gold. You have ${gold} gold left.`;
    } else {
        text.innerText = `You are missing ${10-gold} gold. Get some more gold to buy 10 health.`
    }
    
}
function buyWeapon() {
    if (currentWeapon >= weapons.length-1){
        text.innerText = "You already have the strongest weapon!"
        button2.innerText = "Sell weapon for 15 gold!";
        button2.onclick = sellWeapon;
    } else{
        if (gold < 30){
            text.innerText = `You need ${30-gold} more gold to buy a weapon.`
            return
        }
    
        gold -= 30;
        currentWeapon += 1;
        goldText.innerText = gold;
        const newWeapon = weapons[currentWeapon];
        inventory.push(newWeapon.name);
    
        text.innerText = `You just bought yourself a ${newWeapon.name}. You now have ${gold} gold left. It has power of ${newWeapon.power}. Your inventory is now ${inventory.join(", ")}.`;    
    }
    
}

function sellWeapon(){

    if (inventory.length > 1){
        const soldWeapon = inventory.pop();
        gold += 15;
        gold.innerText = gold;
        text.innerText = `You just sold ${soldWeapon} for 15 gold. You now have ${gold} gold.`;
        currentWeapon--;

    } else {
        text.innerText = "You only have 1 weapon so you cannot sell that. Get some more weapons.";
    }
}
function fightSlime(){
    fighting = 0;
    goFight();
}
function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    
    const m = monsters[fighting];
    monsterHealth = m.health;

    monsterStats.style.display = "block";
    monsterNameText.textContent = m.name;
    monsterHealthText.textContent = monsterHealth;
}

function attack(){
    text.innerText = `The ${monsters[fighting].name} attacks.`
    text.innerText += `You attack it with your ${weapons[currentWeapon].name}.`
    const currHealth = monsters[fighting].health
    health -= monsters[fighting].level;
    currHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText = currHealth;
    if (health <=0){
        lose();
    }
    if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }


}
function dodge(){
    text.innerText = `You dodge the attack from ${monsters[fighting].name}.`
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level *6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();

}