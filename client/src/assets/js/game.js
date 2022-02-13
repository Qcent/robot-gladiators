import $ from 'jquery';

const clearScreen = () => {
    if ($('#Upper-Vis')) $('#Upper-Vis').remove();
    if ($('#Lower-Vis')) $('#Lower-Vis').remove();
}
const setMenuText = (txt, pos) => {
    $('#menu-text').html(txt);

    if (pos) {
        $('#menu-text').css('text-align', 'center');
    }
}
const setMenuContent = (txt) => {
    $('#menu-content section').html(txt);
}
const createBattleText = (txt) => {
    if ($('#Lower-Vis')) $('#Lower-Vis').remove();

    let lowerEl = $("<div>").attr("id", "Lower-Vis");

    let loLeft = $("<div>").attr("id", "lower-left");
    let loRight = $("<div>").attr("id", "lower-right");

    /* LEFT */
    let textContainer = $("<div>").attr("id", "battle-choice-text-box");
    let textArea = $("<div>").attr("id", "battle-choice-text").html((txt ? (txt + "<br>") : '') + "What will <span id='playerNameHolder'>" + playerInfo.name + "</span> do?");

    loLeft.append(textContainer.append(textArea));
    /* RIGHT */
    textContainer = $("<div>").attr("id", "battle-choice-opt-box");
    textArea = $("<div>").attr("id", "battle-choice-opt").append(
        $("<button>").attr("plr-choice", "FIGHT").text("FIGHT").prepend($("<span>").addClass('choiceIcon')),
        $("<button>").attr("plr-choice", "RUN").text("RUN").prepend($("<span>").addClass('choiceIcon')),
        $("<button>").attr("plr-choice", "INFO").text("INFO").prepend($("<span>").addClass('choiceIcon'))
    );

    loRight.append(textContainer.append(textArea));
    /*** */
    $("body").append(lowerEl.append(loLeft, loRight));

    /******** Set up button click listener */
    $("#battle-choice-opt-box").on('click', 'button', function(event) {
        let playerInput = $(event.target).attr("plr-choice");
        if (playerInput === "RUN") { UIGame.runAway(); }
        if (playerInput === "FIGHT") { UIGame.fight(); }
        if (playerInput === "INFO") { UIGame.showInfo(); }
    });
    /*********** arrow key and enter key handling */
    /* $(document).on('keypress', function(e) {
        // if (e.which == 13) { //enter
            console.log($("#battle-choice-opt-box").activeElement)
        //$("#battle-choice-opt-box").activeElement.click() // enter already triggers the highlighted element
     }
     */

    /*     OTHER KEYS NOT WORKING ON MAC SO UNTESTABLE FOR NOW    
    if (e.which == 37 || e.which == 38) { //left || up
        alert('left');
    }
    if (e.which == 39 || e.which == 40) { //right || down
        alert('right');
    } else {
        alert(e.which);
    }

    });*/
}
const createMessageText = (txt, bool) => {
    if ($('#Lower-Vis')) $('#Lower-Vis').remove();

    let lowerEl = $("<div>").attr("id", "Lower-Vis");

    let lowerBox = $("<div>").attr("id", "lower-container");

    let textContainer = $("<div>").attr("id", "menu-text-box");
    let textArea = $("<div>").attr("id", "menu-text").html(txt);

    lowerBox.append(textContainer.append(textArea), bool ? $('<span>').attr('id', 'menu-ok-check') : null);
    /*** */
    $("body").append(lowerEl.append(lowerBox));
}
const createMenuUIArea = (bool) => {
    clearScreen();
    let upperEl = $("<div>").attr("id", "Upper-Vis").addClass("menu-ui");


    let upperBox = $("<div>").attr("id", "upper-container");
    /***/
    upperBox.html(" <div class = 'menu-bg'></div><div class='menu-bg menu-bg2'></div> <div class='menu-bg menu-bg3'></div><div id='menu-content'><section></section></div>");
    /***/

    upperEl.append(upperBox);
    $("body").append(upperEl);

    /*********************** */
    /******LOWER SCREEN */ // el ,  txt , checkbox
    createMessageText(null, bool)

    /**** */

};
const createBattleUIArea = function() {
    clearScreen();

    let upperEl = $("<div>").attr("id", "Upper-Vis");

    let upLeft = $("<div>").attr("id", "upper-left");
    let upRight = $("<div>").attr("id", "upper-right");
    /**/
    let nmeCard = $("<div>").attr("id", "enemy-card");
    let nmeSpriteBox = $("<div>").attr("id", "enemy-box");
    let plrCard = $("<div>").attr("id", "player-card");
    let plrSpriteBox = $("<div>").attr("id", "player-box");
    /**/

    for (let i = 0; i <= 1; i++) { // does enemy then player
        let out = i ? 'player' : 'enemy';
        let cardContainer = $("<div>").addClass("battle-card");;
        let cardFrame = $("<div>").addClass("battle-card-frame");
        let cardFace = $("<div>").addClass("battle-card-face");
        let cardName = $("<h2>").attr("id", out + "-card-name").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?");
        let cardHP = $("<div>").addClass("battle-HP-bar").append($("<span class='ArmourIcon'>").addClass(out)
            .html(`<svg ><circle cx="11" cy="9" r="8" stroke="#0C2D6B" stroke-width="1"  /></svg>`),
            $("<span class='HP-text'>").text("HP")).append($("<div>").append($("<div>").attr("id", out + "-HP-bar")));
        let hpText = $("<h3>").attr("id", out + "-HP-text").text("DQ");
        let spdText = $("<div>").addClass("battle-card-stat").attr("id", out + "-SPD-text").text("Speed: ?");
        let atkText = $("<div>").addClass("battle-card-stat").attr("id", out + "-ATK-text").text("Attack: ?");
        let statBox = i ? $("<div>").append($("<div>").addClass("battle-card-stat stat-pad"), spdText, atkText) : $("<span>").append(spdText, atkText);

        /***** */
        cardFace.append(cardName, cardHP, (i ? hpText : [statBox, hpText]));
        cardContainer.append(cardFace, (i ? cardFrame.append(statBox) : cardFrame));

        i ? plrCard.append(cardContainer) : nmeCard.append(cardContainer);
    }
    /***/
    upLeft.append(nmeCard, plrSpriteBox);
    upRight.append(nmeSpriteBox, plrCard);
    /***/
    upperEl.append(upLeft, upRight);

    $("body").append(upperEl);
    /*********************** */
    /******LOWER SCREEN */
    createBattleText(null);
    /**** */

};
const updateRobotCard = (who) => {
    who = (who === "plr") ? 1 : 0;
    let robot = (who) ? 'player' : 'enemy';
    /*  cardName = */
    $("#" + robot + "-card-name").text((who) ? playerInfo.name : currentEnemy.name);
    /*  cardHP = */
    $("#" + robot + "-HP-bar").css("width", ((who) ? (playerInfo.health / playerInfo.maxHealth) : (currentEnemy.health / currentEnemy.maxHealth)) * 100 + "%");
    /*  hpText = */
    $("#" + robot + "-HP-text").text(((who) ? (playerInfo.health + "/" + playerInfo.maxHealth) : (currentEnemy.health + "/" + currentEnemy.maxHealth)));
    /*  spdText = */
    $("#" + robot + "-SPD-text").text("Speed: " + ((who) ? playerInfo.speed : currentEnemy.speed));
    /*  atkText = */
    $("#" + robot + "-ATK-text").text("Attack: " + ((who) ? playerInfo.attack : currentEnemy.attack));

    /*** HP Bar Colors */
    let hp = (who) ? playerInfo.health : currentEnemy.health;
    if (hp <= 0) {
        $("#" + robot + "-HP-bar").addClass('battle-danger').css('opacity', '0');
    } else {
        let hpp = (who) ? (playerInfo.health / playerInfo.maxHealth) : (currentEnemy.health / currentEnemy.maxHealth);
        let opAtk = (who) ? currentEnemy.attack : playerInfo.attack;
        $("#" + robot + "-HP-bar").addClass((hpp <= 0.55) ? (hp > (opAtk * 2) ? 'battle-weakened' : 'battle-danger') : '');
    }

    /**** ARMOUR SHOWING AND COLOR */
    if ((who) ? playerInfo.hasArmour : currentEnemy.hasArmour) {
        $(".ArmourIcon." + robot).show();

        let armDamage = (who) ? playerInfo.armourDamage : currentEnemy.armourDamage;
        /*
                if (armDamage >= 75) {
                    $(".ArmourIcon." + robot).addClass('deadArmour');
                }
                if (armDamage >= 55) {
                    $(".ArmourIcon." + robot).addClass('damagedArmour');
                }
        */
        let armP = (who) ? (playerInfo.armourDamage / 100) : (currentEnemy.armourDamage / 100);
        let opAtk = (who) ? currentEnemy.attack : playerInfo.attack;
        $(".ArmourIcon." + robot).addClass((armP >= 0.55) ? ((100 - armDamage) > (opAtk * 1.3) ? 'damagedArmour' : 'deadArmour') : '');
    } else {
        $(".ArmourIcon." + robot).hide();
    }
};
const inputToContinue = (callBack) => {
    setTimeout(() => {
        $('body').keypress(function() {
            $('body').trigger('click');
            $('body').off('keypress');
        });
        $('body').on('click', function() {
            $('body').off('click'); // remove listener

            callBack(); //go to next part of game
        });
    }, 450);
};

