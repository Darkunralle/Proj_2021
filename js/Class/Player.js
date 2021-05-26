class player extends character{
    constructor(scene,_inputs, x ,y){
        super(scene, x, y, 'MainPlayerModel' );

        this.inputs = _inputs;
        this.scene = scene;

        this.life = 100;
        this.mana = 100;

        // Animation

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('MainPlayerModel',{frames: [0]}),
            frameRate: 5,
            repeat:-1
        });

        this.anims.create({
            key: 'crounch',
            frames: this.anims.generateFrameNumbers('MainPlayerModel',{frames: [1]}),
            frameRate: 5,
            repeat:-1
        });

        this.anims.play('idle',true);



        this.stance = "fire";
        console.log(this.stance);

        this.mouse;

        this.posX;
        this.posY;
        this.tan;

        this.teleportRange = 100;

        this.dashCD = 5;

        this.guardGaugeMax =100;
        this.guardGauge = this.guardGaugeMax;


        // 0 -> ChangeMod
        // 1 -> TP
        // 2/4 -> FireSpell // Clic mouse / A / E
        // 5/7 -> FrostSpell
        // 8/10 -> ArcaneSpell
        this.cooldown = [0,0,0,0,0,0,0,0,0,0,0];

        // Spell CD

        // Fire Spell
        this.newFireball;
        this.newPyroblast;
        this.newImmolate;

        // Frost Spell
        this.newIcebolt;
        this.newConeOfCold;
        this.newFrostShield;

        // Thunder Spell
        this.newArcaneProjectil;
        this.newArcaneOrb;
        this.newNova;
    
        // Indicateur
        this.indic = scene.physics.add.image();
        this.indic.body.setAllowGravity(false);
        this.indic.setDebugBodyColor(0xff0000);
        this.indic.body.setSize(5,5);  

        this.nCooldown = 0;

        this.onIndic = false;

        scene.physics.add.overlap(this.indic,demon,this.immolate, null, this);
    }

    immolate(zone, demon){
        if(this.onIndic == true){
            demon.setOnFire(specialSpell[3].dot,specialSpell[3].dotDuration);
            this.cooldown[4] = specialSpell[3].cd;
            this.onIndic = false;
        }
        
    }

    setLife(damage){
        if(specialSpell[1].charge >= 0){
            this.life -= damage - specialSpell[1].res;
            specialSpell[1].charge -= 1
        }else{this.life -= damage;}

        console.log(this.life);
        
    }

    // Fonction de translation sur l'axe X
    speedX(speed){
        // Bouge le body sur l'axe X
        this.body.setVelocityX(speed);    
    }

    speedY(speed){
        this.body.setVelocityY(speed);  
    }

    speedReset(){
        this.body.setVelocityX(0);
        this.anims.play('idle',true);
        this.body.setSize(16,32);
    }
    // Fonction de déplacement
    movefunc(){

        // Reset la vitesse du joueur a 0
        this.speedReset();

        // move left
        if (this.inputs[2].isDown) {
            this.speedX(-150);
            this.direction = true;
            leftBool = true;

        }
        // move right
        if (this.inputs[3].isDown) {
            this.speedX(150);
            this.direction = false;
            leftBool = false;

        }
        if ((this.inputs[1].isUp && this.inputs[0].isDown) && this.body.onFloor()){
            // Pour sauter
            this.speedY(-300);
        } 
        if (this.inputs[1].isDown){
            this.body.setSize(16,16);
            this.anims.play('crounch',true);
            this.body.setOffset(0,16);
        }
    }

    attackFunc(){
        // Fire , Pyro / 0,1
        // Bolt / 2
        // Shoot , orb / 3,4
        if(this.mouse.leftButtonDown()){
            if(this.stance == "fire"){
                if(this.cooldown[2] == 0){
                    this.newFireball = new Fireball(this.scene,this.mouse,this.x,this.y);
                    spellBook[0].add(this.newFireball);
                    this.cooldown[2] = this.newFireball.cd;
                }
                
            }else if(this.stance == "frost"){
                if(this.cooldown[5] == 0){
                    this.newIcebolt = new Icebolt(this.scene,this.mouse,this.x,this.y);
                    spellBook[2].add(this.newIcebolt);
                    this.cooldown[5] = this.newIcebolt.cd;
                }
            }else{
                if(this.cooldown[8] == 0){
                    this.newArcaneShoot = new ArcaneShoot(this.scene,this.mouse,this.x,this.y);
                    spellBook[3].add(this.newArcaneShoot);
                    this.cooldown[8] = this.newArcaneShoot.cd;
                }
            }
        }
        if(this.inputs[6].isDown){
            if(this.stance == "fire"){
                if(this.cooldown[3] == 0){
                    this.newPyroblast = new Pyroblast(this.scene,this.mouse,this.x,this.y);
                    spellBook[1].add(this.newPyroblast);
                    this.cooldown[3] = this.newPyroblast.cd;
                }
            }else if(this.stance == "frost"){
                if(this.cooldown[6] == 0){
                    specialSpell[2].activate = true;
                    this.cooldown[6] = specialSpell[2].cd;
                }
            }else{
                if(this.cooldown[9] == 0){
                    this.newArcaneOrb = new ArcaneOrb(this.scene,this.mouse,this.x,this.y);
                    spellBook[4].add(this.newArcaneOrb);
                    this.cooldown[9] = this.newArcaneOrb.cd;
                }
            }  
        }
        if(this.inputs[7].isDown){
            if(this.stance == "fire"){
                if(this.cooldown[4] == 0){
                    if(this.onIndic == true){
                        
                        this.cooldown[4] = this.newImmolate.cd;
                    }
                    
                }
            }else if(this.stance == "frost"){
                if(this.cooldown[7] == 0){
                    specialSpell[1].refreshDuration();
                    this.cooldown[7] = specialSpell[1].cd;
                }
            }else{
                if(this.cooldown[10] == 0){
                    specialSpell[0].activate = true;
                    this.cooldown[10] = specialSpell[0].cd;
                }
            } 
        }     
    }

    indicator(){
        
        this.posX = this.mouse.worldX-this.x;
        this.posY = this.mouse.worldY-this.y;

        this.tan = Math.sqrt(Math.pow(this.posX,2)+Math.pow(this.posY,2));

        if(this.tan <= this.teleportRange){
            this.indic.x = this.mouse.worldX;
            this.indic.y = this.mouse.worldY;
            
        }else{
            this.indic.x = this.x + this.posX * 100 / this.tan;
            this.indic.y = this.y + this.posY * 100 / this.tan;
        }
    }

    changeStance(){
        if(this.inputs[8].isDown && this.cooldown[0] == 0){
            if(this.stance == "fire"){
                this.stance = "frost";
            } else if(this.stance == "frost"){
                this.stance = "thunder";
            } else{this.stance = "fire"}
            console.log(this.stance);
            this.cooldown[0] = 1;
        }
    }

    dash(){
        if(this.inputs[5].isDown && this.cooldown[1] == 0){
            if (LayerOne.getTileAtWorldXY(this.indic.x, this.indic.y)== null) {
                this.x = this.indic.x;
                this.y = this.indic.y;
                this.cooldown[1] = this.dashCD;
            }
        }
    }

    guard(){

    }

    update (time, delta)
    {
        this.nCooldown += delta/1000;
        if(this.nCooldown > 1){
            for(var i = 0; i< this.cooldown.length;i++){
                if(this.cooldown[i] > 0){
                    this.cooldown[i] -= 1;
                }
            }

            if(this.mana < 100){
                this.mana += 2;
                if(this.mana >100){this.mana=100;}
            }
            
            this.nCooldown = 0;
        }
        
        this.mouse = this.scene.input.activePointer;
        this.movefunc();
        this.attackFunc();
        this.indicator();
        this.changeStance();
        this.dash();

    }
}