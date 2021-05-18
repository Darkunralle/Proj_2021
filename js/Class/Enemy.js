class ennemy extends character{
    constructor(scene, _x ,_y,targetPlayer){
        super(scene, _x, _y, 'EnemyPlayerModel' );

        this.detect = scene.physics.add.image();
        this.detect.body.setAllowGravity(false);
        this.detect.setDebugBodyColor(0xffff00);

        this.detect.body.setSize(400,400);


        this.chasingCD = 180;
        this.chasing = 0

        this.origineX = this.x; 
        this.origineY = this.y; 
        
        scene.physics.add.overlap(this.detect,targetPlayer,this.detection, null, this);

        this.life = 100;

        this.alive = true;


        

    }

    detectPlacement(){
        this.detect.x = this.x;
        this.detect.y = this.y-185;
    }

    setLife(value){
        this.life -= value;
    }

    update(){
        this.detectPlacement();

        if(this.alive == true){

            // Gestion de l'aggro -> faire une fonction pour tt sa  

            if(this.chasing > 0){
                this.chasing -= 1;
            }

            if (this.chasing == 0){
                this.body.setVelocityX(0);
            }
    
            // Retour spawn
            if (this.chasing == 0){
                if(this.x < this.origineX-1){this.body.setVelocityX(80);}
                if(this.x > this.origineX+1){this.body.setVelocityX(-80);}
            }
    
            if(this.life <= 0){
                this.alive = false;
            }
        } else {
            this.body.setVelocity(0,0);
        }
        
        
        

    }

    detection(a,b){
        if(b.x+20 < this.x && this.chasing > 0 ){
            this.body.setVelocityX(-80);
        } else if(b.x-20 > this.x && this.chasing > 0){
            this.body.setVelocityX(80);
        }
        
        this.chasing = this.chasingCD;
        
    }


}