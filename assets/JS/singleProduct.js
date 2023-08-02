const stars = document.querySelectorAll('.star-rating>i');
const star=document.getElementsByClassName('stars-input')[0];

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
