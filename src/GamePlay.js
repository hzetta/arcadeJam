

GamePlayManager = {

    

    //init == awake (unity).
    init: function() {
        console.log("init");
    },
    //Carga todos los assets y variables.
    preload: function() {
        console.log("preload");
        var horse;
        var mollusk;
        var background;
        var shark;
        var diamonds;

        //game.load.image('horse', 'assets/images/horse.png');
        game.load.spritesheet('horse', 'assets/images/horse.png', 84, 156, 2);
        game.load.spritesheet('diamonds', 'assets/images/diamonds.png', 81, 84, 4);
        game.load.image('background', 'assets/images/background.png');
        game.load.image('mollusk', 'assets/images/mollusk.png');
        game.load.image('shark', 'assets/images/shark.png');
    },
    //create == start (unity).
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 200;

        console.log("create");
        this.background = game.add.sprite(0, 0, 'background');


        this.mollusk = game.add.sprite(100, 10, 'mollusk');
        this.shark = game.add.sprite(100, 100, 'shark');

        this.horse = game.add.sprite(512, 384, 'horse',1);
        this.horse.anchor.setTo(.5);
        this.horse.animations.add('walk');
        this.horse.animations.play('walk', 2, true);

        this.diamonds = game.add.sprite(700, 184, 'diamonds',1);

        

        this.game.physics.arcade.enable(this.horse, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.diamonds, Phaser.Physics.ARCADE);

         this.horse.body.collideWorldBounds = true;
        // this.horse.enableBody = true;

        // this.horse.body.checkCollision.RIGHT = false;
        // this.horse.body.checkCollision.LEFT = false;
        // this.horse.body.bounce.setTo(100, 1);

        // this.diamonds.body.collideWorldBounds = true;
        // this.diamonds.body.immovable = true;
        // this.diamonds.body.checkCollision.LEFT = true;
        // this.diamonds.body.checkCollision.DOWN = true;

        // this.horse.body.bounce.set(1);
    
        //  this.diamonds.body.collideWorldBounds = true;
        //  this.diamonds.body.immovable = true;
        //  this.diamonds.body.allowGravity = false;

    },
    //Frame a Frame.
    update: function() {
        //console.log("update");
        //this.game.physics.arcade.collide(this.horse, this.diamonds);

        this.game.physics.arcade.overlap(
            this.horse, 
            this.diamonds, 
            this.collisionHandler, 
            null, 
            this
        );

        // if (this.game.physics.arcade.collide(this.horse, this.diamonds))
        // {
        //     console.log("HACE ALGO");
        // }


        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            //console.log("left");
            this.horse.scale.x = -1
            this.horse.x -= 4;
            
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.horse.x += 4;
            this.horse.scale.x = 1
        }
    
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.horse.y -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.horse.y += 4;
        }
    },

    collisionHandler: function(obj1, obj2) {
        //console.log("print")
        this.diamonds.kill();
    }
}



var game = new Phaser.Game(1024, 768, Phaser.CANVAS);


game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");