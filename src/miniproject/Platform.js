var Platform = cc.PhysicsSprite.extend({
    shape: null,
    space: null,
    ctor: function() {
        this._super(res.platform_png);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }
});
