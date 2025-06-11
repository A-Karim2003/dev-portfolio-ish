"use strict";

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      section3content.classList.add("change");
      // ensures the element is only observed once
      observer.unobserve(entry.target);
    }
  });
};

const observerOptions = {
  root: null, // viewport
  threshold: 0.5, // 50% of element needs to be visible
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// 4. Start observing
observer.observe(section3);
