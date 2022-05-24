
var Background = cc.Sprite.extend({
    active: true,
    ctor: function() {
        this._super(res.map_png);
        // Why crop top and bottom by 1 pixel?
        var rect = cc.rect(0, 1, this.width, this.height-2);
        this.setTextureRect(rect);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }
});

Background.create = function() {
    var background = new Background();
    g_sharedGameLayer.addChild(background, -10);
    JJ.CONTAINER.BACKGROUNDS.push(background);
    return background;
}

Background.getOrCreate = function() {
    for (var i = 0; i < JJ.CONTAINER.BACKGROUNDS.length; i++) {
        var background = JJ.CONTAINER.BACKGROUNDS[i];
        if (background.active === false) {
            background.active = true;
            background.visible = true;
            return background;
        }
    }
    background = Background.create();
    return background;
}

Background.preset = function() {
    var background = null;
    for (var i = 0; i < 3; i++) {
        background = Background.create();
        background.visible = false;
        background.active = false;
    }
}