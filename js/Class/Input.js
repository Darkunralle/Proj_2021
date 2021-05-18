class inputs {
    
    constructor (scene) {
        
        // CTRL 1
        this.key_1_UP = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_1_LEFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_1_DOWN = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_1_RIGHT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_1_SPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key_1_DASH = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.key_1_A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_1_E = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_1_R = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        // CTRL MANETTE
        
        // CONFIG
        this.playerConfig = [
            [this.key_1_UP,this.key_1_DOWN,this.key_1_LEFT,this.key_1_RIGHT,this.key_1_SPACE,this.key_1_DASH,this.key_1_A,this.key_1_E,this.key_1_R]
        ];  
    } 
}