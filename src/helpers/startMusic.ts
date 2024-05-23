const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement;

const startMusic = () => {
    backgroundMusic.volume = 0.4; 
    backgroundMusic.play().catch((error: Error) => {
        console.error("Error playing background music:", error);
    });
}

export default startMusic;

