class Game extends Phaser.Scene{

    constructor(){
        super("Game");
    }
    

    preload() {
        this.load.image('fireball', "assets/anim/FireballTest.png")
        // Sprite du joueur
        this.load.spritesheet('MainPlayerModel', 'assets/anim/SPMTest.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('EnemyPlayerModel', 'assets/anim/EnemyTest.png', { frameWidth: 16, frameHeight: 32 });
        //Element Tiled
        this.load.image('tile','assets/tiled/TestAsset.png', {frameWidth: 16, frameHeight: 16});
        this.load.tilemapTiledJSON('map','assets/tiled/BetaLvl.json');
    }
    
    // Creation des plateformes et collide
    create() {
        this.spellBookInit()


        // Création de la map
        const map = this.make.tilemap({key:'map'});
        const tilesetTest = map.addTilesetImage("TestAsset", 'tile',16,16);
    
        //Création des plateformes
        LayerOne = map.createLayer('Calque de Tuiles 1', tilesetTest, 0,0);
    
        //Leur donne de la physique
        LayerOne.setCollisionByExclusion(-1,true);
    
    
        _Player = this.add.group({
            classType: player,
            runChildUpdate: true,
        });
        
        var _inputs = new inputs(this);
        var newPlayer = new player(this,_inputs.playerConfig[0],80,350,spellBook,LayerOne);
        _Player.add(newPlayer);
    
        demon = this.add.group({
            clasType: ennemy,
            runChildUpdate: true,
        })
    
        for (var i = 0; i< 1;i++){
            var newDemon = new ennemy(this,500+50*i,350,_Player);
            demon.add(newDemon);
        }
        
    
    
    
    
        this.physics.add.collider(_Player, LayerOne);
        this.physics.add.collider(_Player, demon);
        this.physics.add.collider(demon, LayerOne);
        for(var i = 0; i< spellBook.length;i++){
            this.physics.add.collider(spellBook[i], LayerOne);
            this.physics.add.collider(spellBook[i], demon, this.spellCollid);
        }
        
        //this.physics.add.overlap(demon,_Player,this.detection);
        
    }
    
    update(time, delta) {
    
    }

    detection(a,b){
        console.log("boom");
    }

    spellCollid(a,b){
        a.destroy();
        b.setLife(2);
        if(b.life <= 0){
            b.y = 1000;
        }
    }

    spellBookInit(){
        var spellFireball = this.add.group({
            classType: Fireball,
            runChildUpdate: true,

        });
        spellBook.push(spellFireball);

        var spellArcaneOrb = this.add.group({
            classType: ArcaneOrb,
            runChildUpdate: true,

        });
        spellBook.push(spellArcaneOrb);
    }
}