
window.STORIES = {
    'odisseia': {
        title: "Começar",
        initialScene: 'intro',
        initialState: { explored: 0 },
        scenes: {
            'intro': {
                speaker: "SISTEMA",
                text: "Estás a sair de casa e a tua mulher pergunta-te a que horas voltas. O que respondes?",
                backgroundVideo: "./videos/video_1_som.mp4",
                choices: [
                    { text: "Mor é só jantar, venho cedo...", nextSceneId: 'corridor' },
                    { text: "Volto às 5 da manhã, vamos jantar e às putas", nextSceneId: 'chamber' },
                    { text: "volto às onze, pode ser?", nextSceneId: 'corridor' }
                ]
            },
            'corridor': {
                speaker: "VOCÊ",
                text: "Vais na autoestrada, o telemovel toca e vês que é o mariscas a ligar.Atendes e ele pergubta-te se queres boleia. O que fazes?",
                backgroundVideo: "./videos/video2.mp4",
                choices: [
                    { text: "És inocente e aceitas a boleia", nextSceneId: 'final' },
                    { text: "Recusas e continuas o teu caminho ", nextSceneId: 'chamber' },
                    { text: "Aceitas e sabes que não vais chegar cedo", nextSceneId: 'intro' }
                ]
            },
            'chamber': {
                speaker: "ECO",
                text: "Uma câmara vasta se abre à sua frente. O som das suas pegadas ecoa infinitamente pelas paredes metálicas.",
                backgroundVideo: "./videos/video1.mp4",
                choices: [
                    { text: "Aproximar-se do centro", nextSceneId: 'center' },
                    { text: "Subir pelas escadas", nextSceneId: 'stairs' }
                ]
            },
            'center': {
                speaker: "SUSSURRO",
                text: "No coração da câmara, uma luz estranha pulsa. Hipnotizante. Impossível olhar para outro lado.",
                backgroundVideo: "videos/cena4.mp4",
                choices: [
                    { text: "Tocar na luz", nextSceneId: 'final' },
                    { text: "Afastar-se", nextSceneId: 'stairs' }
                ]
            },
            'stairs': {
                speaker: "VENTO",
                text: "Subindo, sempre subindo. O ar fica mais frio. Lá em cima, há uma saída. Ou será uma armadilha?",
                backgroundVideo: "videos/cena5.mp4",
                choices: [
                    { text: "Continuar subindo", nextSceneId: 'final' },
                    { text: "Descer de volta", nextSceneId: 'chamber' }
                ]
            },
            'final': {
                speaker: "SUSSURRO",
                text: "Você alcança a borda do que conhece. O que vem a seguir não pode ser descrito, apenas sentido.",
                backgroundVideo: "videos/cena6.mp4",
                choices: [
                    { text: "Recomeçar", nextSceneId: 'intro' }
                ]
            }
        }
    }
};
