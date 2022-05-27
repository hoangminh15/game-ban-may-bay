var SystemMenu = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        var menuItem = new cc.MenuItemFont("New Game", this.onNewGame);
        var menu = new cc.Menu(menuItem);
        menu.setPosition(JJ.WIDTH/2, JJ.HEIGHT/2);
        this.addChild(menu, 5000, "MAIN MENU");

        return true;
    },
    onNewGame: function() {
        var scene = new cc.Scene();
        var gameLayer = new GameLayer();
        var backgroundLayer = new BackgroundLayer();
        gameLayer.setScoreLabel(backgroundLayer.getScoreLabel())
        gameLayer.setBackgroundLayer(backgroundLayer);
        scene.addChild(backgroundLayer, 5000);
        scene.addChild(gameLayer);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
})

SystemMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SystemMenu();
    scene.addChild(layer);
    return scene;
}