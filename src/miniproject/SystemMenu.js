var SystemMenu = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        var menuItem = cc.MenuItemFont("New Game", this.onNewGame);
        var menu = cc.Menu(menuItem);
        this.addChild(menu);
    },
    onNewGame: function() {
        var scene = new cc.Scene();
        var gameLayer = new GameLayer();
        scene.addChild(gameLayer);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
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