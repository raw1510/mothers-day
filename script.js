document.addEventListener('DOMContentLoaded', () => {
    // Screen Elements
    const screens = {
        1: document.getElementById('screen-1'),
        2: document.getElementById('screen-2'),
        3: document.getElementById('screen-3'),
        4: document.getElementById('screen-4'),
        5: document.getElementById('screen-5')
    };

    // Interactive Elements
    const envelope = document.getElementById('envelope');
    const btnPickFlowers = document.getElementById('btn-pick-flowers');
    const flowerCards = document.querySelectorAll('.flower-card');
    const btnReadLetter = document.getElementById('btn-read-letter');
    const btnRestart = document.getElementById('btn-restart');

    // State
    let pickedCount = 0;

    // Helper to switch screens
    function switchScreen(fromId, toId) {
        const fromScreen = screens[fromId];
        const toScreen = screens[toId];

        fromScreen.style.opacity = '0';
        
        setTimeout(() => {
            fromScreen.classList.remove('active');
            fromScreen.classList.add('hidden');
            
            toScreen.classList.remove('hidden');
            // Small delay to allow display:block to apply before animating opacity
            setTimeout(() => {
                toScreen.classList.add('active');
            }, 50);
        }, 600); // Matches CSS transition duration
    }

    // Screen 1: Open Envelope
    envelope.addEventListener('click', () => {
        envelope.classList.add('opening');
        setTimeout(() => {
            switchScreen(1, 2);
        }, 1200);
    });

    // Screen 2: Proceed to Flower Picking
    btnPickFlowers.addEventListener('click', () => {
        switchScreen(2, 3);
    });

    // Screen 3: Pick Flowers
    flowerCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('picked')) {
                this.classList.add('picked');
                pickedCount++;

                // If all 3 are picked, move to next screen after a delay
                if (pickedCount === 3) {
                    setTimeout(() => {
                        switchScreen(3, 4);
                    }, 3000); // 3 second delay to read the last message
                }
            }
        });
    });

    // Screen 4: Read Letter
    btnReadLetter.addEventListener('click', () => {
        switchScreen(4, 5);
    });

    // Screen 5: Start Again (Requested by User)
    btnRestart.addEventListener('click', () => {
        // Reset state
        pickedCount = 0;
        
        envelope.classList.remove('opening');
        
        flowerCards.forEach(card => {
            card.classList.remove('picked');
        });

        // Switch back to screen 1
        switchScreen(5, 1);
    });
});
