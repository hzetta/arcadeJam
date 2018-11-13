
GamePlayManager = {
    //init == awake (unity).
    init: function() {
        console.log("init");

    },
    //Carga todos los assets y variables.
    preload: function() {
        console.log("preload");
        var background;
        var pelota;
        var carlos;
        var pity;
        var cursors;
        var nKey;
        var aKey;
        var dKey;
        var mKey;
        var spaceKey;
        var cKey;
        var carlosJumpTimer;
        var pityJumpTimer;
        game.load.image("background", "assets/images/background.png");
        game.load.image("pelota", "assets/images/pelota.png");
        //game.load.image("carlos", "assets/images/carlos.png");
        //game.load.image("pity", "assets/images/pity.png");
        game.load.spritesheet('pity', 'assets/images/pity_movimiento.png', 105, 115, 9);
        game.load.spritesheet('carlos', 'assets/images/carlos_movimiento.png', 105, 114, 9);

    },
    //create == start (unity).
    create: function() {
        console.log("create");

        game.world.setBounds(0, 0, 1024, 600);

        this.background = game.add.sprite(0, 0, 'background');

        //  Enable p2 physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        //game.physics.p2.setImpactEvents(true);

        game.physics.p2.gravity.y = 500;

        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial');
        var playerMaterial = game.physics.p2.createMaterial('spriteMaterial');
        var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });
        var contactMaterial2 = game.physics.p2.createContactMaterial(spriteMaterial, playerMaterial, { restitution: 1.0 });

        game.physics.p2.setWorldMaterial(worldMaterial);

        this.carlos = game.add.sprite(150, 100, 'carlos', 1);
        this.carlos.animations.add('walkright', [6], 12, false);
        this.carlos.animations.add('walkleft', [8], 12, false);
        this.carlos.animations.add('static', [0], 12, true);
        this.pity = game.add.sprite(874, 100, 'pity', 1);
        this.pity.animations.add('derecha', [6], 12, false);
        this.pity.animations.add('izquierda', [8], 12, false);
        this.pity.animations.add('estatico', [0], 12, true);
        this.pelota = game.add.sprite(512, 200, 'pelota');

        //  Enable for physics. This creates a default rectangular body.
        game.physics.p2.enable([ this.pelota ]);
        game.physics.p2.enable([ this.carlos ]);
        game.physics.p2.enable([ this.pity ]);

        // Forma de pelota
        this.pelota.body.setCircle (25,0,0,1);
		this.pelota.anchor.setTo(0.5, 0.5);

        // Rotacion de jugadores
        this.carlos.body.fixedRotation = true;
        this.pity.body.fixedRotation = true;

        this.pelota.body.setMaterial(spriteMaterial);
        this.carlos.body.setMaterial(playerMaterial);
        this.pity.body.setMaterial(playerMaterial);

        //  Escala de gravedad
        this.pelota.body.data.gravityScale = 3;
        this.carlos.body.data.gravityScale = 9;
        this.pity.body.data.gravityScale = 9;


        //Tiempo de saltos
        this.carlosJumpTimer = game.time.now;
        this.pityJumpTimer = game.time.now;

        // Movimiento Flechas
        cursors = game.input.keyboard.createCursorKeys();

        //  Registro de letras.
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
        this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    //Frame a Frame.
    update: function() {
        //console.log("update");
        
        this.carlos.body.velocity.x = 0;
        this.pity.body.velocity.x = 0;

        // Controles Carlos (JUGADOR 1)
        if (this.aKey.isDown)
        {
            this.carlos.body.moveLeft(PLAYER_SPEED);
            this.carlos.animations.play('walkleft');
        }
        else if (this.dKey.isDown)
        {
            this.carlos.body.moveRight(PLAYER_SPEED);
            this.carlos.animations.play('walkright');   
        }
        else 
        {
                this.carlos.animations.stop('walkright');
                this.carlos.animations.play('static'); 
            }        
        if (this.spaceKey.isDown && game.time.now > this.carlosJumpTimer)
        {
            console.log("salto carlos");
            this.carlos.body.moveUp(PLAYER_JUMP_SPEED);
			this.carlosJumpTimer = game.time.now + TIME_BETWEEN_JUMPS;
        }
        if (this.cKey.isDown)
        {

        }

        // Controles Pity (JUGADOR 2)
        if (cursors.left.isDown)
        {
            this.pity.body.moveLeft(PLAYER_SPEED);
            this.pity.animations.play('izquierda');
        }
        else if (cursors.right.isDown)
        {
            this.pity.body.moveRight(PLAYER_SPEED);
            this.pity.animations.play('derecha');   
        }
        else 
        {
                this.pity.animations.stop('derecha');
                this.pity.animations.play('estatico'); 
            }
    
        if (this.nKey.isDown && game.time.now > this.pityJumpTimer)
        {
            console.log("salto carlos");
            this.pity.body.moveUp(PLAYER_JUMP_SPEED);
			this.pityJumpTimer = game.time.now + TIME_BETWEEN_JUMPS;
        }
        if (this.mKey.isDown)
        {
        }
    
    },
}
//constantes
var TIME_BETWEEN_JUMPS = 650;    //tiempo en ms entre saltos
var PLAYER_SPEED = 300;         //velocidad
var PLAYER_JUMP_SPEED = 1000;

var game = new Phaser.Game(1024, 768, Phaser.CANVAS);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay")