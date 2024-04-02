let employeeArray = [];

let myform = document.getElementById("data_form");
myform.onsubmit = submitEmployeeData;

function submitEmployeeData(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let profession = document.getElementById("profession").value;
    let age = document.getElementById("age").value;

    let errorDiv = document.getElementById("error_div");
    errorDiv.textContent = "";
    if (name === "" || profession === "" || age === "") {
        errorDiv.textContent = "Error : Please Make sure All the fields are filled before adding in an employee !";
        errorDiv.style.color = "red"
        return;
    }

    let dataObj = { id: generateUniqueId(), name, profession, age };

    errorDiv.textContent = "Success : Employee Added!"
    errorDiv.style.color = "#43FF78"
    employeeArray.push(dataObj);
    console.log('employeeArray:', employeeArray);
    document.getElementById("name").value=document.getElementById("profession").value = document.getElementById("age").value = ""
    createEmployeeTable();
}


function createEmployeeTable() {
    let dataContainer = document.querySelector(".data_container");
    dataContainer.innerHTML = "<h1>Added Employees</h1>"
    if (employeeArray.length === 0) {
        let cardDiv = document.createElement("div");
        cardDiv.textContent = "You have 0 Employees.";
        dataContainer.appendChild(cardDiv);
        return;
    }

    employeeArray.forEach((element, index) => {
        let cardDiv = document.createElement("div");

        let dataDiv = document.createElement("div");

        let p1 = document.createElement("p");
        p1.textContent = `${index + 1}`;
        let p2 = document.createElement("p");
        p2.textContent = `Name: ${element.name}`
        let p3 = document.createElement("p");
        p3.textContent = `Profession: ${element.profession}`;
        let p4 = document.createElement("p");
        p4.textContent = `Age: ${element.age}`;

        dataDiv.append(p1, p2, p3, p4);

        let btn = document.createElement("button");
        btn.textContent = "Delete User";

        btn.addEventListener("click", (index) => {
            employeeArray.splice(index, 1);
            createEmployeeTable();
            let errorDiv = document.getElementById("error_div");
            errorDiv.textContent = "";
        })

        cardDiv.append(dataDiv, btn);
        dataContainer.append(cardDiv)
    });
}

createEmployeeTable()


function generateUniqueId() {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 10000);

    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Combine the timestamp and random number to create a unique ID
    const uniqueId = `${timestamp}-${randomNumber}`;

    return uniqueId;
}