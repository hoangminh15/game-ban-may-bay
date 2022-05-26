var Jumper = cc.PhysicsSprite.extend({
    speed: 400,
    jumpSpeed: 400,
    HP: 5,
    zOrder: 3000,
    upKeyValidTimeLimit: 1,
    upKeyValidTime: 0,

    ctor: function(image) {
        this._super(image);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.tag = this.zOrder;


        this.scheduleUpdate();
    },
    update: function (dt) {
        this.updateMove(dt);
    },

    updateMove: function (dt) {
        // Sửa các nhảy
        if (JJ.KEYS[cc.KEY.up]) {
            this.y += dt * this.speed;
        }
        if (JJ.KEYS[cc.KEY.down]) {
            this.y -= dt * this.speed;
        }
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