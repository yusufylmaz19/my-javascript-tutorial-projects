const colors=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
const btn=document.getElementById("button");
const hex=document.getElementById('hex');

btn.addEventListener("click",()=>{
    let hexColor='#';

    for(let i=0;i<6;i++){
         hexColor += chooseRandom(colors);
    }

    document.body.style.backgroundColor=hexColor;
    hex.innerText=hexColor;
});


function chooseRandom(array){
    let rnd=Math.floor(Math.random()*array.length);
    return array[rnd];
}