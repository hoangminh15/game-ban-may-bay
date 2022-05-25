var Platform = cc.PhysicsSprite.extend({
    shape: null,
    space: null,
    ctor: function() {
        this._super(res.platform_png);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }
});

// // Create and push a new platform to game container
// Platform.create = function() {
//     var platform = new Platform();
//     // g_sharedGameLayer.addChild(platform, 3000);
//     JJ.CONTAINER.PLATFORMS.push(platform);
//     return platform;
// };
//
// // Get latest inactive platform. Otherwise create it.
// Platform.getOrCreate = function() {
//     var platform = null;
//     for (var i = 0; i < JJ.CONTAINER.PLATFORMS.length; i++) {
//         platform = JJ.CONTAINER.PLATFORMS[i];
//         if (platform.active === false) {
//             platform.active = true;
//             platform.visible = true;
//             return platform;
//         }
//     }
//     platform = Platform.create();
//     return platform;
// }
//
// Platform.preset = function() {
//     var platform = null;
//     for (var i = 0; i < 10; i++) {
//         platform = Platform.create();
//         platform.visible = false;
//         platform.active = false;
//     }
// }