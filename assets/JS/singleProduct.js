const stars = document.querySelectorAll('.star-rating>i');
const star=document.getElementsByClassName('stars-input')[0];
const heart=document.getElementById('heart')


for (let i=0;i<stars.length;i++) {
//    stars[i].onclick = () => {
//         let ratingValue = parseInt(stars[i].getAttribute('data-value'));
//         star.value=ratingValue;
//    }
   stars[i].onclick = () => {
        let ratingValue = parseInt(stars[i].getAttribute('data-value'));
        star.value=ratingValue;
        for (let j = 0; j < ratingValue; j++) {
            stars[j].style.color = "gold";
        }
        for(let j=ratingValue;j<stars.length;j++){
            stars[j].style.color = "white";
        }
    }    
}

if(heart){
    heart.addEventListener('mouseover',()=>{
        heart.className="fa-regular fa-heart animate__animated animate__pulse animate__infinite";
    })
    heart.addEventListener('mouseleave',()=>{
        heart.className="fa-regular fa-heart";
    })
}

