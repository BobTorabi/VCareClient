let currentQuestionIndex = 0;
const questions = [
    { id: 1, question: "How are you feeling today?", options: ["Good", "Fair", "Poor"] },
    { id: 2, question: "Do you have any pain?", options: ["Yes", "No"] },
    { id: 3, question: "Are you experiencing shortness of breath?", options: ["Yes", "No"] },
    { id: 4, question: "Do you feel tired?", options: ["Yes", "No"] }
];

document.addEventListener("DOMContentLoaded", function () {
    // Set min and max dates for reportDate input (today to 7 days ago)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    document.getElementById("reportDate").max = today.toISOString().split("T")[0];
    document.getElementById("reportDate").min = lastWeek.toISOString().split("T")[0];
});

function proceedToQuestions() {
    const selectedDate = document.getElementById("reportDate").value;
    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }

    // Hide date selector and show questions section
    document.getElementById("dateSelector").classList.add("hidden");
    document.getElementById("questionsSection").classList.remove("hidden");

    // Load the first question
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    const questionData = questions[index];
    document.getElementById("questionText").textContent = questionData.question;

    const optionContainer = document.getElementById("optionContainer");
    optionContainer.innerHTML = ""; // Clear previous options

    questionData.options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.textContent = option;
        optionDiv.addEventListener("click", () => {
            document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
            optionDiv.classList.add("selected");
            document.getElementById("nextQuestionBtn").classList.remove("hidden");
            document.getElementById("previousQuestionBtn").classList.remove("hidden");
        });
        optionContainer.appendChild(optionDiv);
    });

    // Adjust button alignment
    document.getElementById("buttonsContainer").classList.remove("hidden");
}

function loadNextQuestion() {
    currentQuestionIndex++;
    updateProgress();
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
        document.getElementById("nextQuestionBtn").classList.add("hidden");
    } else {
        if (confirm("Are you sure to submit your report?")) {
            alert("Thank you for submitting your report!");
            window.location.href = "dashboard.html";
        }
    }
}

function loadPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgress();
        loadQuestion(currentQuestionIndex);
        document.getElementById("nextQuestionBtn").classList.add("hidden");
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress").style.width = progress + "%";
}