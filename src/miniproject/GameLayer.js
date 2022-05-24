var TAG_SPRITE_MANAGER = 1;
var STATE_PLAYING = 0;
var STATE_GAMEOVER = 1;
var MAX_CONSTANT_WIDTH = 40;
var MAX_CONSTANT_HEIGHT = 40;

var g_sharedGameLayer;

//Add this to project.json
var GameLayer = cc.Layer.extend({

    time: null,
    jumper: null,
    tmpScore: 0,
    state: STATE_PLAYING,
    levelManager: null,
    life: null,
    background: null,
    isAirborne: false,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        g_sharedGameLayer = this;
        winSize = cc.winSize;

        // Score
        this.score = new cc.LabelTTF("Score: 0");
        this.score.attr({
            fontSize: 18,
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - 15,
            y: winSize.height - 30,
        });

        //Need to understand this line
        this.score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.score, 1000);

        // Life Icon (working)
        var lifeIcon = new cc.Sprite(res.mainJumper_png);
        lifeIcon.attr({
            anchorX: 0,
            anchorY: 1,
            x: 10,
            y: winSize.height - 10
        });
        this.addChild(lifeIcon, 1000);

        // Life Count
        this.life = new cc.LabelTTF("0", "Arial", 20);
        this.life.x = 60;
        this.life.y = JJ.HEIGHT - 25;
        this.life.color = cc.color(255, 0, 0);
        this.addChild(this.life, 1000);

        // Jumper
        this.jumper = new Jumper();
        this.jumper.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(this.jumper, 1000);

        // Play musics and sound effects.


        //Preset
        Background.preset();
        Platform.preset();

        //Initialize background
        this.initBackground();
        this.initPlatform();

        this.addKeyBoardListener();
        this.scheduleUpdate()
        return true;
    },
    initBackground: function () {
        this.map = new cc.Sprite(res.map_png);
        this.map.setAnchorPoint(cc.p(0.5, 0.5));
        this.map.setPosition(winSize.width / 2, winSize.height / 2);
        cc.log(this.map)
        this.map.setScale(winSize.width / JJ.MAPWIDTH);

        this.addChild(this.map, 500);
    },
    initPlatform: function () {
        for (var i = 0; i < 10; i++) {
            var platform = Platform.getOrCreate();
            platform.setPosition(Math.random() * winSize.width, winSize.height / 10 * i);
            this.addChild(platform, 3000);
        }
    },
    update: function (dt) {
        if (this.state == STATE_PLAYING) {
            this.checkIsCollide();
            this.updateUI();
            this.moveBackground(dt);
        }
    },
    updateUI: function () {
        //Update score if jumper is in a higher position.

        //Go to next background if jumper jumps over the background celling
    },
    moveBackground: function (dt) {

    },
    checkIsCollide: function (dt) {
        var jumper = this.jumper;
        var platform;
        var platformBoundingBox, jumperBoundingBox;
        // Có phải là lặp qua tất cả các platform và kiểm tra?
        for (var i = 0; i < JJ.CONTAINER.PLATFORMS.length; i++) {
            platform = JJ.PLATFORMS[i];
            jumperBoundingBox = jumper.getBoundingBox();
            platformBoundingBox = jumper.getBoundingBox();
            if (cc.rectIntersectsRect(jumperBoundingBox, platformBoundingBox)) {
                return true;
            } else {
                return false;
            }
        }
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
    scoreCounter: function () {
        if (this.state == STATE_PLAYING) {
            // this.time++;
            // this.score.setString(this.time);
        }
    }


});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
}