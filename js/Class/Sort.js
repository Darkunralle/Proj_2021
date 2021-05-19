class Spell extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene,skin,x,y){
        super(scene,skin,x,y);

        // PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // COLLISIONS
        this.body.collideWorldBounds = true;
        this.body.setAllowGravity(false);

        this.damage = 1;
        this.type = null;
        this.cd = 2;
        this.manaCost = 0;

    }
}

// Fire Spell

class Fireball extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'fireball');

        this.damage = 10;
        this.type = "fire";

        this.scene.physics.moveToObject(this, mouse, 250);
    }

    update(){
        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();
        }
    }
}


class Pyroblast extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'pyroblast');

        this.damage = 50;
        this.type = "fire";

        this.manaCost = 50;

        this.scene.physics.moveToObject(this, mouse, 300);
    }

    update(){
        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();
        }
    }
}

class Immolate extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'immolate');

        this.damage = 10;
        this.type = "fire";

        this.manaCost = 20;
    }

    update(){
    }
}

// Frost Spell
class Icebolt extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'icebolt');

        this.damage = 10;
        this.type = "frost";

        this.scene.physics.moveToObject(this, mouse, 300);
    }

    update(){
        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();
        }
    }
}

class ConeOfCold extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'coneOfCold');

        this.damage = 10;
        this.type = "frost";

        this.scene.physics.moveToObject(this, mouse, 300);
    }

    update(){
    }
}

class FrostShield extends Spell {

    constructor(scene,mouse,x,y){
        super(scene,x,y,'frostShield');

        this.type = "frost";

        this.damage = 10;
        this.cd = 30;
        this.duration = 60;
        this.res = 10;
        this.charge = 10;

    }

    update(){
    }
}

// Arcane Spell
class ArcaneShoot extends Spell {
    constructor(scene,mouse,x,y){
        super(scene,x,y,'arcaneShoot');

        this.damage = 30;
        this.type = "arcane";
        this.cd = 5;
        this.scene.physics.moveToObject(this, mouse, 100);
        
    }

    update(){

        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();

        }
    }
}

class ArcaneOrb extends Spell {
    constructor(scene,mouse,x,y){
        super(scene,x,y,'ArcaneOrb');

        this.damage = 30;
        this.type = "arcane";
        this.cd = 5;
        this.scene.physics.moveToObject(this, mouse, 100);
        
    }

    update(){

        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();

        }
    }
}

class Nova extends Spell {
    constructor(scene,mouse,x,y){
        super(scene,x,y,'nova');

        this.damage = 30;
        this.type = "arcane";
        this.cd = 5;
        
    }

    update(){
    }
}
