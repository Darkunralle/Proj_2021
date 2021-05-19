class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,skin,x,y){
        super(scene,skin,x,y);

        // PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // COLLISIONS
        this.body.collideWorldBounds = true;


    }
}