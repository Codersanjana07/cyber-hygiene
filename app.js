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
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function selectRole(role) {
    userData.role = role;
    document.getElementById('role-badge').innerText = role;
    showScreen('profile-screen');
}

function nextToPassword() {
    userData.name = document.getElementById('username').value;
    if (!userData.name.trim()) { 
        alert("Please enter your name to proceed."); 
        return; 
    }
    showScreen('password-screen');
}

function checkPasswordStrength() {
    const pass = document.getElementById('password').value;
    const bar = document.getElementById('strength-bar');
    const txt = document.getElementById('strength-text');
    
    if (pass.length === 0) { bar.style.width = '0%'; txt.innerText = "Enter password"; return; }
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) { 
        bar.style.width = "25%"; bar.style.backgroundColor = "#ef4444"; 
        txt.innerText = "🔴 Weak Password"; userData.passwordStrength = "Weak"; 
    } else if (score <= 3) { 
        bar.style.width = "50%"; bar.style.backgroundColor = "#eab308"; 
        txt.innerText = "🟡 Medium Password"; userData.passwordStrength = "Medium"; 
    } else { 
        bar.style.width = "100%"; bar.style.backgroundColor = "#10b981"; 
        txt.innerText = "🟢 Strong Password"; userData.passwordStrength = "Strong"; 
    }
}

function nextToTracker() {
    const pass = document.getElementById('password').value;
    if (!pass.trim()) { alert("Please test a password before moving forward."); return; }
    showScreen('tracker-screen');
}

function checkSpam() {
    const num = document.getElementById('spam-phone').value;
    if (!num.trim()) { alert("Please enter a valid number"); return; }
    userData.spamNumber = num;

    const resultBox = document.getElementById('spam-result');
    resultBox.classList.remove('hidden');

    if (num.startsWith('91') || num.length % 2 === 0) {
        resultBox.style.background = "rgba(220,38,38,0.2)";
        resultBox.style.border = "1px solid #dc2626";
        resultBox.style.color = "#f87171";
        resultBox.innerText = "🚨 HIGH SPAM RISK!";
    } else {
        resultBox.style.background = "rgba(16,185,129,0.2)";
        resultBox.style.border = "1px solid #10b981";
        resultBox.style.color = "#34d399";
        resultBox.innerText = "✅ SAFE NUMBER";
    }
}

function nextToQuiz() { 
    showScreen('quiz-screen'); 
    
    const container = document.getElementById('all-questions-container');
    container.innerHTML = '';
    
    quizQuestions.forEach((currentQ, qIdx) => {
        const qBlock = document.createElement('div');
        qBlock.style.marginBottom = "20px";
        qBlock.style.borderBottom = "1px solid #334155";
        qBlock.style.paddingBottom = "15px";
        
        const qTitle = document.createElement('div');
        qTitle.style.background = "#0f172a";
        qTitle.style.padding = "10px";
        qTitle.style.borderRadius = "8px";
        qTitle.style.fontSize = "13px";
        qTitle.style.marginBottom = "10px";
        qTitle.style.fontWeight = "600";
        qTitle.innerText = `${qIdx + 1}. ${currentQ.q}`;
        qBlock.appendChild(qTitle);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.style.display = "flex";
        optionsDiv.style.flexDirection = "column";
        optionsDiv.style.gap = "6px";
        
        currentQ.o.forEach((opt, oIdx) => {
            const label = document.createElement('label');
            label.style.display = "flex";
            label.style.alignItems = "center";
            label.style.gap = "8px";
            label.style.background = "#1e293b";
            label.style.padding = "10px";
            label.style.borderRadius = "6px";
            label.style.cursor = "pointer";
            label.style.fontSize = "12px";
            
            const radio = document.createElement('input');
            radio.type = "radio";
            radio.name = `question_${qIdx}`;
            radio.value = oIdx;
            radio.style.cursor = "pointer";
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            optionsDiv.appendChild(label);
        });
        
        qBlock.appendChild(optionsDiv);
        container.appendChild(qBlock);
    });
}

function submitFinalData() {
    let calculatedScore = 0;
    let allAnswered = true;
    
    quizQuestions.forEach((currentQ, qIdx) => {
        const selected = document.querySelector(`input[name="question_${qIdx}"]:checked`);
        if (!selected) { allAnswered = false; }
        else {
            if (parseInt(selected.value) === currentQ.a) { calculatedScore++; }
        }
    });
    
    if (!allAnswered) {
        alert("Please answer all 15 questions before submitting!");
        return;
    }
    
    userData.score = calculatedScore;

    db.collection("cyber_hygiene_records").add({
        name: userData.name,
        role: userData.role,
        passwordStrength: userData.passwordStrength,
        spamNumber: userData.spamNumber,
        score: `${userData.score}/${quizQuestions.length}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("🎉 Thank you! Your response is securely saved permanently.");
        location.reload();
    })
    .catch((err) => {
        console.error("Firebase Write Error: ", err);
        alert("Database Save Error.");
    });
}

function loginAdmin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === "admin123") {
        showScreen('admin-dashboard-screen');
        fetchLiveRecords();
    } else {
        alert("Access Denied: Incorrect Password.");
    }
}

function fetchLiveRecords() {
    db.collection("cyber_hygiene_records").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        const rows = document.getElementById('dashboard-rows');
        rows.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const tr = document.createElement('tr');
            let badgeBg = data.passwordStrength === 'Strong' ? '#064e3b' : (data.passwordStrength === 'Medium' ? '#78350f' : '#7f1d1d');
            let badgeText = data.passwordStrength === 'Strong' ? '#34d399' : (data.passwordStrength === 'Medium' ? '#fbbf24' : '#f87171');
            
            tr.innerHTML = `
