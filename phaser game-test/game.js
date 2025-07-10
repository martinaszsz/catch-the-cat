const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 593,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

var cesto; //cesto
let cursors;
var platforms;
var gatos;
var score = 0;
var scoreText;
var gameOver = false;
var timerText;
var timerLeft = 60;
var endGameText;
var pepinos;


function preload() {
  
    this.load.image('fundo', 'https://thebluerat.files.show/Group18.png');  
    this.load.image('ground', 'https://thebluerat.files.show/ground11.png');
    this.load.image('gatos', 'https://thebluerat.files.show/laranja.png');
    this.load.image('gatos2','https://thebluerat.files.show/pink.png')
    this.load.image('cesto', 'https://thebluerat.files.show/cesto.png');
    this.load.image('pepinos', 'https://thebluerat.files.show/bombkat.png');
    this.load.image('YOU LOSE', 'https://thebluerat.files.show/youlose.png');
    this.load.image('YOU WIN', 'https://thebluerat.files.show/you win.png');
}

function create() {
    // Fundo
    this.add.image(400, 250, 'fundo');
    
   // Plataforma

    platforms = this.physics.add.staticGroup();
    platforms.create(300, 550, 'ground').setScale(2).refreshBody();

    // Personagem
    cesto = this.physics.add.sprite(100, 300, 'cesto').setScale(0.2);
    cesto.setCollideWorldBounds(true);
    cesto.setBounce(0.2);
   

    cursors = this.input.keyboard.createCursorKeys();


    gatos = this.physics.add.group();
    this.time.addEvent({ delay: 1000, callback: soltarGato, callbackScope: this, loop: true });
    pepinos = this.physics.add.group();
    this.time.addEvent({ delay: 2000, callback: SoltarPepino, callbackScope: this, loop: true });

 
     // Colisão entre o cesto e os gatos
     this.physics.add.overlap(cesto, gatos, pegarGato, null, this);
     this.physics.add.overlap(cesto, pepinos, pegarPepino, null, this);

     // Score
     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });



     
     this.time.addEvent({ delay: 1000, callback: youWin, callbackScope: this, loop: true });

    // Adicionando física
    this.physics.add.collider(cesto, platforms);
    this.physics.add.collider(pepinos, cesto);
    }

// FUNÇÕES


function update() {

      if (gameOver) {
        return;
    }

   if (cursors.left.isDown) {
        cesto.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        cesto.setVelocityX(300);
    } else {
        cesto.setVelocityX(0);
    }



}


function soltarGato(){
         
        let x = Phaser.Math.Between(50, 750);
      
        let gato = gatos.create(x, 0, 'gatos');
        gato.setDisplaySize(130, 130);
        gato.setVelocityY(280);

        let gato2 = gatos.create(x, 0, 'gatos2');
        gato2.setDisplaySize(130, 130);   
       
        
}


function SoltarPepino() {
 
    let x = Phaser.Math.Between(50, 750);
    let pepino = pepinos.create(x, 0, 'pepinos');
    
    pepino.setDisplaySize(160, 145);
    pepino.setVelocityY(250);
}

function pegarGato(cesto, gato){
    gato.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}



function pegarPepino(cesto, pepino){
    pepino.destroy();
    gameOver = true;
    /*this.add.text(250, 250, 'YOU LOSE', { fontSize: '64px', fill: '#f00' });*/
    this.add.image(400, 300, 'YOU LOSE');
    
    this.physics.pause();
    this.time.removeAllEvents();
    
}



function youWin (){
    gameOver = false;
    if (score >= 500) {
        this.add.image(400, 300, 'YOU WIN');
        this.physics.pause();
        this.time.removeAllEvents();
      
    }

}