var TAG_SPRITE_MANAGER = 1;

//Add this to project.json
var GameLayer = cc.Layer.extend({

    time: null,
    jumper: null,
    tmpScore: 0,
    state: STATE_PLAYING,
    levelManager: null,
    life: null,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var winSize = cc.winSize;

        // Score
        this.score = new cc.LabelBMFont("Score: 0", res.arial_14_fnt);
        this.score.attr({
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - 5,
            y: winSize.height - 30,
        });

        //Understand this line
        this.score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.score, 1000);

        // Life (working)
        this.life = new cc.Sprite(res.mainJumper_png);

        // Life Count
        this.life = new cc.LabelTTF("0", "Arial", 20);
        this.life.x = 60;
        this.life.y = JJ.HEIGHT - 25;
        this.life.color = cc.color(255, 0, 0);
        this.addChild(this.life, 1000);

        this.jumper = new Jumper();
        this.jumper.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        })
        this.addChild(this.jumper, 1);

        this.schedule(this.scoreCounter, 1);
        this.scheduleUpdate()

        return true;
    },
    update: function(dt) {
        cc.log("Updating...")
    },

    addKeyBoardListener: function () {
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    JJ.KEYS[key] = true;
                },
                onKeyReleased: function (key, event) {
                    JJ.KEYS[key] = false;
                }
            }, this);
        }
    },
    scoreCounter: function() {
        if (this.state == STATE_PLAYING) {
            this.time++;
        }
    }


});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
}