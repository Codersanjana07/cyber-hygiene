// ==========================================
// CYBER HYGIENE ASSESSMENT
// APP.JS
// ==========================================


// ==========================================
// USER DATA
// ==========================================

let userData = {
    name: "",
    role: "",
    passwordStrength: "Not Checked",
    spamStatus: "Not Checked",
    score: 0,
    rawScore: 0
};


// ==========================================
// ADMIN CODE
// ==========================================

const ADMIN_CODE = "ADMIN123";


// ==========================================
// QUIZ QUESTIONS
// ==========================================

const quizQuestions = [

    {
        question: "What makes a password stronger?",
        options: [
            "Using your name",
            "Using a long unique password",
            "Using 123456",
            "Using your birthday"
        ],
        answer: 1
    },

    {
        question: "What should you do with a suspicious email link?",
        options: [
            "Click immediately",
            "Forward it to everyone",
            "Avoid clicking and verify it",
            "Reply with your password"
        ],
        answer: 2
    },

    {
        question: "What does 2FA provide?",
        options: [
            "An additional security layer",
            "Free internet",
            "Faster downloads",
            "More storage"
        ],
        answer: 0
    },

    {
        question: "Should you share your password with friends?",
        options: [
            "Yes",
            "Only online",
            "No",
            "Always"
        ],
        answer: 2
    },

    {
        question: "Which is safer on public Wi-Fi?",
        options: [
            "Entering sensitive information everywhere",
            "Using trusted secure connections",
            "Sharing passwords",
            "Disabling all security"
        ],
        answer: 1
    },

    {
        question: "What should you do if an account is compromised?",
        options: [
            "Ignore it",
            "Change password and secure the account",
            "Share the password",
            "Delete your computer"
        ],
        answer: 1
    },

    {
        question: "Why are software updates important?",
        options: [
            "They can fix security vulnerabilities",
            "They remove the internet",
            "They reduce security",
            "They delete all files"
        ],
        answer: 0
    },

    {
        question: "What is phishing?",
        options: [
            "A type of cyber scam",
            "A computer game",
            "A password manager",
            "An antivirus"
        ],
        answer: 0
    },

    {
        question: "Where should sensitive files be stored?",
        options: [
            "Anywhere public",
            "In a trusted secure location",
            "On random websites",
            "In public comments"
        ],
        answer: 1
    },

    {
        question: "Should you verify unexpected payment requests?",
        options: [
            "Yes",
            "No",
            "Never",
            "Only after paying"
        ],
        answer: 0
    },

    {
        question: "What is a good practice for passwords?",
        options: [
            "Reuse one password everywhere",
            "Use unique passwords",
            "Use only your name",
            "Use only numbers"
        ],
        answer: 1
    },

    {
        question: "What should you do before downloading unknown files?",
        options: [
            "Verify the source",
            "Download immediately",
            "Disable antivirus",
            "Share it first"
        ],
        answer: 0
    },

    {
        question: "Which information should you avoid sharing publicly?",
        options: [
            "Sensitive personal information",
            "A favorite color",
            "A hobby",
            "A general interest"
        ],
        answer: 0
    },

    {
        question: "What is antivirus software used for?",
        options: [
            "Detecting and helping protect against malicious software",
            "Increasing screen size",
            "Making passwords public",
            "Deleting the internet"
        ],
        answer: 0
    },

    {
        question: "What is the safest response to an unexpected login alert?",
        options: [
            "Ignore it",
            "Verify the activity and secure the account if needed",
            "Share the alert publicly",
            "Give someone your password"
        ],
        answer: 1
    }

];


// ==========================================
// SHOW SECTION
// ==========================================

