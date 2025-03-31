// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  // functions
  // go
  // here

  // Circle button panel logic
  const circleButtons = document.querySelectorAll("button.circle");
  const circleButtonsContents = document.querySelectorAll(
    "div.dropdown-content"
  );

  circleButtons.forEach(function (circleButton) {
    circleButton.addEventListener("click", function () {
      let thisContent = this.parentNode.querySelector(".dropdown-content");

      // Close other open panels
      circleButtonsContents.forEach((content) => {
        if (content === thisContent) {
          // do nothing
        } else {
          content.classList.remove("is-visible");
        }
      });

      // Toggle the clicked panel
      if (thisContent.classList.contains("is-visible")) {
        thisContent.classList.remove("is-visible");
      } else {
        thisContent.classList.add("is-visible");
      }
    });
  });






  // // Close the panel when a link inside the panel is clicked
  // circleButtonsContents.forEach(function (content) {
  //   const links = content.querySelectorAll("a"); // assuming the links inside the panel are <a> elements

  //   links.forEach(function (link) {
  //     link.addEventListener("click", function () {
  //       content.classList.remove("is-visible");
  //     });
  //   });
  // });









  // Function to show the footnote in the panel
document.querySelectorAll(".footnote a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    let footnotePanel = document.getElementById("footnote-panel");
    const footnoteId = this.getAttribute("data-footnote"); // Get the footnote ID from the clicked anchor
    const footnoteText = document.getElementById(
      `fn-${footnoteId}`
    ).innerHTML; // Get the corresponding footnote text

    const footnoteContent = document.getElementById("footnote-content");
    footnoteContent.innerHTML = footnoteText; // Set the footnote text inside the panel

    // Show the footnote panel if it's not already visible
    if (footnotePanel.style.display === "none" || footnotePanel.style.display === "") {
      footnotePanel.style.display = "block"; // Show the panel if it's not visible
    }

    // Update the current footnote id in the panel so we can prevent toggling if the same one is clicked
    footnotePanel.setAttribute("data-current-footnote", footnoteId);

    // Close all panels opened by the circle buttons (if any)
    circleButtonsContents.forEach((content) => {
      content.classList.remove("is-visible"); // Remove the is-visible class from all panels
    });
  });
});

// Function to close the footnote panel when scrolling the page
window.addEventListener("scroll", function () {
  const footnotePanel = document.getElementById("footnote-panel");
  footnotePanel.style.display = "none"; // Close the panel when the page is scrolled
});

// Function to close the footnote panel when clicking anywhere outside
document.addEventListener("click", function (e) {
  const footnotePanel = document.getElementById("footnote-panel");

  // If the click is outside the footnote panel and the footnote links, close the panel
  if (
    !footnotePanel.contains(e.target) && 
    !e.target.closest(".footnote a")
  ) {
    footnotePanel.style.display = "none"; // Close the panel
  }
});

