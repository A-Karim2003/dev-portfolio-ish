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
    console.log(project.projectStack);
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
