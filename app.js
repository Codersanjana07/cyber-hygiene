let userData = { name: "", role: "", passwordStrength: "Weak", spamNumber: "None", score: 0 };

const quizQuestions = [
    { q: "What is the best practice for creating a strong password?", o: ["Using your birthdate", "Mixing uppercase, lowercase, numbers, and symbols", "Reusing your email password", "Keeping it short"], a: 1 },
    { q: "What does Two-Factor Authentication (2FA) do?", o: ["Asks for password twice", "Adds a second layer of security via OTP/App", "Speeds up login process", "Deletes data automatically"], a: 1 },
    { q: "You receive an urgent email from your bank asking for UPI PIN. What should you do?", o: ["Reply with the PIN immediately", "Ignore and delete the email", "Forward to friends", "Call the sender back"], a: 1 },
    { q: "Which network is safest for online banking?", o: ["Public Railway Wi-Fi", "Mall Free Wi-Fi", "Secured Home Wi-Fi / Mobile Data", "Any Open Network"], a: 2 },
    { q: "What is 'Phishing'?", o: ["A type of cyber attack to steal sensitive data", "Catching fish online", "Updating OS software", "Speeding up internet connection"], a: 0 },
    { q: "How often should you update your smartphone operating system?", o: ["Never", "Only when it stops working", "As soon as updates are available", "Once every two years"], a: 2 },
    { q: "What should you check before entering sensitive info on a website?", o: ["The website color", "If the URL starts with 'https://' and has a lock icon", "The number of images", "If it loads fast"], a: 1 },
    { q: "What is the risk of using public USB charging stations?", o: ["Slow charging speed", "Juice Jacking (Data theft/Malware installation)", "Phone battery blast", "No risk at all"], a: 1 },
    { q: "If you back up your files to the cloud, you are protecting against:", o: ["Screen damage", "Data loss from ransomware or hardware failure", "High internet bills", "Spam phone calls"], a: 1 },
    { q: "What is a 'Trojan Horse' in cyber security?", o: ["A strong virus scanner", "Malicious software disguised as legitimate software", "A hardware component", "A secure network cable"], a: 1 },
    { q: "When sharing photos on social media, what hidden data can pose a privacy risk?", o: ["File size", "Image resolution", "EXIF data (including GPS location)", "Color scheme"], a: 2 },
    { q: "What is the safest way to dispose of an old hard drive?", o: ["Throwing it in the trash bin", "Physically destroying it or using data wiping software", "Deleting all folders", "Formatting it quickly once"], a: 1 },
    { q: "Which of the following indicates a potential spam/phishing SMS?", o: ["A message from a known friend", "An OTP you requested", "Urgent warnings with suspicious short links claiming you won a lottery", "A monthly electricity bill notification"], a: 2 },
    { q: "What does a Firewall do?", o: ["Cools down the computer processor", "Monitors and filters incoming and outgoing network traffic", "Increases internet downloading speed", "Deletes old files"], a: 1 },
    { q: "Why should you avoid using the same password for all accounts?", o: ["It is hard to type", "If one account is breached, hackers can access all your accounts", "Websites do not allow it", "It slows down the login process"], a: 1 }
];

function showScreen(screenId) {
    const screens = ['home', 'profile', 'passwordScreen', 'spamScreen', 'quizScreen', 'adminLogin', 'dashboard', 'resultScreen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.remove('hidden');

    // 🚀 यहाँ पर डैशबोर्ड लोड होते ही वाइड मोड ऑन होगा जिससे स्लाइडर गायब हो जाएगा
    const appContainer = document.getElementById('appContainer');
    if (appContainer) {
        if (screenId === 'dashboard') {
            appContainer.classList.add('wide-mode');
        } else {
            appContainer.classList.remove('wide-mode');
        }
    }
}

function selectRole(role) {
    userData.role = role;
    const roleBadge = document.getElementById('roleBadge');
    if (roleBadge) roleBadge.innerText = role;
    showScreen('profile');
}

function nextToPassword() {
    const usernameInput = document.getElementById('username');
    userData.name = usernameInput ? usernameInput.value.trim() : "";
    if (!userData.name) { 
        alert("Please enter your name to proceed."); 
        return; 
    }
    showScreen('passwordScreen');
}

function checkPasswordStrength() {
    const passInput = document.getElementById('password');
    const pass = passInput ? passInput.value : "";
    const bar = document.getElementById('strength-bar');
    const txt = document.getElementById('strength-text');
    
    if (pass.length === 0) { 
        if (bar) bar.style.width = '0%'; 
        if (txt) txt.innerText = "Enter password"; 
        return; 
    }
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) { 
        if (bar) { bar.style.width = "25%"; bar.style.backgroundColor = "#ef4444"; }
        if (txt) txt.innerText = "🛑 Weak Password"; 
        userData.passwordStrength = "Weak"; 
    } else if (score <= 3) { 
        if (bar) { bar.style.width = "50%"; bar.style.backgroundColor = "#eab308"; }
        if (txt) txt.innerText = "⚠️ Medium Password"; 
        userData.passwordStrength = "Medium"; 
    } else { 
        if (bar) { bar.style.width = "100%"; bar.style.backgroundColor = "#10b981"; }
        if (txt) txt.innerText = "✅ Strong Password"; 
        userData.passwordStrength = "Strong"; 
    }
}

