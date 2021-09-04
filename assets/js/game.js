// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

var checkHighScore = function(score) {

    if (parseInt(localChamp.score) < score) {
        //New High Score
        let scoreName = window.prompt("You set a NEW HIGH SCORE !!!\n\nPlease Enter Your Name:");
        if (!scoreName) { checkHighScore(score); } // if no name is entered re run function
        else {
            // set new highscore
            window.localStorage.setItem("high-score-name", scoreName);
            window.localStorage.setItem("high-score-robot", playerInfo.name);
            window.localStorage.setItem("high-score", score);
        }
    } else {
        window.alert("Well you did your best but you still fell short of the Champ... \n" + localChamp.robot + " is still the greatest fighter with $" + localChamp.score + " in winnings.");
    }
}
var localChamp = {
    robot: 'Paul the Robot',
    trainer: 'John',
    score: '100'
};
var getLocalChamp = function() {
    // if localStorage values are not null set tehm the localChamp values
    localChamp.trainer = ((window.localStorage.getItem("high-score-name")) ? window.localStorage.getItem("high-score-name") : localChamp.trainer);
    localChamp.robot = ((window.localStorage.getItem("high-score-robot")) ? window.localStorage.getItem("high-score-robot") : localChamp.robot);
    localChamp.score = ((window.localStorage.getItem("high-score")) ? window.localStorage.getItem("high-score") : localChamp.score);
}

var currentEnemy;

var enemyInfo = [{
    name: "Roborto",
    attack: 11,
    speed: 4,
}, {
    name: "Adolf Bot-ler",
    attack: 11,
    speed: 6,
}, {
    name: "RoBot-O Alamar",
    attack: 12,
    speed: 6,
}, {
    name: "Android Lloyd Webber",
    attack: 14,
    speed: 8,
}];

var enemyHealthCheck = function(enemy) {
    //check enemys health
    if (enemy.health <= 0) { //if no health

        //reward player
        let reward = randomNumber(4, 10);
        playerInfo.money += reward;
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
    damage = randomNumber(enemy.attack - 3, enemy.attack);
    // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update teh value in the `playerInfo.health` variable.
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the consoe so we know it worked.
    console.log(enemy.name + " has attacked " + playerInfo.name + " for " + damage + ".");
    return damage;
}
var displayWelcome = function() {
    window.alert("Welcome to Robot Gladiators!\n\n " +
        "     Current Champion: 🤖" + localChamp.robot + "\n      Trainer: 💪" + localChamp.trainer + "\n      Prize Winnings: 💵$" + localChamp.score + "💵 \n\n" +
        "Will you enter your Bot, and try your luck in the Great Robo Death Match?");
}
var startGame = function() {

    getLocalChamp();
    displayWelcome();
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            currentEnemy = enemyInfo[i];

            window.alert("      Round " + (i + 1) + "\n Your opponent: " + currentEnemy.name + "🤖 ");

            currentEnemy.health = randomNumber(40, 60);

            fight(currentEnemy);

            // if not at end of enemys and player is still alive
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                //ask if they'd like to go shopping
                var storeConfirm = window.confirm("The fight is over, visit the repair bay?");
                if (storeConfirm) {
                    shop();
                }

            }

        } else {
            break;
        }
    }
    endGame();
};

var endGame = function() {
    if (playerInfo.health > 0) {
        let score = (playerInfo.money * playerInfo.attack * playerInfo.speed * playerInfo.health);
        window.alert("🎉🤖🎉 Great job!, " + playerInfo.name + " has survived, \n              and WON!! the game! 🎉🤖🎉 \n\n" +
            "You finished the tournament with a grand prize of: \n           💰 $" + score + "💰");

        checkHighScore(score);

    } else {
        window.alert("You have lost your robot in battle! \n" +
            playerInfo.name + " has gone to the big scrap yard in the sky. \n" +
            " 🤖 Game Over! 🤖 ");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators!\n Y'all come back now, ya hear!");
    }
};

