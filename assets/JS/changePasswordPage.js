const inputTags = document.querySelectorAll('.change-form input');
const submitButton = document.querySelectorAll('.change-form input[type="submit"]');

const oldPassword=document.getElementById('old-password');
const password=document.getElementById('input-password');
const confirmPassword=document.getElementById('confirm-password');
const eyeButton=document.querySelectorAll('.password>i');

eyeButton[0].onclick=()=>{
    if (oldPassword.type === "password") {
      oldPassword.type = "text";
    } else {
      oldPassword.type = "password";
    }
}

eyeButton[1].onclick=()=>{
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
}

eyeButton[2].onclick=()=>{
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
    } else {
      confirmPassword.type = "password";
    }
}

// submitButton[0].onclick = (e) => {
//     e.preventDefault();
//     inputTags[1].type='text';
//     inputTags[2].type='text';
//     console.log(inputTags[1].value.length);
//     if (inputTags[1].value < 8 || inputTags[2].value<8) {
//         console.log("Password length less than 8");
//         req.flash('error' , 'Password should be of atleast 8 characters.');
//         // location.reload();
//     }
//     else if (inputTags[1].value != inputTags[2].value) {
//         console.log("Passwords do not match");
//         // location.reload();
//         req.flash('error' , 'Passwords do not match');
//     }
//     else{
//         document.getElementsByClassName('change-form')[0].submit();
//     }
// }