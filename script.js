// Add click event listener to all nav links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all nav links
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    link.classList.add("active");

    // Hide all sections
    document.querySelectorAll("section").forEach((section) => {
      section.classList.remove("active");
    });

    // Show the corresponding section based on link href
    const targetId = link.getAttribute("href").substr(1);
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add("active");
  });
});
//dropdown
const dropdownButton = document.querySelector(".dropbtn");
const dropdownMenu = document.querySelector(".dropdown-content");

//Home button
const contactButton = document.querySelector(".btnHome:nth-of-type(1)");
const resumeButton = document.querySelector(".btnHome:nth-of-type(2)");
const contact = document.getElementById("contact");
const resume = document.getElementById("resume");
const home = document.getElementById("home");

contactButton.addEventListener("click", () => {
  contact.classList.add("active");
  home.classList.remove("active");
});

resumeButton.addEventListener("click", () => {
  resume.classList.add("active");
  home.classList.remove("active");
});

//Resume buttons
const buttons = document.querySelectorAll(".btn");
const sections = document.querySelectorAll(".description");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    sections.forEach((section) => {
      if (section.classList.contains(event.target.classList[1])) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
    // console.log(event.target.classList[1]);
  });
});

//Youtube video fetch
fetch(
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCim7hFexyACj7JNyBrLGBrA&maxResults=6&order=date&key=AIzaSyA-MOrshdNwsrDGuVl-JzlcMYAnEyK8iA4`
)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    // console.log(data.items);
    let videos = data.items;
    const videocontainer = document.querySelector(".youtube-container");
    videos.forEach((video) => {
      videocontainer.innerHTML += `
      <div class="video">
      <h1>${video.snippet.title}</h1>
      <img src="${video.snippet.thumbnails.high.url}">
      </div>`;
    });
  });

//Form selection
const myForm = document.getElementById("my");
const skill_Form = document.getElementById("skilladd");
const edu_Form = document.getElementById("eduAdd");
const ex_Form = document.getElementById("exAdd");
const vol_Form = document.getElementById("volAdd");

const selectBtn = document.getElementById("selectBtn");
selectBtn.addEventListener("click", showSelectedForm);

function showSelectedForm(event) {
  event.preventDefault();

  // Get the selected option value and show the corresponding form and create HTML
  const selectedOption = document.getElementById("category").value;
  const selectedForm = document.getElementById(`${selectedOption}Form`);
  selectedForm.classList.remove("hidden");

  myForm.innerHTML = `<label for="about">About: </label>
                  <input type="text" id="about" name="about"/>
                  <button class="formBtn" type="submit">Submit</button>`;

  skill_Form.innerHTML = `<label for="skill">Skill: </label>
                  <input type="text" id="skill" name="skill" />
                  <button class="formBtn" type="submit">Submit</button>`;

  edu_Form.innerHTML = `<label for="education">Education: </label>
                  <input type="text" id="education" name="education"/>
                  <br>
                  <label for="institution">Institution: </label>
                  <input type="text" id="institution" name="institution"/>
                  <button class="formBtn" type="submit">Submit</button>`;

  ex_Form.innerHTML = `<label for="designation">Designation: </label>
                  <input type="text" id="designation" name="designation"/>
                  <br>
                  <label for="organization">Organization: </label>
                  <input type="text" id="organization" name="organization"/>
                  <br>
                  <label for="date">Date(From - To): </label>
                  <input type="text" id="date" name="date"/>
                  <button class="formBtn" type="submit">Submit</button>`;

  vol_Form.innerHTML = `<label for="experience">Experience: </label>
                  <input type="text" id="designation" name="experience"/>
                  <br>
                  <label for="organization">Organization: </label>
                  <input type="text" id="organization" name="organization"/>
                  <br>
                  <label for="date">Date(From - To): </label>
                  <input type="text" id="date" name="date"/>
                  <button class="formBtn" type="submit">Submit</button>`;

  // Hide all other forms
  const allForms = document.querySelectorAll('[id$="Form"]');
  allForms.forEach((form) => {
    if (form !== selectedForm) {
      form.classList.add("hidden");
    }
  });
}

//Update about
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(my).get("about");
  console.log(formData);

  document.querySelector(".myself").textContent = formData;

  myForm.reset();
});

// //Add skills
skill_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(skilladd).get("skill");
  // console.log(formData);

  const newSkill = document.createElement("li");
  newSkill.textContent = formData;

  document.getElementsByClassName("skills")[0].appendChild(newSkill);

  skill_Form.reset();
});

//Add education
edu_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const education = new FormData(eduAdd).get("education");
  // console.log(education);
  const institution = new FormData(eduAdd).get("institution");
  // console.log(institution);
  const newEducation = document.createElement("h2");
  const newInstitution = document.createElement("h3");
  const list = document.createElement("li");

  newEducation.textContent = education;
  newInstitution.textContent = institution;

  list.appendChild(newEducation);
  list.appendChild(newInstitution);
  document.getElementsByClassName("education")[0].appendChild(list);

  edu_Form.reset();
});
//Add experience
ex_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const designation = new FormData(exAdd).get("designation");
  const organization = new FormData(exAdd).get("organization");
  const date = new FormData(exAdd).get("date");

  const newExperience = document.createElement("li");

  newExperience.innerHTML = `<h2>${designation}</h2>
  <div class="conatiner"><img src="#">
  <h3>${organization}</h3>
  </div>
  <h4>${date}</h4>`;

  document.getElementsByClassName("experience")[0].appendChild(newExperience);

  ex_Form.reset();
});

//Add volunteering
vol_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const designation = new FormData(volAdd).get("experience");
  const organization = new FormData(volAdd).get("organization");
  const date = new FormData(volAdd).get("date");

  const newVolunteering = document.createElement("li");

  newVolunteering.innerHTML = `<h2>${designation}</h2>
  <div class="conatiner"><img src="#">
  <h3>${organization}</h3>
  </div>
  <h4>${date}</h4>`;

  document
    .getElementsByClassName("volunteering")[0]
    .appendChild(newVolunteering);

  vol_Form.reset();
});

//contact Me(scroll down to hire me form)
const hirebutton = document.querySelector(".hireBtn");
const hiddenElement = document.querySelector(".my-hidden-element");
const contactTop = document.querySelector(".contact-top");

hirebutton.addEventListener("click", () => {
  hiddenElement.scrollIntoView({ behavior: "smooth" });

  hiddenElement.style.display = "block" ? "block" : "none";
  contactTop.style.display = "block" ? "none" : "block";
});

const cancel = document.querySelectorAll(".app-form-button")[0];

cancel.addEventListener("click", (e) => {
  e.preventDefault();

  hiddenElement.style.display = "block" ? "none" : "block";
  contactTop.style.display = "block" ? "block" : "none";
});

//POST
const nameInput = document.querySelector('input[placeholder="NAME"]');
const emailInput = document.querySelector('input[placeholder="EMAIL"]');
const contactInput = document.querySelector('input[placeholder="CONTACT NO"]');
const messageInput = document.querySelector('input[placeholder="MESSAGE"]');

const sendButton = document.querySelector(
  ".buttons .app-form-button:last-of-type"
);

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://example.com/contact", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    contact: contactInput.value,
    message: messageInput.value,
  };
  const json = JSON.stringify(data);
  xhr.send(json);
  nameInput.value = "";
  emailInput.value = "";
  contactInput.value = "";
  messageInput.value = "";
  hiddenElement.style.display = "none";
  contactTop.style.display = "block";
  alert("Message sent successfully!");
});

//LinkedIn Data🤩
// const accessToken =
//   "AQXRbWM3k7iwU3AUZS-BnPUrJgTVj7eOXkmR3MdJIRz2mEI_1E016iMbNZQWbKNSXgOauQj6JeLahNAHJ5gBhuL4H2XaEUDQ4yvmNtJK9Ugsq0sblZGsLRbMWgs0EGRNl7o36_5SGQ0WOEwTAVUEoFZy8JhlpFPEu7LQz2FI5SC7eVDphSQCLgQ_z6oxnYOjU0BKZeHlDnNph9To8JXzYmBkwrr8Er6V-J7ZixL1BRU5LuGlmZIGL__ktqcF4SCqscodRcVDaHMTKr0SQUTpJsLQyBVAva3OixOG7-nKygF9XmaTD23ABDHYlC7MewpmC3xFiJSf4LQW6j_aPMwUngPqA_EYOA";
// const apiUrl = "https://api.linkedin.com/v2/me";
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// const headers = new Headers({
//   Authorization: `Bearer ${accessToken}`,
//   "Content-Type": "application/json",
// });

// const options = {
//   method: "GET",
//   headers: headers,
//   mode: "cors",
// };

// const finalUrl = proxyUrl + apiUrl;

// fetch(finalUrl, options)
//   .then((response) => response.json())
//   .then((data) => console.log(data.localizedFirstName))
//   .catch((error) => console.error(error));
