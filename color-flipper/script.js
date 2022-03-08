const colors=['Red','Yellow','rgba(144,64,49,0.7)','#f15456']
const btn=document.getElementById("button");
const hex=document.getElementById('hex');

btn.addEventListener("click",()=>{
    const color=chooseRandom(colors);
    document.body.style.backgroundColor=color;
    hex.innerText=color;
});


function chooseRandom(array){
    let rnd=Math.floor(Math.random()*array.length);
    return array[rnd];
}