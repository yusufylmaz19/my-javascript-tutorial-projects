let count=0;

const value=document.getElementById('value');
const btns=document.querySelectorAll('.btn');

btns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let className=e.currentTarget.classList;
        if(className.contains('decrease')){
            count++;
        }
        else  if(className.contains('increase')){
            count--;
        }
        else{
            count=0;
        }
        value.innerText=count;
    })
})