let weekOfBattle = 0;
let totalrounds = 0;
let currentEnemy = {};
let beatenOpponents = [];
let weeksOpponents = [];
let enemyInfo = [];
let createdBots = [];
let buildingBot = {
    name: '',
    health: 1,
    attack: 0,
    speed: 0,
};
let localChamp = {
    robot: "Andy  D'Botto",
    trainer: 'Mark B',
    score: 40,
    rounds: 4,
    points: 500,
};

/*   CLOUD SCORE DB */
let netChamp = {};

const getNetChamp = () => {

    const QUERY_SCORES = `
  {
    getScores {
      _id
      robot
      trainer
      score
      rounds
      points
    }
  }
`;

    let apiCall = "graphql";
    //let apiCall = "https://calm-gorge-19876.herokuapp.com/api/roboserve";

    return new Promise((res, rej) => {
        fetch(apiCall, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: QUERY_SCORES,
                    variables: {}
                })
            })
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            if (data.data.getScores.length) {
                                const { robot, trainer, score, rounds, points } = data.data.getScores[0];
                                netChamp = {
                                    robot: robot,
                                    trainer: trainer,
                                    score: parseInt(score),
                                    rounds: parseInt(rounds),
                                    points: parseInt(points)
                                };
                            } else {
                                netChamp = {
                                    robot: "No",
                                    trainer: "Week",
                                    score: "This",
                                    rounds: "Champion",
                                    points: 0
                                };
                            }
                            if (parseInt(netChamp.points) > localChamp.points) {
                                console.log("Net is Best")
                            } else {
                                console.log("Local Hocal")
                            }
                            res({
                                ok: true,
                                message: 'HighScore Retrieved'
                            })
                        })
                } else {
                    res({
                        ok: false,
                        message: 'Bad Response'
                    })
                }
            })
    });
};

const submitLocalChamp = (newScore) => {

    const SUBMIT_SCORE = `
  mutation submitScore(
    $robot: String!,
    $trainer: String!,
    $score: Int!,
    $rounds: Int!,
    $points: Int!
  ) {
    submitScore(
      robot: $robot
      trainer: $trainer
      score: $score
      rounds: $rounds
      points: $points
    ) {
      _id
      robot
      trainer
      score
      rounds
      points
    }
  }
`;


    //let apiCall = "https://calm-gorge-19876.herokuapp.com/api/roboserve";
    let apiCall = "http://localhost:3001/graphql";

    return new Promise((res, rej) => {
        fetch(apiCall, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: SUBMIT_SCORE,
                    variables: {
                        ...newScore
                    }

                })
            })
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            //return "loaded data from API"
                            if (data.ok) {
                                res({
                                    ok: true,
                                    message: 'Global High Score Achieved!'
                                })
                            } else {
                                res(data);
                            }
                        })
                } else {
                    res({
                        ok: false,
                        message: 'Bad Response'
                    })
                }
            })
    });
};
/*  END OF CLOUD BS ACCESS */

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
        name: "Atlas",
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
    `"Nice work, kid!...<br>You just found yerself a job"<br><br>He hands you a meagre sum.<br><br>"Whaat? You think I didn't see you pocket all that money from the ring?"<br>"Just keep winning fights and the payouts will get bigger."`,
    `"Easy there Cowboy"<br>"Don't celebrate too hard!"<br>"Y'all still have to musta up the YeeHaw! fer 8 more weeks."<br><br>"Not bad for a rookie...<br>... I guess."`,
    `"Made it thru yer third week eh!?"<br>"Maybe your not just a 2-Bit bucket of bolts after all!"<br><br>"...Still could be a fluke...<br>If you're still here next week then I might remember your name"`,
    `"You sure been gettin' lucky out there kid."<br><br>"Most newcomers don't make it much farther than this..."<br><br>"But you gotta a certain look in your eye, you just might be different."`,
    `"Great Show out there, Champ!"<br>"Say? Where'd you learn to fight like that anyhow?... <br><br>ah nevermind, you just come back and win next week, then you"ll really get paid."`,
    `"Well I say!..." "You sure gave sum'uh our best bots a run for their money this week"<br><br>"You got real STAR potential... maybe even a champ in the making..."`,
    `"Well Good Golly!",<br> "Ain't seen a set uh' battles that close since my days back in Nam!"<br><br>"Sumpin tells me you were born for this sport kiddo!"`,
    `"Whoooey boy!, you really gave them folks a show this week!"<br><br>"You keep this up and you just might get yourself a plaque on the wall."`,
    `"Well you gon and done it! This you made it kid!"<br>"Welcome to the Championships! You survive the next week and you'll finally win your freedom."<br><br>"Make this paycheck count... The scrap yard don't favour the wealthy if y'all didn't hear."`,
    `Week Ten, well you should have won by now, how many robots could there be?`
];
/**** END of GLOBAL VARIABLES */
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

