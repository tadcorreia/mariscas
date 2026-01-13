class App {
    constructor() {
        this.video = new VideoManager('v1', 'v2');
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
    }

    async startNewGame(storyId) {
        this.ui.hideMenu();
        await this.engine.startStory(storyId);
    }

    async continueGame(save) {
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

window.app = new App();
