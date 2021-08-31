var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Adolf Bot-ler", "RoBot-O Alamar", "Android Lloyd Webber"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

    while (enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? \n" + "Enter 'FIGHT' or 'SKIP' to choose.", "Fight");
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
                console.log(enemyName + " has died!");

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

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // Alert players that they are starting the round
        window.alert("Welcome to Robot Gladiators! \n Round " + (i + 1));


        var currentEnemy = enemyNames[i];
        enemyHealth = 50;
        fight(currentEnemy);
    } else {
        window.alert("You have lost your robot in battle! \n" +
            playerName + " has gone to the big scrap yard in the sky. \n" +
            " 🤖 Game Over! 🤖 ");
        break;
    }

};