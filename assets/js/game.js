var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Adolf Bot-ler", "RoBot-O Alamar", "Android Lloyd Webber"];
var enemyHealth = 50;
var enemyAttack = 12;

var startGame = function() {

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            var currentEnemy = enemyNames[i];

            window.alert("Welcome to Robot Gladiators!\n   Round " + (i + 1) + "\n Your opponent: " + currentEnemy);

            enemyHealth = 50;

            fight(currentEnemy);

            // if not at end of enemys and player is still alive
            if (i < enemyNames.length - 1 && playerHealth > 0) {
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
};

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You have lost your robot in battle! \n" +
            playerName + " has gone to the big scrap yard in the sky. \n" +
            " 🤖 Game Over! 🤖 ");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Y'all come back now, ya hear!");
    }
};

var shop = function() {
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your Health , UPGRADE your Attack, or LEAVE?\n" +
        "Please Enter one: 'REFIL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out actions
    switch (shopOptionPrompt.toUpperCase()) {
        case "REFILL":
        case "FILL":
        case "HEALTH":
            if (playerMoney >= 7) {
                window.alert("Refilling " + playerName + "'s Health by 20 for $7.");

                playerHealth += 20;
                playerMoney -= 7;

                shop();
            } else {
                window.alert("Sorry " + playerName + " is too poor for that. Try something else");
                shop();
            }
            break;

        case "UPGRADE":
        case "ATTACK":
        case "POWER":
            if (playerMoney >= 7) {
                window.alert("Upgrading " + playerName + "'s Attack by 6 for $7.");

                playerAttack += 6;
                playerMoney -= 7;

                shop();
            } else {
                window.alert("Sorry " + playerName + " is too poor for that. Try something else");
                shop();
            }

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

var fight = function(enemyName) {

    while (enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("You have " + playerHealth + " health. \n" + enemyName + " has " + enemyHealth + " health.\n" +
            "\nWould you like to FIGHT or SKIP this round? \n" + "Enter 'FIGHT' or 'SKIP' to choose.", "Fight");
        if (promptFight.toUpperCase() === "SKIP") {

            var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

            //if yes(true), leave fight
            if (confirmSkip) {
                //subtract money from player for skipping
                playerMoney -= 10;
                console.log(playerName + " has chosen to skip this fight! and now has " + playerMoney + " money left");

                break;
            }
        }
        if (promptFight.toUpperCase() === "FIGHT") {


            // Subtract the value of `playerAttack` from value of `enemyHealth` vaiable and use the result to update the `enemyHealth`variable.
            enemyHealth = enemyHealth - playerAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");


            //check enemys health
            if (enemyHealth <= 0) {


                //reward player
                var reward = Math.floor((Math.random() * 10) + 1);
                playerMoney += reward;
                console.log(enemyName + " has died!");
                window.alert(enemyName + " is defeated!!\n You found $" + reward + " among their wreakage!");


                break;
            } else {
                console.log(enemyName + " still has " + enemyHealth + " health left.");

            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update teh value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;

            // Log a resulting message to the consoe so we know it worked.
            console.log(enemyName + " has attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");


            //check players health
            if (playerHealth <= 0) {
                console.log(playerName + " has died!");

                break;
            } else {
                console.log(playerName + " still has " + playerHealth + " health left.");

            }
        } else {
            window.alert("You need to choose a valid option, silly goose! \n Please Try Again, Sir!");
            fight(enemyName);
        }
    }
}

startGame();