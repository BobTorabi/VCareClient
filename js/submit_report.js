// Open the date selector for report submission
document.addEventListener("DOMContentLoaded", function () {
    // Set min and max dates for reportDate input (today to 7 days ago)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    document.getElementById("reportDate").max = today.toISOString().split("T")[0];
    document.getElementById("reportDate").min = lastWeek.toISOString().split("T")[0];
});

// Proceed to question step after selecting date
function proceedToQuestions() {
    const selectedDate = document.getElementById("reportDate").value;
    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }

    // Hide date selector and show questions section
    document.getElementById("dateSelector").classList.add("hidden");
    document.getElementById("questionsSection").classList.remove("hidden");

    // Mock API call to load questions
    loadQuestions();
}

function loadQuestions() {
    const questions = [
        { id: 1, question: "How are you feeling today?", options: ["Good", "Fair", "Poor"] },
        { id: 2, question: "Do you have any pain?", options: ["Yes", "No"] },
        { id: 3, question: "Are you experiencing shortness of breath?", options: ["Yes", "No"] },
        { id: 4, question: "Do you feel tired?", options: ["Yes", "No"] }
    ];
    
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = ""; // Clear any previous questions

    let currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex], questions.length);

    function showQuestion(question, totalQuestions) {
        questionContainer.innerHTML = "";
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<p>${question.question}</p>`;

        question.options.forEach(option => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "form-check";
            optionDiv.innerHTML = `
                <input type="radio" name="question${question.id}" value="${option}" class="form-check-input">
                <label class="form-check-label">${option}</label>
            `;
            optionDiv.querySelector("input").addEventListener("click", function() {
                currentQuestionIndex++;
                updateProgress(totalQuestions);
                if (currentQuestionIndex < totalQuestions) {
                    showQuestion(questions[currentQuestionIndex], totalQuestions);
                } else {
                    alert("Assessment completed!");
                }
            });
            questionDiv.appendChild(optionDiv);
        });

        questionContainer.appendChild(questionDiv);
    }

    // Initialize progress bar
    updateProgress(questions.length, true);
}

// Update progress bar based on answered questions
function updateProgress(totalQuestions, reset = false) {
    const progress = reset ? 0 : ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById("progress").style.width = progress + "%";
}
