var Platform = cc.Sprite.extend({
    ctor: function() {
        this._super(res.platform_png);
        var rect = cc.rect(0, 1, this.width, this.height - 2);
        this.setTextureRect(rect);
        this.anchorX = 0.5;
        this.anchorY = 0.5;

    }
});

Platform.create = function() {
    var platform = new Platform();
    g_sharedGameLayer.addChild(platform, 3000);
    JJ.CONTAINER.PLATFORMS.push(platform);
    return platform;
};

Platform.getOrCreate = function() {
    for (var i = 0; i < JJ.CONTAINER.PLATFORMS.length; i++) {
        var platform = JJ.CONTAINER.PLATFORMS[i];
        if (platform.active === false) {
            platform.active = true;
            platform.visible = true;
            return platform;
        }
    }
}

Platform.preset = function() {
    var platform = null;
    for (var i = 0; i < 10; i++) {
        platform = Platform.create();
        platform.visible = false;
        platform.active = false;
    }
}