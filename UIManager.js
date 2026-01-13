
class UIManager {
    constructor() {
        this.uiLayer = document.getElementById('ui-layer');
        this.narrativeEl = document.getElementById('narrative');
        this.speakerEl = document.getElementById('speaker');
        this.choicesEl = document.getElementById('choices');
        this.initialMenu = document.getElementById('initial-menu');
        this.autoplayGuard = document.getElementById('autoplay-guard');
        this.storyList = document.getElementById('story-list');
        this.backNav = document.getElementById('back-nav');

        this.currentChoices = [];
        this.setupKeyboard();
    }

    renderScene(scene, state, onChoice) {
        this.uiLayer.style.opacity = '0';
        this.uiLayer.style.transform = 'translateY(8px)';
        
        setTimeout(() => {
            this.narrativeEl.textContent = scene.text;
            this.speakerEl.textContent = scene.speaker || 'POV';
            this.choicesEl.innerHTML = '';
            this.currentChoices = scene.choices;

            scene.choices.forEach((choice, i) => {
                const li = document.createElement('li');
                li.className = 'choice-item';
                li.innerHTML = `<span class="choice-number">${i + 1}</span> <span>${choice.text}</span>`;
                
                li.addEventListener('click', () => onChoice(choice));
                this.choicesEl.appendChild(li);
            });

            this.uiLayer.style.opacity = '1';
            this.uiLayer.style.transform = 'translateY(0)';
        }, 600);
    }

    updateBackButton(visible) {
        if (visible) this.backNav.classList.remove('hidden');
        else this.backNav.classList.add('hidden');
    }

    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            const key = parseInt(e.key);
            if (key >= 1 && key <= this.currentChoices.length) {
                const el = this.choicesEl.children[key - 1];
                if (el) el.click();
            }
        });
    }

    renderStoryList(stories, onSelect, onContinue, hasSave) {
        this.storyList.innerHTML = '';
        
        Object.keys(stories).forEach(id => {
            const btn = document.createElement('button');
            btn.className = 'btn-menu';
            btn.textContent = stories[id].title;
            btn.onclick = () => onSelect(id);
            this.storyList.appendChild(btn);
        });

        if (hasSave) {
            const btn = document.createElement('button');
            btn.className = 'btn-menu';
            btn.style.color = '#fbbf24';
            btn.textContent = 'Retomar Jornada';
            btn.onclick = onContinue;
            this.storyList.appendChild(btn);
        }
    }

    hideMenu() {
        this.initialMenu.style.opacity = '0';
        setTimeout(() => this.initialMenu.classList.add('hidden'), 1500);
    }

    showAutoplayGuard() { this.autoplayGuard.classList.remove('hidden'); }
    hideAutoplayGuard() { this.autoplayGuard.classList.add('hidden'); }
}
