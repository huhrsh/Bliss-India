const inputTags = document.querySelectorAll('.change-form input');
const submitButton = document.querySelectorAll('.change-form input[type="submit"]');



submitButton[0].onclick = (e) => {
    e.preventDefault();
    if (inputTags[1].length < 8 || inputTags[2].length<8) {
        console.log("Password length less than 8");
        // add Notification
        return;
    }
    else if (inputTags[1].value != inputTags[2].value) {
        console.log("Passwords do not match");
        // add Notification
        return;
    }
    else{
        document.getElementsByClassName('change-form')[0].submit();
    }
}