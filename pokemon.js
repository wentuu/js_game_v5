class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors }) {
        super(selectors);
        this.name = name;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.type = type;

        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = `${this.damageHP}%`;
        
        const percent = (this.damageHP / this.defaultHP) * 100;
        if (percent < 60 && percent > 20) {
            this.elProgressbar.style.backgroundColor = 'orange';
        } else if (percent <= 20) {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    }

    changeHP = (count, cb) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }

        this.renderHP();
        cb && cb(count);
    }
}

export default Pokemon;