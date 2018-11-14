
GamePlayManager = {
    //init == awake (unity).
    init: function() {
        console.log("init");

    },
    //Carga todos los assets y variables.
    preload: function() {
        console.log("preload");
        var background;
        var genteFondo;
        var pelota;
        var carlos;
        var pity;
        var carlosJumpTimer;
        var pityJumpTimer;
        var pad1;
        var pad2;
        var indicator1;
        var indicator2;
        var music;
        var saltoAudio;
        var paloder;

        var carlosFondoArco;
        var pityFondoArco;
        var carlosTechoArco;
        var pityTechoArco;


        var golesCarlos = 0;
        var golesPity = 0;
        var timerPartido;
        var txtGolesCarlos;
        var txtGolesPity;
        var txtTimerPartido;

        //game.load.audio('music', ['assets/sonidos/fondoMusica.ogg']);

        game.load.audio('music', ['assets/sonidos/fondoMusica.ogg', 'assets/sonidos/fondoMusica.mp3'])
        game.load.audio('saltoAudio', ['assets/sonidos/saltoAudio.ogg', 'assets/sonidos/saltoAudio.mp3'])
        game.load.spritesheet('controller-indicator', 'assets/images/diamonds.png', 81,84,4);
        game.load.image("background", "assets/images/background.png");
        game.load.spritesheet('gente', 'assets/images/animacion_gente.png', 272, 180, 4);
        game.load.image("pelota", "assets/images/pelota.png");
        game.load.image("paloder", "assets/images/palo_der.png");
        game.load.spritesheet('pity', 'assets/images/pity_movimiento.png', 105, 115, 9);
        game.load.spritesheet('carlos', 'assets/images/carlos_movimiento.png', 105, 114, 9);
        game.load.image("fondoArco", "assets/images/fondo_arco.png");
        game.load.image("techoArco", "assets/images/techo_arco.png");
    },
    //create == start (unity).
    create: function() {
        console.log("create");

        //this.music = game.add.audio('music');
        //this.music.play('music');

        game.world.setBounds(0, 0, 1024, 600);

        this.background = game.add.sprite(0, 0, 'background');

        //  Enable p2 physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        //game.physics.p2.setImpactEvents(true);

        //inicializaciones
        this.golesCarlos = 0;
        this.golesPity = 0;
        this.timerPartido = 0;
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
        this.carlos.animations.add('kick', [4], 12, false);
        this.pity = game.add.sprite(874, 100, 'pity', 1);
        this.pity.animations.add('derecha', [6], 12, false);
        this.pity.animations.add('izquierda', [8], 12, false);
        this.pity.animations.add('estatico', [0], 12, true);
        this.pity.animations.add('patada', [4], 12, false);
        this.pelota = game.add.sprite(76, 200, 'pelota');
        this.paloder = game.add.sprite(1000, 299, 'paloder');

        this.carlosFondoArco = game.add.sprite(1,game.world.height - game.cache.getImage('fondoArco').height/2,'fondoArco');
        this.pityFondoArco = game.add.sprite(1000,game.world.height - game.cache.getImage('fondoArco').height/2,'fondoArco');

        this.carlosTechoArco = game.add.sprite(1,game.world.height - game.cache.getImage('fondoArco').height-20,'techoArco');
        this.pityTechoArco = game.add.sprite(1000,game.world.height - game.cache.getImage('fondoArco').height-20,'techoArco');


        this.txtGolesCarlos = game.add.text(320, 690, this.golesCarlos, {
            font: "45px Arial",
            fill : '#ffffff',
            align: "center"
        });
        this.txtGolesPity = game.add.text(680, 690, this.golesPity, {
            font: "45px Arial",
            fill : '#ffffff',
            align: "center"
        });
        this.txtTimerPartido = game.add.text(460, 690, "00:00", {
            font: "45px Arial",
            fill : '#ffffff',
            align: "center"
        });

        //  Enable for physics. This creates a default rectangular body.
        game.physics.p2.enable([ this.pelota ]);
        game.physics.p2.enable([ this.carlos ]);
        game.physics.p2.enable([ this.pity ]);
        //game.physics.p2.enable([ this.paloder ]);
        game.physics.p2.enable([ this.pityFondoArco ]);
        game.physics.p2.enable([ this.carlosFondoArco ]);
        
        game.physics.p2.enable([ this.pityTechoArco ]);
        game.physics.p2.enable([ this.carlosTechoArco ]);

        // Forma de pelota
        this.pelota.body.setCircle (24,0,0,1);
        this.pelota.anchor.setTo(0.5, 0.5);
        
        // Forma de los jugadores
        this.carlos.body.setCircle (38,0,0,0);
        this.pity.body.setCircle (38,0,0,0);
        this.carlosTechoArco.body.setCircle (58,0,0,0);
        this.pityTechoArco.body.setCircle (58,0,0,0);


        // Rotacion de jugadores
        this.carlos.body.fixedRotation = true;
        this.pity.body.fixedRotation = true;
        //this.paloder.body.fixedRotation = true;
        //this.paloder.body.static = true;

        this.pityFondoArco.body.static = true;
        this.carlosFondoArco.body.static = true;
        this.pityTechoArco.body.static = true;
        this.carlosTechoArco.body.static = true;

        // Seteo de materiales para jugadores y pelota
        this.pelota.body.setMaterial(spriteMaterial);
        this.carlos.body.setMaterial(playerMaterial);
        this.pity.body.setMaterial(playerMaterial);
        //this.paloder.body.setMaterial(playerMaterial);
        this.pityFondoArco.body.setMaterial(playerMaterial);
        this.carlosFondoArco.body.setMaterial(playerMaterial);
        this.pityTechoArco.body.setMaterial(playerMaterial);
        this.carlosTechoArco.body.setMaterial(playerMaterial);

        //  Escala de gravedad
        this.pelota.body.data.gravityScale = 3;
        this.carlos.body.data.gravityScale = 9;
        this.pity.body.data.gravityScale = 9;

        // Tiempo de saltos
        this.carlosJumpTimer = game.time.now;
        this.pityJumpTimer = game.time.now;

        // Gente
        //genteFondo = game.add.sprite(0,0, 'gente');
        //genteFondo.animations.add('movimiento', [0,1,2,3], 12, true);
        //genteFondo.animations.play('movimiento', true);
 
        // Inicio de gamepad/controles.
        indicator1 = game.add.sprite(10,10, 'controller-indicator');
        indicator1.scale.x = indicator1.scale.y = 2;
        indicator1.animations.frame = 1;

        indicator2 = game.add.sprite(850,10, 'controller-indicator');
        indicator2.scale.x = indicator2.scale.y = 2;
        indicator2.animations.frame = 1;

        game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

        //this.paloder.body.createBodyCallback(this.pelota, this.goalFun, this);
        this.pityFondoArco.body.createBodyCallback(this.pelota, this.goalFun, this);
        this.carlosFondoArco.body.createBodyCallback(this.pelota, this.goalFun, this);

        //  And before this will happen, we need to turn on impact events for the world
        game.physics.p2.setImpactEvents(true);

        //  Create our Timer
        this.timerPartido = game.time.create(false);
        //  Set a TimerEvent to occur after 2 seconds
        this.timerPartido.loop(1000, this.updateTimer, this);
        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        this.timerPartido.start();


        // // Musica
        // this.music = game.add.audio('music');
        // this.music.loop = true;
        // this.music.play();
        // this.audioSalto.loop = false;
        // this.audioSalto = game.add.audio('audioSalto');



    },

    goalFun: function(body1, body2) {
        if (body1.id == this.carlosFondoArco.body.id){
            console.log("Gol pity");
            this.golesPity += 1;
            this.txtGolesPity.setText(this.golesPity);
        }
        else {
            console.log("Gol carlos");
            this.golesCarlos += 1;
            this.txtGolesCarlos.setText(this.golesCarlos);
        }
        this.reinicioGol();
    },

    reinicioGol: function(){
        this.carlos.reset(150, 100);
        this.pity.reset(874, 100);
        this.pelota.reset(512,200);
    },

    updateTimer : function() {
        //console.log(this.timerPartido.ms);
        var minute = Math.floor(this.timerPartido.ms / 1000 / 60);
        var second = Math.round((this.timerPartido.ms / 1000) % 60);
        if (minute < 10){
            minute = "0" + minute;
        }
        if (second < 10){
            second = "0" + second;
        }
        //console.log();
        //console.log(Math.round((this.timerPartido.ms / 1000) % 60));
        
        this.txtTimerPartido.setText(minute + ":" + second);
    },

    //Frame a Frame.
    update: function() {
        //console.log("update");

        // Velocidad en 0 para que los personajes no deslicen indefinidamente
        this.carlos.body.velocity.x = 0;
        this.pity.body.velocity.x = 0;

        // Pad conectado o no
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
            indicator1.animations.frame = 3;
        } else {
            indicator1.animations.frame = 1;
        }
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad2.connected) {
            indicator2.animations.frame = 3;
        } else {
            indicator2.animations.frame = 1;
        }

        // Controles Carlos (JUGADOR 1)
        if (pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER) || game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.carlos.body.moveLeft(PLAYER_SPEED);
            this.carlos.animations.play('walkleft');
        }
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER)|| game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.carlos.body.moveRight(PLAYER_SPEED);
            this.carlos.animations.play('walkright');   
        }
        else if (pad1.justPressed(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) || game.input.keyboard.isDown(Phaser.Keyboard.C))
        {
            this.carlos.animations.play('kick');
        }
        else 
        {
                this.carlos.animations.play('static'); 
            }        
        if ((pad1.justPressed(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) && game.time.now > this.carlosJumpTimer)
        {
            console.log("salto carlos");
            this.carlos.body.moveUp(PLAYER_JUMP_SPEED);
            this.carlosJumpTimer = game.time.now + TIME_BETWEEN_JUMPS;
        }

        // Controles Pity (JUGADOR 2)
        if (pad2.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER))//|| game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.pity.body.moveLeft(PLAYER_SPEED);
            this.pity.animations.play('izquierda');
        }
        else if (pad2.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER))//|| game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.pity.body.moveRight(PLAYER_SPEED);
            this.pity.animations.play('derecha');   
        }
        else if (pad2.justPressed(Phaser.Gamepad.XBOX360_STICK_RIGHT_X))//|| game.input.keyboard.isDown(Phaser.Keyboard.M))
        {
            this.pity.animations.play('patada');
        }
        else 
        {
                this.pity.animations.play('estatico'); 
            }
    
        if (pad2.isDown(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) && game.time.now > this.pityJumpTimer)
        {
            console.log("salto pity");
            this.pity.body.moveUp(PLAYER_JUMP_SPEED);
            this.pityJumpTimer = game.time.now + TIME_BETWEEN_JUMPS;
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