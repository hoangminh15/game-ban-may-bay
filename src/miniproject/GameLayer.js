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
    currentScreenIndex: 0,

    bottomScreenY: 0,
    topScreenY: JJ.HEIGHT,
    isAboveTopScreen: false,
    isBelowBottomScreen: false,

    animationLayer: null,
    isBackgroundMoveDone: true,

    backgroundLayer: null,
    isJumperAirborne: false,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        g_sharedGameLayer = this;
        winSize = cc.winSize;

        //Preset
        Background.preset();

        //Initialize physics
        this.initPhysics();

        //Initialize background
        this.initBackground();

        //Listener
        // cc.log(this.animationLayer)
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
        this.space.gravity = cp.v(0, -400);
        // setup walls
        var ground = new cp.SegmentShape(
            this.space.staticBody
            , cp.v(-1000, 10) //start point
            , cp.v(1000, 0) //end point
            , g_groundHeight // thickness of wall
        );
        ground.setFriction(100);
        ground.setCollisionType(JJ.SPRITETAG.GROUND);
        this.space.addStaticShape(ground);
        // setup collision handler
        this.space.addCollisionHandler(JJ.SPRITETAG.JUMPER, JJ.SPRITETAG.PLATFORM,
        null, null, this.postCollision.bind(this), null);
        this.space.addCollisionHandler(JJ.SPRITETAG.JUMPER, JJ.SPRITETAG.GROUND,
            null, null, this.postCollision.bind(this), null);

        this.animationLayer = new AnimationLayer(this.space);
        this.jumper = this.animationLayer.getJumper();
        this.addChild(this.animationLayer, 3000, "Animation Layer");
    },
    postCollision: function () {
        this.isJumperAirborne = false;
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
        if (this.state === STATE_PLAYING) {
            this.space.step(dt);
            this.updateUI();
        }
    },
    updateUI: function () {
        // Update score if jumper is in a higher position.
        // Follow jumper if jumper jumps over the background celling
        var jumperPosition = this.jumper.y;
        if (jumperPosition > this.topScreenY) {
            var followAction = cc.follow(this.jumper, cc.rect(0, this.bottomScreenY, JJ.WIDTH, JJ.HEIGHT*2));
            this.runAction(followAction.clone());
            this.bottomScreenY = this.topScreenY - JJ.HEIGHT / 2;
            this.topScreenY = this.topScreenY + JJ.HEIGHT / 2;
            return;
        }
        // cc.log("Bottom Screen " + this.bottomScreenY);
        // cc.log("Top Screen " + this.topScreenY);

        if (jumperPosition < this.bottomScreenY) {
            var followActionDown = cc.follow(this.jumper, cc.rect(0, this.bottomScreenY-JJ.HEIGHT, JJ.WIDTH, JJ.HEIGHT*2))
            this.topScreenY = this.bottomScreenY + JJ.HEIGHT / 2;
            this.bottomScreenY = this.bottomScreenY - JJ.HEIGHT / 2;
            this.runAction(followActionDown.clone());
        }

    },
    addKeyBoardListener: function () {
        self = this;
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    if (key === cc.KEY.up){
                        if (self.isJumperAirborne) return;
                        self.animationLayer.jumpByImpulse();
                        self.isJumperAirborne = true;
                        return;
                    }
                    if (key === cc.KEY.escape) {
                        var scene = new cc.Scene();
                        var layer = new SystemMenu();
                        scene.addChild(layer);
                        cc.director.runScene(new cc.TransitionFade(1.2, scene));
                    }
                    JJ.KEYS[key] = true;

                },
                onKeyReleased: function (key, event) {
                    if (key === cc.KEY.up) return;
                    JJ.KEYS[key] = false;
                }
            }, this);
        }
    },
    scoreCounter: function () {
        if (this.state === STATE_PLAYING) {
            if (this.score !== null) {
                this.score.setString(Math.floor(this.jumper.y).toString())
            }
        }
    },
    setBackgroundLayer: function(backgroundLayer) {
        this.backgroundLayer = backgroundLayer;
    },
    setScoreLabel: function(scoreLabel) {
        this.score = scoreLabel;
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var gameLayer = new GameLayer();
    var backgroundLayer = new BackgroundLayer();
    gameLayer.setScoreLabel(backgroundLayer.getScoreLabel())
    gameLayer.setBackgroundLayer(backgroundLayer);
    scene.addChild(backgroundLayer, 5000);
    scene.addChild(gameLayer);
    return scene;
}
