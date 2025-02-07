// imports
import { Iprepare } from "./models/prepare.model";
import { Icard } from "./models/card.model";

// #region variables

const prepare: Iprepare = {} as Iprepare;
prepare.cards = [];
prepare.progress = 0;



prepare.fullTrack = new Audio("./assets/1.wav");
prepare.failAudio = new Audio("./assets/fail.wav");
prepare.goodAudio = new Audio("./assets/success.wav");
prepare.flipAudio = new Audio("./assets/flip.wav");

prepare.gameOverAudio = new Audio("./assets/1.wav");
prepare.fullTrack.loop = true;
const numberOfCards = 20;
const tempNumbers = [];
let cardsHmtlContent = "";

// prepare.goodAudio.play();

//#endregion

// functions
const getRandomInt = (min: number, max: number) => {
  let result: number;
  let exists = true;
  min = Math.ceil(min);
  max = Math.floor(max);
  while (exists) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!tempNumbers.find((no) => no === result.toString())) {
      exists = false;
      tempNumbers.push(result.toString());
    }
  }
  return result;
};
const toggleFlip = (index: number) => {
  prepare.flipAudio.play();
  const card = prepare.cards[index];
  if (!card.flip && card.clickapble) {
    flip(card, index);
    SelectedCard(card, index);
  }
};
const flip = (card: Icard, index: number) => {
  prepare.flipAudio.play();
  if (card) {
    card.flip = card.flip === "" ? "flip" : "";
    console.log("🚀 ~ flip ~ card:", card);
    document.querySelector(`#card-flip-${index}`).classList.value = card.flip;
  }
};
const SelectedCard = (card: Icard, index: number) => {
  console.log("🚀 ~ SelectedCard ~ card:", card);
  if (!prepare.selectedCard_1) {
    prepare.selectedCard_1 = card;
    prepare.selectedIndex_1 = index;
  } else if (!prepare.selectedCard_2) {
    prepare.selectedCard_2 = card;
    prepare.selectedIndex_2 = index;
  }
  if (prepare.selectedCard_1 && prepare.selectedCard_2) {
    if (prepare.selectedCard_1.src === prepare.selectedCard_2.src) {
      prepare.selectedCard_1.clickapble = false;
      prepare.selectedCard_2.clickapble = false;
      prepare.selectedCard_1 = null;
      prepare.selectedCard_2 = null;
      stopAudio(prepare.failAudio);
      stopAudio(prepare.goodAudio);
      prepare.goodAudio.play();
      checkFinish();
    } else {

      setTimeout(() => {
        stopAudio(prepare.failAudio);
        stopAudio(prepare.goodAudio);
        prepare.failAudio.play();
        // toggleFlip();
        flip(prepare.selectedCard_1, prepare.selectedIndex_1)
        flip(prepare.selectedCard_2, prepare.selectedIndex_2)
        prepare.selectedCard_1 = null;
        prepare.selectedCard_2 = null;

      }, 1000);
    }
  }
};
const changeProgress = () => {
  const progress =
    prepare.cards.filter((card) => !card.clickapble).length / numberOfCards;
  const progressElement = document.getElementById("progress");
  progressElement.style.width = `${progress}%`;
  progressElement.innerText = `${progress}%`;
};

const checkFinish = () => {
  if (prepare.cards.filter((card) => !card.clickapble).length / numberOfCards) {
    stopAudio(prepare.fullTrack);
    stopAudio(prepare.fullTrack);
    stopAudio(prepare.fullTrack);
    prepare.gameOverAudio.play();
  }
};

const stopAudio = (audio: HTMLAudioElement) => {
  if (audio && audio.played) {
    audio.pause();
    audio.currentTime = 0; // Reset to the beginning
  }
};


// game logic

//  20    =>  10  / 10

for (let i = 0; i < numberOfCards / 2; i++) {
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${i + 1}.png`,
    flip: "",
    clickapble: true,
    index: i,
  });
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${i + 1}.png`,
    flip: "",
    clickapble: true,
    index: i,
  });
}

console.log(prepare.cards);

    prepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));



    prepare.cards.forEach((el, index) => {
      cardsHmtlContent += `
         <span class="col-sm-3 col-lg-2 mt-4 " >
          <div onclick="toggleFlip(${index})" class="card-flip-${index} card  ">
            <div id="card-flip-${index}"  style =" "  >
              <div class="front">
                <div class="card">
                  <img  src="../assets/images/back.jpg" alt="" class="card-image" />
                  <span class="card-content text-black ">${index + 1}</span>
                </div>
              </div>
              <div class="back">
                <div class="card">
                  <img src="${el.src}" alt="./assets/images/1.png" class="card-image" style=" height:120px; width:100%; display"block; " />
                </div>
              </div>
            </div>
          </div>
        </span>
        
        `;
    });
document.getElementById("cards").innerHTML = cardsHmtlContent;