function showSection(sectionId) {

    const sections = [
        "home",
        "profile",
        "passwordScreen",
        "spamScreen",
        "quizScreen",
        "resultScreen",
        "adminLogin",
        "dashboard"
    ];

    sections.forEach(function(id) {

        const section = document.getElementById(id);

        if (section) {
            section.classList.add("hidden");
        }

    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// GO HOME
// ==========================================

function goHome() {
    showSection("home");
}


// ==========================================
// SELECT ROLE
// ==========================================

function selectRole(role) {

    userData.role = role;

    const roleBadge =
        document.getElementById("roleBadge");

    if (roleBadge) {
        roleBadge.textContent = role;
    }

    const username =
        document.getElementById("username");

    if (username) {
        username.value = "";
    }

    showSection("profile");
}


// ==========================================
// PROFILE → PASSWORD
// ==========================================

function nextToPassword() {

    const username =
        document.getElementById("username");

    if (!username) {
        return;
    }

    const name =
        username.value.trim();

    if (name.length < 2) {

        alert("Please enter your name.");

        username.focus();

        return;
    }

    userData.name = name;

    showSection("passwordScreen");
}


// ==========================================
// PASSWORD STRENGTH
// ==========================================

function checkPasswordStrength() {

    const passwordInput =
        document.getElementById("password");

    const result =
        document.getElementById("passwordResult");

    if (!passwordInput || !result) {
        return;
    }

    const password =
        passwordInput.value;

    if (!password) {

        userData.passwordStrength =
            "Not Checked";

        result.innerHTML =
            '<span class="error">Please enter a sample password.</span>';

        return;
    }


    let score = 0;


    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (score >= 5) {

        userData.passwordStrength = "Strong";

        result.innerHTML =
            '<span class="success">🟢 Strong password</span>';

    }

    else if (score >= 3) {

        userData.passwordStrength = "Medium";

        result.innerHTML =
            '<span class="warning">🟡 Medium password</span>';

    }

    else {

        userData.passwordStrength = "Weak";

        result.innerHTML =
            '<span class="error">🔴 Weak password</span>';

    }
}


// ==========================================
// PASSWORD → SPAM
// ==========================================

function nextToSpam() {

    const passwordInput =
        document.getElementById("password");

    if (
        !passwordInput ||
        !passwordInput.value
    ) {

        alert(
            "Please enter a sample password first."
        );

        return;
    }

    checkPasswordStrength();

    showSection("spamScreen");
}


// ==========================================
// SPAM NUMBER CHECK
// ==========================================

function checkSpam() {

    const phoneInput =
        document.getElementById("phone");

    const result =
        document.getElementById("spamResult");

    if (!phoneInput || !result) {
        return;
    }

    const phone =
        phoneInput.value.replace(/\D/g, "");


    if (!phone) {

        userData.spamStatus =
            "Not Checked";

        result.innerHTML =
            '<span class="error">Please enter a phone number.</span>';

        return;
    }


    let suspicious = false;


    if (phone.length < 10) {
        suspicious = true;
    }

    if (/^(\d)\1+$/.test(phone)) {
        suspicious = true;
    }

    if (phone.includes("1234567890")) {
        suspicious = true;
    }

    if (phone.includes("0987654321")) {
        suspicious = true;
    }


    if (suspicious) {

        userData.spamStatus =
            "Suspicious";

        result.innerHTML =
            '<span class="warning">⚠️ Suspicious pattern detected.</span>';

    }

    else {

        userData.spamStatus =
            "No Suspicious Pattern";

        result.innerHTML =
            '<span class="success">🟢 No suspicious pattern detected.</span>';

    }
}


// ==========================================
// SPAM → QUIZ
// ==========================================

function nextToQuiz() {

    const phoneInput =
        document.getElementById("phone");

    if (
        !phoneInput ||
        !phoneInput.value.trim()
    ) {

        alert(
            "Please enter a phone number first."
        );

        return;
    }

    checkSpam();

    renderQuiz();

    showSection("quizScreen");
}


// ==========================================
// RENDER QUIZ
// ==========================================

function renderQuiz() {

    const questionsContainer =
        document.getElementById("questions");

    if (!questionsContainer) {
        return;
    }

    questionsContainer.innerHTML = "";


    quizQuestions.forEach(function(question, index) {

        const questionBox =
            document.createElement("div");

        questionBox.className =
            "question";


        const title =
            document.createElement("h3");

        title.textContent =
            (index + 1) +
            ". " +
            question.question;


        questionBox.appendChild(title);


        question.options.forEach(
            function(option, optionIndex) {

                const label =
                    document.createElement("label");

                label.className =
                    "option";


                const radio =
                    document.createElement("input");

                radio.type = "radio";

                radio.name =
                    "question_" + index;

                radio.value =
                    optionIndex;


                label.appendChild(radio);

                label.appendChild(
                    document.createTextNode(
                        option
                    )
                );


                questionBox.appendChild(label);

            }
        );


        questionsContainer.appendChild(
            questionBox
        );

    });


    updateProgress();
}


// ==========================================
// QUIZ PROGRESS
// ==========================================

function updateProgress() {

    const progressBar =
        document.getElementById("progressBar");

    if (!progressBar) {
        return;
    }


    let answered = 0;


    quizQuestions.forEach(
        function(question, index) {

            const selected =
                document.querySelector(
                    'input[name="question_' +
                    index +
                    '"]:checked'
                );

            if (selected) {
                answered++;
            }

        }
    );


    const percentage =
        (answered /
            quizQuestions.length) *
        100;


    progressBar.style.width =
        percentage + "%";
}


// ==========================================
// SUBMIT ASSESSMENT
// ==========================================

async function submitAssessment() {

    const submitButton =
        document.getElementById("submitBtn");


    // Prevent double click
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent =
            "Saving...";
    }


    let rawScore = 0;


    // Check answers
    for (
        let i = 0;
        i < quizQuestions.length;
        i++
    ) {

        const selected =
            document.querySelector(
                'input[name="question_' +
                i +
                '"]:checked'
            );


        if (!selected) {

            alert(
                "Please answer question " +
                (i + 1) +
                "."
            );


            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                    "Submit Assessment";
            }


            return;
        }


        if (
            Number(selected.value) ===
            quizQuestions[i].answer
        ) {

            rawScore++;

        }

    }


    userData.rawScore =
        rawScore;


    userData.score =
        Math.round(
            (
                rawScore /
                quizQuestions.length
            ) * 100
        );


    // ======================================
    // FIREBASE CHECK
    // ======================================

    if (!db) {

        console.error(
            "Firestore database is not available."
        );


        alert(
            "Firebase connected nahi hai. firebase.js check karo."
        );


        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent =
                "Submit Assessment";
        }


        return;
    }


    // ======================================
    // DATA TO SAVE
    // ======================================
    //
    // IMPORTANT:
    // Real password kabhi save nahi hota.
    // Sirf password strength save hoti hai.
    //

    const record = {

        name:
            userData.name,

        role:
            userData.role,

        passwordStrength:
            userData.passwordStrength,

        spamStatus:
            userData.spamStatus,

        rawScore:
            userData.rawScore,

        score:
            userData.score,

        timestamp:
            new Date().toISOString(),

        createdAt:
            firebase.firestore
                .FieldValue
                .serverTimestamp()

    };


    try {

        await db
            .collection("assessments")
            .add(record);


        console.log(
            "✅ Assessment saved to Firestore."
        );


        showResult();


    } catch (error) {

        console.error(
            "❌ Firestore save error:",
            error
        );


        alert(
            "Data save nahi hua. Firebase Firestore check karo."
        );


        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent =
                "Submit Assessment";
        }

    }
}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    const finalScore =
        document.getElementById("finalScore");

    const finalScorePercent =
        document.getElementById(
            "finalScorePercent"
        );


    if (finalScore) {

        finalScore.textContent =
            userData.rawScore +
            "/" +
            quizQuestions.length;

    }


    let message = "";


    if (userData.score >= 80) {

        message =
            "🟢 Excellent! You scored " +
            userData.score +
            "%. Your cyber hygiene awareness is strong.";

    }

    else if (userData.score >= 50) {

        message =
            "🟡 Good effort! You scored " +
            userData.score +
            "%. There are some areas you can improve.";

    }

    else {

        message =
            "🔴 You scored " +
            userData.score +
            "%. Keep learning and improving your cyber safety habits.";

    }


    if (finalScorePercent) {

        finalScorePercent.textContent =
            message;

    }


    showSection("resultScreen");
}


