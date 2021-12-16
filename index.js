
const onReady = () => {
    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", searchHandler);
  }
  
  const searchHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const errors = validateForm(formData);
  
    //Clear previous errors
    const errorElements = document.querySelectorAll(".error");
    for (let element of errorElements) {
      element.style.display = "none";
    }
  
    //Show new errors
    Object.keys(errors).forEach((key) => {
      const newError = document.createElement("div");
      newError.innerHTML = `${errors.name}`;
      newError.classList.add("error");
      newError.id = "searchError"
      event.target.appendChild(newError);
    })
  
    //If there are no errors
    if (!Object.keys(errors).length) {
      const searchTerm = Array.from(formData)[0][1].toLowerCase();
      const allArticles = document.querySelectorAll(".articles article");
      for (let art of allArticles.values()) {
        art.classList.remove("hidden");
        const title = art.querySelector("h2");
        if (!title.innerText.toLowerCase().includes(searchTerm)) {
          art.classList.add("hidden");
        }
      }
    }
  }
  
  const validateForm = (formData) => {
    const errors = {};
    if(!checkExists(formData.get("searchTerm"))) {
      errors.name = "Please enter a search term";
    }
    return errors;
  }
  
  const checkExists = (value) => {
    return value && value.trim();
  }
  
  window.addEventListener("DOMContentLoaded", onReady);