// Prevent the panel from closing when clicking on a new footnote, just update the content
document.querySelectorAll(".footnote a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const footnotePanel = document.getElementById("footnote-panel");
    const currentFootnote = footnotePanel.getAttribute("data-current-footnote");

    // If the clicked footnote is the same as the currently displayed one, do nothing
    if (this.getAttribute("data-footnote") === currentFootnote) {
      return; // Prevent updating content if the same footnote is clicked
    }
  });
});






  // Function to enlarge or shrink the image when clicked (either [fig.x] or the image itself)
  function toggleImageSize(event) {
    const figId =
      event.target.getAttribute("data-fig") ||
      event.target.closest(".image").id.replace("fig-", ""); // Get figure ID from clicked element

    const imageContainer = document.getElementById("fig-" + figId); // Get the image container
    const image = imageContainer.querySelector("img");
    const caption = imageContainer.querySelector(".figcaption");

    // Toggle the enlarged state on the image container
    imageContainer.classList.toggle("enlarged");

    // If the image is being enlarged, show the caption below it
    if (imageContainer.classList.contains("enlarged")) {
      caption.style.display = "block"; // Ensure the caption is visible
    } else {
      caption.style.display = "none"; // Hide caption if image is shrunk
    }
  }

  // Add event listeners to the figure text (fig-link) and images
  document.querySelectorAll(".fig-link").forEach((link) => {
    link.addEventListener("click", toggleImageSize); // Trigger enlargement on figure link click
  });

  document.querySelectorAll(".image img").forEach((img) => {
    img.addEventListener("click", toggleImageSize); // Trigger enlargement on image click
  });

  document.querySelectorAll(".fignumber").forEach((link) => {
    link.addEventListener("click", toggleImageSize); // Trigger enlargement on image click
  });


  
    // Close the panel when a link inside the panel is clicked
    circleButtonsContents.forEach(function (content) {
      const links = content.querySelectorAll("a"); // assuming the links inside the panel are <a> elements
  
      links.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default anchor behavior
  
          // Get the target element ID from the link's href
          const targetId = this.getAttribute("href").substring(1); // Remove the '#' from href
          const targetElement = document.getElementById(targetId);
  
          if (targetElement) {
            // Find the section containing the target element
            const section = targetElement.closest("section");
  
            if (section) {
              // Find the checkboxes and content div within the section
              const trueCheckbox = section.querySelector('input[type="checkbox"][id^="true-"]');
              const falseCheckbox = section.querySelector('input[type="checkbox"][id^="false-"]');
              const contentDiv = section.querySelector(".content");
  
              if (trueCheckbox && falseCheckbox && contentDiv) {
                // If the section is not visible, make it visible
                if (!trueCheckbox.checked) {
                  trueCheckbox.checked = true;
                  falseCheckbox.checked = false;
                  contentDiv.style.display = "grid"; // Show the content
                }
              }
            }
  
            // Scroll to the target element
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
  
          // Close the panel
          content.classList.remove("is-visible");
        });
      });
    });
  
    
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const section = this.closest("section"); // Find the section for this checkbox
      const content = section.querySelector(".content"); // Find the associated content div

      // Extract the section ID from the checkbox ID
      const sectionId = this.id.split("-")[1]; // 'intro' for #true-intro or 'overview' for #true-overview

      // Find both checkboxes (true and false) within the section
      const trueCheckbox = section.querySelector(`#true-${sectionId}`);
      const falseCheckbox = section.querySelector(`#false-${sectionId}`);

      // Select the extra text element for the 'false' checkbox
      const falseTextElement = section.querySelector(".false-text-element");

      // If one checkbox is checked, uncheck the other
      if (this === trueCheckbox && trueCheckbox.checked) {
        falseCheckbox.checked = false; // Uncheck the false checkbox if true is selected
      }
      if (this === falseCheckbox && falseCheckbox.checked) {
        trueCheckbox.checked = false; // Uncheck the true checkbox if false is selected
      }

      // // Toggle content visibility based on checkbox
      // if (trueCheckbox.checked) {
      //   content.style.display = "grid"; // Show content when true is selected
      // } else if (falseCheckbox.checked || !trueCheckbox.checked) {
      //   content.style.display = "none"; // Hide content when false is selected
      // }


    // Toggle content visibility based on checkbox
      if (trueCheckbox.checked) {
        content.style.display = "grid"; // Show content when true is selected
         falseTextElement.style.display = "none"; // Hide the extra text when true is selected
      } else if (falseCheckbox.checked) {
         content.style.display = "none"; // Hide content when false is selected
         falseTextElement.style.display = "grid"; // Show the extra text when false is selected
      } else {
         content.style.display = "none"; // Hide content if neither checkbox is checked
         falseTextElement.style.display = "none"; // Ensure the extra text is hidden
      }


    });
  });
  




  // Select the checkboxes
  const yesCheckbox = document.getElementById("yes");
  const noCheckbox = document.getElementById("no");

  // Listen for changes on the checkboxes
  yesCheckbox.addEventListener("change", handleCheckboxChange);
  noCheckbox.addEventListener("change", handleCheckboxChange);

  function handleCheckboxChange() {
    // If either checkbox is checked, scroll to the next section
    if (yesCheckbox.checked || noCheckbox.checked) {
      const nextSection = document.getElementById("greybox"); // Get the next section by ID
      nextSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align the next section to the top of the viewport
      });
    }
  }
});
