const password=document.getElementById('input-password');
const eyeButton=document.querySelector('.password>i');


eyeButton.onclick=()=>{
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
}