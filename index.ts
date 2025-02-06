// imports
import { Iprepare } from "./models/prepare.model";
import { Icard } from "./models/card.model";

// #region variables

const prepare: Iprepare = {} as Iprepare;
prepare.cards = [{ name: "ddd" }];
prepare.progress = 0;
prepare.fullTrack = new Audio("./assets/1.wav");
prepare.failAudio = new Audio("./assets/1.wav");

prepare.goodAudio = new Audio("./assets/1.wav");

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
  prepare.fullTrack.play();
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
    document.getElementById(`card-flip-${index}`).classList.add(card.flip);
  }
};
const SelectedCard = (card: Icard, index: number) => {
  if (!prepare.selectedCard_1) {
    prepare.selectedCard_1 = card;
    prepare.selectedIndex_1 = index;
  } else if (!prepare.selectedCard_2) {
    prepare.selectedCard_2 = card;
    prepare.selectedIndex_2 = index;
  }
  if (!prepare.selectedCard_1 && prepare.selectedCard_2) {
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

prepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));

// game logic

for (let i = 0; i < numberOfCards / 2; i++) {
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${i}.png`,
    flip: "",
    clickapble: true,
    index: i,
  });
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${i}.png`,
    flip: "",
    clickapble: true,
    index: i,
  });
}

prepare.cards.forEach((el, index) => {
  cardsHmtlContent += `
     <span class="col-sm-3 col-lg-2">
      <div onclick="toggleFlip(${index})" class="card-flip">
        <div id="card-flip-${index}">
          <div class="front">
            <div class="card">
              <img src="./assets/images/1.png" alt="" class="card-image" />
              <span class="card-content">${index + 1}</span>
            </div>
          </div>
          <div class="back">
            <div class="card">
              <img src="" alt="./assets/images/1.png" class="card-image" style=" height:120px; width:100%; display"block; " />
              fffffffffff
            </div>
          </div>
        </div>
      </div>
    </span>
    
    `;
});

document.getElementById("cards").innerHTML = cardsHmtlContent;
