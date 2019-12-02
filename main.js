$( document ).ready(() => {

// DATA CONTROLLER
const dataController = (() => {

  class Flashcard {
    constructor(id, question, answer) {
      this.id = id;
      this.question = question;
      this.answer = answer;
    }
  };

  let data = {
      allCards: {
        cards: [
          {id: 1, question: "What are ES6 variable names?", answer: "'let' and 'const'"},
          {id: 2, question: "Can the value of a 'const' variable be reassigned?", answer: "No"},
          {id: 3, question: "How do you write an arrow function?", answer: "const myFunction = () => { #code in here }"},
          {id: 4, question: "What are rest params?", answer: "Rest parameters allow you to accept an infinite number of arguments"},
          {id: 5, question: "What does string interpolation use in ES6?", answer: "Backticks"},
          {id: 6, question: "What are spread opperators?", answer: "Spread operators are similar to rest parameters except they are used to call a function instead of in the function signature."},
          {id: 7, question: "What is Object Destructing?", answer: "With the destructuring syntax, you can extract smaller fragments from arrays and objects"},
          {id: 8, question: "What is a Module?", answer: "A module is nothing more than a chunk of JavaScript code written in a file"},
          {id: 9, question: "What are ES6 Classes?", answer: "ES6 Classes employ inheritance hierarchies using functions and prototypes"},
          {id: 10, question: "When did ES6 come out?", answer: "2015"}
        ]
      } 
    };

  return {
    addCard: (ques, ans) => {
      let newCard, theData;
      theData = data.allCards['cards'];

      if (theData.length > 0) {
        ID = theData[theData.length-1].id + 1;
      } else {
        ID = 0;
      }

      newCard = new Flashcard(ID, ques, ans);
      //this is using bracket notation to access the object value, not accessing array
      theData.push(newCard);
      return newCard
    }, 
    // editCard: (ques, ans) => {
    //   // let editCard, theData;
    //   theData = data.allCards['cards'];

    //   // if (theData.length > 0) {
    //   //   ID = theData[theData.length-1].id + 1;
    //   // } else {
    //   //   ID = 0;
    //   // }

    //   //this is using bracket notation to access the object value, not accessing array
    //   theData.push(editCard);
    //   return editCard
    // },
    
    allData: () => {
      let theData = data.allCards['cards'];
      return {theData}
    }    
  }
})();

//UI CONTROLLER
const inputController = (() => {
  
  return {
    getInput: () => {
      return {
        question: document.getElementById('q-input').value,
        answer:document.getElementById('a-input').value
      };
    }
  }
})();

// MAIN CONTROLLER
const controller = ((dataCtrl, inputCtrl) => {
  let currentCard = 0;

  const setUpEventListeners = () => {
  
    document.getElementById("flashcard").addEventListener("click", switchCard);
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("previous").addEventListener("click", previous);
    // document.getElementById("edit").addEventListener("click", edit);
    // document.getElementById("update").addEventListener("click", ctrlEditCard);
    document.getElementById("delete").addEventListener("click", deleteCard);
    document.getElementById("new-flashcard").addEventListener("click", toggleForm);
    document.getElementById("create").addEventListener("click", ctrlAddCard);

    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddCard();
      }
    });
  };

  const displayFirstCard = (currentCard) => {
    let cards, elementQ, elementA, htmlQ, htmlA, allData;
    // currentCard = current;

    allData = dataCtrl.allData().theData;

    cards = allData;
    elementQ = 'content-q';
    htmlQ = '<h3 id="question-info">%question%</h3>';
  
    elementA = 'content-a';
    htmlA = '<h4 id="answer-info">%answer%</h4>';

    if (cards.length > 0) {
      newHtmlQ = htmlQ.replace('%question%', cards[currentCard].question);
      newHtmlA = htmlA.replace('%answer%', cards[currentCard].answer);

      document.getElementById(elementQ).insertAdjacentHTML('beforeend', newHtmlQ);
      document.getElementById(elementA).insertAdjacentHTML('beforeend', newHtmlA);

    } else if (cards.length <= 0) {
      newHtmlQ = htmlQ.replace('%question%', "No cards");
      document.getElementById(elementQ).insertAdjacentHTML('beforeend', newHtmlQ);
    }
  };

  const next = () => {
    let cards;
    allData = dataCtrl.allData().theData;
    cards = allData;

    if (currentCard < (cards.length - 1)) {
      currentCard ++ 
    } else {
      currentCard = 0
    }  
    switchCard();
  };

  const previous = () => {
    let cards;
    allData = dataCtrl.allData().theData;
    cards = allData;

    if (currentCard > 0) {
      currentCard --;
    } else {
      currentCard = (cards.length - 1)
    }
    switchCard();
  };
 
  const switchCard = () => {
  let cards, newElementQ, newElementA, cardQuestion, cardAnswer;
  
  allData = dataCtrl.allData().theData;
  cards = allData;

  cardQuestion = cards[currentCard].question;
  newElementQ = document.getElementById('content-q');
  newElementQ.innerHTML = cardQuestion;
  $('#content-q').toggle();

  cardAnswer = cards[currentCard].answer;
  newElementA = document.getElementById('content-a');
  newElementA.innerHTML = cardAnswer;
  $('#content-a').toggle();

  };

  // const edit = () => {
  //   $("#content-q").hide();
  //   $("#content-a").hide();
  //   $(".form-update").toggle();
  // }
  const deleteCard = () => {
    let ids, index;

    allData = dataCtrl.allData().theData;
    card = allData
    id = allData[currentCard].id
    
    ids = allData.map(function(current) {
        return current.id;
    });

    index = ids.indexOf(id);

    if (index !== -1) {
        card.splice(index, 1);
    } 
  }

  const toggleForm = () => {
    $("#content-q").hide();
    $("#content-a").hide();
    $(".form").toggle();
  }

  const ctrlAddCard = () => {
    let input; 

    input = inputCtrl.getInput();
    
    $('.form').toggle();
    $("#content-q").show();
    dataCtrl.addCard(input.question, input.answer);
    
  };

  // const ctrlEditCard = () => {
  //   let input; 

  //   input = inputCtrl.getInput();
    
  //   $('.form').toggle();
  //   $("#content-q").show();
  //   dataCtrl.editCard(input.question, input.answer);
  // }

  return {
    init: () => {
      displayFirstCard(currentCard);
      setUpEventListeners();
    }
  }

})(dataController, inputController);

controller.init();

});