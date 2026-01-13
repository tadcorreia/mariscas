
class VideoManager {
    constructor(v1Id, v2Id) {
        this.buffers = [
            document.getElementById(v1Id),
            document.getElementById(v2Id)
        ];
        this.activeIndex = 0;
        this.isTransitioning = false;
        
        // Configurar CORS
        this.buffers.forEach(b => {
            b.crossOrigin = 'anonymous';
        });
    }

    async play(url) {
        if (!url) return;
        
        const activeBuffer = this.buffers[this.activeIndex];
        const nextIndex = (this.activeIndex + 1) % 2;
        const nextBuffer = this.buffers[nextIndex];

        if (activeBuffer.src === url) {
            activeBuffer.play().catch(() => {});
            return;
        }

        this.isTransitioning = true;
        
        return new Promise((resolve) => {
            // Timeout se o vídeo não carregar em 3 segundos
            const timeout = setTimeout(() => {
                console.warn(`Vídeo não carregou: ${url}`);
                this.isTransitioning = false;
                // Mesmo sem vídeo, faz a transição
                nextBuffer.className = 'v-visible';
                activeBuffer.className = 'v-hidden';
                setTimeout(() => {
                    activeBuffer.pause();
                    this.activeIndex = nextIndex;
                    resolve();
                }, 500);
            }, 3000);

            nextBuffer.src = url;
            nextBuffer.crossOrigin = 'anonymous';

            const onCanPlay = async () => {
                clearTimeout(timeout);
                nextBuffer.removeEventListener('canplay', onCanPlay);
                nextBuffer.removeEventListener('error', onError);
                
                try {
                    await nextBuffer.play();
                } catch(e) {
                    console.warn('Erro ao reproduzir vídeo:', e);
                }

                nextBuffer.className = 'v-visible';
                activeBuffer.className = 'v-hidden';

                setTimeout(() => {
                    activeBuffer.pause();
                    this.activeIndex = nextIndex;
                    this.isTransitioning = false;
                    resolve();
                }, 500);
            };

            const onError = () => {
                console.warn(`Erro ao carregar vídeo: ${url}`);
                clearTimeout(timeout);
                nextBuffer.removeEventListener('canplay', onCanPlay);
                nextBuffer.removeEventListener('error', onError);
                this.isTransitioning = false;
                resolve();
            };

            nextBuffer.addEventListener('canplay', onCanPlay, { once: true });
            nextBuffer.addEventListener('error', onError, { once: true });
            nextBuffer.load();
        });
    }

    forceUnmute() {
        this.buffers.forEach(b => {
            b.muted = false;
            b.play().catch(() => {});
        });
    }
}
