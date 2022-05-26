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
    bottomScreenY: null,
    topScreenY: null,
    animationLayer: null,

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

        //Preset
        Background.preset();

        //Initialize physics
        this.initPhysics();

        //Initialize background
        this.initBackground();

        //Listener
        this.addKeyBoardListener();
        // Update
        this.scheduleUpdate();
        this.schedule(this.scoreCounter, 1);

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
        this.animationLayer = new AnimationLayer(this.space);
        this.jumper = this.animationLayer.getJumper();
        this.addChild(this.animationLayer, 3000, "Animation Layer");
    },
    initBackground: function () {
        this.map = new cc.Sprite(res.mapEntry_png);
        this.map.setAnchorPoint(cc.p(0, 0));
        this.map.setPosition(0, 0);
        this.map.setScale(winSize.width / JJ.MAPWIDTH);

        this.bottomScreenY = 0;
        this.topScreenY = cc.winSize.height;

        this.addChild(this.map, 500);
    },
    update: function (dt) {
        if (this.state == STATE_PLAYING) {
            // this.checkIsCollide();
            this.space.step(dt);
        }
    },
    updateUI: function () {
        // Update score if jumper is in a higher position.

        // Go to next background if jumper jumps over the background celling

    },
    addKeyBoardListener: function () {
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                swallowTouches: true,
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
            this.score.setString(Math.floor(this.jumper.y).toString())
        }
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
}
