//Auteur : Aymeric Magnier
//
//Projet jeu fin d'année

var config = {
    type: Phaser.AUTO,
    // Dimension
    width: 1280,
    height: 720,
    backgroundColor: '#FFFFFF',
    // Moteur physique
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },

    scene: [ATH,Game]

    
};


var game = new Phaser.Game(config);


//Déclaration variables
//Joueur
var _Player = null;
//Tiled
var map;
var tilesetTest;
//Plateform with tiled
var LayerOne;

var demon;
// Preload des assets

var spellBook = [];

var newPlayer;

// Sort sans projectile
var specialSpell = [];

// Donne la direction du joueur
var leftBool = false;