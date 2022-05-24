
var FakeGameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {

        var winSize = cc.winSize;
        var width = winSize.width;
        var height = winSize.height;
        var menuItem = new cc.MenuItemFont("Back", this.onBack);
        var menu = new cc.Menu(menuItem);
        menu.setPosition(width/2, height/2);
        this.addChild(menu);

        return true;
    },
    onBack: function() {
        cc.audioEngine.stopAllEffects();
        cc.director.popScene();
    }
})