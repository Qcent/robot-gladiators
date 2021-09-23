const clearScreen = () => {
    $('#Upper-Vis') ? $('#Upper-Vis').remove() : null;
    $('#Lower-Vis') ? $('#Lower-Vis').remove() : null;
}
const setMenuText = (txt, pos) => {
    $('#menu-text').text(txt);

    if (pos) {
        $('#menu-text').css('text-align', 'center');
    }
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
        let cardName = $("<h2>").attr("id", out + "-card-name").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?");
        let cardHP = $("<div>").addClass("battle-HP-bar").append($("<span class='ArmourIcon'>").addClass(out)
            .html(`<svg ><circle cx="11" cy="9" r="8" stroke="#0C2D6B" stroke-width="1"  /></svg>`),
            $("<span class='HP-text'>").text("HP")).append($("<div>").append($("<div>").attr("id", out + "-HP-bar")));
        let hpText = $("<h3>").attr("id", out + "-HP-text").text("DQ");
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
        $(".ArmourIcon." + robot).addClass((armP >= 0.55) ? ((100 - armDamage) > (opAtk * 2) ? 'damagedArmour' : 'deadArmour') : '');
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