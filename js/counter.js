const actions = document.querySelectorAll("[data-action]");
const counterValue = document.querySelector(".counter-value")

let counter = localStorage.getItem("counterKey") || 0
counterValue.textContent = counter;

actions.forEach(action => {
    action.addEventListener('click', () => {
const actionName = action.dataset.action;
    
    switch (actionName) {
      case "decrease": {
        counter--;
        localStorage.setItem("counterKey", JSON.stringify(counter));
        break;
      }
      case "increase": {
            counter++
            localStorage.setItem("counterKey", JSON.stringify(counter))
        break;
      }
        case "reset": 
            counter = 0
            localStorage.removeItem("counterKey")
        
        break;
      
      default: {
        console.log("sent went wrong");
      }
    }
        counterValue.textContent = counter;
})
    })
    