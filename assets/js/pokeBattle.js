const clearScreen = () => {
    $('#Upper-Vis') ? $('#Upper-Vis').remove() : null;
    $('#Lower-Vis') ? $('#Lower-Vis').remove() : null;
}
const setMenuText = (txt) => {
    $('#menu-text').text(txt);
}
const setMenuContent = (txt) => {
    $('#menu-content section').html(txt);
}
const createBattleText = (txt) => {
    $('#Lower-Vis') ? $('#Lower-Vis').remove() : null;

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
        $("<button>").attr("plr-choice", "TEST").text("TEST").prepend($("<span>").addClass('choiceIcon'))
    );

    loRight.append(textContainer.append(textArea));
    /*** */
    $("body").append(lowerEl.append(loLeft, loRight));

    /******** Set up button click listener */
    $("#battle-choice-opt-box").on('click', 'button', function(event) {
        let playerInput = $(event.target).attr("plr-choice");
        if (playerInput === "RUN") { UIGame.runAway(playerInput); }
        if (playerInput === "FIGHT") { UIGame.fight(playerInput); }
    });
}
const createMessageText = (txt, bool) => {
    $('#Lower-Vis') ? $('#Lower-Vis').remove() : null;

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
        let cardName = $("<h2>").attr("id", out + "-card-name").text("Robo Name");
        let cardHP = $("<div>").addClass("battle-HP-bar").append($("<span>").text("HP")).append($("<div>").append($("<div>").attr("id", out + "-HP-bar")));
        let hpText = $("<h3>").attr("id", out + "-HP-text").text("100/100");
        let spdText = $("<div>").addClass("battle-card-stat").attr("id", out + "-SPD-text").text("Speed: 5");
        let atkText = $("<div>").addClass("battle-card-stat").attr("id", out + "-ATK-text").text("Attack: 10");
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
        $("#" + robot + "-HP-bar").addClass((hpp <= 0.5) ? (hp > (opAtk * 2) ? 'battle-weakened' : 'battle-danger') : '');
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
}
createMenuUIArea();