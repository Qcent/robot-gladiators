const createBattleUIArea = (function() {

    let upperEl = $("<div>").attr("id", "Upper-Vis");
    let lowerEl = $("<div>").attr("id", "Lower-Vis");

    let upLeft = $("<div>").attr("id", "upper-left");
    let upRight = $("<div>").attr("id", "upper-right");
    /**/
    let nmeCard = $("<div>").attr("id", "enemy-card");
    let nmeSpriteBox = $("<div>").attr("id", "enemy-box");
    let plrCard = $("<div>").attr("id", "player-card");
    let plrSpriteBox = $("<div>").attr("id", "player-box");
    /**/

    for (let i = 0; i <= 1; i++) {
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
    /******LOW SCREEN */
    let loLeft = $("<div>").attr("id", "lower-left");
    let loRight = $("<div>").attr("id", "lower-right");
    lowerEl.append(loLeft, loRight)

    $("body").append(upperEl, lowerEl);
})();