function nextToTracker() {
    const passInput = document.getElementById('password');
    if (!passInput || !passInput.value.trim()) { alert("Please test a password first."); return; }
    showScreen('spamScreen');
}

function checkSpam() {
    const phoneInput = document.getElementById('phone');
    const num = phoneInput ? phoneInput.value.trim() : "";
    if (!num) { alert("Please enter a phone number"); return; }

    const resultBox = document.getElementById('spamResult');
    if (resultBox) {
        resultBox.classList.remove('hidden');
        if (/(\d)\1{4,}/.test(num) || num.length < 10) {
            resultBox.className = "result danger";
            resultBox.innerText = "🚨 Invalid / Suspicious Alert!";
            userData.spamNumber = "Invalid / Suspicious";
        } else {
            resultBox.className = "result safe";
            resultBox.innerText = "✅ No obvious warning patterns detected.";
            userData.spamNumber = "No obvious warning";
        }
    }
}

function nextToQuiz() { 
    showScreen('quizScreen'); 
    const container = document.getElementById('questions');
    if (!container) return;
    container.innerHTML = '';
    
    quizQuestions.forEach((currentQ, qIdx) => {
        const qBlock = document.createElement('div');
        qBlock.className = "question";
        
        const qTitle = document.createElement('div');
        qTitle.className = "question-title";
        qTitle.innerText = `${qIdx + 1}. ${currentQ.q}`;
        qBlock.appendChild(qTitle);
        
        currentQ.o.forEach((opt, oIdx) => {
            const label = document.createElement('label');
            label.className = "option";
            label.innerHTML = `<input type="radio" name="question_${qIdx}" value="${oIdx}"> ${opt}`;
            qBlock.appendChild(label);
        });
        container.appendChild(qBlock);
    });
}

// ☁️ लाइव डेटा Firebase Firestore में सेव करने का मुख्य लॉजिक
function submitFinalData() {
    let calculatedScore = 0;
    quizQuestions.forEach((currentQ, qIdx) => {
        const selected = document.querySelector(`input[name="question_${qIdx}"]:checked`);
        if (selected && parseInt(selected.value) === currentQ.a) { 
            calculatedScore++; 
        }
    });

    const percentage = Math.round((calculatedScore / quizQuestions.length) * 100);
    const recordData = {
        name: userData.name,
        role: userData.role,
        passwordStrength: userData.passwordStrength,
        spamStatus: userData.spamNumber,
        score: `${calculatedScore}/${quizQuestions.length} (${percentage}%)`,
        rawScore: calculatedScore,
        timestamp: new Date().toLocaleString()
    };

    // Firebase में लाइव डेटा भेजना
    if (db) {
        db.collection("assessments").add(recordData)
        .then(() => {
            showResultsPage(calculatedScore, percentage);
        })
        .catch((error) => {
            console.error("Firebase Save Error, running offline backup: ", error);
            saveToBackup(recordData);
            showResultsPage(calculatedScore, percentage);
        });
    } else {
        saveToBackup(recordData);
        showResultsPage(calculatedScore, percentage);
    }
}

function saveToBackup(data) {
    let localRecords = JSON.parse(localStorage.getItem('cyberHygieneRecords')) || [];
    localRecords.push(data);
    localStorage.setItem('cyberHygieneRecords', JSON.stringify(localRecords));
}

function showResultsPage(score, percent) {
    document.getElementById('finalScore').innerText = `${score}/${quizQuestions.length}`;
    document.getElementById('finalScorePercent').innerText = `(${percent}%)`;
    showScreen('resultScreen');
}

// 📊 Firebase से डेटा लोड करके एडमिन डैशबोर्ड बिना स्लाइडर के रेंडर करना
function loadAdminDashboard() {
    const tbody = document.getElementById('dashboardBody');
    const summary = document.getElementById('summary');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Loading cloud analytics...</td></tr>`;

    const renderTable = (records) => {
        tbody.innerHTML = '';
        if (records.length === 0) {
