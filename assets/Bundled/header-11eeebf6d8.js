const userButton=document.getElementsByClassName("user")[0];let userHoverPosition=userButton.getBoundingClientRect();const userHover=document.getElementsByClassName("user-hover")[0];userButton.onmouseenter=()=>{const e=document.getElementById("user-hover-loader");userHover.style.display="flex",userHover.style.left=userHoverPosition.right-userHoverPosition.width/2-userHover.getBoundingClientRect().width/2+"px",console.log(userHover.getBoundingClientRect()),e.animate({width:"40%"},{duration:250,fill:"forwards",easing:"ease-in"})},userButton.onmouseleave=e=>{const t=document.getElementById("user-hover-loader");let o=userHover.getBoundingClientRect();e.clientX<=o.right&e.clientX>=o.left&e.clientY<=o.bottom&e.clientY>=o.top-10?userHover.style.display="flex":(userHover.style.display="none",t.animate({width:"0%"},{duration:250,fill:"forwards",easing:"ease-out"}))},userHover.onmouseleave=()=>{const e=document.getElementById("user-hover-loader");userHover.style.display="none",e.animate({width:"0%"},{duration:250,fill:"forwards",easing:"ease-out"})};