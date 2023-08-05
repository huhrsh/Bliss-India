const password=document.getElementById('input-password');
const confirmPassword=document.getElementById('confirm-password');
const eyeButton=document.querySelectorAll('.password>i');

eyeButton[0].onclick=()=>{
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
}

if(eyeButton.length>1){
  eyeButton[1].onclick=()=>{
      if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
      } else {
        confirmPassword.type = "password";
      }
  }
}




