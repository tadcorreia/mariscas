
import { VideoManager } from './VideoManager.js';
import { StoryEngine } from './StoryEngine.js';
import { UIManager } from './UIManager.js';
import { Storage } from './Storage.js';

class App {
    constructor() {
        this.video = new VideoManager('v-buf-1', 'v-buf-2');
        this.ui = new UIManager();
        this.engine = new StoryEngine(this.video, this.ui);
        
        this.init();
    }

    init() {
        const save = Storage.load();
        
        this.ui.renderStoryList(
            window.STORIES, 
            (id) => this.startNewGame(id),
            () => this.continueGame(save),
            !!save
        );

        document.getElementById('info-trigger').onclick = () => this.toggleInfo();
    }

    startNewGame(storyId) {
        this.ui.initialMenu.classList.add('hidden');
        this.engine.startStory(storyId);
    }

    continueGame(save) {
        this.ui.initialMenu.classList.add('hidden');
        this.engine.startStory(save.storyId, save);
    }

    unlockAudio() {
        this.video.forceUnmute();
        this.ui.hideAutoplayGuard();
    }

    resume() {
        this.ui.pauseMenu.classList.add('hidden');
    }

    restartScene() {
        this.engine.restartScene();
        this.resume();
    }

    exitToMenu() {
        location.reload();
    }

    toggleInfo() {
        this.ui.toggleInfo(this.engine.state);
    }
}

// Global exposure for HTML onclick handlers
window.app = new App();
