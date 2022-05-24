var Jumper = cc.Sprite.extend({
    speed: 220,
    HP: 5,
    zOrder: 3000,

    ctor: function () {
        this._super(res.mainJumper_png);
        this.anchorX = 0;
        this.anchorY = 0;

        this.tag = this.zOrder;

        this.scheduleUpdate();
    },
    collideRect: function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h)
    },
    update: function (dt) {
        this.updateMove(dt);
    },
    updateMove: function (dt) {
        //Bấm nhảy, chiều cao vẫn thấp hơn map
        //Cần thay đổi
        if (JJ.KEYS[cc.KEY.up] && this.y <= winSize.height) {
            this.y += dt * this.speed;
        }
        //Đi sang trái hợp lệ
        if (JJ.KEYS[cc.KEY.left] && this.x >= 0) {
            this.x -= dt * this.speed;
        }
        if (JJ.KEYS[cc.KEY.down] && this.y >= 0) {
            this.y -= dt * this.speed;
        }
        // đi phải hop le
        if (JJ.KEYS[cc.KEY.right] && this.x <= winSize.width - this.width) {
            this.x += dt * this.speed;
        }
    }
})