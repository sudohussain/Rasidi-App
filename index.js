
let budgets = [
    {
        title: "resturant",
        amount: "500"
    },
    {
        title: "car",
        amount: "4"
    },
    {
        title: "oil",
        amount: "5200"
    },
]

getBudgetsFromStorage()

displayBudgets()
let saveIndex = 0

function displayBudgets() {
    document.getElementById("budget-cards").innerHTML = ""

    let index = 0

    for (budget of budgets) {
        document.getElementById("budget-cards").innerHTML +=
            `
        <!-- budget card  -->
            <div class="col-sm-6 mb-3 mb-sm-0" id="budget-card">
            <div class="card">
                <div class="card-body">
                    <!-- Button trigger modal for edit and add info -->
                    <div class="float-end"><button type="button" onclick="editBudgetInfo(${index})"  class="btn edit-btn" data-bs-toggle="modal" data-bs-target="#edit-add-card-modal">
                        <span class="material-symbols-outlined" >
                        settings
                        </span>
                    </button></div>
                    <!-- //Button trigger modal for edit and add info //-->

                    <!-- button modal for delete card -->
                    <div class="float-start"><button type="button" onclick="deleteCard(${index})" class="btn edit-btn"  data-bs-toggle="modal" data-bs-target="#delet-modal">
                        <span class="material-symbols-outlined" >
                        delete
                        </span>
                    </button></div>
                    <!--// button modal for delete card// -->

                    <h5 class="card-title">${budget.title}</h5>
                    
                    <p class="card-text" id="amount">${budget.amount}</p>
                    <div class="input-group input-group-lg mb-2">
                        <input id="input-amount-box${index}" type="tel" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        <span class="input-group-text" id="inputGroup-sizing-lg">المبلغ</span>
                        
                    </div>
                    <button type="button" class="btn bg-dark-subtle my-btns" onclick="calcAmount(${index})" >
                        <span class="material-symbols-outlined">
                            remove
                        </span>
                    </button>
                </div>
            </div>
            </div>
            <!-- //budget card//  --> 

            
        `
        index++
    }

    if (document.getElementById("budget-cards").innerHTML == "") {
        document.getElementById("budget-cards").innerHTML = `<h1> لم تقم باضافة اي ميزانية بعد </h1>`
    }

    document.getElementById("budget-title").value = ""
    document.getElementById("budget-amount").value = ""
}

function calcAmount(index) {
    let amount = budgets[index].amount
    var inputBox = document.getElementById("input-amount-box" + index).value
    if (isNaN(inputBox)) {
        alert("المبلغ يجب ان يكون رقم")
    } else {
        budgets[index].amount = amount - inputBox
        saveBudgetInStorage()
        displayBudgets()
    }

}

let newTitle = ""
let newAmount = ""

function editBudgetInfo(index) {

    saveIndex = index
    document.getElementById("title-input").value = budgets[index].title
    document.getElementById("amount-input").value = budgets[index].amount

}

function confirmEdit() {
    newTitle = document.getElementById("title-input").value
    newAmount = document.getElementById("amount-input").value

    if (isNaN(newAmount)) {
        alert("المبلغ يجب ان يكون رقم")
    } else if (newAmount == "" || newTitle == "") {
        alert("يجب عليك وضع قيم لكل الخانات")
    } else {
        budgets[saveIndex].title = newTitle
        budgets[saveIndex].amount = newAmount
        saveBudgetInStorage()

        displayBudgets()
    }


}

function deleteCard(index) {
    document.getElementById("delet-modal-title").innerHTML = budgets[index].title
    saveIndex = index

}

function confirmDelet() {

    budgets.splice(saveIndex, 1)
    saveBudgetInStorage()
    displayBudgets()
}

let addTitle = ""
let addAmount = ""



function confirmAdd() {

    addTitle = document.getElementById("budget-title").value
    addAmount = document.getElementById("budget-amount").value

    if (isNaN(addAmount)) {
        alert("المبلغ يجب ان يكون رقم")
    } else if (addAmount == "" || addTitle == "") {
        alert("يجب عليك وضع قيم لكل الخانات")
    }
    else {

        budgetObj = {
            title: addTitle,
            amount: addAmount
        }

        budgets.unshift(budgetObj)
        saveBudgetInStorage()
        displayBudgets()
    }


}

//--------------------local storage functions--------

function saveBudgetInStorage() {
    let strbudgets = JSON.stringify(budgets)
    localStorage.setItem("budgets", strbudgets)
}

function getBudgetsFromStorage() {
    let retrivedBudgets = JSON.parse(localStorage.getItem("budgets"))
    budgets = retrivedBudgets ?? []


}

