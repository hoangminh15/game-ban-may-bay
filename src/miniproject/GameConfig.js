
var JJ = JJ || {};

JJ.LIFE = 4;

JJ.SCORE = 0;

JJ.SOUND = true;

JJ.LEVEL = {
    STAGE1: 1,
    STAGE2: 2,
    STAGE3: 3
}

JJ.CONTAINER = {
    PLATFORMS: [],
    BACKGROUNDS: [],
}

JJ.PLATFORMS = []

JJ.KEYS = []

JJ.KEYTIME = []

JJ.WIDTH = 480;
JJ.HEIGHT = 720;
JJ.SCALE = 1.5;

//Bug with map.png. Can retrieve map width
JJ.MAPWIDTH = 126;
JJ.MAPHEIGHT = 231;

JJ.JUMPERWIDTH = 34;
JJ.JUMPERHEIGHT = 43;

JJ.PLATFORMWIDTH = 60;
JJ.PLATFORMHEIGHT = 28;

JJ.SPRITETAG = {
    JUMPER: 0,
    COIN: 1,
    PLATFORM: 2,
    GROUND: 3
}

JJ.NUMOFPLATPERSCREEN = 6;

JJ.PLATFORMDISTANCE = JJ.HEIGHT / 6;

JJ.NUMOFMAP = JJ.MAPHEIGHT / (JJ.WIDTH / JJ.MAPWIDTH);