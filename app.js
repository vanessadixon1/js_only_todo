
document.addEventListener("DOMContentLoaded", function() {
 
    let body = document.querySelector("body");
    let form = createNewElement("form", "class", "form")
    let label = createNewElement("label", "for", "todo");
    let input = createNewElement("input", "id", "todo");
    let formButton = createNewElement("button");
    let ul = createNewElement("ul");
    let darkModeButton = createNewElement("input", "type", "button"); 
    let newTodoListButton = createNewElement("button", "class", "createTodoButton"); 
    let existingTodoListButton = createNewElement("button", "class", "existingTodoButton"); 
    let div = createNewElement("div","class", "wrapper");

    let todoList = [];
    let listName;

    label.innerText = "Add a Todo: ";

    formButton.innerText = "Submit";
    
    darkModeButton.innerText = "Dark Mode"

    newTodoListButton.innerText = "Create List";

    existingTodoListButton.innerText = "Existing List";

    form.append(label,input,formButton);
    div.append(newTodoListButton, existingTodoListButton);

    body.append(darkModeButton, form, ul, div);

    form.classList.add("display")
   
    div.addEventListener("click", function(e) {
        listName = prompt("Enter a list name");
        switch(e.target.innerText) {
            case "Create List":
                if(!localStorage.getItem(listName)) {
                    localStorage.setItem(listName, JSON.stringify(todoList));
                    form.classList.remove("display");
                }else {
                    alert(`A list with the name ${listName} already exist`)
                }
                break;
            case "Existing List":
                let lis = document.querySelectorAll("li");
                if(localStorage.getItem(listName)) {
                    removeItemsFromUi(lis);
                    todoList = JSON.parse(localStorage.getItem(listName));
                    for(let todo of todoList) {
                        ul.append(createLiWithButtons(todo));
                    }
                }else {
                    alert(`Todo List ${listName} doesn't exist`);
                }
                break;
        }
    });

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        if(todoList.includes(input.value)) {
            alert("no duplicates allowed");
        }else if(!input.value) {
            alert("NO TODO ENTERED!");
        }else {
            let li = createLiWithButtons(input.value);
            ul.append(li);
            todoList.push(input.value);
            input.value = "";
        }
        localStorage.setItem(listName, JSON.stringify(todoList));
    });
    
    ul.addEventListener('click', function(e) {
        if(e.target.tagName === 'BUTTON' && e.target.innerText === 'Completed') {
           e.target.parentElement.classList.toggle('complete')
        }else if(e.target.tagName === 'BUTTON' && e.target.innerText === 'Delete') {
            let txt = e.target.parentElement.innerText;
            let todoText = txt.split("Completed")[0];
            let index = todoList.indexOf(todoText);
            todoList.splice(index,1);
            e.target.parentElement.remove();
        }
        localStorage.setItem(listName, JSON.stringify(todoList));
    });

    function removeItemsFromUi(node) {
        form.classList.remove("display");
        for(let i of node) {
            i.remove()
        }
    }

    function createNewElement(element, attribute, attributeValue) {
        let el= document.createElement(element);
        if(attribute) {
            el.setAttribute(attribute, attributeValue);
        }
        return el;
    }

    function createLiWithButtons(input) {
        let li = createNewElement("li");
        let completeButton = createNewElement("button");
        let removeButton = createNewElement("button"); 
    
        completeButton.innerText = "Completed";
        removeButton.innerText = "Delete";
        
        li.innerText = input;
        li.append(completeButton,removeButton);

        return li;
    }
});





