const techStack = document.querySelector(".tech-stacks");

("use strict");

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressList = techStack.querySelectorAll("li");
      progressList.forEach((progress) => {
        const progressPercentage = progress.querySelector("p span").textContent;
        const progressElm = progress.querySelector(".progress-percent");
        progressElm.style.width = progressPercentage;
      });
    }
  });
};

const observerOptions = {
  root: null, // viewport
  threshold: 0.5, // 50% of element needs to be visible
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// 4. Start observing
observer.observe(techStack);

/*-------Import project Json file and render ---------*/
const projectsContainer = document.querySelector(".projects-container");

function renderProjects(data) {
  data.forEach((project) => {
    const html = `
    <div class="project">
    <img class="project-img" src="${project.projectImg}">
    
    <div class="project-detail">
    <h3>${project.projectName}</h3>
    <p>${project.projectStack}</p>
    </div>
    
    <div class="dev-project-link video-link-btn">
    Go To Video
    </div>
    </div>
    `;

    projectsContainer.insertAdjacentHTML("beforeend", html);
  });
}

async function fetchProjectData() {
  try {
    const response = await fetch("./projects.json");
    if (!response.ok) throw new Error("Could not fetch data");
    const data = await response.json();
    // Render projects
    renderProjects(data);
  } catch (error) {
    console.log(error);
  }
}

fetchProjectData();

/*-------add observer for the header: ---------*/
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const section4 = document.querySelector(".section-4");
const header = document.querySelector("header");
const headerWidth = window.getComputedStyle(header).height;

const secondObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.zIndex = "2";
    } else {
      header.style.position = "static";
    }
  });
};

const secondObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerWidth}`,
};

const secondObserver = new IntersectionObserver(
  secondObserverCallback,
  secondObserverOptions
);

secondObserver.observe(section1);

/*-------Third observer for the nav elements ---------*/
const navLinks = document.querySelectorAll(".nav-link");

const thirdObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        const sectionID = entry.target.id;
        const dataSet = link.dataset.section;

        if (sectionID === dataSet) {
          link.parentElement.classList.add("active");
        } else {
          link.parentElement.classList.remove("active");
        }
      });
    }
  });
};

const thirdObserverOptions = {
  root: null,
  threshold: 0.75,
};

const thirdObserver = new IntersectionObserver(
  thirdObserverCallback,
  thirdObserverOptions
);

thirdObserver.observe(section1);
thirdObserver.observe(section2);
thirdObserver.observe(section3);
thirdObserver.observe(section4);
