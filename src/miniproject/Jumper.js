var Jumper = cc.PhysicsSprite.extend({
    speed: 400,
    HP: 5,
    zOrder: 3000,

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
        //Bấm nhảy, chiều cao vẫn thấp hơn map
        //Cần thay đổi - Không sử dụng phím up mà dùng phím space
        if (JJ.KEYS[cc.KEY.up] && this.y <= winSize.height) {
            this.y += dt * this.speed;
        }
        if (JJ.KEYS[cc.KEY.space]) {
            if (this.y <= winSize.height) {

            } else {
                // Tạo map ở trên, cho jumper xuất hiện tại vị trí tương ứng

            }
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
    },
})