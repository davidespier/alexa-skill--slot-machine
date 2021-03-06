/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

var coinBase = 25;
var losingNumber = 0;

const startVoice = "Bienvenido a la Skill maquina tragaperras. Elige una opción; Insertar moneda, lista de premios, añadir monedas, monedas actuales, apagar máquina y por último, lista de opciones.";
const helpGame = "Voy a intentar ayudarte; estos són los comandes disponibles. Insertar moneda, Añadir monedas, Monedas actuales, Lista de premios, Lista de opciones y por último, Apagar máquina. ¿Que opción eliges?";


var prize =  [
  "ciruelas", "ciruelas", "ciruelas", "ciruelas", "ciruelas", "ciruelas" , "ciruelas", "ciruelas",
  "naranjas", "naranjas",  "naranjas", "naranjas", "naranjas", "naranjas", "naranjas",
  "manzanas", "manzanas", "manzanas", "manzanas", "manzanas", "manzanas",
  "fresas", "fresas", "fresas", "fresas", "fresas",
  "campanas", "campanas", "campanas", "campanas",
  "siete", "siete", "siete",
  "diamantes", "diamantes",
  "reyes"
];

const startHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak(startVoice)
      .reprompt(startVoice)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak(helpGame)
      .reprompt(helpGame)
      .getResponse();
  },
};

//INSERTER COIN

const gameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'gameIntent';
  },
  handle(handlerInput) {


    if(coinBase === 0){
      
      return handlerInput.responseBuilder
      .speak("Te has quedado sin monedas. Di añadir monedas para tener 25 monedas de nuevo.")
      .reprompt("Te has quedado sin monedas. Di añadir monedas para tener 25 monedas de nuevo.")
      .getResponse();
      
      
    }else{
      
      var resultGame;
  
      coinBase--;
      resultGame = gameSystem();
      
      return handlerInput.responseBuilder
      .speak(resultGame)
      .reprompt(resultGame)
      .getResponse();

    }
    
  },
};


//GENERATED RANDOMS

function gameSystem(){
  
    var numberRandom1 = Math.floor(Math.random() * prize.length);
    var numberRandom2 = Math.floor(Math.random() * prize.length);
    var numberRandom3 = Math.floor(Math.random() * prize.length); 

    var globalResult;
    globalResult = prizeUser(numberRandom1,numberRandom2,numberRandom3);
    
    return globalResult;
  
}

//RANDOM CHECK PRIZE

function prizeUser(numberRandom1,numberRandom2,numberRandom3){
  
        if(prize[numberRandom1] === prize[numberRandom2] && prize[numberRandom1] === prize[numberRandom3]){
        
        losingNumber = 0;
        var prizeCoin = prizeSystem(prize,numberRandom1);
        coinBase = coinBase + prizeCoin;
        var resultPrize = prize[numberRandom1]+" - "+prize[numberRandom2]+" - "+prize[numberRandom3]+". Has ganado "+prizeCoin+" monedas. Ahora mismo tienes "+coinBase+" monedas. ¿Volver a tirar?";
        
        return resultPrize;
      
      }else{
        
        losingNumber = losingNumber + 1;
        var resultNotPrize = prize[numberRandom1]+" - "+prize[numberRandom2]+" - "+prize[numberRandom3]+". Ahora mismo tienes "+coinBase+" monedas. ¿Volver a tirar?";
        
        return resultNotPrize;
        
      }
      
}

//CHECK PRIZE SYSTEM


function prizeSystem(prize,numberRandom){
  
  var prizeCoin = 0;
  
  if(prize[numberRandom] === 'ciruelas'){
    
    prizeCoin = 20;
    
  }else if(prize[numberRandom] === 'naranjas'){
    
    prizeCoin = 40;
    
  }else if(prize[numberRandom] === 'manzanas'){
    
    prizeCoin = 60;
    
  }else if(prize[numberRandom] === 'fresas'){
    
    prizeCoin = 80;
    
  }else if(prize[numberRandom] === 'campanas'){
    
    prizeCoin = 100;
    
  }else if(prize[numberRandom] === 'siete'){
    
    prizeCoin = 200;
    
  }else if(prize[numberRandom] === 'diamantes'){
    
    prizeCoin = 500;
    
  }else if(prize[numberRandom] === 'reyes'){
    
    prizeCoin = 1000;
    
  }
  
  return prizeCoin;
  
}


//ADDCOIN SYSTEM

const addCoinHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'addCoinIntent';
  },
  handle(handlerInput) {
    
    if(coinBase <= 0){
    
      coinBase = coinBase + 25;
      
      return handlerInput.responseBuilder
        .speak("Acabamos de añadir 25 monedas.")
        .reprompt(helpGame)
        .getResponse();
      
    }else{
      
      return handlerInput.responseBuilder
      .speak("Lo sentimos, aún tienes "+coinBase+" monedas para gastar.")
      .reprompt(helpGame)
      .getResponse();
 
    }
    
  },
};


//LIST PRIZE

const listPrizeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'listPrizeIntent';
  },
  handle(handlerInput) {
    
      return handlerInput.responseBuilder
      .speak("Esta es la lista de premios: Ciruelas 2 monedas, Naranjas 4 monedas, Manzanas 6 monedas, Fresas 8 monedas, Campanas 10 monedas, Triple siete 20 monedas, Diamantes 50 monedas, Reyes 100 monedas. ")
      .reprompt(helpGame)
      .getResponse();

  },
};


//ACTUAL COIN

const currentCoinHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'currentCoinIntent';
  },
  handle(handlerInput) {
    
      return handlerInput.responseBuilder
      .speak("Ahora mismo tienes "+coinBase+" monedas.")
      .reprompt(helpGame)
      .getResponse();

  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak('Cerrando la Skill la máquina tragaperras. Hasta pronto.')
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Ha ocurrido un error.')
      .reprompt('Ha ocurrido un error.')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`La sesión terminó por esta razón: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    startHandler,
    HelpHandler,
    gameHandler,
    addCoinHandler,
    listPrizeHandler,
    currentCoinHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();