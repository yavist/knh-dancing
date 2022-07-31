import { showInfoModal } from "/knh-dancing/modal.js"
//import { showInfoModal } from "/modal.js"

const DELAY_TIME = 500;
const CORRECT_SEQUENCE = [
  ["tile3_4_right", 
  "tile3_4_left", 
  "tile3_5_right", 
  "tile3_5_left", 
  "tile3_4_left", 
  "tile3_4_right", 
  "tile3_3_left", 
  "tile3_3_right", 
  "tile2_3_left", 
  "tile3_3_left", 
  "tile4_3_right", 
  "tile3_3_right", 
  "tile2_3_left", 
  "tile3_3_left", 
  "tile4_3_right", 
  "tile3_3_right"]
]


let currentSequence = [];
let originPositionLeft;
let originPositionRight;

var backgroundmusic = new Audio('background.mp3');
const tds = document.querySelectorAll("td") 

for (const td of tds) {
  td.classList.toggle("grid")
}

document.querySelectorAll('.tile').forEach(item => {
    item.addEventListener('click', event => {
        
            if(event.target.classList.contains("left") & originPositionLeft){
                document.querySelector("#tile3_3_left").classList.toggle("glowUpLeft");
                originPositionLeft=false;
            }
            if(event.target.classList.contains("right") & originPositionRight){
                document.querySelector("#tile3_3_right").classList.toggle("glowUpRight");
                originPositionRight=false;
            }

            if(event.target.classList.contains("left")){
              event.target.classList.toggle("glowUpLeft")  
              currentSequence.push(event.target.id)
              document.body.classList.add('makeDark')
              
            }

            if(event.target.classList.contains("right")){
              event.target.classList.toggle("glowUpRight")  
              currentSequence.push(event.target.id)
              document.body.classList.toggle('makeDark')
              
            }

            
          
           
            
            
            
            
            //event.target.classList.toggle("shadow")

      setTimeout(function(){
        if(event.target.classList.contains("right")){
          event.target.classList.toggle("glowUpRight");
        }
        if(event.target.classList.contains("left")){
          event.target.classList.toggle("glowUpLeft");
        }

        document.body.classList.toggle('makeDark')
        //ocument.body.classList.toggle('original')
        //event.target.classList.toggle("shadow")
      }, DELAY_TIME);
      if(currentSequence.length > CORRECT_SEQUENCE.length){
        showInfoModal("FALSCH!", "Das war nicht ganz richtig. Versucht es nochmal.", "Okay", "darkred")
      }
      console.log(currentSequence)
      if(arraysMatch(currentSequence,CORRECT_SEQUENCE)){
        showInfoModal("GESCHAFFT!", "Ihr habt es geschafft. Das Lösungswort lautet: 'xxx'", "Juhu.", "#76BA99")
      }
    })
  })

let arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

let startGame = function(){
    document.querySelector("#tile3_3_left").classList.toggle("glowUpLeft");
    document.querySelector("#tile3_3_right").classList.toggle("glowUpRight");
    document.querySelector("#startbtn").style.visibility = "visible";
    originPositionLeft = true;
    originPositionRight = true;
    backgroundmusic.play();
    backgroundmusic.loop=true;
}

let resetGame = function(){
    //pause music
    backgroundmusic.pause();
    backgroundmusic.currentTime = 0;
    backgroundmusic.loop=false;

    //indicate start position
    document.querySelector("#tile3_3_left").classList.add("glowUpLeft");
    document.querySelector("#tile3_3_right").classList.add("glowUpRight");
    originPositionLeft = true;
    originPositionRight = true;

    //clean array
    currentSequence = []

    //start music again
    backgroundmusic.play();
    backgroundmusic.loop=true;
}

showInfoModal("TANZEN", "Versucht, die Tanzschritte nachzumachen. Klickt dazu einfach.", "Los geht's.", "#876445")
    .then(result => {
        if (result.isConfirmed) {
            // after confirmation
            startGame();
            console.log("Game started.");
        }
    })


document.querySelector("#startbtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  resetGame();
})