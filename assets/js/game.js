var weekOfBattle = 0;
var totalrounds = 0;
var currentEnemy = {};
var beatenOpponents = [];
var weeksOpponents = [];
var enemyInfo = [];
var createdBots = [];
var localChamp = {
    robot: 'Paul the Robot',
    trainer: 'John',
    score: '100',
    rounds: 4,
};
const opponentList = [{
        name: "Lt. Commander Data",
        attack: 8,
        speed: 4,
        health: 20,
    }, {
        name: "CP30",
        attack: 6,
        speed: 7,
        health: 18,
    },
    {
        name: "R2D2",
        attack: 9,
        speed: 5,
        health: 15,
    }, {
        name: "Roborto Alamar",
        attack: 11,
        speed: 4,
        health: 20,
    }, {
        name: "Adolf Bot-ler",
        attack: 11,
        speed: 6,
        health: 20,
    }, {
        name: "Alpha-6",
        attack: 12,
        speed: 6,
        health: 20,
    }, {
        name: "Android Lloyd Webber",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Johnny-5",
        attack: 11,
        speed: 4,
        health: 20,
    }, {
        name: "Darth Vader",
        attack: 11,
        speed: 6,
        health: 20,
    }, {
        name: "T-1000",
        attack: 12,
        speed: 6,
        health: 20,
    }, {
        name: "T-800",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "ED-209",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "HAL 9000",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Chappie",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Noisy Boy",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Midas",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Awesome-0",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Wall-E",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Mr. Roboto",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Bishop",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Robbie",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Astro Boy",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Optimus Prime",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Roomba",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Tom Servo",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Crow T. Robot",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "GLaDOS",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Bender",
        attack: 14,
        speed: 8,
        health: 20,
    }, {
        name: "Flex-o",
        attack: 14,
        speed: 8,
        health: 20,
    }
];
const managerMessage = [
    "'Nice work, kid!... You're really going places.'\n'Whaat? You think I didnt see you pocket all that money from the ring?'\n'Just keep winning fights and the payouts will get bigger.'",
    "'Whoooey boy!, you really gave them folks a show this week!'\n'You keep this up and you just might get yourself a plaque on the wall.'",
    "'Great Show out there, Champ!'\n'Say? Where'd you learn to fight like that anyhow?... ah nevermind, you just come back and win next week, then you'll really get paid.'",
    "Week 4 out the door",
    "Week 5, Stayin' Alive!",
    "Week Six, getchore Kicks",
    "Week Seven, livin in Robot Heaven",
    "Week Eight, set'em Straigh",
    "Week Nine: End Of The Line!",
    "Week Ten, well you should have won by now, how many robots could there be?"
]
var playerInfo = {
    getRobotName: function() {
        let usrInput = window.prompt("What is your robot's name?", this.name);
        if (usrInput) { return usrInput; } else {
            window.alert("Please enter a Name!");
            return this.getRobotName();
        }
    },
    name: '',
    maxHealth: 80,
    health: 80,
    attack: 10,
    speed: 6,
    money: 5,
    hasArmour: false,
    armourDamage = 0,
    totalEarnings: 0,
    healthRefillValue: function() { //return Math.floor(this.maxHealth * .2)  //20% of max health
        return this.maxHealth;
    },
    healthUpgrageValue: 20,
    attackUpgradeValue: 3,
    speedIncreeseValue: 2,
    healthUpShopCost: 10,
    healthShopCost: function() { let x = (this.maxHealth > this.health ? 1 : 0); return Math.max(Math.floor((this.maxHealth - this.health) * .35), x) },
    attackShopCost: 7,
    speedShopCost: 8,
    armourShopCost: 25,
    upgradeIncreaseCost: 0.4,
    overNightRecharge: 0.15,

    reset: function() {
        this.name = this.getRobotName();
        this.maxHealth = 80;
        this.health = this.maxHealth;
        this.healthUpShopCost = 10;
        this.attackShopCost = 7;
        this.speedShopCost = 8;
        this.armourShopCost = 35;
        this.hasArmour = false;
        this.armourDamage = 0;
        this.attack = 10;
        this.speed = 6;
        this.money = 6;
        this.totalEarnings = 0;
    },
    setHealth: function(value) {
        if (value) {
            this.health = Math.max(0, Math.min(this.maxHealth, Math.floor(value)));
            /* if (this.health > this.maxHealth) {
                 this.health = this.maxHealth;
             }*/
        }
    },
    refillHealth: function(value) {

        if (value) {
            this.health += Math.floor(value);
            if (this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
        } else {
            if (this.money >= this.healthShopCost()) {
                window.alert("Refilling " + this.name + "'s Health by " + (this.maxHealth - this.health) + " for $" + this.healthShopCost() + ".");

                this.money -= this.healthShopCost();
                this.health += this.healthRefillValue();

                if (this.health > this.maxHealth) { this.health = this.maxHealth; }
                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }

    },
    upgradeHealth: function(value) {

        if (value) { this.maxHealth += Math.floor(value); } else {
            if (this.money >= this.healthUpShopCost) {
                window.alert("Increasing " + this.name + "'s Max Health by " + this.healthUpgrageValue + " for $" + this.healthUpShopCost + ".");
                let percentHealth = this.health / this.maxHealth;
                this.maxHealth += this.healthUpgrageValue;
                this.setHealth(this.maxHealth * percentHealth);
                this.money -= this.healthUpShopCost;
                //charge more the next time:: 30% more each time
                this.healthUpShopCost += Math.floor((this.healthUpShopCost) * (this.upgradeIncreaseCost * 1.2));

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }
    },
    getArmour: function() {

        if (this.money >= this.armourShopCost && !this.hasArmour) {
            window.alert("Adding plate Armour to " + this.name + " for $" + this.armourShopCost + ".");

            this.hasArmour = true;
            this.money -= this.armourShopCost;
            //charge more the next time
            this.armourShopCost += Math.floor((this.armourShopCost) * (this.upgradeIncreaseCost * 2));

            shop();
        } else {
            window.alert("Sorry " + this.name + " is too poor for that. Try something else");
            shop();
        }

    },
    upgradeAttack: function(value) {
        if (value) { this.attack += Math.floor(value); } else {
            if (this.money >= this.attackShopCost) {
                window.alert("Upgrading " + this.name + "'s Attack by " + this.attackUpgradeValue + " for $" + this.attackShopCost + ".");

                this.attack += this.attackUpgradeValue;
                this.money -= this.attackShopCost;
                //charge more the next time:: 20% more each time
                this.attackShopCost += Math.floor((this.attackShopCost) * this.upgradeIncreaseCost);

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }

    },
    increeseSpeed: function(value) {
        if (value) { this.speed += Math.floor(value); } else {
            if (this.money >= this.speedShopCost) {
                window.alert("Upgrading " + this.name + "'s Speed by " + this.speedIncreeseValue + " for $" + this.speedShopCost + ".");

                this.speed += this.speedIncreeseValue;
                this.money -= this.speedShopCost;
                //charge more the next time:: 20% more each time
                this.speedShopCost += Math.floor((this.speedShopCost) * this.upgradeIncreaseCost);

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }
    },
    makeAttack: function(enemy) {
        // generate random damage value based on player's attack power
        var damage = Math.ceil(randomNumber(this.attack * 2 / 3, this.attack));
        // Subtract the value of `this.attack` from value of `enemy.health` vaiable and use the result to update the `enemy.health`variable.
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(this.name + " attacked " + enemy.name + " for " + damage + ".");

        return damage;
    },
    healthCheck: function() {
        //check players health
        if (this.health <= 0) { // if no health left
            console.log(this.name + " has died!");
            return null;
        } else { // still alive
            console.log(this.name + " still has " + this.health + " health left.");
        }
        return this.health;
    },
    takeCash: function(amount) {
        this.money += amount;
        this.totalEarnings += amount;
    },
}
const calcPayout = function() {
    /*                           20       +       ceil:23/180*(3*7) = (+3)                *7  = 23*7 = 147
                                2         +         ceil: 34/80*(1*7) = (+5)            *7 =  7*7 =48                    
                       opponents beaten +  0||%maxhealth remaining*(weeks*3)  all multiplied by the weeks */
    return beatenOpponents.filter(Boolean).length + Math.max(0, Math.ceil(((playerInfo.health / playerInfo.maxHealth) * (weekOfBattle * 7)))) * (weekOfBattle);
}
const pickOpponents = function(num) {
    if (num > opponentList.length || num > opponentsRemaining()) { num = opponentsRemaining() }
    let output = [];
    while (output.length < num) {
        let opponentId = randomNumber(0, opponentList.length - 1); // get random opponent index
        if (!beatenOpponents[opponentId]) { //opponent hasnt been beaten yet
            if (new Set(output.concat([opponentId])).size === output.concat([opponentId]).length) { // opponent isnt already in list
                output.push(opponentId); // add index to our output list
            }
        }
    }
    return output; // return the list of opponents
};
const randomizeEnemyStats = function(enemy) {

    randomizeBaseStats(enemy);

    let maxBoost = 8 * weekOfBattle; // everyweek increase max boost by 10
    let totalBoost = 0;
    let boost = 0;

    console.log();
    /*                                     speed boost is capped at 1/2 of players speed                 */
    //boost = randomNumber(0, (Math.max(maxBoost, playerInfo.speed / 2) - totalBoost));
    boost = randomNumber(0, ((maxBoost > (playerInfo.speed / 2) ? (playerInfo.speed / 2) : maxBoost) - totalBoost));
    console.log("speed boost: " + boost)
    totalBoost += boost;
    enemy.speed = enemy.speed + boost;

    boost = randomNumber(0, (maxBoost - totalBoost)); //get a random stat boost value upto maxBoost
    totalBoost += boost; //keep track of boost handed out in total boost
    enemy.health = enemy.health + boost; //apply boost to stat

    boost = randomNumber(0, (maxBoost - totalBoost)); //get a random stat boost value upto maxBoost-boost handed out so far
    totalBoost += boost;
    enemy.attack = enemy.attack + boost;

    return totalBoost;
};
const randomizeBaseStats = function(enemy) {
    // 18 stat points to start
    // health starts at 10 and cost .5 stat points to increase
    let statPoints = 18;
    let allotment = randomNumber(1, statPoints - 3);
    statPoints -= allotment;
    /*   */
    enemy.attack = allotment + ((weekOfBattle - 1) * 2);
    allotment = randomNumber(1, statPoints - 2);
    statPoints -= allotment;
    /*  */
    enemy.speed = allotment + ((weekOfBattle - 1) * 2);
    enemy.health = 10 + (statPoints * 2) + ((weekOfBattle - 1) * 2);

};
const opponentsRemaining = function() {
    return (opponentList.length - beatenOpponents.filter(Boolean).length);
};
const validateBotBuild = function(msg, mod) {
    let val = parseInt(prompt("You have " + playerInfo.statPoints + " points to spend.\n" + msg));

    if (Number.isInteger(val) && val <= playerInfo.statPoints) {
        if (mod && val % mod !== 0) {
            alert("Point value must be multiple of " + mod + ".");
            return validateBotBuild(msg);
        }

        playerInfo.statPoints -= val;
        return Math.floor(val);
    } else {
        alert("Invalid Input");
        return validateBotBuild(msg);
    }
};
const buildABot = function(name) {
    // set stat points to start
    // health starts at 10 and cost .5 stat points to increase
    playerInfo.statPoints = 120;
    let bot = {
        name: name,
        health: 0,
        attack: 0,
        speed: 0,
    };
    let botFinished = false;
    while (!botFinished) {
        let input = window.prompt("Let's Build Your Fighting Robot\n\nYou have: " + playerInfo.statPoints + " Stat Points left.\n" +
            "1.Health: " + bot.health + "                   2.Speed: " + bot.speed + "                   3.Attack: " + bot.attack + '\n' +
            " Cost: 1pts                    Cost: 2pts                    Cost: 3pts \n\n" +
            "Which stat would you like to set?  or QUIT");

        switch (input.toUpperCase()) {
            case "1":
            case "H":
            case "HEALTH":
                playerInfo.statPoints += bot.health;
                input = validateBotBuild("How many points to Health?");
                bot.health = input;
                break;

            case "2":
            case "S":
            case "SPEED":
                playerInfo.statPoints += bot.speed * 2;
                input = validateBotBuild("How many points to Speed?", 2);
                bot.speed = input / 2;
                break;

            case "3":
            case "A":
            case "ATTACK":
                playerInfo.statPoints += bot.attack * 3;
                input = validateBotBuild("How many points to Attack?", 3);
                bot.attack = input / 3;
                break;

            case "Q":
            case "0":
            case "QUIT":
                botFinished = true;
                playerInfo.name = bot.name;
                playerInfo.health = bot.health;
                playerInfo.maxHealth = bot.health;
                playerInfo.speed = bot.speed;
                playerInfo.attack = bot.attack;
                /*  */
                playerInfo.healthUpShopCost = Math.max(Math.floor(playerInfo.health / 4), 5);
                playerInfo.attackShopCost = Math.max(Math.floor(playerInfo.attack * .8), 8);
                playerInfo.speedShopCost = Math.max(Math.floor(playerInfo.speed * .8), 7);

                break
            default:
                // validate or something
                alert("nothing Chosen");
                break
        }
    }

};
/*********************** */
/*
        OLD CODE DO NOT CHANGE BELOW UNLESS NEEDED
/* *************************** */

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};
var checkHighScore = function(score) {

    if (parseInt(localChamp.score) < playerInfo.totalEarnings) {
        //New High Score
        let scoreName = window.prompt("You set a NEW HIGH SCORE !!!\n\nPlease Enter Your Name:");
        if (!scoreName) { checkHighScore(score); } // if no name is entered re run function
        else {
            // update localChamp
            localChamp = {
                    robot: playerInfo.name,
                    trainer: scoreName,
                    score: playerInfo.totalEarnings,
                    rounds: totalrounds,
                }
                // set new highscore
            localStorage.setItem('robotGladiatorChamps', JSON.stringify(localChamp));
        }
    } else {
        window.alert("Well you did your best but you still fell short of the Champ... \n" + localChamp.robot + " is still the greatest fighter with $" + localChamp.score + " in winnings.");
    }
}
var getLocalChamp = function() {
    // if localStorage values are not null set tehm the localChamp values

    localChamp = JSON.parse(localStorage.getItem('robotGladiatorChamps')) || localChamp;

    /*
    localChamp.trainer = ((window.localStorage.getItem("high-score-name")) ? window.localStorage.getItem("high-score-name") : localChamp.trainer);
    localChamp.robot = ((window.localStorage.getItem("high-score-robot")) ? window.localStorage.getItem("high-score-robot") : localChamp.robot);
    localChamp.score = ((window.localStorage.getItem("high-score")) ? window.localStorage.getItem("high-score") : localChamp.score);
    */
}
var enemyHealthCheck = function(enemy) {
    //check enemys health
    if (enemy.health <= 0) { //if no health

        //reward player
        let reward = randomNumber(3 + weekOfBattle, 9 + weekOfBattle);
        playerInfo.takeCash(reward);

        console.log(enemy.name + " has died!");
        window.alert(enemy.name + " is defeated!!\n You found $" + reward + " among their wreakage!");
        return null;
    } else { // still health left
        console.log(enemy.name + " still has " + enemy.health + " health left.");
    }
    return enemy.health;
};
var enemyMakeAttack = function(enemy) {
    // generate random damage value based on enemy's attack power
    damage = Math.floor(Math.max(1, randomNumber(enemy.attack * 2 / 3, enemy.attack)));
    if (playerInfo.hasArmour) {

        let newDamage = Math.ceil(damage * (randomNumber(55, 75) / 100));
        playerInfo.armourDamage += (damage - newDamage);
        console.log("Armour On!   atk power:" + damage + "  atk effect:" + newDamage);
        console.log("Your armour has protected you from " + playerInfo.armourDamage + " damage!");
    }
    // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the consoe so we know it worked.
    console.log(enemy.name + " has attacked " + playerInfo.name + " for " + damage + ".");
    return damage;
}
var displayWelcome = function() {
    window.alert("Welcome to Robot Gladiators!\n\n " +
        "     Current Champion: 🥊 " + localChamp.robot + " 🤖\n      Rounds: 🔔 " + localChamp.rounds + "\n      Prize Winnings: 💵$" + localChamp.score + "💵 \n      Trainer: 💪 " + localChamp.trainer + "\n\n" +
        "Will you enter your Bot, and try your luck in the Great Robo Death Match?");
}
var shop = function() {
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt("END OF WEEK " + weekOfBattle + " STATUS:\n" +
        "  Cash: $ " + playerInfo.money +
        "  Health: " + playerInfo.health + "/" + playerInfo.maxHealth +
        "  Attack: " + playerInfo.attack +
        "  Speed: " + playerInfo.speed + "\n\n" +
        "Would you like to:\n" +
        "  1. Restore Health for $" + playerInfo.healthShopCost() + "           5. Upgrade Armour for $" + playerInfo.armourShopCost + "\n" +
        "  2. Upgrade Health for $" + playerInfo.healthUpShopCost + "          0. LEAVE\n" +
        "  3. Upgrade Attack for $" + playerInfo.attackShopCost + "\n" +
        "  4. Upgrade Speed for $" + playerInfo.speedShopCost + "\n" +
        "  \n" //+
        // "Please enter your choice: "
    );

    //use switch to carry out actions
    switch (shopOptionPrompt.toUpperCase()) {
        case "1":
        case "RESTORE":
        case "FILL":
        case "HEALTH":
            playerInfo.refillHealth();
            break;

        case "2":
            playerInfo.upgradeHealth();
            break;

        case "3":
        case "UPGRADE":
        case "ATTACK":
        case "POWER":
            playerInfo.upgradeAttack();
            break;

        case "4":
        case "SPEED":
        case "FAST":
        case "INCREASE":
            playerInfo.increeseSpeed();
            break;

        case "5":
        case "DEF":
        case "HARD":
        case "ARMOUR":
            playerInfo.getArmour();
            break;

        case "0":
        case "Q":
        case "X":
        case "QUIT":
        case "EXIT":
        case "LEAVE":
            //window.alert("Leaving the store.");
            break;

        case "FIGHT":
            //window.alert("Leaving the store.");
            playerInfo.upgradeAttack(1);
            playerInfo.cheater = true;
            break;

        case "HURRY":
            //window.alert("Leaving the store.");
            playerInfo.increeseSpeed(1);
            playerInfo.cheater = true;
            break;

        default:
            window.alert("You did not type a valid option. Try something else");
            shop();
            break;
    }
};
var whoDrawsFirst = function(enemy) {
    //function to determine who attacks first in each round of battle

    //get differentce in opponents speeds
    let diff = (playerInfo.speed - currentEnemy.speed)
        // positive number means player is faster
        // negative means enemy is faster

    //flip a coin; if heads(>.5) chance is 1 if tails(<=.5) chance is -1
    let chance = ((Math.random() > 0.5) ? 1 : (-1));

    // take the diff and add a ranmdom int from (-2...+2) and return value
    return diff + (randomNumber(1, 2) * chance);
};
var fightOrRun = function() {

    let prompt = window.prompt("You have " + playerInfo.health + " health. \n" + currentEnemy.name + " has " + currentEnemy.health + " health.\n" +
        "\nWould you like to FIGHT or RUN from this round? \n" +
        "Enter 'FIGHT' or 'RUN' to choose.", "Fight").toUpperCase();

    if (!prompt) {
        return fightOrRun();
    }

    if (prompt === "RUN") {

        var confirmSkip = window.confirm("Are you sure you want to run from the fight?");

        //if yes(true), leave fight
        if (confirmSkip && playerInfo.money >= 10 && currentEnemy.speed < playerInfo.speed * 1.5) {
            //subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log(playerInfo.name + " has chosen to run from this fight! and now has " + playerInfo.money + " money left");
            window.alert(playerInfo.name + " has chosen to run from this fight! and now has " + playerInfo.money + " money left");

            shop();
        } else if (playerInfo.money < 10) {
            console.log("Not enough money to skip fight");
            window.alert("Not enough money COWARD!\nBack In You GO! ...");

            return true;
        } else {
            console.log("Not fast enough to run");
            window.alert("Its no use!\nYour opponent is too fast to run from...");
            return true;
        }
    }
    if (prompt === "FIGHT") {
        return true;
    }
    if (prompt === "QUIT") {
        window.open("https://qcent.github.io/dev-portfolio/", "_self")
    }
    if (prompt === "RESTART") {
        window.open("file:///Users/qcent/SCS%20BootCamp/CODE/robot-gladiators/index.html", "_self")
    } else {
        window.alert("You need to choose a valid option, silly goose! \n Please Try Again, Sir!");
        fightOrRun();
    }
}
var fight = function(enemy) {

    while (enemy.health > 0 && playerInfo.health > 0) {

        //check what player will do
        if (fightOrRun()) { // true if fight is chosen

            if (whoDrawsFirst(enemy) > 0) {
                // positive numbers mean player attacks first
                let dam1 = playerInfo.makeAttack(enemy);
                if (!enemyHealthCheck(enemy)) {
                    //check enemys health after attack and break if dead
                    break;
                }
                // enemy robot now attacks
                let dam2 = enemyMakeAttack(enemy);

                window.alert(playerInfo.name + " attacks first for " + dam1 + " damage!\n" +
                    enemy.name + " retaliates for " + dam2 + " damage!\n");

                if (!playerInfo.healthCheck()) {
                    //check player health, break if dead
                    break;
                }
            } else { // was a negative number and enemy robot will attack first
                // enemy robot  attacks
                let dam1 = enemyMakeAttack(enemy);
                if (!playerInfo.healthCheck()) {
                    //check player health, break if dead
                    window.alert(enemy.name + " attacks first for " + dam1 + " damage!");
                    break;
                }
                // now the player attacks 
                let dam2 = playerInfo.makeAttack(enemy);
                window.alert(enemy.name + " attacks first for " + dam1 + " damage!\n" +
                    playerInfo.name + " retaliates for " + dam2 + " damage!\n");

                if (!enemyHealthCheck(enemy)) {
                    //check enemys health after attack and break if dead
                    break;
                }
            }

        } // end of if (FIGHT)
    } // repeat while loop
}
var startGame = function() {

    getLocalChamp();
    displayWelcome();
    playerInfo.reset();
    beatenOpponents = [];
    weekOfBattle = 0;
    totalrounds = 0;

    /* GAME TESTING TO LIMIT OPPONENTS
    for (let i = 0; i < opponentList.length - 2; i++) {
        beatenOpponents.splice(i, 1, true);
    }
    */
    buildABot(playerInfo.name);

    while (playerInfo.health > 0 && totalrounds < opponentList.length && opponentsRemaining()) { // you are alive and havent been in as many fights as there are opponents
        enemyInfo = [];
        weekOfBattle++;
        // if ((weekOfBattle - 1) % 3 === 0) { beatenOpponents = [] } // every three weeks beaten opponents can return
        alert("                           WELCOME TO THE JUNGLE! \n                                           Week: " + weekOfBattle)
        weeksOpponents = pickOpponents(3);
        weeksOpponents.forEach(robot => {
            enemyInfo.push(opponentList[robot]);
        });

        for (let i = 0; i < enemyInfo.length; i++) {
            if (playerInfo.health > 0) {
                currentEnemy = Object.create(enemyInfo[i]);

                totalrounds++;
                window.alert("    Week " + weekOfBattle + " : Round " + (i + 1) + "\n Your opponent: " + currentEnemy.name + "🤖 ");

                let boostGiven = randomizeEnemyStats(currentEnemy);
                console.log("Was boosted: " + boostGiven);
                console.log(currentEnemy.name, currentEnemy);
                console.log(playerInfo.name + ": attack: " + playerInfo.attack + ", speed: " + playerInfo.speed + ", health: " + playerInfo.health + "/" + playerInfo.maxHealth)

                fight(currentEnemy);

                if (currentEnemy.health <= 0) {
                    //if enemy is dead
                    beatenOpponents[weeksOpponents[i]] = true;
                }

                // if not at end of enemys and player is still alive
                if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                    playerInfo.refillHealth(Math.floor(playerInfo.maxHealth * .18));
                    alert('You rest between battle and regain ' + Math.floor(playerInfo.maxHealth * (playerInfo.overNightRecharge + (i / 80))) + ' health')
                }
            } else { //playert has no health left
                break;
            }
        }
        if (playerInfo.health > 0 && opponentsRemaining()) {
            let payout = calcPayout();
            playerInfo.takeCash(payout);
            window.alert("The week's fighting is over! And you came out on top!\nThe Robot Fighting League manager comes over and gives you your week's pay: '" + payout + " Big Ones!!'\n" +
                managerMessage[weekOfBattle - 1]);
            //lets go shopping
            window.alert("Let's visit the repair bay.");
            shop();
        } else if (!opponentsRemaining()) {
            // BEAT THE WHOLE GAME /*   
            let payout = calcPayout();
            playerInfo.takeCash(payout);
            window.alert("The Robot Fighting League manager comes over with a Beamin' Smile in his face!\n" +
                "'Wheeee! Doooggy! That's some uh' the finest robot rasslin' I've ever had the pleasure to be in the presence of'.\n" +
                "'Boy, you done made me a very rich and a very... I say very , Happy Man!' \n" +
                "'Take this bonus Champ! and go on a vacation, I ain't got no more bots left for you to break.'\n" +
                "He hands over: $" + payout);
        }
    } //END OF WHILE LOOP
    endGame();
};
var endGame = function() {
    if (playerInfo.health > 0) {
        //let score = (playerInfo.money * playerInfo.attack * playerInfo.speed * playerInfo.health);
        window.alert("🎉🤖🎉 Great job!, " + playerInfo.name + " has survived " + totalrounds + " rounds\n                      and WON!! the game! 🎉🤖🎉 \n\n" +
            "You finished the tournament with a grand total winnings of: \n                                    💰 $" + playerInfo.totalEarnings + " 💰");

        checkHighScore(playerInfo.totalEarnings);

    } else {
        window.alert("You have lost your robot in battle! \n" +
            "After " + weekOfBattle + " weeks of battle and " + totalrounds + " rounds, " +
            playerInfo.name + " has gone to the big scrap yard in the sky. \n" +
            "        🤖 Game Over! 🤖 ");

        checkHighScore(playerInfo.totalEarnings);
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators!\n Y'all come back now, ya hear!");
    }
};

startGame();