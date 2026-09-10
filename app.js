/* =========================================================
   CYBER HYGIENE PORTAL - APP.JS
   ========================================================= */

let userData = {
    name: "",
    role: "",
    passwordStrength: "Weak",
    spamNumber: "None",
    score: 0
};

const ADMIN_CODE = "ADMIN123";

const quizQuestions = [

    {
        q: "What is the best practice for creating a strong password?",
        o: [
            "Using your birthdate",
            "Mixing uppercase, lowercase, numbers, and symbols",
            "Reusing your email password",
            "Keeping it short"
        ],
        a: 1
    },

    {
        q: "What does Two-Factor Authentication (2FA) do?",
        o: [
            "Asks for password twice",
            "Adds a second layer of security via OTP/App",
            "Speeds up login process",
            "Deletes data automatically"
        ],
        a: 1
    },

    {
        q: "You receive an urgent email from your bank asking for UPI PIN. What should you do?",
        o: [
            "Reply with the PIN immediately",
            "Ignore and delete the email",
            "Forward to friends",
            "Call the sender back"
        ],
        a: 1
    },

    {
        q: "Which network is safest for online banking?",
        o: [
            "Public Railway Wi-Fi",
            "Mall Free Wi-Fi",
            "Secured Home Wi-Fi / Mobile Data",
            "Any Open Network"
        ],
        a: 2
    },

    {
        q: "What is 'Phishing'?",
        o: [
            "A type of cyber attack to steal sensitive data",
            "Catching fish online",
            "Updating OS software",
            "Speeding up internet connection"
        ],
        a: 0
    },

    {
        q: "How often should you update your smartphone operating system?",
        o: [
            "Never",
            "Only when it stops working",
            "As soon as updates are available",
            "Once every two years"
        ],
        a: 2
    },

    {
        q: "What should you check before entering sensitive info on a website?",
        o: [
            "The website color",
            "If the URL starts with 'https://' and has a lock icon",
            "The number of images",
            "If it loads fast"
        ],
        a: 1
    },

    {
        q: "What is the risk of using public USB charging stations?",
        o: [
            "Slow charging speed",
            "Juice Jacking (Data theft/Malware installation)",
            "Phone battery blast",
            "No risk at all"
        ],
        a: 1
    },

    {
        q: "If you back up your files to the cloud, you are protecting against:",
        o: [
            "Screen damage",
            "Data loss from ransomware or hardware failure",
            "High internet bills",
            "Spam phone calls"
        ],
        a: 1
    },

    {
        q: "What is a 'Trojan Horse' in cyber security?",
        o: [
            "A strong virus scanner",
            "Malicious software disguised as legitimate software",
            "A hardware component",
            "A secure network cable"
        ],
        a: 1
    },

    {
        q: "When sharing photos on social media, what hidden data can pose a privacy risk?",
        o: [
            "File size",
            "Image resolution",
            "EXIF data (including GPS location)",
            "Color scheme"
        ],
        a: 2
    },

    {
        q: "What is the safest way to dispose of an old hard drive?",
        o: [
            "Throwing it in the trash bin",
            "Physically destroying it or using data wiping software",
            "Deleting all folders",
            "Formatting it quickly once"
        ],
        a: 1
    },

    {
        q: "Which of the following indicates a potential spam/phishing SMS?",
        o: [
            "A message from a known friend",
            "An OTP you requested",
            "Urgent warnings with suspicious short links claiming you won a lottery",
            "A monthly electricity bill notification"
        ],
        a: 2
    },

    {
        q: "What does a Firewall do?",
        o: [
            "Cools down the computer processor",
            "Monitors and filters incoming and outgoing network traffic",
            "Increases internet downloading speed",
            "Deletes old files"
        ],
        a: 1
    },

    {
        q: "Why should you avoid using the same password for all accounts?",
        o: [
            "It is hard to type",
            "If one account is breached, hackers can access all your accounts",
            "Websites do not allow it",
            "It slows down the login process"
        ],
        a: 1
    }

];


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

