class Game extends Phaser.Scene{

    constructor(){
        super("Game");

    }
    

    preload() {
        this.load.image('fireball', "assets/anim/FireballX2.png")
        // Sprite du joueur
        this.load.spritesheet('MainPlayerModel', 'assets/anim/SPMTest.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('EnemyPlayerModel', 'assets/anim/EnemyTest.png', { frameWidth: 16, frameHeight: 32 });
        //Element Tiled
        this.load.image('tile','assets/tiled/TestAsset.png', {frameWidth: 16, frameHeight: 16});
        this.load.tilemapTiledJSON('map','assets/tiled/BetaLvl.json');
    }
    
    // Creation des plateformes et collide
    create() {
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

        demon = this.add.group({
            clasType: ennemy,
            runChildUpdate: true,
        })

        this.spellBookInit();
        this.specialSpellInit();
        
        var _inputs = new inputs(this);
        newPlayer = new player(this,_inputs.playerConfig[0],80,350);
        _Player.add(newPlayer);

        this.cameras.main.startFollow(newPlayer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, 600);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, 600);
        //this.cameras.main.setFollowOffset(200);

    
        
    
        for (var i = 0; i< 1;i++){
            var newDemon = new ennemy(this,500+50*i,350,"arcane");
            demon.add(newDemon);
        }
        
    

    
    
        this.physics.add.collider(_Player, LayerOne);
        this.physics.add.collider(_Player, demon);
        this.physics.add.collider(demon, LayerOne);
        for(var i = 0; i< spellBook.length;i++){
            this.physics.add.collider(spellBook[i], LayerOne);
            this.physics.add.collider(spellBook[i], demon, this.spellCollid);
        }     
    }

    spellCollid(spell,target){
        spell.destroy();
        target.setLife(spell.damage,spell.type);
    }

    spellBookInit(){
        // Projectile
        // Fire
        var spellFireball = this.add.group({
            classType: Fireball,
            runChildUpdate: true,

        });
        spellBook.push(spellFireball);

        var spellPyroblast = this.add.group({
            classType: Pyroblast,
            runChildUpdate: true,

        });
        spellBook.push(spellPyroblast);

        // Frost
        var spellIcebolt = this.add.group({
            classType: Icebolt,
            runChildUpdate: true,

        });
        spellBook.push(spellIcebolt);

        // arcane
        var spellArcaneShoot = this.add.group({
            classType: ArcaneShoot,
            runChildUpdate: true,

        });
        spellBook.push(spellArcaneShoot);

        var spellArcaneOrb = this.add.group({
            classType: ArcaneOrb,
            runChildUpdate: true,

        });
        spellBook.push(spellArcaneOrb);
    }

    specialSpellInit(){
        var spellNova = this.add.group({
            classType: Nova,
            runChildUpdate: true,
        });
        var newNova = new Nova(this,0,0);
        spellNova.add(newNova);
        specialSpell.push(newNova);

        // -------------------------------------------------- //

        var spellFrostShield = this.add.group({
            classType: FrostShield,
            runChildUpdate: true,
        });
        var newFrostShield = new FrostShield(this,0,0);
        spellFrostShield.add(newFrostShield);
        specialSpell.push(newFrostShield);

        // -------------------------------------------------- //

        var spellConeOfCold = this.add.group({
            classType: ConeOfCold,
            runChildUpdate: true,
        });
        var newConeOfCold = new ConeOfCold(this,0,0);
        spellConeOfCold.add(newConeOfCold);
        specialSpell.push(newConeOfCold);
        
        // -------------------------------------------------- //
        
        var spellImmolate = this.add.group({
            classType: Immolate,
            runChildUpdate: true,
        });
        var newImmolate = new Immolate(this,0,0);
        spellImmolate.add(newImmolate);
        specialSpell.push(newImmolate);
    }

    update(time, delta) {
        
    }
}