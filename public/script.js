

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  // console.log(registrationForm)

  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    //validate form input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      // alert("Please fill in all fields");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields",
        timer: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      // alert("Password do not match!");
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password do not match!",
        timer: 2000,
      });
      return;
    }

    //if all validations are correct
    const formData = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    };
    animateText();

    // sending data to Node.js
    try {
      const response = await axios.post("/api/register", formData);
      // alert("Registraion Successful!");
      Swal.fire({
        icon: "success",
        title: "Registraion Successful!",
        text: "You have been registered successfully",

        timer: 2000,
      }).then(() => {
        registrationForm.reset();
      });
      // console.log(response.data)
    } catch (error) {
      if (error.response && error.response.data) {
        // alert(`Registration failed: ${error.response.data.message}`);
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: `Registration failed: ${error.response.data.message}`,
          timer: 2000,
        });
      } else {
        // alert("Registration failed in JS. Please try again later");
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "Registration failed. Please try again later.",
          timer: 2000,
        });
        console.error(error);
      }
    }
  });
  function animateText() {
    const animatedTextElements = document.querySelectorAll(".animated-text");
  
    animatedTextElements.forEach((element) => {
      element.style.animation = "none";
      void element.offsetWidth; // Trigger reflow to restart animation
      element.style.animation = null;
    });
  }
});

