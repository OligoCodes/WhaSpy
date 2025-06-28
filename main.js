const getDetails = () => {
  const phoneInput = document.getElementById('phoneNumber');
  const phone = phoneInput.value.trim();
  const thirdSection = document.querySelector(".third");
  const searchButton = document.getElementById("lookup"); // Add this ID to your button

  // Remove old profile picture
  const oldImg = document.getElementById("profilePic");
  if (oldImg) oldImg.remove();

  // Validate input
  if (phone === "") {
    alert("Please enter the number.");
    return;
  }

  const url = `https://whaspy-backend.onrender.com/getProfilePic?phone=${phone}`;

  // Hide other elements
  thirdSection.querySelectorAll("p, .handle, .fa-magnifying-glass").forEach(element => {
    element.style.display = "none";
  });

  // Disable button to prevent multiple requests
  if (searchButton) searchButton.disabled = true;

  // Show spinner
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  spinner.innerHTML = `<div class="spinner-circle"></div>`;
  thirdSection.appendChild(spinner);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Image not found or API failed.");
      return res.blob();
    })
    .then(blob => {
      setTimeout(() => {
        spinner.remove();

        const img = document.createElement("img");
        img.id = "profilePic";
        img.alt = "Profile Picture";
        img.width = 300;
        img.height = 300;
        img.src = URL.createObjectURL(blob);
        img.style.display = "block";
        thirdSection.appendChild(img);

        if (searchButton) searchButton.disabled = false;
      }, 2000);
    })
    .catch(err => {
      spinner.remove();
      alert("Failed to load profile picture. Please try again.");
      console.error("Something went wrong!: ", err);

      // Optionally show elements again if needed
      thirdSection.querySelectorAll("p, .handle, .fa-magnifying-glass").forEach(element => {
        element.style.display = "block";
      });

      if (searchButton) searchButton.disabled = false;
    });
};