// ==========================================
// RESET APP
// ==========================================

function resetApp() {

    userData = {

        name: "",

        role: "",

        passwordStrength:
            "Not Checked",

        spamStatus:
            "Not Checked",

        score: 0,

        rawScore: 0

    };


    const username =
        document.getElementById(
            "username"
        );

    const password =
        document.getElementById(
            "password"
        );

    const phone =
        document.getElementById(
            "phone"
        );


    if (username) {
        username.value = "";
    }

    if (password) {
        password.value = "";
    }

    if (phone) {
        phone.value = "";
    }


    const passwordResult =
        document.getElementById(
            "passwordResult"
        );

    if (passwordResult) {

        passwordResult.textContent =
            "Start by entering a sample password.";

    }


    const spamResult =
        document.getElementById(
            "spamResult"
        );

    if (spamResult) {

        spamResult.textContent =
            "Enter a number to check.";

    }


    const questions =
        document.getElementById(
            "questions"
        );

    if (questions) {
        questions.innerHTML = "";
    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {
        progressBar.style.width = "0%";
    }


    showSection("home");
}


// ==========================================
// ADMIN LOGIN
// ==========================================

function openAdminLogin() {

    const password =
        document.getElementById(
            "adminPassword"
        );

    const error =
        document.getElementById(
            "adminError"
        );


    if (password) {
        password.value = "";
    }

    if (error) {
        error.textContent = "";
    }


    showSection("adminLogin");
}


// ==========================================
// ADMIN UNLOCK
// ==========================================

async function tryUnlockAdmin() {

    const password =
        document.getElementById(
            "adminPassword"
        );

    const error =
        document.getElementById(
            "adminError"
        );


    if (!password) {
        return;
    }


    const code =
        password.value.trim();


    if (code !== ADMIN_CODE) {

        if (error) {

            error.textContent =
                "❌ Invalid admin code.";

        }

        return;
    }


    if (error) {
        error.textContent = "";
    }


    showSection("dashboard");


    await loadDashboard();
}


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    const body =
        document.getElementById(
            "dashboardBody"
        );

    const summary =
        document.getElementById(
            "summary"
        );


    if (!body) {
        return;
    }


    body.innerHTML = `
        <tr>
            <td colspan="6" class="empty">
                Loading records...
            </td>
        </tr>
    `;


    if (summary) {

        summary.textContent =
            "Loading analytics...";

    }


    if (!db) {

        body.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Firebase is not connected.
                </td>
            </tr>
        `;

        return;
    }


    try {

        const snapshot =
            await db
                .collection("assessments")
                .get();


        const records = [];


        snapshot.forEach(
            function(doc) {

                records.push({
                    id: doc.id,
                    ...doc.data()
                });

            }
        );


        // Newest records first
        records.sort(
            function(a, b) {

                const dateA =
                    a.timestamp
                        ? new Date(
                            a.timestamp
                        ).getTime()
                        : 0;

                const dateB =
                    b.timestamp
                        ? new Date(
                            b.timestamp
                        ).getTime()
                        : 0;


                return dateB - dateA;

            }
        );


        renderDashboard(records);


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );


        body.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Could not load Firestore data.
                </td>
            </tr>
        `;


        if (summary) {

            summary.innerHTML =
                '<span class="error">' +
                'Firestore error. Check Firebase Database and Rules.' +
                '</span>';

        }

    }
}


