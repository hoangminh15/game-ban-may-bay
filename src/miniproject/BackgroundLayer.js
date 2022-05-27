var BackgroundLayer = cc.Layer.extend({
    score: null,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        // Score
        this.score = new cc.LabelTTF("0");
        this.score.attr({
            fontSize: 18,
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - 15,
            y: winSize.height - 30
        });
        //Need to understand this line
        this.score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.score, 1000);
        return true;
    },
    getScoreLabel: function() {
        return this.score;
    }
});
