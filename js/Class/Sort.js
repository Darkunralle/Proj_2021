class Fireball extends Phaser.Physics.Arcade.Sprite {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'fireball');

        // PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // COLLISIONS
        this.body.collideWorldBounds = true;
        this.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this, mouse, 300);

    }

    getCd(){return this.cd;}

    update(){
        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();
        }


    }


}

class ArcaneOrb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,mouse,x,y){
        super(scene,x,y,'fireball');

        // PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // COLLISIONS
        this.body.collideWorldBounds = true;
        this.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this, mouse, 100);

        this.taille = 8;

        this.body.setSize(this.taille,this.taille);

    }

    getCd(){return this.cd;}

    update(){

        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();

        }

        


    }


}