const playerInfo = {
    name: '',
    maxHealth: 80,
    health: 80,
    attack: 10,
    speed: 6,
    money: 5,
    hasArmour: false,
    lostArmour: false,
    armourDamage: 0,
    totalEarnings: 0,
    healthRefillValue: function() { //return Math.floor(this.maxHealth * .2)  //20% of max health
        return this.maxHealth;
    },
    healthUpgrageValue: 20,
    attackUpgradeValue: 2,
    speedIncreeseValue: 2,
    healthUpShopCost: 10,
    healthShopCost: function() { let x = (this.maxHealth > this.health ? 1 : 0); return 8 * Math.max(Math.floor((this.maxHealth - this.health) * .35), x) },
    attackShopCost: 7,
    speedShopCost: 8,
    armourShopCost: 25,
    armourReShopCost: function() { let x = (this.armourDamage > 0 ? 1 : 0); return 10 * Math.max(Math.floor(this.armourDamage * .35), x) },
    upgradeIncreaseCost: 0.60,
    overNightRecharge: 0.20,

    resetForUi: function() {
        this.name = '';
        this.maxHealth = 80;
        this.health = this.maxHealth;
        this.healthUpShopCost = 200;
        this.attackShopCost = 75;
        this.speedShopCost = 85;
        this.armourReset();
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
                setMenuText("Refilling " + this.name + "'s Health by " + (this.maxHealth - this.health) + " for $" + this.healthShopCost() + ".");

                this.money -= this.healthShopCost();
                this.health += this.healthRefillValue();

                if (this.health > this.maxHealth) { this.health = this.maxHealth; }
                UIGame.guiShop('reload');
            } else {
                setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
                UIGame.guiShop('reload');
            }
        }

    },
    upgradeHealth: function(value) {

        if (value) { this.maxHealth += Math.floor(value); } else {
            if (this.money >= this.healthUpShopCost) {
                setMenuText("Increasing " + this.name + "'s Max Health by " + this.healthUpgrageValue + " for $" + this.healthUpShopCost + ".");
                let percentHealth = this.health / this.maxHealth;
                this.maxHealth += this.healthUpgrageValue;
                this.setHealth(this.maxHealth * percentHealth);
                this.money -= this.healthUpShopCost;
                //charge more the next time:: 30% more each time
                this.healthUpShopCost += Math.floor((this.healthUpShopCost) * (this.upgradeIncreaseCost * 1.2));

                UIGame.guiShop('reload');
            } else {
                setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
                UIGame.guiShop('reload');
            }
        }
    },
    getArmour: function() {

        if (this.money >= this.armourShopCost && !this.hasArmour) {
            setMenuText("Adding plate Armour to " + this.name + " for $" + this.armourShopCost + ".");

            this.hasArmour = true;
            this.money -= this.armourShopCost;
            //charge more the next time
            //this.armourShopCost += Math.floor((this.armourShopCost) * (this.upgradeIncreaseCost * 2));
            // only buy this itme once
            this.armourShopCost = 'WORN';

            UIGame.guiShop('reload');
        } else if (this.hasArmour) {
            setMenuText(this.name + " already has armour installed!");
            UIGame.guiShop('reload');
        } else {
            setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
            UIGame.guiShop('reload');
        }

    },
    repairArmour: function() {

        if (this.money >= this.armourReShopCost()) {
            if (this.hasArmour) {
                setMenuText("Repairing " + this.name + "'s plate Armour for $" + this.armourReShopCost() + ".");

                this.money -= this.armourReShopCost();
                this.armourDamage = 0;

                UIGame.guiShop('reload');
            } else {
                setMenuText("Sorry " + this.name + " is not equipped with any armour");
                UIGame.guiShop('reload');
            }
        } else {
            setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
            UIGame.guiShop('reload');
        }
    },
    upgradeAttack: function(value) {
        if (value) { this.attack += Math.floor(value); } else {
            if (this.money >= this.attackShopCost) {
                setMenuText("Upgrading " + this.name + "'s Attack by " + this.attackUpgradeValue + " for $" + this.attackShopCost + ".");

                this.attack += this.attackUpgradeValue;
                this.money -= this.attackShopCost;
                //charge more the next time:: 20% more each time
                this.attackShopCost += Math.floor((this.attackShopCost) * this.upgradeIncreaseCost);

                UIGame.guiShop('reload');
            } else {
                setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
                UIGame.guiShop('reload');
            }
        }

    },
    increeseSpeed: function(value) {
        if (value) { this.speed += Math.floor(value); } else {
            if (this.money >= this.speedShopCost) {
                setMenuText("Upgrading " + this.name + "'s Speed by " + this.speedIncreeseValue + " for $" + this.speedShopCost + ".");

                this.speed += this.speedIncreeseValue;
                this.money -= this.speedShopCost;
                //charge more the next time:: 20% more each time
                this.speedShopCost += Math.floor((this.speedShopCost) * this.upgradeIncreaseCost);

                UIGame.guiShop('reload');
            } else {
                setMenuText("Sorry " + this.name + " is too poor for that. Try something else");
                UIGame.guiShop('reload');
            }
        }
    },
    makeAttack: function(enemy) {
        // generate random damage value based on player's attack power
        let damage = Math.ceil(randomNumber(this.attack * 2 / 3, this.attack));


        /*   ARMOUR DAMAGE LESSENING CODE  */
        if (currentEnemy.hasArmour) {

            let newDamage = Math.ceil(damage * (randomNumber(75, 90) / 100));
            currentEnemy.armourDamage += (damage - newDamage);

            console.log("Enemy armour has protected them from " + (damage - newDamage) + " damage!");
            damage = newDamage;

            if (currentEnemy.armourDamage > 100) {
                if (randomNumber(0, 1)) {
                    console.log("You broke " + currentEnemy.name + "'s armour!");

                    currentEnemy.hasArmour = false;
                    currentEnemy.armourDamage = 0;
                }
            }
        }
        /*    ******************************        */

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
    armourReset: function() {
        this.hasArmour = false;
        this.armourDamage = 0;
        this.armourShopCost = 600;
    },
    setUpgradeCosts: function() {
        console.log("setting upgrade costs")
        this.healthUpShopCost = 10 * Math.max(Math.floor(this.health / 4), 5);
        this.attackShopCost = 10 * Math.max(Math.floor(this.attack * .8), 8);
        this.speedShopCost = 10 * Math.max(Math.floor(this.speed * .8), 7);
    },
}
const calcPayout = function() {
    /*                         21
                               20       +       ceil:23/180*(3*7) = (+3)                *7  = 23*7 = 147
                                2         +         ceil: 34/80*(1*7) = (+5)            *7 =  7*7 =48                    
                       opponents beaten +  0||%maxhealth remaining*(weeks*3)  all multiplied by the weeks */
    //  return beatenOpponents.filter(Boolean).length + Math.max(0, Math.ceil(((playerInfo.health / playerInfo.maxHealth) * (weekOfBattle * 7)))) * (weekOfBattle);


    return 9 * ((weekOfBattle / 9) + 1) * (beatenOpponents.filter(Boolean).length * (weekOfBattle + 1)) + Math.max(0, Math.ceil(((playerInfo.health / playerInfo.maxHealth) * (weekOfBattle * 2)))) * Math.ceil(weekOfBattle / 3);

}
const calcStartingShopCosts = () => {

    playerInfo.healthUpShopCost = Math.floor((playerInfo.maxHealth / 100) * 20 * 8.8);

    playerInfo.attackShopCost = Math.max(Math.floor((playerInfo.attack / 10) * 8 * 9.5), 4);

    playerInfo.speedShopCost = Math.max(Math.floor((playerInfo.speed / 10) * 7 * 8), 4);

};
/*********************** */
/*
        OLD CODE DO NOT CHANGE BELOW UNLESS NEEDED
/* *************************** */

