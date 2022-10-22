// Initialize variables 

const budgetAmount = document.getElementById("budget");
const expensesAmount = document.getElementById("expenses");
const balanceAmount = document.getElementById("balance");
const addExpenseForm = document.getElementById("expenseForm");
const addExpenseName = document.getElementById("addExpenseName");
const addExpenseAmount = document.getElementById("addExpenseAmount");
const expensesTable = document.getElementById("displayExpenses");
const budgetForm = document.getElementById("budgetForm");

const expenses = [];




$(document).ready(function(){


    // Display budget form
    $("#displayBudgetForm").click(function(e){
        budgetForm.style.display = "flex";
    });  

    // Set budget amount
    $("#submitBudget").click(function(e){
        e.preventDefault(); 

        // Get current budget value
        let amount = $('#addBudgetAmount').val();

        // If the field is empty
        if (amount.length == 0) {
            alert('The box is empty');
        } 
        else {
            budgetAmount.innerText = parseInt(amount);
            calculateBalance();
        }
        budgetForm.style.display = "none";
        
    });

    // Display expenses form
    $("#displayExpensesForm").click(function(e){
        addExpenseForm.style.display = "flex";
    });

    // Add expenses
    $("#submit").click(function(e){
        e.preventDefault(); 

        // Get inout values
        let name = $('#addExpenseName').val();
        let amount = $('#addExpenseAmount').val();
        let id = 0

        // If the field is empty
        if (name.length == 0 || amount.length == 0) {
            alert('The box is empty');
        } 
        else {
            const expense = {
              id: id,
              name: name,
              amount: parseInt(amount),
            };
            // Add the input values to the array
            expenses.push(expense);
            displayExp(expenses);
            id++;
        }
        
    });

    // Hide expense form
    $("#hide").click(function(e){
        e.preventDefault(); 
        addExpenseForm.style.display = "none";
        $("#displayExpenses").hide();
    });

    // See all expenses 
    $("#seeExpenses").click(function(e){
        e.preventDefault(); 
        $("#displayExpenses").show();
        displayExp(expenses);
        $("#seeExpenses").hide();
        $("#hideExpenses").show();

    });

    // Hide all expenses 
    $("#hideExpenses").click(function(e){
        e.preventDefault(); 
        $("#displayExpenses").hide();
        $("#hideExpenses").hide();
        $("#seeExpenses").show();

    });    

  });

// Delete expense
function deleteExpense(id) {
    let indexOfExpense = expenses.findIndex((expense) => expense.id === id);
    expenses.splice(indexOfExpense, 1);
    displayExp(expenses);
   
}

// Display expenses below
function displayExp(expenses) {
    $("#displayExpenses").show();
    expensesTable.innerHTML = null;
    // Loop through the expense array
    for (i = 0; i < expenses.length; i++) {
        expensesTable.innerHTML += `
      <div class="tables" id="${expenses[i].id}">
        <div class="expense"><p>${expenses[i].name}</p></div>
        <div class="expense"><p> <span>$ </span> ${expenses[i].amount}</p></div>
        <div>
          <p>
            <button id="${expenses[i].id}" onclick="deleteExpense(${expenses[i].id})"><img src="images/delete.png" width="25" alt="delete" /></button>
          </p>
        </div>
      </div>
    `;
    }
    // call calculate expenses function
    calculateExpenses();
  }

// Calculate Expenses by adding amounts in the array
function calculateExpenses() {
    let total = 0;
    // Get all expenses
    for (i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    // Display the value 
    expensesAmount.innerText = total;

    //Call calculate balance function
    calculateBalance();

}




// Calculate balance
function calculateBalance() {
    balanceAmount.innerText =
        parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}
