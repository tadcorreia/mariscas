
import { VideoManager } from './VideoManager.js';
import { StoryEngine } from './StoryEngine.js';
import { UIManager } from './UIManager.js';
import { Storage } from './Storage.js';

import './stories.js';

class App {
    video: VideoManager;
    ui: UIManager;
    engine: StoryEngine;

    constructor() {
        this.video = new VideoManager('v1', 'v2');
        this.ui = new UIManager();
        this.engine = new StoryEngine(this.video, this.ui);
        this.init();
    }

    init() {
        const save = Storage.load();
        this.ui.renderStoryList(
            (window as any).STORIES, 
            (id: string) => this.startNewGame(id),
            () => this.continueGame(save),
            !!save
        );
    }

    async startNewGame(storyId: string) {
        this.ui.hideMenu();
        await this.engine.startStory(storyId);
    }

    async continueGame(save: any) {
        this.ui.hideMenu();
        await this.engine.startStory(save.storyId, save);
    }

    async goBack() {
        await this.engine.goBack();
    }

    unlockAudio() {
        this.video.forceUnmute();
        this.ui.hideAutoplayGuard();
    }
}

(window as any).app = new App();
