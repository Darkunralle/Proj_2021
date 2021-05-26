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

class SpecialSpell extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene,skin,x,y){
        super(scene,skin,x,y);

        this.damage = 1;
        this.type = null;
        this.cd = 2;
        this.manaCost = 0;

        this.timer = 0;

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

class Immolate extends SpecialSpell {

    constructor(scene,x,y){
        super(scene,x,y,'immolate');

        this.dot = 5;
        this.dotDuration = 5;
        this.damage = 10;
        this.type = "fire";

        this.manaCost = 20;
    }

    update(time, delta){
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

class ConeOfCold extends SpecialSpell {

    constructor(scene,x,y){
        super(scene,x,y,'coneOfCold');

        this.damage = 20;
        this.type = "frost";

        this.cd = 8;

        this.range = scene.physics.add.image();
        this.range.body.setAllowGravity(false);
        this.range.body.setSize(128,96);

        this.activate = false;

        scene.physics.add.overlap(this.range,demon,this.ConeDamage, null, this);
    }

    ConeDamage(spell, target){
        if(this.activate == true){
            target.setLife(this.damage,this.type);
            this.activate = false;
        }
    }

    update(time, delta){
        if (leftBool == true){
            this.range.x = newPlayer.x-64;
            this.range.y = newPlayer.y;
        }else{
            this.range.x = newPlayer.x+64;
            this.range.y = newPlayer.y;
        }

        if(this.activate == true){
            this.timer += delta/1000;
            if(this.timer > 2){
                this.activate = false; 
                this.timer = 0;
            }
        }
    }
}

class FrostShield extends SpecialSpell {

    constructor(scene,x,y){
        super(scene,x,y,'frostShield');

        this.type = "frost";
        this.damage = 0;

        this.cd = 30;
        this.durationMax = 60;
        this.duration = 0;

        this.res = 5;
        this.charge = 5;

    }

    refreshDuration(){
        this.duration = this.durationMax;
        this.charge = 5;
    }

    update(time, delta){
        if(this.duration > 0 ){
            this.timer += delta/1000;
            if(this.timer > 1){
                this.duration -= 1
                this.timer = 0;
            }
        }
    }
}

// Arcane Spell
class ArcaneShoot extends Spell {
    constructor(scene,mouse,x,y){
        super(scene,x,y,'arcaneShoot');

        this.damage = 15;
        this.type = "arcane";
        this.cd = 2;
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
        this.body.setSize(16,16);

        this.timer = 0;
        
    }

    update(time, delta){

        if(this.body.onWall()|| this.body.onCeiling()|| this.body.onFloor()){
            this.destroy();

        }else{
            this.timer += delta/1000;
            if(this.timer > 2){
                this.body.setSize(32,32);
                this.timer = 0;
        }
    }
    }
}

class Nova extends SpecialSpell {
    constructor(scene,x,y){
        super(scene,x,y,);

        this.damage = 20;
        this.type = "arcane";
        this.cd = 5;

        this.manaCost = 25;

        this.range = scene.physics.add.image();
        this.range.body.setAllowGravity(false);
        this.range.body.setSize(128,128);

        this.activate = false;
        scene.physics.add.overlap(this.range,demon,this.novaDamage, null, this);
        
    }

    novaDamage(zone, target){
        if(this.activate == true){
            target.setLife(this.damage,this.type);
            this.activate = false;
        }
    }

    update(time, delta){
        this.range.x = newPlayer.x;
        this.range.y = newPlayer.y;

        if(this.activate == true){
            this.timer += delta/1000;
            if(this.timer > 2){
                this.activate = false; 
                this.timer = 0;
            }
        }
        
    }
}
