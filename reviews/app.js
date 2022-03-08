const reviews = [
  {
    id: 1,
    name: "Creed Bratton",
    job: "Theif",
    img: "Screenshot (662).png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt, eius earum ipsam cupiditate libero?Iste, doloremque nihil?",
  },
  {
    id: 2,
    name: "Dwight Schrute",
    job: "assistant to the regional manager",
    img: "Screenshot (655).png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt, eius earum ipsam cupiditate libero?Iste, doloremque nihil?",
  },
  {
    id: 3,
    name: "Michael Scott",
    job: "the manager",
    img: "the-office.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt, eius earum ipsam cupiditate libero?Iste, doloremque nihil?",

  },
  {
    id: 4,
    name: "Kevin Malone",
    job: "accounter",
    img: "Screenshot (340).png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt, eius earum ipsam cupiditate libero?Iste, doloremque nihil?",
  },
];


const img=document.getElementById('person-img');
const author=document.getElementById('author');
const job=document.getElementById('job');
const info=document.getElementById('info');

const prevBtn=document.querySelector('.prev-btn')
const nextBtn=document.querySelector('.next-btn')
const rndBtn=document.querySelector('.random-btn')

let currentItem=0;


window.addEventListener("DOMContentLoaded",()=>{
showPerson(currentItem);
})

nextBtn.addEventListener('click',()=>{
  currentItem++;
  if (currentItem > reviews.length - 1) {
      currentItem = 0;
    }
    showPerson(currentItem);
});

prevBtn.addEventListener('click',()=>{
  currentItem--;
  if (currentItem < 0) {
      currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});

function showPerson(person){
    const item=reviews[person];
    img.src=item.img;
    author.innerText=item.name;
    job.innerText=item.job;
    info.innerText=item.text;
}

rndBtn.addEventListener("click", function () {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);
  });