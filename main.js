$( document ).ready(() => {

const dataController = (() => {

  class Flashcard {
    constructor(id, question, answer) {
      this.id = id;
      this.question = question;
      this.answer = answer;
    }
  }

  return {
    data: {
      allCards: {
        cards: [
          {question: "What are ES6 variable names?", answer: "'let' and 'const'"},
          {question: "Can the value of a 'const' variable be reassigned?", answer: "No"},
          {question: "How do you write an arrow function?", answer: "const myFunction = () => { #code in here }"},
          {question: "What are rest params?", answer: "Rest parameters allow you to accept an infinite number of arguments"},
          {question: "What does string interpolation use in ES6?", answer: "Backticks"},
          {question: "What are spread opperators?", answer: "Spread operators are similar to rest parameters except they are used to call a function instead of in the function signature."},
          {question: "What is Object Destructing?", answer: "With the destructuring syntax, you can extract smaller fragments from arrays and objects"},
          {question: "What is a Module?", answer: "A module is nothing more than a chunk of JavaScript code written in a file"},
          {question: "What are ES6 Classes?", answer: "ES6 Classes employ inheritance hierarchies using functions and prototypes"},
          {question: "When did ES6 come out?", answer: "2015"}
        ]
      }
    },
    addCard: (ques, ans) => {
      let newCard;

      if (data.allCards['cards'].length > 0) {
        ID = data.allCards['cards'][data.allCards['cards'].length-1].id + 1;
      } else {
        ID = 0;
      }

      newCard = new Flashcard(ID, ques, ans);
      //this is using bracket notation to access the object value, not accessing array
      data.allCards['cards'].push(newCard);
      return newCard;
      
    }
  }
  

})();

const uiController = (() => {

  return {
    getInput: () => {
      return {
        question: document.getElementById('q-input').value,
        answer:document.getElementById('a-input').value
      };
    },
    addNewCard: (obj) => {
      let htmlQ, htmlA, elementQ, elementA;
      
      elementQ = 'content-q';
      htmlQ = '<h3 id="question-info">%question%</h3>';
    
      elementA = 'content-a';
      htmlA = '<h4 id="answer-info">%answer%</h4>';
      
      newHtmlQ = htmlQ.replace('%question%', obj.question);
      newHtmlA = htmlA.replace('%answer%', obj.answer);

      document.getElementById(elementQ).insertAdjacentHTML('beforeend', newHtmlQ);
      document.getElementById(elementA).insertAdjacentHTML('beforeend', newHtmlA);
      $('.form').toggle();
      
    }
  }

})();

const controller = ((dataCtrl, uiCtrl) => {

  const setUpEventListeners = () => {

    document.querySelector("flashcard").addEventListener("click", toggleCard);

    document.getElementById("new-flashcard").addEventListener("click", toggleForm);

    document.getElementById("create").addEventListener("click", ctrlAddCard);

    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddCard();
      }
    });
  };

  const toggleCard = () => {
    
  }

  const toggleForm = () => {
    $(".form").toggle();
  }
  const displayFirstCard = () => {
    let cards, currentCard, elementQ, elementA, htmlQ, htmlA;
    cards = dataCtrl.data.allCards['cards'];
    currentCard = 0;
    elementQ = 'content-q';
    htmlQ = '<h3 id="question-info">%question%</h3>';
  
    elementA = 'content-a';
    htmlA = '<h4 id="answer-info">%answer%</h4>';

    if (cards.length > 0) {
      newHtmlQ = htmlQ.replace('%question%', cards[currentCard].question);
      newHtmlA = htmlA.replace('%answer%', cards[currentCard].answer);

      document.getElementById(elementQ).insertAdjacentHTML('beforeend', newHtmlQ);
      document.getElementById(elementA).insertAdjacentHTML('beforeend', newHtmlA);



      $("#question-info").show();
    } else if (cards.length <= 0) {
      newHtmlQ = htmlQ.replace('%question%', "No cards");
    }
  };

  const ctrlAddCard = () => {
    let input, newCard; 

    input = uiCtrl.getInput();
    newCard = dataCtrl.addCard(input.question, input.answer);
    uiCtrl.addNewCard(newCard);
  };

  return {
    init: () => {
      console.log("App has started");
      displayFirstCard();
      setUpEventListeners();
    }
  }

})(dataController, uiController);

controller.init();

});