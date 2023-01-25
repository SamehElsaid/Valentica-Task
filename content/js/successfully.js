if(JSON.parse(localStorage.getItem("login"))){
    const userEmail = JSON.parse(localStorage.getItem("login"))
    document.getElementById("userEmail").innerText = `${userEmail.email}`
}else{
        window.location.href = "create.html";
}