
const params = new URLSearchParams(location.search);
const portfolioIdParam = params.get("portfolioId");
const resumeIdParam = params.get("resumeId");
const autoDownload = params.get("download");

let userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");

if (!userId) {
  console.error("No userId found in storage");
  alert("Session expired. Please login again.");
  location.href = "login.html";
}

let loggedInUser = null;
initUser();

async function initUser() {
  try {
    const res = await fetch(`https://folio2resume-backend.onrender.com/api/auth/user/${userId}`);
    if (res.ok) {
      loggedInUser = await res.json();
    }
  } catch (e) {
    console.error("Error fetching user details");
  }
}

const extraForm = document.getElementById("extraForm");
const loadingStatus = document.getElementById("loadingStatus");
const resume = document.getElementById("resume");

if (resumeIdParam) {
  if (extraForm) extraForm.style.display = "none";
  if (loadingStatus) loadingStatus.style.display = "block";
} else if (portfolioIdParam) {
  if (extraForm) extraForm.style.display = "block";
  if (resume) resume.style.display = "none";
}

const phone = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const address = document.getElementById("address");
const languages = document.getElementById("languages");
const rName = document.getElementById("rName");
const rEmail = document.getElementById("rEmail");
const rPhone = document.getElementById("rPhone");
const rAddress = document.getElementById("rAddress");
const rAbout = document.getElementById("rAbout");
const rEducation = document.getElementById("rEducation");
const rInternships = document.getElementById("rInternships");
const rSkills = document.getElementById("rSkills");
const rProjects = document.getElementById("rProjects");
const rLanguages = document.getElementById("rLanguages");
const rPhoto = document.getElementById("rPhoto");
const hiddenPhotoInput = document.getElementById("hiddenPhotoInput");
const saveMessage = document.getElementById("saveMessage");

let activeResumeId = resumeIdParam;
let cachedPortfolio = null;

if (activeResumeId) {
  fetch(`https://folio2resume-backend.onrender.com/api/resume/${activeResumeId}`)
    .then(async res => {
      if (!res.ok) throw new Error("Could not find this resume.");
      return res.json();
    })
    .then(r => {
      if (loadingStatus) loadingStatus.style.display = "none";
      const parsed = (typeof r.resumeData === 'string') ? JSON.parse(r.resumeData) : r.resumeData;
      displayResume(parsed);

      const template = parsed.template || "student";
      window.currentResumeTemplate = template;
      if (resume) {
        resume.className = "resume-canvas " + template + "-style";
        resume.style.display = "grid";
      }

      // STRICT READ-ONLY MODE for Saved Resumes
      const actionBar = document.getElementById("actionBar");
      if (actionBar) actionBar.style.display = "none";

      // Disable ALL editing features
      document.querySelectorAll('[contenteditable="true"]').forEach(el => el.contentEditable = "false");

      const editOverlay = document.querySelector('.edit-overlay');
      if (editOverlay) editOverlay.style.display = "none";

      const imageBox = document.querySelector('.image-box');
      if (imageBox) imageBox.style.pointerEvents = "none";

      // Add View Mode Badge to Header
      const header = document.querySelector("header nav");
      if (header) {
        const logo = header.querySelector(".logo");
        const badge = document.createElement("span");
        badge.innerHTML = '<i class="fa-solid fa-eye"></i> View Mode';
        badge.style.background = "rgba(255,255,255,0.2)";
        badge.style.color = "white";
        badge.style.padding = "4px 12px";
        badge.style.borderRadius = "20px";
        badge.style.fontSize = "14px";
        badge.style.marginLeft = "15px";
        badge.style.border = "1px solid rgba(255,255,255,0.4)";
        logo.appendChild(badge);
      }

      if (autoDownload === "true") {
        setTimeout(() => downloadResume(), 500);
      }
    })
    .catch(err => {
      if (loadingStatus) loadingStatus.style.display = "none";
      alert("Notice: " + err.message);
    });
} else if (portfolioIdParam) {
  fetch(`https://folio2resume-backend.onrender.com/api/portfolio/user/${userId}`)
    .then(res => res.json())
    .then(portfolios => {
      cachedPortfolio = portfolios.find(x => x.id == portfolioIdParam);
    });
}

function displayResume(r) {
  if (!r) return;
  if (rName) rName.innerText = r.name || loggedInUser?.name || "Your Name";
  if (rEmail) rEmail.innerText = r.email || loggedInUser?.email || "email@example.com";
  if (rPhone) rPhone.innerText = r.phone || "000-000-0000";
  if (rAddress) rAddress.innerText = r.address || "Your Address";
  if (rAbout) rAbout.innerText = r.about || "Write a brief intro...";
  if (rEducation) rEducation.innerText = r.education || "Your Education...";

  if (rInternships) fillList(rInternships, r.internships, "Add experience...");
  if (rSkills) fillList(rSkills, r.skills, "Add skill...");
  if (rProjects) fillList(rProjects, r.projects, "Add project...");
  if (rLanguages) fillList(rLanguages, r.languages, "Add language...");

  if (r.photo && rPhoto) rPhoto.src = r.photo;
  else if (rPhoto) rPhoto.src = "https://via.placeholder.com/150";
}

