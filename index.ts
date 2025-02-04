// imports 
import { Iprepare } from "./models/prepare.model";
import { Icard } from "./models/card.model";

// #region variables

const prepare :Iprepare ={}
prepare.cards =[];
prepare.progress = 0;
prepare.fullTrack = new Audio("./assets/1.wav")
prepare.failAudio = new Audio("./assets/1.wav")

prepare.goodAudio = new Audio("./assets/1.wav")

prepare.gameOverAudio = new Audio("./assets/1.wav")

prepare.fullTrack.loop = true;

const numberOfCards =20 ;
const tempumbers=[]
let cardsHmtlContent = ''

//#endregion







// functions 
const getRandomInt = (min,max) =>{

}
const toggleFlip= (min,max) =>{
    
}
const SelectedCard = (min,max) =>{
    
}
const changeProgress = (min,max) =>{
    
}

const checkFinish = (min,max) =>{
    
}

const stopAudio = (min,max) =>{
    
}


// game logic