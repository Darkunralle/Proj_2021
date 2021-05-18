class character extends Phaser.Physics.Arcade.Sprite {

    constructor (_scene, _skin, _x, _y) {
        super (_scene,_skin, _x, _y)
        
        // PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // COLLISIONS
        this.body.collideWorldBounds = true;
        
    }
}