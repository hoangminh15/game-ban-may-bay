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
    platformBatch: null,
    space: null,
    numOfMap: null,
    currentMapIndex: null,

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

        //Preset
        Background.preset();

        //Initialize background
        this.initBackground();

        // //Initialize platforms
        // Platforms initialization is relocated to initPhysics
        // this.initPlatforms();

        //Initialize physics
        this.initPhysics();

        //Listener
        this.addKeyBoardListener();
        // Update
        this.scheduleUpdate()
        // this.schedule(this.updateUI, 2);

        return true;
    },
    initPhysics: function () {
        //setup static information
        this.space = new cp.Space();
        //setup gravity
        this.space.gravity = cp.v(0, -350);
        // setup walls
        var ground = new cp.SegmentShape(
            this.space.staticBody
            , cp.v(0, 0) //start point
            , cp.v(JJ.WIDTH, 0) //end point
            , g_groundHeight // thickness of wall
        );
        ground.setFriction(100);
        // ground.setElasticity(10);
        this.space.addStaticShape(ground);
        this.addChild(new AnimationLayer(this.space), 3000, "Animation Layer");
    },
    initBackground: function () {
        this.map = new cc.Sprite(res.mapEntry_png);
        this.map.setAnchorPoint(cc.p(0, 0));
        this.map.setPosition(0, 0);
        this.map.setScale(winSize.width / JJ.MAPWIDTH);

        this.addChild(this.map, 500);
    },
    update: function (dt) {
        if (this.state == STATE_PLAYING) {
            // this.checkIsCollide();
            this.updateUI();
            this.space.step(dt);
        }
    },
    updateUI: function () {
        //Update score if jumper is in a higher position.
        // cc.log(this.jumper);
        //Go to next background if jumper jumps over the background celling
        // var currentMapIndex = Math.floor(this.jumper.getPosition().y / JJ.MAPWIDTH) - 1;
        // if (this.jumper.y > currentMapIndex * JJ.WIDTH + JJ.WIDTH/2) {
        //     var action = cc.moveBy(0.5, 0, -JJ.HEIGHT/2);
        //     this.map.runAction(action);
        // }
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

//Why??
// GameLayer.prototype.addPlatform = function(platform, z, tag) {
//     this.platformBatch.addChild(platform, z, tag);
// }