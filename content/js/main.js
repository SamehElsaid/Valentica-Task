const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userNameValue = e.target.userName.value.trim().toLocaleLowerCase();
  const password = e.target.password.value.trim();
  const rePassword = e.target.rePassword.value.trim();
  const email = e.target.email.value.trim().toLocaleLowerCase();
  let vaildUserName = false;
  let vaildpassword = false;
  let vaildrePassword = false;
  const special = /[!@#$%_^&*]/g;
  //userName Vaildation
  if (special.test(userNameValue)) {
    form.userName.parentElement.parentElement.querySelector("span").innerText =
      "Username mussacters";
    vaildUserName = false;
  } else if (!isNaN(userNameValue.charAt()) || !isNaN(userNameValue.at(-1))) {
    form.userName.parentElement.parentElement.querySelector("span").innerText =
      "Not vaild numbers at the beginning or the end";
    vaildUserName = false;
  } else if (userNameValue.length < 5 || userNameValue.length > 15) {
    form.userName.parentElement.parentElement.querySelector("span").innerText =
      "Username must consist of 5 to 15 characters";
    vaildUserName = false;
  } else {
    form.userName.parentElement.parentElement.querySelector("span").innerText =
      "";
    vaildUserName = true;
  }
  //password Vaildation
  if (password.length < 8) {
    form.password.parentElement.parentElement.querySelector("span").innerText =
      "Password must be at least 8 characters";
    vaildpassword = false;
  } else {
    form.password.parentElement.parentElement.querySelector("span").innerText =
      "";
    vaildpassword = true;
  }
  //rePassword Vaildation
  if (password === rePassword) {
    form.rePassword.parentElement.parentElement.querySelector(
      "span"
    ).innerText = "";
    vaildrePassword = true;
  } else {
    form.rePassword.parentElement.parentElement.querySelector(
      "span"
    ).innerText = "Password Not match";
    vaildrePassword = false;
  }
  // Allinput Vaildation
  if (vaildUserName && vaildpassword && vaildrePassword) {
    form.btn.disabled = "disabled";
    fetch("https://goldblv.com/api/hiring/tasks/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: userNameValue,
        email,
        password,
        password_confirmation: rePassword,
      }),
    })
      .then((res) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            username: userNameValue,
            email,
            password,
            password_confirmation: rePassword,
          })
        );
        e.target.userName.value = "";
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.rePassword.value = "";
        form.btn.disabled = "";
        window.location.href = "successfully.html";
      })
      .catch((res) => {
        console.log(res);
      });
  }
});
if (JSON.parse(localStorage.getItem("login"))) {
  window.location.href = "successfully.html";
}
