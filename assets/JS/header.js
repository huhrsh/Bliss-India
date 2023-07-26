const hoverLoader = document.getElementById('hover-loader');
const navBar = document.getElementsByClassName('category');
const pendantHover = document.getElementsByClassName('pendant-hover')[0];
const userButton = document.getElementsByClassName('user')[0];
const userHover= document.getElementsByClassName('user-hover')[0];
const userHoverLoader = document.getElementById('user-hover-loader');

// const pendantCategories=document.getElementsByClassName('pendant-categories');
let buttonPosition = navBar[1].getBoundingClientRect();
pendantHover.style.top = `${buttonPosition.bottom}px`;
pendantHover.style.left = `${(buttonPosition.left + buttonPosition.right) / 2 - 97}px`;

navBar[1].onmouseenter = () => {
    pendantHover.style.display = 'flex';
    
    hoverLoader.animate({
        width: '40%',
        marginLeft: '30%'
    }, { duration: 250, fill: 'forwards', easing: 'ease-in' })
}

navBar[1].onmouseleave = (e) => {
    let hoverPosition = pendantHover.getBoundingClientRect();
    if ((e.clientX <= hoverPosition.right & e.clientX >= hoverPosition.left) & (e.clientY <= hoverPosition.bottom & e.clientY >= hoverPosition.top - 10)) {

    }
    else {
        pendantHover.style.display = 'none';
        hoverLoader.animate({
            width: '0%',
            marginLeft: '50%',
        }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
    }
}

pendantHover.onmouseleave = () => {
        pendantHover.style.display = 'none';
    hoverLoader.animate({
        width: '0%',
        marginLeft: '50%',
    }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
}




let userHoverPosition = userButton.getBoundingClientRect();
userHover.style.top = `${userHoverPosition.bottom}px`;
userHover.style.left = `${(userHoverPosition.left + userHoverPosition.right) / 2 - 46}px`;
console.log(userHover.getBoundingClientRect())
userButton.onmouseenter = () => {
    userHover.style.display = 'flex';
    userHoverLoader.animate({
        width: '40%',
    }, { duration: 250, fill: 'forwards', easing: 'ease-in' })
}

userButton.onmouseleave = (e) => {
    let hoverPosition = userHover.getBoundingClientRect();
    if ((e.clientX <= hoverPosition.right & e.clientX >= hoverPosition.left) & (e.clientY <= hoverPosition.bottom & e.clientY >= hoverPosition.top - 10)) {

    }
    else {
        userHover.style.display = 'none';
        userHoverLoader.animate({
            width: '0%',
        }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
    }
}

userHover.onmouseleave = () => {
        userHover.style.display = 'none';
    userHoverLoader.animate({
        width: '0%',
    }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
}