var shop = function() {
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt("AFTER FIGHT STATUS:\n" +
        "   Cash: $ " + playerInfo.money +
        "   Health: " + playerInfo.health +
        "   Attack: " + playerInfo.attack +
        "   Speed: " + playerInfo.speed + "\n\n" +
        "Would you like to:\n" +
        "  1. REFILL your Health for $" + playerInfo.healthShopCost + "\n" +
        "  2. UPGRADE your Attack for $" + playerInfo.attackShopCost + "\n" +
        "  3. INCREASE your Speed for $" + playerInfo.speedShopCost + "\n" +
        "  4. LEAVE\n" +
        "Please enter your choice: "
    );

    //use switch to carry out actions
    switch (shopOptionPrompt.toUpperCase()) {
        case "1":
        case "REFILL":
        case "FILL":
        case "HEALTH":
            playerInfo.refilllHealth();
            break;

        case "2":
        case "UPGRADE":
        case "ATTACK":
        case "POWER":
            playerInfo.upgradeAttack();
            break;

        case "3":
        case "SPEED":
        case "FAST":
        case "INCREASE":
            playerInfo.increeseSpeed();
            break;

        case "4":
        case "Q":
        case "X":
        case "QUIT":
        case "EXIT":
        case "LEAVE":
            window.alert("Leaving the store.");
            break;

        case "FIGHT":
            window.alert("Leaving the store.");
            playerInfo.upgradeAttack(1);
            playerInfo.cheater = true;
            break;

        case "HURRY":
            window.alert("Leaving the store.");
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
        if (confirmSkip && playerInfo.money >= 10) {
            //subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");
            window.alert(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");

            shop();
        } else if (playerInfo.money < 10) {
            console.log("Not enough money to skip fight");
            window.alert("Not enough money COWARD!\nBack In You GO! ...");

            return true;
        }
    }
    if (prompt === "FIGHT") {
        return true;
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

var playerInfo = {
    getRobotName: function() {
        let usrInput = window.prompt("What is your robot's name?", this.name);
        if (usrInput) { return usrInput; } else {
            window.alert("Please enter a Name!");
            this.getRobotName();
        }
    },
    name: '',
    health: 100,
    attack: 10,
    speed: 6,
    money: 5,
    healthRefillValue: 25,
    attackUpgradeValue: 6,
    speedIncreeseValue: 2,
    healthShopCost: 6,
    attackShopCost: 7,
    speedShopCost: 7,

    reset: function() {
        this.name = this.getRobotName();
        this.health = 100;
        this.attack = 10;
        this.speed = 6;
        this.money = 6;
    },
    refilllHealth: function(value) {

        if (value) { this.health += value; } else {
            if (this.money >= this.healthShopCost) {
                window.alert("Refilling " + this.name + "'s Health by " + this.healthRefillValue + " for $" + this.healthShopCost + ".");

                this.health += this.healthRefillValue;
                this.money -= this.healthShopCost;

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }

    },
    upgradeAttack: function(value) {
        if (value) { this.attack += value; } else {
            if (this.money >= this.attackShopCost) {
                window.alert("Upgrading " + this.name + "'s Attack by " + this.attackUpgradeValue + " for $" + this.attackShopCost + ".");

                this.attack += this.attackUpgradeValue;
                this.money -= this.attackShopCost;

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }

    },
    increeseSpeed: function(value) {
        if (value) { this.speed += value; } else {
            if (this.money >= this.speedShopCost) {
                window.alert("Upgrading " + this.name + "'s Speed by " + this.speedIncreeseValue + " for $" + this.speedShopCost + ".");

                this.speed += this.speedIncreeseValue;
                this.money -= this.speedShopCost;

                shop();
            } else {
                window.alert("Sorry " + this.name + " is too poor for that. Try something else");
                shop();
            }
        }
    },
    makeAttack: function(enemy) {
        // generate random damage value based on player's attack power
        var damage = randomNumber(this.attack - 3, this.attack);
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
    }
}



startGame();