function showScreen(screenId) {

    const screens = [
        "home",
        "profile",
        "passwordScreen",
        "spamScreen",
        "quizScreen",
        "adminLogin",
        "dashboard",
        "resultScreen"
    ];

    screens.forEach(function(id) {

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.remove("hidden");
    }

    const appContainer = document.getElementById("appContainer");

    if (appContainer) {

        if (screenId === "dashboard") {
            appContainer.classList.add("wide-mode");
        } else {
            appContainer.classList.remove("wide-mode");
        }

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   ROLE SELECTION
   ========================================================= */

function selectRole(role) {

    userData.role = role;

    const roleBadge = document.getElementById("roleBadge");

    if (roleBadge) {
        roleBadge.innerText = role;
    }

    showScreen("profile");
}


/* =========================================================
   PROFILE
   ========================================================= */

function nextToPassword() {

    const usernameInput = document.getElementById("username");

    const name = usernameInput
        ? usernameInput.value.trim()
        : "";

    if (!name) {

        alert("Please enter your name to proceed.");

        if (usernameInput) {
            usernameInput.focus();
        }

        return;
    }

    userData.name = name;

    showScreen("passwordScreen");
}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function checkPasswordStrength() {

    const passInput = document.getElementById("password");

    const pass = passInput
        ? passInput.value
        : "";

    const bar = document.getElementById("strength-bar");
    const txt = document.getElementById("strength-text");

    if (!pass.length) {

        if (bar) {
            bar.style.width = "0%";
        }

        if (txt) {
            txt.innerText = "Enter password to test strength";
        }

        userData.passwordStrength = "Weak";

        return;
    }

    let score = 0;

    if (pass.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(pass)) {
        score++;
    }

    if (/[0-9]/.test(pass)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(pass)) {
        score++;
    }

    if (score <= 1) {

        if (bar) {
            bar.style.width = "25%";
            bar.style.backgroundColor = "#ef4444";
        }

        if (txt) {
            txt.innerText = "🛑 Weak Password";
        }

        userData.passwordStrength = "Weak";

    } else if (score <= 3) {

        if (bar) {
            bar.style.width = "50%";
            bar.style.backgroundColor = "#eab308";
        }

        if (txt) {
            txt.innerText = "⚠️ Medium Password";
        }

        userData.passwordStrength = "Medium";

    } else {

        if (bar) {
            bar.style.width = "100%";
            bar.style.backgroundColor = "#10b981";
        }

        if (txt) {
            txt.innerText = "✅ Strong Password";
        }

        userData.passwordStrength = "Strong";
    }
}


/* =========================================================
   MOVE TO SPAM CHECK
   ========================================================= */

function nextToTracker() {

    const passInput = document.getElementById("password");

    if (!passInput || !passInput.value.trim()) {

        alert("Please test a password first.");

        return;
    }

    /*
       Security:
       The actual password is immediately removed from memory
       after strength testing.
    */

    passInput.value = "";

    showScreen("spamScreen");
}


/* =========================================================
   SPAM CHECK
   ========================================================= */

function checkSpam() {

    const phoneInput = document.getElementById("phone");

    const num = phoneInput
        ? phoneInput.value.trim()
        : "";

    if (!num) {

        alert("Please enter a phone number.");

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }

    const digitsOnly = num.replace(/\D/g, "");

    const resultBox = document.getElementById("spamResult");

    if (!resultBox) {
        return;
    }

    resultBox.classList.remove("hidden");

    /*
       This is only a basic pattern check.
       It is NOT a real telecom spam database lookup.
    */

    const repeatedDigits = /(\d)\1{4,}/.test(digitsOnly);
    const invalidLength = digitsOnly.length < 10;
    const suspiciousPrefix = digitsOnly.startsWith("140");

    if (repeatedDigits || invalidLength || suspiciousPrefix) {

        resultBox.className = "result danger";

        resultBox.innerText =
            "🚨 Invalid / Suspicious Alert!";

        userData.spamNumber =
            "Invalid / Suspicious";

    } else {

        resultBox.className = "result safe";

        resultBox.innerText =
            "✅ No obvious warning patterns detected.";

        userData.spamNumber =
            "No obvious warning";
    }
}


/* =========================================================
   QUIZ
   ========================================================= */

function nextToQuiz() {

    showScreen("quizScreen");

    const container =
        document.getElementById("questions");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    quizQuestions.forEach(function(currentQ, qIdx) {

        const qBlock =
            document.createElement("div");

        qBlock.className = "question";

        const qTitle =
            document.createElement("div");

        qTitle.className = "question-title";

        qTitle.innerText =
            `${qIdx + 1}. ${currentQ.q}`;

        qBlock.appendChild(qTitle);

        currentQ.o.forEach(function(opt, oIdx) {

            const label =
                document.createElement("label");

            label.className = "option";

            const radio =
                document.createElement("input");

            radio.type = "radio";
            radio.name = `question_${qIdx}`;
            radio.value = oIdx;

            label.appendChild(radio);
            label.appendChild(
                document.createTextNode(" " + opt)
            );

            qBlock.appendChild(label);
        });

        container.appendChild(qBlock);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SUBMIT ASSESSMENT
   ========================================================= */

async function submitFinalData() {

    const submitButton =
        document.getElementById("submitBtn");

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = "Saving Assessment...";
    }

    try {

        let calculatedScore = 0;

        quizQuestions.forEach(function(currentQ, qIdx) {

            const selected =
                document.querySelector(
                    `input[name="question_${qIdx}"]:checked`
                );

            if (
                selected &&
                Number(selected.value) === currentQ.a
            ) {
                calculatedScore++;
            }
        });

        const percentage =
            Math.round(
                (calculatedScore / quizQuestions.length) * 100
            );

        userData.score = calculatedScore;

        const recordData = {

            name: userData.name,

            role: userData.role,

            passwordStrength:
                userData.passwordStrength,

            spamStatus:
                userData.spamNumber,

            score:
                `${calculatedScore}/${quizQuestions.length} (${percentage}%)`,

            rawScore:
                calculatedScore,

            timestamp:
                new Date().toLocaleString(),

            createdAt:
                firebase.firestore.Timestamp.now()
        };

        let savedToCloud = false;

        /*
           Save to Firestore
        */

        if (
            typeof db !== "undefined" &&
            db !== null
        ) {

            try {

                await db
                    .collection("assessments")
                    .add(recordData);

                savedToCloud = true;

                console.log(
                    "Assessment saved to Firestore."
                );

            } catch (error) {

                console.error(
                    "Firestore save failed:",
                    error
                );

            }
        }

        /*
           Local backup if cloud save fails.
        */

        if (!savedToCloud) {

            saveToBackup(recordData);

            alert(
                "Cloud database is unavailable right now. " +
                "Your result has been saved locally on this device."
            );
        }

        showResultsPage(
            calculatedScore,
            percentage
        );

    } catch (error) {

        console.error(
            "Assessment error:",
            error
        );

        alert(
            "Something went wrong while submitting the assessment."
        );

    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerText =
                "🔒 SUBMIT ASSESSMENT";
        }
    }
}


/* =========================================================
   LOCAL BACKUP
   ========================================================= */

function saveToBackup(data) {

    try {

        const existing =
            JSON.parse(
                localStorage.getItem(
                    "cyberHygieneRecords"
                )
            ) || [];

        existing.push(data);

        localStorage.setItem(
            "cyberHygieneRecords",
            JSON.stringify(existing)
        );

    } catch (error) {

        console.error(
            "Local backup failed:",
            error
        );
    }
}


/* =========================================================
   RESULT
   ========================================================= */

function showResultsPage(score, percent) {

    const finalScore =
        document.getElementById("finalScore");

    const finalScorePercent =
        document.getElementById("finalScorePercent");

    if (finalScore) {
        finalScore.innerText =
            `${score}/${quizQuestions.length}`;
    }

    if (finalScorePercent) {
        finalScorePercent.innerText =
            `(${percent}%)`;
    }

    showScreen("resultScreen");
}


/* =========================================================
   RESET TO HOME
   ========================================================= */

function resetFormToHome() {

    userData = {
        name: "",
        role: "",
        passwordStrength: "Weak",
        spamNumber: "None",
        score: 0
    };

    const fields = [
        "username",
        "password",
        "phone",
        "adminPassword"
    ];

    fields.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }
    });

    const strengthBar =
        document.getElementById("strength-bar");

    const strengthText =
        document.getElementById("strength-text");

    if (strengthBar) {
        strengthBar.style.width = "0%";
    }

    if (strengthText) {
        strengthText.innerText =
            "Enter password to test strength";
    }

    const spamResult =
        document.getElementById("spamResult");

    if (spamResult) {
        spamResult.className =
            "result hidden";

        spamResult.innerText = "";
    }

    const questions =
        document.getElementById("questions");

    if (questions) {
        questions.innerHTML = "";
    }

    showScreen("home");
}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function tryUnlockAdmin() {

    const input =
        document.getElementById("adminPassword");

    const enteredCode =
        input ? input.value : "";

    if (!enteredCode) {

        alert("Please enter the admin code.");

        return;
    }

    if (enteredCode === ADMIN_CODE) {

        if (input) {
            input.value = "";
        }

        showScreen("dashboard");

        loadAdminDashboard();

    } else {

        alert("❌ Incorrect admin code.");

        if (input) {
            input.value = "";
            input.focus();
        }
    }
}


/* =========================================================
   ADMIN LOGOUT
   ========================================================= */

function adminLogout() {

    const input =
        document.getElementById("adminPassword");

    if (input) {
        input.value = "";
    }

    showScreen("home");
}


/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

async function loadAdminDashboard() {

    const tbody =
        document.getElementById("dashboardBody");

    const summary =
        document.getElementById("summary");

    if (!tbody) {
        return;
    }

    tbody.innerHTML =
        `<tr>
            <td colspan="6" style="text-align:center;">
                Loading cloud analytics...
            </td>
        </tr>`;

    try {

        let records = [];

        /*
           Load Firestore records first.
        */

        if (
            typeof db !== "undefined" &&
            db !== null
        ) {

            try {

                const snapshot =
                    await db
                        .collection("assessments")
                        .orderBy("createdAt", "desc")
                        .get();

                snapshot.forEach(function(doc) {

                    const data = doc.data();

                    records.push({
                        id: doc.id,
                        ...data
                    });

                });

            } catch (error) {

                console.error(
                    "Firestore dashboard error:",
                    error
                );

                /*
                   If orderBy fails because some old records
                   do not have createdAt, load without ordering.
                */

                try {

                    const snapshot =
                        await db
                            .collection("assessments")
                            .get();

                    snapshot.forEach(function(doc) {

                        const data = doc.data();

                        records.push({
                            id: doc.id,
                            ...data
                        });

                    });

                } catch (secondError) {

                    console.error(
                        "Firestore fallback failed:",
                        secondError
                    );
                }
            }
        }

        /*
           If Firestore has no records,
           also check local backup.
        */

        if (records.length === 0) {

            const localRecords =
                JSON.parse(
                    localStorage.getItem(
                        "cyberHygieneRecords"
                    )
                ) || [];

            records = localRecords;
        }

        renderDashboardTable(
            records,
            tbody,
            summary
        );

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

        tbody.innerHTML =
            `<tr>
                <td colspan="6"
                    style="text-align:center;color:#fca5a5;">
                    Unable to load records.
                </td>
            </tr>`;

        if (summary) {
            summary.innerText =
                "Unable to load analytics.";
        }
    }
}


/* =========================================================
   RENDER DASHBOARD
   ========================================================= */

function renderDashboardTable(
    records,
    tbody,
    summary
) {

    tbody.innerHTML = "";

    if (!records || records.length === 0) {

        tbody.innerHTML =
            `<tr>
                <td colspan="6"
                    style="text-align:center;color:#94a3b8;">
                    No records found.
                </td>
            </tr>`;

        if (summary) {
            summary.innerHTML =
                "Total Assessments: 0 | Average: 0%";
        }

        return;
    }

    let totalScore = 0;

    records.forEach(function(row) {

        const rawScore =
            Number(row.rawScore) || 0;

        totalScore += rawScore;

        const rowElement =
            document.createElement("tr");

        /*
           Name
        */

        const nameCell =
            document.createElement("td");

        nameCell.innerText =
            row.name || "Unknown";

        rowElement.appendChild(nameCell);

        /*
           Role
        */

        const roleCell =
            document.createElement("td");

        roleCell.innerText =
            row.role || "-";

        rowElement.appendChild(roleCell);

        /*
           Password strength
        */

        const passwordCell =
            document.createElement("td");

        const passwordText =
            row.passwordStrength || "Weak";

        passwordCell.innerText =
            passwordText;

        if (passwordText === "Strong") {
            passwordCell.className = "good";
        } else if (passwordText === "Medium") {
            passwordCell.className = "medium";
        } else {
            passwordCell.className = "low";
        }

        rowElement.appendChild(passwordCell);

        /*
           Spam status
        */

        const spamCell =
            document.createElement("td");

        spamCell.innerText =
            row.spamStatus || "None";

        if (
            String(row.spamStatus)
                .toLowerCase()
                .includes("suspicious")
        ) {
            spamCell.className = "low";
        } else {
            spamCell.className = "good";
        }

        rowElement.appendChild(spamCell);

        /*
           Quiz score
        */

        const scoreCell =
            document.createElement("td");

        scoreCell.innerText =
            row.score ||
            `${rawScore}/${quizQuestions.length}`;

        rowElement.appendChild(scoreCell);

        /*
           Timestamp
        */

        const dateCell =
            document.createElement("td");

        let displayDate =
            row.timestamp || "-";

        if (
            row.createdAt &&
            typeof row.createdAt.toDate === "function"
        ) {

            displayDate =
                row.createdAt
                    .toDate()
                    .toLocaleString();
        }

        dateCell.innerText =
            displayDate;

        rowElement.appendChild(dateCell);

        tbody.appendChild(rowElement);
    });

    const average =
        Math.round(
            (totalScore /
                records.length /
                quizQuestions.length) * 100
        );

    if (summary) {

        summary.innerHTML =
            `Total Assessments: <strong>${records.length}</strong>
             &nbsp; | &nbsp;
             Average Score: <strong>${average}%</strong>`;
    }
}


/* =========================================================
   CLEAR LOCAL CACHE
   ========================================================= */

function clearLogsCache() {

    const confirmed =
        confirm(
            "Clear locally saved backup records?\n\n" +
            "This will NOT delete records from Firebase Cloud."
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "cyberHygieneRecords"
    );

    alert(
        "Local cache cleared successfully."
    );

    loadAdminDashboard();
}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const adminPassword =
            document.getElementById(
                "adminPassword"
            );

        if (adminPassword) {

            adminPassword.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {
                        tryUnlockAdmin();
                    }

                }
            );
        }

    }
);
