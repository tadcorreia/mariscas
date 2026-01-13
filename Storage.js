
class Storage {
    static KEY = 'POV_STORY_SAVE';

    static save(data) {
        localStorage.setItem(this.KEY, JSON.stringify({
            ...data,
            timestamp: Date.now()
        }));
    }

    static load() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : null;
    }

    static clear() {
        localStorage.removeItem(this.KEY);
    }
}
