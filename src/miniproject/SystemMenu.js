var SystemMenu = cc.Layer.extend({

    sprite: null,
    action: null,
    reverseAction: null,
    isDone: false,

    touchListener: null,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);

        var size = cc.winSize;
        var width = size.width;
        var height = size.height;
        this.sprite = new cc.Sprite("#ship03.png");
        this.addChild(this.sprite);
        this.sprite.x = width / 2;
        this.sprite.y = height / 2;

        // this.action = cc.sequence(
        //     // cc.moveBy(1, cc.p(50, 0)),
        //     // // cc.callFunc(this.onBugMe, this)
        //     // cc.scaleBy(0.5, 2)
        //     cc.jumpTo(2, cc.p(width/4, height/4), 100, 4)
        // )

        // this.action = cc.skewBy(2, 45, 0);
        // //tại sao call fun lại không được gọi ở những lần sau
        // this.reverseAction = this.action.reverse();
        //
        // //audio
        // cc.audioEngine.playMusic(res.bgMusic_mp3, false);
        //
        // this.addTouchListener()
        // cc.log("hello I'm here")

        // if (cc.sys.capabilities.hasOwnProperty('mouse')) {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.MOUSE,
        //         onMouseDown: function(event) {
        //             if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
        //                 cc.log("button left clicked");
        //                 cc.log(event.getLocation())
        //             }
        //         },
        //         onMouseMove: function(event) {
        //             cc.log("Mouse moved: " + event.getLocationX());
        //         }
        //     }, this);
        // }
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    cc.log("key pressed: " + key.toString());
                }
            }, this);
        }
    },
    onBugMe: function (node) {
        cc.log("onBugMe called!")
        node.stopAllActions();
        node.runAction(cc.scaleTo(0.5, 2));
    },
    addTouchListener: function () {
        self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch) {
                cc.log("is Done value: " + self.isDone);
                if (self.isDone === false) {
                    self.sprite.runAction(self.action);
                    cc.audioEngine.pauseMusic();
                    self.isDone = true;
                } else if (self.isDone === true) {
                    self.sprite.runAction(self.reverseAction);
                    cc.audioEngine.resumeMusic();
                    self.isDone = false;
                }
                cc.log(touch.getLocationX());
                cc.log("Being touched!");
                return true;
            },
            onTouchMoved: function(touch) {
                cc.log(touch.getLocationX())
                cc.log("Touch moved reached");
            },
            onTouchEnded: function() {
                cc.log("Touch ended!")
            }
        }, this.sprite);
    }
})

var stopSound = function () {
    cc.audioEngine.stopAllEffects();
}

SystemMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SystemMenu();
    scene.addChild(layer);
    return scene;
}