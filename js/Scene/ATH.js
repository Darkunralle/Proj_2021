class ATH extends Phaser.Scene{

    constructor(){
        super("ATH");

        
    }

    preload(){
    }

    create(){
        this.scene.launch('Game');
    }

    update(time, delta){
    }
}