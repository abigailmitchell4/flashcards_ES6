$( document ).ready(() => {

const dataController = (() => {

  class Flashcard {
    constructor(id, question, answer) {
      this.id = id;
      this.question = question;
      this.answer = answer;
    }
  }

  // let data = {
   let cards = []
  // }

  return {
    addCard: (ques, ans) => {
      let newCard;

      if (cards.length > 0) {
        ID = cards[cards.length-1].id + 1;
      } else {
        ID = 0;
      }

      newCard = new Flashcard(ID, ques, ans);
      cards.push(newCard);
      return newCard;
    }
  };

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
      debugger
    }
  }

})();

const controller = ((dataCtrl, uiCtrl) => {

  const setUpEventListeners = () => {

    document.getElementById("create").addEventListener("click", ctrlAddCard);

    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddCard();
      }
    });
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
      setUpEventListeners();
    }
  }

})(dataController, uiController);

controller.init();

});