// ==========================================
// RENDER DASHBOARD
// ==========================================

function renderDashboard(records) {

    const body =
        document.getElementById(
            "dashboardBody"
        );

    const summary =
        document.getElementById(
            "summary"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    const total =
        records.length;


    let totalScore = 0;

    let strongPasswords = 0;

    let suspiciousNumbers = 0;


    records.forEach(
        function(record) {

            totalScore +=
                Number(
                    record.score || 0
                );


            if (
                record.passwordStrength ===
                "Strong"
            ) {

                strongPasswords++;

            }


            if (
                record.spamStatus ===
                "Suspicious"
            ) {

                suspiciousNumbers++;

            }

        }
    );


    const averageScore =
        total > 0
            ? Math.round(
                totalScore / total
            )
            : 0;


    // ======================================
    // SUMMARY
    // ======================================

    if (summary) {

        summary.innerHTML = `
            <b>📋 Total Assessments:</b>
            ${total}

            <br>

            <b>📈 Average Score:</b>
            ${averageScore}%

            <br>

            <b>🔐 Strong Passwords:</b>
            ${strongPasswords}

            <br>

            <b>⚠️ Suspicious Numbers:</b>
            ${suspiciousNumbers}
        `;

    }


    // ======================================
    // NO RECORDS
    // ======================================

    if (records.length === 0) {

        body.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No assessment records found.
                </td>
            </tr>
        `;

        return;
    }


    // ======================================
    // TABLE
    // ======================================

    records.forEach(
        function(record) {

            const row =
                document.createElement("tr");


            addCell(
                row,
                record.name || "—"
            );


            addCell(
                row,
                record.role || "—"
            );


            addCell(
                row,
                record.passwordStrength ||
                "—"
            );


            addCell(
                row,
                record.spamStatus ||
                "—"
            );


            addCell(
                row,
                (
                    record.rawScore || 0
                ) +
                "/" +
                quizQuestions.length +
                " (" +
                (
                    record.score || 0
                ) +
                "%)"
            );


            addCell(
                row,
                formatDate(
                    record.timestamp
                )
            );


            body.appendChild(row);

        }
    );
}


// ==========================================
// ADD TABLE CELL
// ==========================================

function addCell(row, value) {

    const cell =
        document.createElement("td");

    cell.textContent =
        value;

    row.appendChild(cell);
}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(value) {

    if (!value) {
        return "—";
    }


    try {

        const date =
            new Date(value);


        if (isNaN(date.getTime())) {
            return "—";
        }


        return date.toLocaleString(
            "en-IN"
        );

    } catch (error) {

        return "—";

    }
}


// ==========================================
// ADMIN LOGOUT
// ==========================================

function adminLogout() {

    showSection("home");

}


// ==========================================
// QUIZ RADIO CHANGE
// ==========================================

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target &&
            event.target.matches(
                'input[type="radio"]'
            )
        ) {

            updateProgress();

        }

    }
);


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "✅ Cyber Hygiene App loaded."
        );


        const adminPassword =
            document.getElementById(
                "adminPassword"
            );


        if (adminPassword) {

            adminPassword.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        tryUnlockAdmin();

                    }

                }
            );

        }

    }
);
