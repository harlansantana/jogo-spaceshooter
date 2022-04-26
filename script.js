const yourship = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area0');
const aliensIng = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const starButton = document.querySelector('.star-button');
let aliensInterval;

//movimento e tiro da nave
function flyhip(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDwon();
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de subir 
function moveUp() {
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if (topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourship.style.top = `${position}px`;
    }
}

//função de descer
function moveDwon() {
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if (topPosition === "510") {
        return

    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourship.style.top = `${position}px`;
    }

}

//funcionalidade de tiro
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    movelaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourship).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourship).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function movelaser(laser) { //comparando se cada alien foi atingido,se sim,troca o src da imagem
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAli('.alien');

        aliens.forEach((alien) => {
            if (checklaserCollision(laser, alien)) {
                alien.scr = 'img/explosion.pmg';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if (xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);

}

//fumção para criar inimigos aleatórios
function createALiens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imag
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = '${Math.floor(Math.randon() * 330) + 30}px';
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função para movimentar os inimigos 
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if (xPosition <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = '${xPosition - 4}px';
        }
    }, 30);
}

//função para colião
function checklaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserleft = parseInt(laser.style.top);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.top);
    let aLienBottom = alienTop - 30;
    if (laserLeft != 340 && laserleft + 40 >= alienLeft) {
        if (laserTop => alienTop && laserTop >= aLienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//inicio do jogo
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    starButton.style.display = 'nome';
    instructionsText.style.display = 'nome';
    window.addEventListener('keydown', flyShip);
    aliensInterval = setInterval(() => {
        createALiens();
    }, 2000);

}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(aliensInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourship.style.top = "250px";
        starButton.style.display = "black";
        instructionsText.style.display = "black";
    });
}

