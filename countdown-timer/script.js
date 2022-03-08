const newYear="1 Jan 2023"
const daysEl=document.getElementById('days');
const hoursEl=document.getElementById('hours');
const minutesEl=document.getElementById('mins');
const secondsEl=document.getElementById('seconds');


function coundown(){
    const newYearDate=new Date(newYear);
    const currentYear= new Date();
    const totalseconds=(newYearDate-currentYear)/1000;
    const days=Math.floor(totalseconds/3600/24);
    const hours=Math.floor(totalseconds/3600%24);
    const minutes=Math.floor(totalseconds/60%24);
    const seconds=Math.floor(totalseconds%60);

    daysEl.innerText=formatTime(days);
    hoursEl.innerText=formatTime(hours);
    minutesEl.innerText=formatTime(minutes);
    secondsEl.innerText=formatTime(seconds);
}

const formatTime=(time)=>{
    return time<10?(`0${time}`):time;
}

coundown();

setInterval(coundown,1000);