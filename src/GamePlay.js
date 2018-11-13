
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
        game.load.image("background", "assets/images/background.png");
        game.load.image("pelota", "assets/images/pelota.png");
        game.load.image("carlos", "assets/images/carlos.png");
        game.load.image("pity", "assets/images/pity.png");

    },
    //create == start (unity).
    create: function() {
        console.log("create");

        this.background = game.add.sprite(0, 0, 'background');

        //  Enable p2 physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.physics.p2.restitution = 0.5;
        game.physics.p2.gravity.y = 500;

        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial');
        var playerMaterial = game.physics.p2.createMaterial('spriteMaterial');
        
        var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });
        var contactMaterial2 = game.physics.p2.createContactMaterial(spriteMaterial, playerMaterial, { restitution: 1.0 });

        game.physics.p2.setWorldMaterial(worldMaterial);

        this.carlos = game.add.sprite(100, 100, 'carlos');
        this.pity = game.add.sprite(800, 400, 'pity');
        this.pelota = game.add.sprite(512, 200, 'pelota');

        //  Enable for physics. This creates a default rectangular body.
        game.physics.p2.enable([ this.pelota ]);
        game.physics.p2.enable([ this.carlos ]);
        game.physics.p2.enable([ this.pity ]);

        // Para que no se roten los personajes.
        this.carlos.body.fixedRotation = true;
        this.pity.body.fixedRotation = true;
        
        this.pelota.body.setMaterial(spriteMaterial);
        this.carlos.body.setMaterial(playerMaterial);
        this.pity.body.setMaterial(playerMaterial);

        //  Escala de gravedad
        this.pelota.body.data.gravityScale = 1,5;
        this.carlos.body.data.gravityScale = 9;
        this.pity.body.data.gravityScale = 9;

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
        console.log("update");
        
        this.carlos.body.velocity.x = 0;
        this.pity.body.velocity.x = 0;

        // Controles Pity (JUGADOR 1)
        if (this.aKey.isDown)
        {
            this.pity.body.moveLeft(200);
        }
        else if (this.dKey.isDown)
        {
            this.pity.body.moveRight(200);
        }
        if (this.spaceKey.isDown)
        {
            this.pity.body.moveUp(1200);
        }
        if (this.cKey.isDown)
        {
        }

        // Controles Carlos (JUGADOR 2)
        if (cursors.left.isDown)
        {
            this.carlos.body.moveLeft(200);
        }
        else if (cursors.right.isDown)
        {
            this.carlos.body.moveRight(200);
        }
        if (this.nKey.isDown)
        {
            this.carlos.body.moveUp(1200);
        }
        if (this.mKey.isDown)
        {
        }
    
    },
}

var game = new Phaser.Game(1024, 600, Phaser.CANVAS);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");