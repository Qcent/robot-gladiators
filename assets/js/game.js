// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

var currentEnemy;

var startGame = function() {

    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            currentEnemy = enemyInfo[i];

            window.alert("Welcome to Robot Gladiators!\n   Round " + (i + 1) + "\n Your opponent: " + currentEnemy.name + "🤖 ");

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
            endGame();
        }
    }
    endGame();
};

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("🎉🤖🎉 Great job!, " + playerInfo.name + " has survived, \nand WON!! the game! 🎉🤖🎉 \n\n" +
            "    You finished the tournament with a grand prize of: \n💰 $ " +
            (playerInfo.money * playerInfo.attack * playerInfo.speed * playerInfo.health) + "💰");
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
        "     Cash: $ " + playerInfo.money +
        "     Health: " + playerInfo.health +
        "     Attack: " + playerInfo.attack +
        "     Speed: " + playerInfo.speed + "\n\n" +
        "Would you like to:\n" +
        "  1. REFILL your Health for $" + playerInfo.healthShopCost + "\n" +
        "  2. UPGRADE your Attack for $" + playerInfo.attackShopCost + "\n" +
        "  3. INCREASE you Speed for $" + playerInfo.speedShopCost + "\n" +
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
        case "QUICK":
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

var fightOrRun = function() {

    let prompt = window.prompt("You have " + playerInfo.health + " health. \n" + currentEnemy.name + " has " + currentEnemy.health + " health.\n" +
        "\nWould you like to FIGHT or RUN from this round? \n" +
        "Enter 'FIGHT' or 'RUN' to choose.", "Fight").toUpperCase();

    if (!prompt) {
        return fightOrRun();
    }

    if (prompt === "SKIP") {

        var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

        //if yes(true), leave fight
        if (confirmSkip && playerInfo.money >= 10) {
            //subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");
            window.alert(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");

            shop();
        }
        if (playerInfo.money < 10) {
            console.log("Not enough money to skip fight");
            window.alert("Not enough money to skip fight!\nIn You GO! ...");

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

            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            // Subtract the value of `playerInfo.attack` from value of `enemy.health` vaiable and use the result to update the `enemy.health`variable.
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + ".");

            //check enemys health
            if (enemy.health <= 0) { //if no health

                //reward player
                let reward = randomNumber(4, 10);
                playerInfo.money += reward;
                console.log(enemy.name + " has died!");
                window.alert(enemy.name + " is defeated!!\n You found $" + reward + " among their wreakage!");

                break;

            } else { // still health left
                console.log(enemy.name + " still has " + enemy.health + " health left.");
            }

            // generate random damage value based on enemy's attack power
            damage = randomNumber(enemy.attack - 3, enemy.attack);
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update teh value in the `playerInfo.health` variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the consoe so we know it worked.
            console.log(enemy.name + " has attacked " + playerInfo.name + " for " + damage + ".");


            //check players health
            if (playerInfo.health <= 0) { // if no health left
                console.log(playerInfo.name + " has died!");
                break;
            } else { // still alive
                console.log(playerInfo.name + " still has " + playerInfo.health + " health left.");
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
    speed: 5,
    money: 5,
    healthRefillValue: 20,
    attackUpgradeValue: 6,
    speedIncreeseValue: 2,
    healthShopCost: 6,
    attackShopCost: 7,
    speedShopCost: 7,

    reset: function() {
        this.name = this.getRobotName();
        this.health = 100;
        this.attack = 10;
        this.speed = 5;
        this.money = 5;
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
    }
}

var enemyInfo = [{
    name: "Roborto",
    attack: 11,
}, {
    name: "Adolf Bot-ler",
    attack: 11
}, {
    name: "RoBot-O Alamar",
    attack: 12
}, {
    name: "Android Lloyd Webber",
    attack: 14
}];

startGame();