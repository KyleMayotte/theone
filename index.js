document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to my personal website!");

    // Example: Click event for future interactivity
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            console.log(`Navigating to ${link.textContent}`);
        });
    });
});
