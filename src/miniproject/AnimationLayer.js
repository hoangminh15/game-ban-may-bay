var AnimationLayer = cc.Layer.extend({

    jumper: null,
    space: null,
    shape: null,
    body: null,
    platform: null,
    platformBody: null,
    platformShape: null,
    highestPlatformHeight: 0,
    screenIndex: null,

    ctor: function (space) {
        this._super();
        this.space = space;
        // Create jumper
        this.jumper = new Jumper(res.mainJumper_png, this);
        // Init jumper physics body
        // this.body = new cp.Body(1, cp.momentForBox(1, JJ.JUMPERWIDTH, 1));
        this.body = new cp.Body(1, cp.momentForBox(1, 1000000, 100000));
        // Set the spawn position of jumper
        this.body.p = cc.p(g_jumperStartX, g_groundHeight + JJ.JUMPERHEIGHT / 2);
        // apply impulse to the body
        // this.body.applyImpulse(cp.v(0, 100), cp.v(0, 0)) // run speed
        // add the created body to space (add PhysicsBody to PhysicsWorld)
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, 10, 1);
        this.shape.setFriction(100);
        this.shape.setElasticity(0);
        // add shape to space
        this.space.addShape(this.shape);
        // set body to the physics sprite
        this.jumper.setBody(this.body);
        this.jumper.setIgnoreBodyRotation(false)
        this.addChild(this.jumper, 3000);
        this.createPlatforms();
    },
    createPlatforms: function() {
        // Create platform
        for (var i = 1; i < 20; i++) {
            this.platform = new Platform(res.platform_png);
            var body = new cp.StaticBody();
            //Set width temporary
            this.highestPlatformHeight += JJ.PLATFORMDISTANCE;
            body.setPos(cc.p(JJ.WIDTH * Math.random(), this.highestPlatformHeight));
            this.platform.setBody(body);
            this.shape = new cp.BoxShape(body, (JJ.PLATFORMWIDTH + 10), JJ.PLATFORMHEIGHT+35);

            this.shape.setCollisionType(JJ.SPRITETAG.PLATFORM);
            this.shape.setFriction(100);
            this.space.addStaticShape(this.shape);
            JJ.CONTAINER.PLATFORMS.push(this.platform);
            this.addChild(this.platform);
        }
    },
    getJumper: function() {
        return this.jumper;
    },
    jumpByImpulse: function() {
        this.body.applyImpulse(cp.v(0, 320), cp.v(0, 0));
    }
})
