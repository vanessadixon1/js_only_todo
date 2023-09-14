
document.addEventListener("DOMContentLoaded", function() {
    let body = document.querySelector("body");
    let darkModeButton = document.getElementById("btn");
    let form = createNewElement("form", "class", "form")
    let input = createNewElement("input", "placeholder", "add a todo...");
    let formButton = createNewElement("button");
    let ul = createNewElement("ul");
    let newTodoListButton = createNewElement("button", "class", "createTodoButton"); 
    let existingTodoListButton = createNewElement("button", "class", "existingTodoButton"); 
    let div = createNewElement("div","class", "wrapper");

    let todoList = [];
    let listName;

    formButton.innerText = "Submit";

    newTodoListButton.innerText = "Create List";

    existingTodoListButton.innerText = "Existing List";

    form.append(input,formButton);
    div.append(newTodoListButton, existingTodoListButton);

    body.append(form, ul, div);

    form.classList.add("display");

    darkModeToggle();

    div.addEventListener("click", function(e) {
        listName = prompt("Enter a list name");
        switch(e.target.innerText) {
            case "Create List":
                if(!listName) {
                    alert(`List can't be empty`);
                }else if(!localStorage.getItem(listName)) {
                    if(todoList || ul.children) {
                        todoList = [];
                        localStorage.setItem(listName, JSON.stringify(todoList));

                        let lis = document.querySelectorAll("li")
                        for(let i of lis) {
                            i.remove();
                        } 
                    } 
                    if(form.classList.contains("display")) {
                            form.classList.remove("display");
                            
                    }
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
            alert("No Duplicates Allowed");
        }else if(!input.value) {
            alert("NO TODO ENTERED!");
        }else if(input.value.length > 25) {
            alert("Todo Must Be 25 Characters or Less ")
        }
        else {
            let li = createLiWithButtons(input.value);
            ul.append(li);
            todoList.push(input.value);
            input.value = "";
        }
        localStorage.setItem(listName, JSON.stringify(todoList));
    });
    
    ul.addEventListener('click', function(e) {
        if(e.target.tagName === 'BUTTON' && e.target.innerText === 'Completed') {
           e.target.parentElement.parentElement.classList.toggle('complete')
        }else if(e.target.tagName === 'BUTTON' && e.target.innerText === 'Delete') {
            let txt = e.target.parentElement.parentElement.innerText;
            let todoText = txt.split("\n")[0];
            let index = todoList.indexOf(todoText);
            todoList.splice(index,1);
            e.target.parentElement.parentElement.remove();
        }
        localStorage.setItem(listName, JSON.stringify(todoList));
    });

    darkModeButton.addEventListener("click", function(e) {
        const {checked} = darkModeButton;
        if(checked) {
            localStorage.setItem("darkMode", checked);
        } else {
            localStorage.removeItem("darkMode");
        }
        body.className = checked ? "darkMode" : "";
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
        let completeButton = createNewElement("button", "class", "completeButton");
        let removeButton = createNewElement("button", "class", "deleteButton"); 
        let div = createNewElement("div", "class", "sp");
    
        completeButton.innerText = "Completed";
        removeButton.innerText = "Delete";
        
        li.innerText = input;

        div.append(completeButton, removeButton)
        li.append(div);

        return li;
    }

    function darkModeToggle() {
        if(localStorage.getItem("darkMode")) {
            body.className = "darkMode";
            darkModeButton.checked = true;
        }
    }
    
});
