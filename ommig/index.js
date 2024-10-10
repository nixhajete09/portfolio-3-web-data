

const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Skift til Lys Mode';
    } else {
        toggleButton.textContent = 'Skift til Mørk Mode';
    }
});

