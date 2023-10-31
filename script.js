// Initialize the expense list
let expenseList = [];

// Function to add a new expense
function save_cash(event) {
    event.preventDefault();
    const expAmount = document.getElementById("amount").value;
    const expDescription = document.getElementById("description").value;
    const expCategory = document.getElementById("exp_catagory").value;

    const expenseDetails = {
        expense_amount: expAmount,
        expense_description: expDescription,
        expense_category: expCategory
    };

    // Send a POST request to the Crud Crud API to store the data
    axios
        .post(
            "https://crudcrud.com/api/YOUR_CRUD_CRUD_API_KEY/booking_app_app",
            expenseDetails
        )
        .then((response) => {
            console.log(response.data); // The response from the API
            // Add the response data to the expenseList
            expenseList.push(response.data);
            // Refresh the displayed expense list
            displayExpenseDetails(expenseList);
        })
        .catch((err) => {
            console.error(err);
        });

    // Clear the form fields for the next entry
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("exp_catagory").value = "";
}

// Function to delete an expense
function removeExpense(index) {
    const deletedExpense = expenseList[index];
    axios
        .delete(
            `https://crudcrud.com/api/YOUR_CRUD_CRUD_API_KEY/booking_app_app/${deletedExpense._id}`
        )
        .then((response) => {
            console.log(response.data);
            // Remove the deleted expense from the expenseList
            expenseList.splice(index, 1);
            // Refresh the displayed expense list
            displayExpenseDetails(expenseList);
        })
        .catch((err) => {
            console.error(err);
        });
}

// Function to edit an expense
function editExpense(index) {
    const expenseDetails = expenseList[index];

    // Populate the form fields with the existing details for editing
    document.getElementById("amount").value = expenseDetails.expense_amount;
    document.getElementById("description").value = expenseDetails.expense_description;
    document.getElementById("exp_catagory").value = expenseDetails.expense_category;

    // Change the button text to "Update Expense"
    document.getElementById("btn").textContent = "Update Expense";

    // Remove the "Add Expense" event listener
    document.getElementById("btn").removeEventListener("click", save_cash);

    // Set a new event listener for updating the expense
    document.getElementById("btn").addEventListener("click", function (event) {
        event.preventDefault();

        // Update the expense details
        expenseDetails.expense_amount = document.getElementById("amount").value;
        expenseDetails.expense_description = document.getElementById("description").value;
        expenseDetails.expense_category = document.getElementById("exp_catagory").value;

        // Send a PUT request to update the expense
        axios
            .put(
                `https://crudcrud.com/api/YOUR_CRUD_CRUD_API_KEY/booking_app_app/${expenseDetails._id}`,
                expenseDetails
            )
            .then((response) => {
                console.log(response.data);
                // Clear the form fields
                document.getElementById("amount").value = "";
                document.getElementById("description").value = "";
                document.getElementById("exp_catagory").value = "";
                // Reset the button text to "Add Expense"
                document.getElementById("btn").textContent = "Add Expense";
                // Remove the "Update Expense" event listener
                document.getElementById("btn").removeEventListener("click", event.currentTarget);
                // Add back the "Add Expense" event listener
                document.getElementById("btn").addEventListener("click", save_cash);
                // Refresh the displayed expense list
                displayExpenseDetails(expenseList);
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

// Function to display expense details on the screen
function displayExpenseDetails(expenseList) {
    const displayElement = document.getElementById("ExpenseList");
    let expenseDetailsHTML = "<h3>Expense Details</h3>";

    for (let i = 0; i < expenseList.length; i++) {
        const expenseDetails = expenseList[i];
        expenseDetailsHTML += `
            <p>Amount: ${expenseDetails.expense_amount}</p>
            <p>Description: ${expenseDetails.expense_description}</p>
            <p>Category: ${expenseDetails.expense_category}</p>
            <button onclick='removeExpense(${i})'>Delete</button>
            <button onclick='editExpense(${i})'>Edit</button>
            <hr>
        `;
    }

    // Update the display element with the generated HTML
    displayElement.innerHTML = expenseDetailsHTML;
}

// Attach the "Add Expense" function to the button's click event
document.getElementById("btn").addEventListener("click", save_cash);

// Display expense details when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Send a GET request to retrieve all expenses from the API
    axios
        .get(
            `https://crudcrud.com/api/YOUR_CRUD_CRUD_API_KEY/booking_app_app`
        )
        .then((response) => {
            expenseList = response.data;
            displayExpenseDetails(expenseList);
        })
        .catch((err) => {
            console.error(err);
        });
});
