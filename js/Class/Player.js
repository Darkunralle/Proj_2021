class player extends character{
    constructor(scene,_inputs, x ,y,spellBook,LayerOne){
        super(scene, x, y, 'MainPlayerModel' );

        this.inputs = _inputs;
        this.scene = scene;

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

        this.scene = scene;

        this.spellBook = spellBook;

        this.direction = false;

        this.stance = "fire";
        console.log(this.stance);

        this.mouse;
        this.posX;
        this.posY;
        this.tan;

        this.teleportRange = 100;

        this.dashCD = false;
        this.dashTimerEv;

        this.stanceCD = false;
        this.stanceCdEvent;

        this.LayerOne = LayerOne;

        this.guardGaugeMax =100;
        this.guardGauge = this.guardGaugeMax;


        // Spell CD

        // Fire Spell
        // Fireball
        this.newFireball;
        this.fireballCD = 1;
        this.fireballOnCD = false;
        this.fireballCdEvent;

        // Thunder Spell
        // Arcane Orb
        this.newArcaneOrb;
        this.ArcaneOrbCD = 5;
        this.ArcaneOrbOnCD = false;
        this.ArcaneOrbCdEvent;


        // test

        this.indic = scene.physics.add.image();
        this.indic.body.setAllowGravity(false);
        this.indic.setDebugBodyColor(0xff0000);
        this.indic.body.setSize(5,5);


        
        
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
                if(this.fireballOnCD == false){
                    this.newFireball = new Fireball(this.scene,this.mouse,this.x,this.y);
                    this.spellBook[0].add(this.newFireball);
                    this.fireballOnCD = true;
                    this.fireballCdEvent = this.scene.time.delayedCall(this.fireballCD*1000, this.skillFireMCL, [], this);
                }
                
            }else if(this.stance == "frost"){

            }else{
                
            }
        }
        if(this.inputs[6].isDown){
            if(this.stance == "fire"){
                
            }else if(this.stance == "frost"){

            }else{
                if(this.ArcaneOrbOnCD == false){
                    this.newArcaneOrb = new ArcaneOrb(this.scene,this.mouse,this.x,this.y);
                    this.spellBook[1].add(this.newArcaneOrb);
                    this.ArcaneOrbOnCD = true;
                    this.ArcaneOrbCdEvent = this.scene.time.delayedCall(this.ArcaneOrbCD*1000, this.skillThunderA, [], this);
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

    collide(world){
        this.scene.physics.add.collider(this, world);
    }

    overlap(world){
        this.scene.physics.add.overlap(this, world);
    }

    setCam(){
        this.scene.cameras.main.startFollow(this);
    }

    indicator(){
        
        this.posX = this.mouse.worldX-this.x;
        this.posY = this.mouse.worldY-this.y;

        this.tan = Math.sqrt(Math.pow(this.posX,2)+Math.pow(this.posY,2));

        if(this.tan <= this.teleportRange){
            this.indic.x = this.mouse.worldX;
            this.indic.y = this.mouse.worldY;
            //Ajouter des conditions
        }else{
            this.indic.x = this.x + this.posX * 100 / this.tan;
            this.indic.y = this.y + this.posY * 100 / this.tan;
        }
    }

    changeStance(){
        if(this.inputs[8].isDown && this.stanceCD == false){
            if(this.stance == "fire"){
                this.stance = "frost";
            } else if(this.stance == "frost"){
                this.stance = "thunder";
            } else{this.stance = "fire"}
            console.log(this.stance);
            this.stanceCD = true;
            this.stanceCdEvent = this.scene.time.delayedCall(1000, this.stanceEvent, [], this);
        }
    }

    dash(){
        if(this.inputs[5].isDown && this.dashCD == false){
            if (this.LayerOne.getTileAtWorldXY(this.indic.x, this.indic.y)== null) {
                this.x = this.indic.x;
                this.y = this.indic.y;
                this.dashCD = true;
                this.dashTimerEv = this.scene.time.delayedCall(5000, this.dashCdFunc, [], this);
            }
        }
    }

    guard(){

    }

    update (time, delta)
    {
        this.mouse = this.scene.input.activePointer;
        this.movefunc();
        this.attackFunc();
        this.indicator();
        this.changeStance();
        this.dash();
    }

    // Fonction event CD
    dashCdFunc(){
        this.dashCD = false;
    }
    stanceEvent(){
        this.stanceCD = false;
    }
    // Sort de feu
    skillFireMCL(){
        this.fireballOnCD = false;
    }
    
    skillFireA(){

    }
    
    skillFireE(){

    }
    // Sort de glace
    skillFrostMCL(){

    }
    
    skillFrostA(){

    }
    
    skillFrostE(){

    }
    // Sort de foudre
    skillThunderMCL(){

    }
    
    skillThunderA(){
        this.ArcaneOrbOnCD = false;
    }
    
    skillThunderE(){

    }


}