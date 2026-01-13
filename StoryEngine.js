
class StoryEngine {
    constructor(videoManager, uiManager) {
        this.video = videoManager;
        this.ui = uiManager;
        this.currentStory = null;
        this.storyId = null;
        this.state = {};
        this.currentSceneId = null;
        this.history = []; // Pilha de IDs de cena e estados
    }

    async startStory(storyId, resumeData = null) {
        this.storyId = storyId;
        this.currentStory = window.STORIES[storyId];
        this.history = [];
        
        if (resumeData && resumeData.storyId === storyId) {
            this.state = resumeData.state;
            this.history = resumeData.history || [];
            await this.goToScene(resumeData.currentSceneId, true);
        } else {
            this.state = JSON.parse(JSON.stringify(this.currentStory.initialState));
            await this.goToScene(this.currentStory.initialScene, true);
        }
    }

    async goToScene(sceneId, immediate = false, isBacktracking = false) {
        const scene = this.currentStory.scenes[sceneId];
        if (!scene) return;

        // Se não for volta, guarda a cena atual no histórico
        if (!isBacktracking && this.currentSceneId) {
            this.history.push({
                sceneId: this.currentSceneId,
                state: JSON.parse(JSON.stringify(this.state))
            });
        }

        this.currentSceneId = sceneId;
        
        // Começar a carregar o vídeo, mas não esperar
        if (scene.backgroundVideo) {
            this.video.play(scene.backgroundVideo).catch(() => {});
        }

        if (scene.onEnter && !isBacktracking) scene.onEnter(this.state);

        this.ui.renderScene(scene, this.state, (choice) => this.handleChoice(choice));
        this.ui.updateBackButton(this.history.length > 0);
        
        Storage.save({
            storyId: this.storyId,
            currentSceneId: this.currentSceneId,
            state: this.state,
            history: this.history
        });
    }

    async goBack() {
        if (this.history.length === 0) return;
        const last = this.history.pop();
        this.state = last.state;
        await this.goToScene(last.sceneId, false, true);
    }

    async handleChoice(choice) {
        if (choice.onSelect) choice.onSelect(this.state);
        if (choice.nextSceneId) {
            await this.goToScene(choice.nextSceneId);
        }
    }
}
