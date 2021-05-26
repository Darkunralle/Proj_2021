class ennemy extends character{
    constructor(scene, _x ,_y, type){
        super(scene, _x, _y, 'EnemyPlayerModel' );

        this.life = 20;
        this.alive = true;

        this.speed = 80;
        this.slow = false;

        this.type = type;
        this.counterType = this.setCounterType();
        this.resistance = 1;

        this.damage = 10;
        this.atkOn = false;
        this.atkTimer = 3;

        this.timer = 0;

        this.dot;
        this.dotDuration;

        // Box détection
        this.detect = scene.physics.add.image();
        this.detect.body.setAllowGravity(false);
        this.detect.setDebugBodyColor(0xffff00);

        this.detect.body.setSize(400,400);

        // Box attack
        this.attack = scene.physics.add.image();
        this.attack.body.setAllowGravity(false);
        this.left = true;
        this.attack.body.setSize(16,16);


        this.chasingCD = 180;
        this.chasing = 0

        this.origineX = this.x; 
        this.origineY = this.y; 
        
        scene.physics.add.overlap(this.detect,_Player,this.detection, null, this);
        scene.physics.add.overlap(this.attack,_Player,this.attackfunc, null, this);
    }

    setOnFire(dot,dotDuration){
        this.dot = dot;
        this.dotDuration = dotDuration;
    }

    getSpeed(){
        if(this.slow == false){
            return this.speed;
        }else if(this.slow == true){
            return this.speed *0.6;
        }
    }

    attackfunc(box , target){
        this.atkOn = true;
        if(this.atkTimer == 0){
            target.setLife(this.damage);
            this.atkTimer = 3;
        }
    }   

    setCounterType(){
        if(this.type == "fire"){
            return "arcane";
        }else if(this.type == "frost"){
            return "fire";
        }else if(this.type == "arcane"){
            return "frost";
        }
    }

    detectPlacement(){
        this.detect.x = this.x;
        this.detect.y = this.y-185;
    }

    attackPlacement(){
        if(this.left == true){
            this.attack.x = this.x-12;
            this.attack.y = this.y;
        }else{
            this.attack.x = this.x+12;
            this.attack.y = this.y;
        }
        
    }

    setLife(damage, spelltype){
        if(spelltype == this.counterType){
            this.life -= damage*1.5 - this.resistance;
        }else if(spelltype == this.type){
            this.life -= damage*0.25 - this.resistance;
        }else{
            this.life -= damage - this.resistance;
        }
        console.log(this.life);
        
    }

    chase(){
        if(this.alive == true){

            if(this.chasing > 0){
                this.chasing -= 1;
            }

            if (this.chasing == 0){
                this.body.setVelocityX(0);
            }
    
            // Retour spawn
            if (this.chasing == 0){
                if(this.x < this.origineX-1){
                    this.body.setVelocityX(this.speed);
                }
                if(this.x > this.origineX+1){
                    this.body.setVelocityX(this.speed*-1);
                }
            }
    
            if(this.life <= 0){
                this.alive = false;
                this.x = 0;
                this.y +=2000;
                this.detect.destroy();
            }
        } else {
            this.body.setVelocity(0,0);
        }
    }

    detection(a,b){
        if(b.x+20 < this.x && this.chasing > 0 ){
            this.left = true;
            this.body.setVelocityX(this.getSpeed()*-1);
        } else if(b.x-20 > this.x && this.chasing > 0){
            this.body.setVelocityX(this.getSpeed());
            this.left = false;
        }
        
        this.chasing = this.chasingCD;
        
    }

    update(time,delta){
        if(this.atkOn == true || this.dotDuration > 0){
            this.timer += delta/1000;
            if(this.timer > 1){
                if(this.atkTimer > 0){this.atkTimer -= 1}
                if(this.dotDuration > 0){
                    this.dotDuration -= 1;
                    this.life -= this.dot;
                    console.log(this.life);
                }
                this.timer = 0;
            }
        }
        
        

        this.detectPlacement();
        this.chase();
        this.attackPlacement();
    }
}