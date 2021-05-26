class player extends character{
    constructor(scene,_inputs, x ,y,spellBook,LayerOne){
        super(scene, x, y, 'MainPlayerModel' );

        this.inputs = _inputs;
        this.scene = scene;
        this.spellBook = spellBook;

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

        this.LayerOne = LayerOne;

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
    }

    setLife(damage){
        this.life -= damage;
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

        }
        // move right
        if (this.inputs[3].isDown) {
            this.speedX(150);
            this.direction = false;

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
        if(this.mouse.leftButtonDown()){
            if(this.stance == "fire"){
                if(this.cooldown[2] == 0){
                    this.newFireball = new Fireball(this.scene,this.mouse,this.x,this.y);
                    this.spellBook[0].add(this.newFireball);
                    this.cooldown[2] = this.newFireball.cd;
                }
                
            }else if(this.stance == "frost"){

            }else{
                
            }
        }
        if(this.inputs[6].isDown){
            if(this.stance == "fire"){
                
            }else if(this.stance == "frost"){

            }else{
                if(this.cooldown[9] == 0){
                    this.newArcaneOrb = new ArcaneOrb(this.scene,this.mouse,this.x,this.y);
                    this.spellBook[1].add(this.newArcaneOrb);
                    this.cooldown[9] = this.newArcaneOrb.cd;
                }
            }  
        }
        if(this.inputs[7].isDown){
            if(this.stance == "fire"){

            }else if(this.stance == "frost"){

            }else{

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
            if (this.LayerOne.getTileAtWorldXY(this.indic.x, this.indic.y)== null) {
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