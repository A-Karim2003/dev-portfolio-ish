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