// function to generate a random numeric value
const randomNumber = function(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};
const getLocalChamp = function() {
    // if localStorage values are not null set tehm the localChamp values
    localChamp = JSON.parse(localStorage.getItem('robotGladiatorChamps')) || localChamp;
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

    let maxBoost = 6 * weekOfBattle; // everyweek increase max boost by 8
    let totalBoost = 0;
    let boost = 0;

    /*  ADD ARMOUR TO ENEMY  */
    if (weekOfBattle > 4) {
        if (randomNumber(0, 1)) {
            enemy.hasArmour = true;
            enemy.armourDamage = randomNumber(30, 80);
        }
    }
    /*  *****  */

    /*                                     speed boost is capped at 1/2 of players speed                 */
    //boost = randomNumber(0, (Math.max(maxBoost, playerInfo.speed / 2) - totalBoost));
    boost = randomNumber(0, ((maxBoost > (playerInfo.speed / 2) ? (playerInfo.speed / 2) : maxBoost) - totalBoost));
    //console.log("speed boost: " + boost)
    totalBoost += boost;
    enemy.speed = enemy.speed + boost;

    boost = randomNumber(0, (maxBoost - totalBoost)); //get a random stat boost value upto maxBoost
    totalBoost += boost; //keep track of boost handed out in total boost
    enemy.health = enemy.health + boost; //apply boost to stat
    enemy.maxHealth = enemy.health; // set the maxHealth for calc percentages

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
const saveABot = function(bot) {
    createdBots.push(bot);
    localStorage.setItem("GladiatorBots", JSON.stringify(createdBots));
};
const findABot = function(name) {
    createdBots = JSON.parse(localStorage.getItem("GladiatorBots")) || [];

    if (createdBots) {
        for (let i = 0; i < createdBots.length; i++) {
            if (createdBots[i].name === name) {
                // load a bot to playerInfo
                return i;
            }
        }
    }
    return false;
};
const loadABot = function(idx) {
    playerInfo.name = createdBots[idx].name;
    playerInfo.health = createdBots[idx].health;
    playerInfo.maxHealth = createdBots[idx].health;
    playerInfo.speed = createdBots[idx].speed;
    playerInfo.attack = createdBots[idx].attack;
};
const enemyHealthCheck = function(enemy) {
    //check enemys health returns null or the health left
    if (enemy.health <= 0) { //if no health
        return null;
    } else { // still health left
        console.log(enemy.name + " still has " + enemy.health + " health left.");
    }
    return enemy.health;
};
const enemyMakeAttack = function(enemy) {
    // generate random damage value based on enemy's attack power
    let damage = Math.floor(Math.max(1, randomNumber(enemy.attack * 2 / 3, enemy.attack)));

    /*   ARMOUR DAMAGE LESSENING CODE  */
    if (playerInfo.hasArmour) {

        let newDamage = Math.ceil(damage * (randomNumber(70, 83) / 100));
        playerInfo.armourDamage += (damage - newDamage);
        console.log("Armour On!   atk power:" + damage + "  atk effect:" + newDamage);
        console.log("Your armour has protected you from " + playerInfo.armourDamage + " damage!");
        damage = newDamage;

        if (playerInfo.armourDamage > 100) {
            if (randomNumber(0, 1)) {
                console.log("Your plate armour can withstand no more. ");
                playerInfo.lostArmour = true;
                //  createMessageText("Your plate armour can withstand no more. ");
                //  inputToContinue(playerInfo.armourReset);
                playerInfo.armourReset();
            }
        }
    }
    /*    ******************************        */

    // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the consoe so we know it worked.
    console.log(enemy.name + " has attacked " + playerInfo.name + " for " + damage + ".");
    return damage;
}
const whoDrawsFirst = function(enemy) {
    //function to determine who attacks first in each round of battle

    //get differentce in opponents speeds           // a bonus 1 point to the player for balancing
    let diff = (playerInfo.speed - currentEnemy.speed) + 1;
    // positive number means player is faster
    // negative means enemy is faster

    //flip a coin; if heads(>.5) chance is 1 if tails(<=.5) chance is -1
    let chance = ((Math.random() > 0.5) ? 1 : (-1));

    // take the diff and add a ranmdom int from (-2...+2) and return value
    return diff + (randomNumber(1, 2) * chance);
};


/**************** */
/* NEWEST CODE 
ALL METHODS SHOULD ONE 
DAY BE DOWN HERE
/************** */
const UIGame = (() => {
    let nmeIdx = 0;

    const startGame = () => {

        playerInfo.resetForUi();
        beatenOpponents = [];
        weekOfBattle = 0;
        totalrounds = 0;

        /* GAME TESTING TO LIMIT OPPONENTS 
        for (let i = 0; i < opponentList.length - 1; i++) {
            beatenOpponents.splice(i, 1, true);
        }
        /*  */

        getLocalChamp();
        getNetChamp()
            .then((data) => {
                // console.log(data);
                displayIntro();
            });
    }
    const startNewWeek = () => {

        if (!weekOfBattle) { calcStartingShopCosts(); }
        if (playerInfo.health > 0 && totalrounds < opponentList.length && opponentsRemaining()) { // you are alive and havent been in as many fights as there are opponents
            enemyInfo = [];
            weekOfBattle++;

            weeksOpponents = pickOpponents(3);
            weeksOpponents.forEach(robot => {
                enemyInfo.push(opponentList[robot]);
            });

            createMenuUIArea();
            setMenuContent("<h2>WELCOME TO THE JUNGLE!</h2><div>Week: " + weekOfBattle + "</div>");

            (weekOfBattle > 1) ?
            setMenuText(`Robo Fighting League week ${weekOfBattle}.<br>${playerInfo.name} prepares for battle!`):
                setMenuText("Welcome to the Robo Fighting Leagues. Each week you'll face off against 3 different opponents.<br>How many weeks can you last?");

            inputToContinue(startNewRound);

        } //END OF IF IN GAME LOOP
        else {
            alert('No health or no opponents but probably no opponents\n OpponentsRemaining: ' + opponentsRemaining() + "\n Opponents last fought: " + weeksOpponents.length);
            endGame();
        }
    }
    const startNewRound = () => {

        let i = totalrounds % 3;
        nmeIdx = i; // a global refference to the enemyInfo[i]

        if (i === 0) { createBattleUIArea(); } // only redraw if first of the week // 

        if (playerInfo.health > 0 && i < enemyInfo.length) {
            currentEnemy = Object.create(enemyInfo[i]);

            totalrounds++;
            createMessageText("Week " + weekOfBattle + " : Round " + (i + 1) + "<br> Your opponent: 🤖 " + currentEnemy.name + " 🤖 ");

            let boostGiven = randomizeEnemyStats(currentEnemy);
            /*********** */
            console.log("Was boosted: " + boostGiven);
            console.log(currentEnemy.name, currentEnemy);
            console.log(playerInfo.name + ": attack: " + playerInfo.attack + ", speed: " + playerInfo.speed + ", health: " + playerInfo.health + "/" + playerInfo.maxHealth)
                /*********** */

            inputToContinue(sendOutTheBots);

        } else if (i >= enemyInfo.length) {
            alert("Error not enough enemeys in buffer")
        }
    }
    const sendOutTheBots = () => {
        createBattleUIArea(); // reset the area but only need to reset the enemy card
        updateRobotCard('plr');
        updateRobotCard('nme');

        createBattleText("Here they come!");
        // $('#playerNameHolder').text(playerInfo.name.toUpperCase());
    }
    const fight = () => {
        let enemy = currentEnemy;
        let nmeIsDead = false;

        if (enemy.health > 0 && playerInfo.health > 0) {

            let plrFirst = whoDrawsFirst(enemy);
            let plrDam = 0;
            let nmeDam = 0;
            let playerIsDead = false;

            if (plrFirst > 0) {
                // positive numbers mean player attacks first

                plrDam = playerInfo.makeAttack(enemy);
                updateRobotCard('nme');

                if (!enemyHealthCheck(enemy)) {
                    //check enemys health after attack 
                    nmeIsDead = true;
                }
                // enemy robot now attacks
                if (!nmeIsDead) {
                    nmeDam = enemyMakeAttack(enemy);
                }
                updateRobotCard('plr');

                // window.alert(playerInfo.name + " attacks first for " + dam1 + " damage!" +
                //     nmeIsDead ? '' : ('\n' + enemy.name + " retaliates for " + dam2 + " damage!\n"));
                /**************** */
                //make some damage animations here
                /***************** */

                if (!playerInfo.healthCheck()) {
                    //check player health, break if dead
                    playerIsDead = true;
                    //endGame();
                    //return false;
                }
            } else { // was a negative number and enemy robot will attack first
                // enemy robot  attacks first
                nmeDam = enemyMakeAttack(enemy);
                updateRobotCard('plr');

                if (!playerInfo.healthCheck()) {
                    //check player health, break if dead
                    playerIsDead = true
                        // endGame();
                        // return false;
                }
                // now the player attacks 
                if (!playerIsDead) {
                    plrDam = playerInfo.makeAttack(enemy);
                    updateRobotCard('nme');
                }

            }

            /*  new feature */
            let armourNotice = '';
            if (playerInfo.lostArmour) {
                armourNotice = "<br>Your plate armour has broken!";
                playerInfo.lostArmour = false;
            }
            /// update the screen with message   // lots of ternary statements here so one line can handle all cases
            createMessageText(((plrFirst > 0) ? playerInfo.name : enemy.name) + " attacks first for " + ((plrFirst > 0) ? plrDam : nmeDam) + " damage!<br>" +

                (((plrFirst > 0) ? nmeDam : plrDam) === 0 ? (((plrFirst > 0) ? enemy.name : playerInfo.name) + " has collapsed in a heap!") :

                    (((plrFirst > 0) ? enemy.name : playerInfo.name) + " retaliates for " + ((plrFirst > 0) ? nmeDam : plrDam) + " damage!")) + armourNotice);

            if (playerIsDead) {
                inputToContinue(endGame);
            } else {
                inputToContinue(isEnemyDead);
            }

        } // end of if (FIGHT)    
    }
    const runAway = () => {
        // let confirmSkip = true; //= window.confirm("Are you sure you want to run from the fight?");

        //if yes(true), leave fight
        if (currentEnemy.speed < playerInfo.speed * 2) {
            //subtract money from player for skipping
            //  playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log(playerInfo.name + " has chosen to run from this fight! and now has $" + playerInfo.money + " left");
            createMessageText(playerInfo.name + " has chosen to run from this fight!"); //, and now has $" + playerInfo.money + " left");

            inputToContinue(isThereMoreToFight);
            return true;
        }
        /* else if (  playerInfo.money < 10) {
            console.log("Not enough money to skip fight");
            createMessageText("You ain't got enough money COWARD!<br>Get back in there! ...");
            inputToContinue(fight);
            return false;
        }*/
        else {
            console.log("Not fast enough to run");
            createMessageText("Its no use! Your opponent is too fast...");
            inputToContinue(fight);
            return false;
        }
    }
    const isEnemyDead = () => {

        if (!enemyHealthCheck(currentEnemy)) {
            //if enemy is dead
            beatenOpponents[weeksOpponents[nmeIdx]] = true;

            //reward player
            let reward = parseInt(randomNumber(3 + weekOfBattle, 9 + weekOfBattle) * 6 + (weekOfBattle / 2));
            playerInfo.takeCash(reward);

            console.log(currentEnemy.name + " has died!  You get $" + reward);
            createMessageText(currentEnemy.name + " is defeated!!<br>You found $" + reward + " among their wreakage!");

            inputToContinue(isThereMoreToFight);

        } else { //Guy is still alive
            createBattleText('The battle continues!');
        }
    }
    const isThereMoreToFight = () => {
        // if not at end of enemys and player is still alive but hasn't run away
        if (nmeIdx < enemyInfo.length - 1 && playerInfo.health > 0) {
            let rechargeVal = Math.floor(playerInfo.maxHealth * (playerInfo.overNightRecharge + (nmeIdx / 80)));
            //Math.floor(playerInfo.maxHealth * .18)
            playerInfo.refillHealth(rechargeVal);
            updateRobotCard('plr');
            createMessageText('You rest between battle and regain ' + rechargeVal + ' health')
            inputToContinue(startNewRound);
            return;
        } else

        if (playerInfo.health > 0 && opponentsRemaining()) {
            let payout = calcPayout();
            playerInfo.takeCash(payout);

            /****** testing this here for balancing */
            let rechargeVal = Math.floor(playerInfo.maxHealth * (playerInfo.overNightRecharge + (nmeIdx / 80)));
            playerInfo.refillHealth(rechargeVal);
            /*           */

            createMenuUIArea();
            $('#menu-content').css('width', '58%').css('text-align', 'left');

            setMenuText("The week's fighting is over! And you're' on top! The Robot Fighting League manager comes over and gives you your pay: 💵💵💵 '$" + payout + " Big Ones!!' 💵💵💵  ");
            setMenuContent(managerMessage[weekOfBattle - 1]);

            inputToContinue(guiShop);
            return
            //guiShop() will send to startNewWeek when exited

        } else if (!opponentsRemaining()) {
            // BEAT THE WHOLE GAME /*   
            let payout = calcPayout();
            playerInfo.takeCash(payout);
            createMenuUIArea();
            $('#menu-content').css('width', '80%').css('text-align', 'left');

            setMenuContent("The Robot Fighting League manager comes over with a Beamin' Smile in his face!<br><br>" +
                "'Wheeee! Doooggy! That's some uh' the finest robot rasslin' I've ever had the pleasure to be in the presence of'.<br><br>" +
                "'Boy, you done made me a very rich and a very...<br>I say very , Happy Man!' <br><br>" +
                "'Take this bonus Champ! and go on a vacation, I ain't got no more bots left for you to break.'<br><br>" +
                "He hands over: $" + payout);
            setMenuText("🥊🤖 🎉🤖🎉  !! Great Job !! 🎉🤖🎉 🤖🥊", 'center');

            inputToContinue(endGame);
        }
    }
    const endGame = () => {
        createMenuUIArea();
        $('#menu-content').css('width', '58rem');

        if (playerInfo.health > 0) {
            setMenuContent("🎉🤖🎉 Great job!, " + playerInfo.name + " has survived " + totalrounds + " rounds<br> and WON!! the game! 🎉🤖🎉 <br><br>" +
                "You finished the tournament with a grand total winnings of: <br>  💰 $" + playerInfo.totalEarnings + " 💰");

            setMenuText("🥊🤖 🎉🤖🎉  !! You WON !! 🎉🤖🎉 🤖🥊", 'center');

            inputToContinue(checkHighScore);

        } else {
            setMenuContent("You have lost your robot in battle! <br>" +
                "After " + weekOfBattle + " weeks of battle and " + totalrounds + " rounds <br> " +
                playerInfo.name + " has gone to the big scrap yard in the sky.");

            setMenuText("🤖 Game Over! 🤖 ", 'center');

            inputToContinue(checkHighScore);
        }
    }
    const checkHighScore = (score) => {

        if (!localChamp.points) { localChamp.points = 1000; } /// hack for backwards compatability
        let points = (playerInfo.money * playerInfo.attack * playerInfo.speed * playerInfo.maxHealth);

        if (parseInt(localChamp.points) < points) {
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
                        points: points,
                    }
                    // set new highscore
                localStorage.setItem('robotGladiatorChamps', JSON.stringify(localChamp));

                /** CHECK IF GLOBAL CHAMP */
                submitLocalChamp(localChamp)
                    .then(data => {
                        console.log(data);
                    })
            }
        } else {
            setMenuContent("Well you did your best but you still fell short of the Champ... <br>🤖 " + localChamp.robot +
                " 🤖 <br>is still the greatest fighter with $" + localChamp.score + " in winnings.<br><br>" +
                "Your Total: $" + playerInfo.totalEarnings);


        }

        inputToContinue(startGame)
    }

    /********* the different screens are made down here  */
    const guiShop = (reload) => {
        if (!reload) { //if reloading don't create a new menu
            createMenuUIArea();
            $('#menu-content')
                .css('background-color', 'rgba(59, 98, 150, 0.5)')
                .css('padding', '1rem');
        }

        let content = $('<div>').addClass('wrapper').attr('id', 'shopMenu');

        let title = $('<h2>').text('Welcome to the Robot WorkShop');
        let subtitle = $('<p>').html("You have $<span id='cashRemaining'>" + playerInfo.money + "</span> to spend");

        let hpCol = $('<div>').addClass('wrapper shop-col').append($('<h3>').text("HEALTH"));
        let spdCol = $('<div>').addClass('wrapper shop-col').append($('<h3>').text("SPEED"));
        let atkCol = $('<div>').addClass('wrapper shop-col').append($('<h3>').text("ATTACK"));
        let armCol = $('<div>').addClass('wrapper shop-col').append($('<h3>').text("ARMOUR"));

        let allDone = $('<div>').addClass('fancy-button').attr('id', 'shopAllDone').attr('tabindex', '0').attr('id', 'leave').text('All Done');

        /***** A HACK FOR A BORDER TO FILL ALL THE WAY DOWN */
        let bottomBox = $('<div>').addClass('wrapper shop-box bottom-box bordered').append($('<span>').text('  '));
        let bottomBox2 = $('<div>').addClass('wrapper shop-box bottom-box dbl-bordered').append($('<span>').text('  '));
        /* HEALTH */
        let hpRestore = $('<div>').addClass('wrapper shop-box').append($('<span>').text('Restore'), $('<div>').addClass('shop-button hp-restore').attr('id', 'refill').attr('tabindex', '0').text('$' + playerInfo.healthShopCost()));
        let hpUpgrade = $('<div>').addClass('wrapper shop-box').append($('<span>').text('Upgrade'), $('<div>').addClass('shop-button hp-improve').attr('id', 'health').attr('tabindex', '0').text('$' + playerInfo.healthUpShopCost));

        hpCol.append(hpRestore, hpUpgrade);
        /* SPEED */
        let spdUpgrade = $('<div>').addClass('wrapper shop-box bordered').append($('<span>').text('Upgrade'), $('<div>').addClass('shop-button speed-improve').attr('id', 'fast').attr('tabindex', '0').text('$' + playerInfo.speedShopCost));

        spdCol.append(spdUpgrade, bottomBox);
        /* ATTACK */
        let atkUpgrade = $('<div>').addClass('wrapper shop-box dbl-bordered').append($('<span>').text('Upgrade'), $('<div>').addClass('shop-button attack-improve').attr('id', 'power').attr('tabindex', '0').text('$' + playerInfo.attackShopCost));

        atkCol.append(atkUpgrade, bottomBox2);
        /* ARMOUR */
        let armRestore = $('<div>').addClass('wrapper shop-box').append($('<span>').text('Restore'), $('<div>').addClass('shop-button armour-restore').attr('id', 'repair').attr('tabindex', '0').text('$' + playerInfo.armourReShopCost()));
        let armUpgrade = $('<div>').addClass('wrapper shop-box').append($('<span>').text('Install'), $('<div>').addClass('shop-button armour-install').attr('id', 'armour').attr('tabindex', '0').text((playerInfo.hasArmour ? '' : '$') + playerInfo.armourShopCost));

        armCol.append(armRestore, armUpgrade);

        content.append(title, subtitle, hpCol, spdCol, atkCol, armCol, allDone)

        setMenuContent(content);

        if (!reload) {
            setMenuText("How would you like to improve your bot?")
        }

        $('[tabindex]').on('click', (e) => {
            //use switch to carry out actions
            switch ($(e.target).attr('id').toUpperCase()) {

                case "REFILL":
                    playerInfo.refillHealth();
                    break;

                case "HEALTH":
                    playerInfo.upgradeHealth();
                    break;

                case "POWER":
                    playerInfo.upgradeAttack();
                    break;

                case "FAST":
                    playerInfo.increeseSpeed();
                    break;

                case "ARMOUR":
                    playerInfo.getArmour();
                    break;

                case "REPAIR":
                    playerInfo.repairArmour();
                    break;

                case "LEAVE":
                    //window.alert("Leaving the store.");
                    startNewWeek();
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
                    alert("You did not type a valid option. Try something else");

                    guiShop();
                    break;
            }

        });

    };
    const guiNameABot = () => {

        createMenuUIArea();

        let content = $('<div>').addClass('name-bot');
        let titleEl = $('<h2>').text("Let's Name this Bot!");
        let labelEl = $('<label>').attr('for', 'build-bot-name').text("What will you call it?");
        let inputEl = $('<input>').attr('type', 'text').attr('id', 'build-bot-name').attr('name', 'build-bot-name');
        let submit = $('<div>').addClass('fancy-button').text('Done');

        content.append(titleEl, labelEl, inputEl, submit);

        setMenuContent(content);
        setMenuText("Just one more thing!, let's give your new Bot a Name.");

        $('#build-bot-name').focus();
        $('#build-bot-name').on('keypress', function(e) {
            if (e.which === 13) {
                $('.fancy-button').click();
            }
            // $('#build-bot-name').off();
        });
        $('.fancy-button').on('click', function(e) {
            // $('.fancy-button').off();
            if ($('#build-bot-name').val() !== '') {
                buildingBot.name = $('#build-bot-name').val();

                console.log(buildingBot);

                if (findABot(buildingBot.name)) {
                    alert('Bot Already Exists');
                } else if (createdBots.length > 5) { // only six bots allowed to be saved
                    alert('Too Many Bots in the Kitchen');
                } else {
                    saveABot(buildingBot);

                    loadABot(findABot(buildingBot.name));

                    startNewWeek();
                }


            } else {
                $('#build-bot-name').attr('placeholder', "please enter a name").focus();
            }
        });

    }
    const guiBuildABot = () => {
        playerInfo.statPoints = 99;
        createMenuUIArea();

        $('#menu-content').css('padding-bottom', '1rem')

        let content = $('<div>').addClass('wrapper').attr('id', 'BuildABot');
        let title = $('<h2>').text("Build-a-Bot WorkShop")
        let subtitle = $('<p>').addClass('build-subtitle').html("<br>You have <span id='statPointsRemaining'>" + playerInfo.statPoints + "</span> Stat Points remaining");
        let sliderBars = $('<div>').addClass('wrapper');

        let healthCont = $('<div>').addClass('slidecontainer').append($('<span>').addClass('slider-name').text('Health Points').append($('<div>').addClass('point-cost').text('Cost: 1pts')), $('<input>').addClass('slider').addClass('tied').attr('id', 'health-range').attr('type', 'range').attr('min', '1').attr('max', '120').attr('value', '1').attr('oninput', "this.nextElementSibling.value = this.value"), $('<output>').attr('id', 'health-SlideVal').addClass('slider-value-output').text('1'));
        let speedCont = $('<div>').addClass('slidecontainer').append($('<span>').addClass('slider-name').text('Speed Points').append($('<div>').addClass('point-cost').text('Cost: 2pts')), $('<input>').addClass('slider').addClass('tied').attr('id', 'speed-range').attr('type', 'range').attr('min', '0').attr('max', '60').attr('step', '1').attr('value', '0').attr('oninput', "this.nextElementSibling.value = this.value"), $('<output>').attr('id', 'speed-SlideVal').addClass('slider-value-output').text('0'));
        let attackCont = $('<div>').addClass('slidecontainer').append($('<span>').addClass('slider-name').text('Attack Points').append($('<div>').addClass('point-cost').text('Cost: 3pts')), $('<input>').addClass('slider').addClass('tied').attr('id', 'attack-range').attr('type', 'range').attr('min', '0').attr('max', '40').attr('step', '1').attr('value', '0').attr('oninput', "this.nextElementSibling.value = this.value"), $('<output>').attr('id', 'attack-SlideVal').addClass('slider-value-output').text('0'));

        $(sliderBars).append(healthCont, speedCont, attackCont);

        let okButton = $("<div>").addClass('fancy-button').attr('id', 'buildBotOK').text('All Done');

        content.append(title, subtitle, sliderBars, okButton);

        setMenuContent(content);
        setMenuText("Adjust your robot's stats as you see fit.");


        $('.slider').on('change', (e) => {
            let statvalues = { health: 1, speed: 2, attack: 3 };
            let pool = playerInfo.statPoints;

            let type = $(e.target).attr('id').replace('-range', '');

            let oldVal = buildingBot[type];
            let newVal = $('#' + type + '-SlideVal').val();

            //if val is more then stored val
            if (newVal > oldVal) {
                let statVal = (newVal - oldVal);
                let pointVal = (statVal * statvalues[type]);
                //if there are enough points
                if (pointVal <= pool) {
                    //    console.log(`in pool: ${pool} | change in val: ${statVal} x ${statvalues[type]} =  stat val: ${pointVal}`);
                    //take points from stat pool
                    playerInfo.statPoints -= pointVal;
                    //update stat val
                    buildingBot[type] += statVal

                } else { //if not enough points
                    //take max points available then reset range val values

                    //get stat val of what is left in pool :: no decimals
                    statVal = Math.floor(pool / statvalues[type]);

                    // calc new point val
                    pointVal = (statVal * statvalues[type]);

                    //take points from stat pool
                    playerInfo.statPoints -= pointVal;

                    //allocate as many points as possible
                    buildingBot[type] += statVal;

                    // reset the range values
                    $('.slider').each((i, slide) => {
                        let type = $(slide).attr('id').replace('-range', '');
                        $(slide).val(buildingBot[type]);
                        $(slide).siblings('.slider-value-output').val(buildingBot[type]);
                    });
                }
            }
            if (newVal < oldVal) { // if val is less then stored val
                let statVal = (oldVal - newVal);
                let pointVal = (statVal * statvalues[type]);
                //update stored stat val
                buildingBot[type] -= statVal;
                //return points to stat pool
                playerInfo.statPoints += pointVal;
            }
            /************* */
            $('#statPointsRemaining').text(playerInfo.statPoints);

        });

        $('#buildBotOK').on('click', () => {
            if (playerInfo.statPoints > 0) {
                if (window.confirm('You still have points remaining!')) {
                    guiNameABot();
                };
            } else {
                guiNameABot();
            }
        });

    }
    const displayIntro = () => {
        createMenuUIArea();
        setMenuContent("<h2>Welcome to Robot Gladiators!</h2> " +
            `<div class='wrapper' id='champ-wrapper'> 
            <div class='ChampStatsTitle'><span class='emoji'>🥊</span> Local Gym: <span class='emoji'>🏠</span></div>
            <div class='ChampStats'><span class='emoji'>🥊</span> Current Local Champion: </div><div class='ChampStats'>
            ${localChamp.robot} <span class='emoji'>🤖</span></div><div class='ChampStats'> <span class='emoji'>🔔</span> Rounds Fought: </div><div class='ChampStats'>
            ${localChamp.rounds} <span class='emoji'>🔔</span></div><div class='ChampStats'><span class='emoji'>💰</span> Prize Winnings: </div><div class='ChampStats'><span class='emoji'>💵</span>  $
            ${localChamp.score} <span class='emoji'>💵</span>  </div><div class='ChampStats'> <span class='emoji'>💪</span> Trainer: </div><div class='ChampStats'>
            ${localChamp.trainer} <span class='emoji'>💪</span></div></div>

            <div class='wrapper' id='net-champ-wrapper'> 
            <div class='ChampStatsTitle'><span class='emoji'>🥊</span> World Gym: <span class='emoji'>🌎</span></div>
            <div class='ChampStats'><span class='emoji'>🥊</span> Current World Champion: </div><div class='ChampStats'>
            ${netChamp.robot} <span class='emoji'>🤖</span></div><div class='ChampStats'> <span class='emoji'>🔔</span> Rounds Fought: </div><div class='ChampStats'>
            ${netChamp.rounds} <span class='emoji'>🔔</span></div><div class='ChampStats'><span class='emoji'>💰</span> Prize Winnings: </div><div class='ChampStats'><span class='emoji'>💵</span>  $
            ${netChamp.score} <span class='emoji'>💵</span>  </div><div class='ChampStats'> <span class='emoji'>💪</span> Trainer: </div><div class='ChampStats'>
            ${netChamp.trainer} <span class='emoji'>💪</span></div>
            </div>`);
        setMenuText("Will you enter your Bot, and try your luck in the Great Robo Death Match? <br><br> ... Press Any Key to Continue ...", 'center');

        inputToContinue(selectABot);
    }
    const selectABot = () => {
        createMenuUIArea(false);
        $("#menu-content").css("padding-top", '2rem')
            .css("width", '55rem')
            .css('position', 'relative')
            .css('top', 'relative0');
        $("#menu-content").append($('<div>').addClass('delete-bot-icon').text("🗑️"));

        createdBots = JSON.parse(localStorage.getItem("GladiatorBots")) || [];

        let botList = "";
        createdBots.forEach(function(bot) {
            botList += "<span class='saved-bot fancy-button'>" + bot.name + "</span>";
        });

        setMenuContent("<h2>Select a Fighting Robot...</h2> <div id='built-bot-list' class='wrapper'>" + botList + "<span class='saved-bot fancy-button' id='newBotButton'>Create New Robot</span></div>");
        setMenuText("Choose a Bot or, build a new one?");

        $("#built-bot-list").on('click', 'span', function(event) {
            if (event.target.matches('#newBotButton')) {
                guiBuildABot();
                return;
            } else {
                loadABot(findABot($(event.target).text()));
                startNewWeek();
            }
        });
        $(".delete-bot-icon").on('click', function(event) {
            deleteABot();
        });
    }
    const deleteABot = () => {
        createMenuUIArea(false);
        $("#menu-content").css("padding-top", '2rem').css("width", '55rem');

        createdBots = JSON.parse(localStorage.getItem("GladiatorBots")) || [];

        let botList = "";
        createdBots.forEach(function(bot) {
            botList += "<span class='saved-bot fancy-button delete-bot'>" + bot.name + "</span>";
        });

        setMenuContent("<h2>Delete a Fighting Robot...</h2> <div id='built-bot-list' class='wrapper'>" + botList + "<span class='saved-bot fancy-button' id='cancelDelete'>Go Back</span></div>");
        setMenuText("Choose a Bot to Terminate!");

        $("#built-bot-list").on('click', 'span', function(event) {
            if (window.confirm("Are you sure you want to delete this bot? " + $(event.target).text())) {
                createdBots.splice(findABot($(event.target).text()), 1);

                //console.log(findABot($(event.target).text()))
                //console.log(createdBots.splice(findABot($(event.target).text()), 1));
                /* splice is not working here for some reason so im creating a new array and saving that to local storage */
                let newArray = createdBots.filter(function(entry) { return entry.name !== $(event.target).text(); });

                //console.log(newArray)

                localStorage.setItem("GladiatorBots", JSON.stringify(newArray));
                selectABot();
            }
        });
        $("#cancelDelete").on('click', function(event) {
            selectABot();
        });
    }
    const showInfo = () => {

        alert(
            "                ROBOT GLADIATORS - GRAPHICAL EDITION \n" +
            "                              Programmed by Dave Quinn \n" +
            "                                            Sept 2021 \n\n" +
            "                                     Robot ArtWork by: \n" +
            "                                      Tak Beom Heogh \n" +
            "                         https://www.behance.net/takbeom \n\n" +
            "                                       gadget-bot.com \n");

    }

    return {
        startGame,
        fight,
        runAway,
        isThereMoreToFight,
        guiShop,
        showInfo
    }
})();

export default UIGame;