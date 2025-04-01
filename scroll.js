document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.hidden'); // Select all hidden elements

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 }); // Lowered from 0.3 to 0.2
    
    elements.forEach(element => observer.observe(element));
});
