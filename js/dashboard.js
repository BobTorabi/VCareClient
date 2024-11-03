// JavaScript for Dashboard Page

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user's first name from localStorage and display it in the header
    const firstName = localStorage.getItem("firstName") || "User";
    document.getElementById("userFirstName").textContent = firstName;
    document.getElementById("userWelcome").textContent = `Welcome, ${firstName}`;

    // Display current date
    document.getElementById("currentDate").textContent = new Date().toLocaleDateString();
});

// Toggle Slide Menu
function toggleMenu() {
    const menu = document.getElementById("slideMenu");
    menu.classList.toggle("open");
}

// View report details (Placeholder function)
function viewReportDetail(reportId) {
    alert(`Viewing details for report ID: ${reportId}`);
}

// Open the Submit Report page
function openSubmitReport() {
    window.location.href = 'submit_report.html';
} 

// Close the slide menu when clicking outside of it
document.addEventListener("click", function(event) {
    const menu = document.getElementById("slideMenu");
    const isClickInsideMenu = menu.contains(event.target);
    const isHamburgerButton = event.target.classList.contains("hamburger-menu");
    if (!isClickInsideMenu && !isHamburgerButton && menu.classList.contains("open")) {
        toggleMenu();
    }
});