// const hoverLoader = document.getElementById('hover-loader');
// const navBar = document.getElementsByClassName('category');
// const pendantHover = document.getElementsByClassName('pendant-hover')[0];
const userButton = document.getElementsByClassName('user')[0];
// const userHover= document.getElementsByClassName('user-hover')[0];
// const userHoverLoader = document.getElementById('user-hover-loader');


// let buttonPosition = navBar[1].getBoundingClientRect();
// let userHoverPosition = userButton.getBoundingClientRect();
// pendantHover.style.top = `${buttonPosition.bottom}px`;
// userHover.style.top = `${userHoverPosition.bottom}px`;

// navBar[1].onmouseenter = () => {
//     const hoverLoader = document.getElementById('hover-loader');
//     const pendantHover = document.getElementsByClassName('pendant-hover')[0];
    
//     pendantHover.style.display = 'flex';
//     pendantHover.style.left = `${(buttonPosition.right-buttonPosition.width/2-pendantHover.getBoundingClientRect().width/2)}px`;
    
//     hoverLoader.animate({
//         width: '52%',
//         marginLeft: '24%'
//     }, { duration: 250, fill: 'forwards', easing: 'ease-in' })
// }

// navBar[1].onmouseleave = (e) => {
//     let hoverPosition = pendantHover.getBoundingClientRect();
//     if ((e.clientX <= hoverPosition.right & e.clientX >= hoverPosition.left) & (e.clientY <= hoverPosition.bottom & e.clientY >= hoverPosition.top - 10)) {

//     }
//     else {
//         pendantHover.style.display = 'none';
//         hoverLoader.animate({
//             width: '0%',
//             marginLeft: '50%',
//         }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
//     }
// }

// pendantHover.onmouseleave = () => {
//         pendantHover.style.display = 'none';
//     hoverLoader.animate({
//         width: '0%',
//         marginLeft: '50%',
//     }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
// }


setTimeout(()=>{
    let userHoverPosition = userButton.getBoundingClientRect();
const userHover= document.getElementsByClassName('user-hover')[0];
userButton.onmouseenter = () => {
    const userHoverLoader = document.getElementById('user-hover-loader');
    userHover.style.display = 'flex';
    userHover.style.left = `${(userHoverPosition.right-userHoverPosition.width/2-userHover.getBoundingClientRect().width/2)}px`;
    console.log(userHover.getBoundingClientRect());
    userHoverLoader.animate({
        width: '40%',
    }, { duration: 250, fill: 'forwards', easing: 'ease-in' })
}

// userButton.style.background='red';

userButton.onmouseleave = (e) => {
    const userHoverLoader = document.getElementById('user-hover-loader');
    let hoverPosition = userHover.getBoundingClientRect();
    if ((e.clientX <= hoverPosition.right & e.clientX >= hoverPosition.left) & (e.clientY <= hoverPosition.bottom & e.clientY >= hoverPosition.top-10)) {
        userHover.style.display = 'flex';
    }
    else {
        userHover.style.display = 'none';
        userHoverLoader.animate({
            width: '0%',
        }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
    }
}

userHover.onmouseleave = () => {
    const userHoverLoader = document.getElementById('user-hover-loader');
    userHover.style.display = 'none';
    userHoverLoader.animate({
        width: '0%',
    }, { duration: 250, fill: 'forwards', easing: 'ease-out' })
}

},100);
