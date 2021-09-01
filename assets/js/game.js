// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

var startGame = function() {

    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            var currentEnemy = enemyInfo[i];

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
        window.alert("🎉🤖🎉 Great job!, " + playerInfo.name + " has survived, \nand WON!! the game! 🎉🤖🎉 \n\n    You finished the tournament with a grand prize of:\n        💰 $" + (playerInfo.money * playerInfo.health) + " 💰");
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
    var shopOptionPrompt = window.prompt(
        "You have: $ " + playerInfo.money + "\n" +
        "Health: " + playerInfo.health + "\n\n" +
        "Would you like to REFILL your Health , UPGRADE your Attack, or LEAVE?\n" +
        "Please Enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out actions
    switch (shopOptionPrompt.toUpperCase()) {
        case "REFILL":
        case "FILL":
        case "HEALTH":
            playerInfo.refilllHealth();
            break;

        case "UPGRADE":
        case "ATTACK":
        case "POWER":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "QUIT":
        case "EXIT":
        case "FIGHT":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not type a valid option. Try something else");
            shop();
            break;
    }
};

var fight = function(enemy) {

    while (enemy.health > 0 && playerInfo.health > 0) {

        let promptFight = window.prompt("You have " + playerInfo.health + " health. \n" + enemy.name + " has " + enemy.health + " health.\n" +
            "\nWould you like to FIGHT or SKIP this round? \n" +
            "Enter 'FIGHT' or 'SKIP' to choose.", "Fight");

        if (promptFight.toUpperCase() === "SKIP") {

            var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

            //if yes(true), leave fight
            if (confirmSkip && playerInfo.money >= 10) {
                //subtract money from player for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");
                window.alert(playerInfo.name + " has chosen to skip this fight! and now has " + playerInfo.money + " money left");

                break;
            }
            if (playerInfo.money < 10) {
                console.log("Not enough money to skip fight");
                window.alert("Not enough money to skip fight!");
                fight(enemy);
            }
        }
        if (promptFight.toUpperCase() === "FIGHT") {


            // Subtract the value of `playerInfo.attack` from value of `enemy.health` vaiable and use the result to update the `enemy.health`variable.
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + ".");


            //check enemys health
            if (enemy.health <= 0) {

                //reward player
                let reward = randomNumber(4, 10);
                playerInfo.money += reward;
                console.log(enemy.name + " has died!");
                window.alert(enemy.name + " is defeated!!\n You found $" + reward + " among their wreakage!");

                break;

            } else {
                console.log(enemy.name + " still has " + enemy.health + " health left.");
            }

            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update teh value in the `playerInfo.health` variable.
            // generate random damage value based on enemy's attack power
            damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the consoe so we know it worked.
            console.log(enemy.name + " has attacked " + playerInfo.name + " for " + damage + ".");


            //check players health
            if (playerInfo.health <= 0) {
                console.log(playerInfo.name + " has died!");
                break;
            } else {
                console.log(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else {
            window.alert("You need to choose a valid option, silly goose! \n Please Try Again, Sir!");
            fight(enemy);
        }
    }
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 11,
    healthRefillValue: 20,
    attackUpgradeValue: 6,
    shopCost: 7,

    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 5;
    },
    refilllHealth: function() {

        if (this.money >= this.shopCost) {
            window.alert("Refilling " + this.name + "'s Health by " + this.healthRefillValue + " for $" + this.shopCost + ".");

            this.health += this.healthRefillValue;
            this.money -= this.shopCost;

            shop();
        } else {
            window.alert("Sorry " + this.name + " is too poor for that. Try something else");
            shop();
        }


    },
    upgradeAttack: function() {

        if (this.money >= this.shopCost) {
            window.alert("Upgrading " + this.name + "'s Attack by " + this.attackUpgradeValue + " for $" + this.shopCost + ".");

            this.attack += this.attackUpgradeValue;
            this.money -= this.shopCost;

            shop();
        } else {
            window.alert("Sorry " + this.name + " is too poor for that. Try something else");
            shop();
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