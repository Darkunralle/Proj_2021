//Auteur : Aymeric Magnier
//
//Projet jeu fin d'année

var config = {
    type: Phaser.AUTO,
    // Dimension
    width: 1920,
    height: 1080,
    backgroundColor: '#FFFFFF',
    // Moteur physique
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },

    scene: [Game]

    
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

var demon = null;
// Preload des assets

var spellBook = [];
