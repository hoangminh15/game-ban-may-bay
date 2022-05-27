var Jumper = cc.PhysicsSprite.extend({
    speed: 400,
    jumpSpeed: 400,
    HP: 5,
    zOrder: 3000,
    upKeyValidTimeLimit: 1,
    upKeyValidTime: 0,
    jumperBody: null,
    animationLayer: null,

    ctor: function(image, animationLayer) {
        this._super(image);
        this.animationLayer = animationLayer;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.tag = this.zOrder;

        // Set jumper body.
        this.jumperBody = this.getBody();

        this.scheduleUpdate();
    },
    update: function (dt) {
        this.updateMove(dt);
    },

    updateMove: function (dt) {
        //Đi sang trái hợp lệ
        if (JJ.KEYS[cc.KEY.left] && this.x >= this.width) {
            this.x -= dt * this.speed;
        }
        // đi phải hop le
        if (JJ.KEYS[cc.KEY.right] && this.x <= winSize.width - this.width) {
            this.x += dt * this.speed;
        }
    },
})