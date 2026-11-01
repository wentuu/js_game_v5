import Pokemon from './pokemon.js';
import { random, generateLog } from './utils.js';

const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-second-kick');

// Створюємо екземпляри покемонів за допомогою класу Pokemon
const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 100,
    type: 'electric',
    selectors: 'character'
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 100,
    type: 'fire',
    selectors: 'enemy'
});

// Функція замикання для ліміту кліків на кнопках
const countClicks = (max = 6, elButton, defaultText) => {
    let counter = max;
    return () => {
        if (counter > 0) {
            counter--;
            if (elButton) {
                elButton.innerText = `${defaultText} (${counter})`;
            }
        }
        
        if (counter === 0) {
            elButton.disabled = true;
        }
        return counter;
    };
};

const countBtn1 = countClicks(6, $btn, 'Thunder Jolt');
const countBtn2 = countClicks(6, $btn2, 'Super Attack');

$btn.addEventListener('click', function () {
    countBtn1();
    
    player1.changeHP(random(20), function (count) {
        const $logs = document.querySelector('#logs');
        const logText = generateLog(player2, player1, count);
        const $p = document.createElement('p');
        $p.innerText = logText;
        $logs.insertBefore($p, $logs.children[0]);
    });

    player2.changeHP(random(20), function (count) {
        const $logs = document.querySelector('#logs');
        const logText = generateLog(player1, player2, count);
        const $p = document.createElement('p');
        $p.innerText = logText;
        $logs.insertBefore($p, $logs.children[0]);
    });
});

if ($btn2) {
    $btn2.addEventListener('click', function () {
        countBtn2();

        player1.changeHP(random(35), function (count) {
            const $logs = document.querySelector('#logs');
            const logText = generateLog(player2, player1, count);
            const $p = document.createElement('p');
            $p.innerText = logText;
            $logs.insertBefore($p, $logs.children[0]);
        });

        player2.changeHP(random(35), function (count) {
            const $logs = document.querySelector('#logs');
            const logText = generateLog(player1, player2, count);
            const $p = document.createElement('p');
            $p.innerText = logText;
            $logs.insertBefore($p, $logs.children[0]);
        });
    });
}

console.log('Start Game!');