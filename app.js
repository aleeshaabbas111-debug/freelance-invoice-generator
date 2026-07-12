// ===============================
// Add New Service Row
// ===============================

const addRowBtn = document.getElementById("addRow");
const invoiceBody = document.getElementById("invoiceBody");

addRowBtn.addEventListener("click", function () {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="text" placeholder="Service Name">
        </td>

        <td>
            <input type="number" class="qty" value="1" min="1">
        </td>

        <td>
            <input type="number" class="rate" value="0" min="0">
        </td>

        <td>
            <input type="text" class="amount" value="0" readonly>
        </td>

        <td>
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;

    invoiceBody.appendChild(row);
    calculateInvoice();

});

// ===============================
// Delete Service Row
// ===============================

invoiceBody.addEventListener("click", function (e) {

    if (e.target.closest(".delete-btn")) {

        const row = e.target.closest("tr");

        // Don't allow deleting the last remaining row
        if (invoiceBody.rows.length > 1) {

            row.remove();
            calculateInvoice();

        } else {

            alert("At least one service row is required.");

        }

    }

});
// ===============================
// Calculate on Input
// ===============================

invoiceBody.addEventListener("input", function (e) {

    const row = e.target.closest("tr");

    if (!row) return;

    if (
        e.target.classList.contains("qty") ||
        e.target.classList.contains("rate")
    ) {

        calculateRow(row);

    }

});
// ===============================
// Format Currency
// ===============================

function formatCurrency(value) {

    return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

}
// ===============================
// Calculate Amount
// ===============================

function calculateRow(row) {

    const qty = row.querySelector(".qty").value;
    const rate = row.querySelector(".rate").value;
    const amount = row.querySelector(".amount");

    const total = qty * rate;

amount.dataset.value = total;

amount.value = formatCurrency(total);
calculateInvoice();

}
// ===============================
// Calculate Invoice Total
// ===============================

function calculateInvoice() {

    let subtotal = 0;

    document.querySelectorAll(".amount").forEach(amount => {

        subtotal += Number(amount.dataset.value || 0);

    });

    document.getElementById("subtotal").textContent =
        formatCurrency(subtotal);

    const taxPercent =
        Number(document.getElementById("tax").value);

    const discount =
        Number(document.getElementById("discount").value);

    const taxAmount =
        subtotal * taxPercent / 100;

    const grandTotal =
        subtotal + taxAmount - discount;

    document.getElementById("grandTotal").textContent =
        formatCurrency(grandTotal);

}

document.getElementById("tax").addEventListener("input", calculateInvoice);

document.getElementById("discount").addEventListener("input", calculateInvoice);

// ===============================
// Logo Preview
// ===============================

const logoInput = document.getElementById("logoInput");
const logoPreview = document.getElementById("logoPreview");

logoInput.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        logoPreview.src = URL.createObjectURL(file);

    }

});

// ===============================
// Auto Today's Date
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    document.getElementById("invoiceDate").value =
        `${year}-${month}-${day}`;

});

// ===============================
// Auto Due Date (30 Days Later)
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const due = new Date();

    due.setDate(due.getDate() + 30);

    const year = due.getFullYear();

    const month = String(due.getMonth() + 1).padStart(2, "0");

    const day = String(due.getDate()).padStart(2, "0");

    document.getElementById("dueDate").value =
        `${year}-${month}-${day}`;

});

// ===============================
// Auto Invoice Number
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 900) + 100;

    const invoiceNumber =
        `INV-${year}${month}${day}-${random}`;

    document.getElementById("invoiceNoInput").value =
        invoiceNumber;

    document.getElementById("invoiceNo").textContent =
        invoiceNumber;

});

// ===============================
// Professional Toast Notification
// ===============================

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const icon = toast.querySelector("i");

    toast.className = "toast";

    if (type === "success") {

        toast.classList.add("success");

        icon.className = "fa-solid fa-circle-check";

    }

    if (type === "error") {

        toast.classList.add("error");

        icon.className = "fa-solid fa-circle-xmark";

    }

    if (type === "warning") {

        toast.classList.add("warning");

        icon.className = "fa-solid fa-triangle-exclamation";

    }

    if (type === "info") {

        toast.classList.add("info");

        icon.className = "fa-solid fa-circle-info";

    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}

// ===============================
// Dark Mode
// ===============================

const themeToggle =
document.getElementById("themeToggle");

const body = document.body;

if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark");

    themeToggle.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

        showToast("Dark Mode Enabled","info");

    }

    else{

        localStorage.setItem("theme","light");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

        showToast("Light Mode Enabled","info");

    }

});

// ===============================
// Validate Invoice
// ===============================

function validateInvoice() {

    const clientName = document.getElementById("clientName").value.trim();

    if (clientName === "") {

        showToast("Please enter the client's name.", "error");

        return false;

    }

    const rows = document.querySelectorAll("#invoiceBody tr");

    if (rows.length === 0) {

        showToast("Please add at least one service.", "error");

        return false;

    }

    for (const row of rows) {

        const description = row.querySelector("td:first-child input").value.trim();

        const qty = Number(row.querySelector(".qty").value);

        const rate = Number(row.querySelector(".rate").value);

        if (description === "") {

            showToast("Service description cannot be empty.", "warning");

            return false;

        }

        if (qty < 1) {

            showToast("Quantity must be at least 1.", "warning");

            return false;

        }

        if (rate < 0) {

            showToast("Rate cannot be negative.", "warning");

            return false;

        }

    }

    return true;

}