function getSlide(keys, slides) {
  if (!slides) return "";
  const found = slides.find(s => keys.some(k => (s.title || "").toLowerCase().includes(k.toLowerCase())));
  return found ? found.content : "";
}

async function generateResume() {
  const phoneValue = phone.value.trim();
  if (!/^\d{10}$/.test(phoneValue)) {
    phoneError.style.display = "block";
    phone.focus();
    return;
  }
  phoneError.style.display = "none";

  try {
    let p = cachedPortfolio;
    if (!p) {
      const res = await fetch(`https://folio2resume-backend.onrender.com/api/portfolio/user/${userId}`);
      const portfolios = await res.json();
      p = portfolios.find(x => x.id == portfolioIdParam);
    }
    if (!p) return alert("Portfolio not found");

    const pData = JSON.parse(p.portfolioData);
    if (!loggedInUser) await initUser();

    extraForm.style.display = "none";
    if (resume) resume.style.display = "grid";

    const actionBar = document.getElementById("actionBar");
    if (actionBar) actionBar.style.display = "flex";

    rName.innerText = loggedInUser?.name || "User";
    rEmail.innerText = loggedInUser?.email || "";
    rPhone.innerText = phoneValue;
    rAddress.innerText = address.value;
    rAbout.innerText = getSlide(["about", "intro"], pData.slides) || "Professional Profile";
    rEducation.innerText = getSlide(["education", "academic"], pData.slides) || "Educational background";

    fillList(rInternships, (getSlide(["internship", "experience"], pData.slides) || "").split(","), "Relevant experience...");
    fillList(rSkills, (getSlide(["skills", "tech"], pData.slides) || "").split(","), "Professional skills...");
    fillList(rProjects, (getSlide(["project"], pData.slides) || "").split(","), "Notable projects...");
    fillList(rLanguages, (languages.value || "").split(","), "English, etc.");

    const img = pData.slides.find(s => s.image)?.image;
    if (img && rPhoto) rPhoto.src = img;

    const templateName = pData.template || "student";
    window.currentResumeTemplate = templateName;
    if (resume) resume.className = "resume-canvas " + templateName + "-style";
    window.scrollTo(0, 0);
  } catch (err) {
    console.error(err);
  }
}

function fillList(el, arr, placeholder) {
  if (!el) return;
  el.innerHTML = "";
  const items = (Array.isArray(arr) ? arr : []).filter(v => v && v.trim() !== "");
  if (items.length === 0 && placeholder && !resumeIdParam) {
    const li = document.createElement("li");
    li.contentEditable = "true";
    li.innerText = placeholder;
    li.style.color = "#94a3b8";
    el.appendChild(li);
    return;
  }
  items.forEach(v => {
    const li = document.createElement("li");
    li.contentEditable = resumeIdParam ? "false" : "true";
    li.innerText = v.trim();
    el.appendChild(li);
  });
}

function enableBulletEditing(listElement) {
  listElement.addEventListener("keydown", e => {
    if (e.key === "Enter" && !resumeIdParam) {
      e.preventDefault();
      const li = document.createElement("li");
      li.contentEditable = "true";
      listElement.appendChild(li);
      li.focus();
    }
  });
}
enableBulletEditing(rSkills);
enableBulletEditing(rInternships);
enableBulletEditing(rProjects);
enableBulletEditing(rLanguages);

function openPhotoPicker() { if (!resumeIdParam) hiddenPhotoInput.click(); }
hiddenPhotoInput.addEventListener("change", e => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => rPhoto.src = r.result;
  r.readAsDataURL(f);
});

async function saveResume() {
  const resumeName = rName.innerText.trim();
  if (!resumeName) return alert("Please enter a name");
  const data = {
    name: resumeName, email: rEmail.innerText, phone: rPhone.innerText, address: rAddress.innerText,
    about: rAbout.innerText, education: rEducation.innerText,
    internships: [...rInternships.children].map(li => li.innerText),
    skills: [...rSkills.children].map(li => li.innerText),
    projects: [...rProjects.children].map(li => li.innerText),
    languages: [...rLanguages.children].map(li => li.innerText),
    photo: rPhoto ? rPhoto.src : "",
    template: window.currentResumeTemplate || "student",
    createdAt: new Date().toISOString()
  };
  try {
    const res = await fetch("https://folio2resume-backend.onrender.com/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parseInt(userId), resumeData: JSON.stringify(data) })
    });
    if (res.ok) {
      saveMessage.style.display = "block";
      setTimeout(() => location.href = "saved-resumes.html", 1500);
    }
  } catch (e) { alert("Error saving"); }
}

function downloadResume() {
  const element = document.getElementById('resume');
  if (!element) return;

  // Make sure the element is ready and visible
  element.style.display = 'grid';

  const opt = {
    margin: 0,
    filename: 'Professional_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollY: -window.scrollY, // Fix for blank page issue when scrolled
      scrollX: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: 'avoid-all' }
  };

  // Standard direct save call is more reliable for simple A4 captures
  html2pdf().set(opt).from(element).save();
}
