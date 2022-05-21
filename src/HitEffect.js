

var HitEffect = cc.Sprite.extend({
    active:true,
    ctor:function () {
        this._super("#hit.png");
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    //Hiệu ứng effect
    reset:function (x, y, rotation) {
        this.stopAllActions();
        //Làm hiệu ứng đạn nổ: scale ảnh từ 0.5 lên 2.5 và fade out ảnh trong 0.3s
        //Add code here
        this.attr({
            x: x,
            y: y,
            rotation: rotation,
            scale: 1,
            opacity: 255
        });
        this.runAction(cc.scaleBy(0.2, 2, 2));
        this.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(this.destroy, this)));
    },
    //Hủy effect
    destroy:function () {
        //Add code here
        this.visible = false;
        this.active = false;
    }
});

//Lấy và hiển thị effect
HitEffect.getOrCreateHitEffect = function (x, y, rotation) {
    //Add code here
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.HITS.length; j++) {
        selChild = MW.CONTAINER.HITS[j];
        if (selChild.active == false) {
            selChild.visible = true;
            selChild.active = true;
            selChild.reset(x, y, rotation);
            return selChild;
        }
    }
    selChild = HitEffect.create();
    selChild.reset(x, y, rotation);
    return selChild;
};

//Khởi tạo effect và thêm vào layer game
HitEffect.create = function () {
    //Add code here
    var hitEffect = new HitEffect();
    g_sharedGameLayer.addBulletHits(hitEffect, 9999);
    MW.CONTAINER.HITS.push(hitEffect);
    return hitEffect;
};

//Khởi tạo trước list effect
HitEffect.preSet = function () {
    //Add code here
    var hitEffect = null;
    for (var i = 0; i < 10; i++) {
        hitEffect = HitEffect.create();
        hitEffect.setVisible(false);
        hitEffect.active = false;
    }
};