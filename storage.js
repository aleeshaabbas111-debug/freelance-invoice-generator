// ==============================
// Save Complete Invoice
// ==============================

const saveBtn = document.getElementById("saveInvoice");

saveBtn.addEventListener("click", () => {

    if (!validateInvoice()) return;

    saveInvoice();

});

function saveInvoice() {

    const services = [];

    document.querySelectorAll("#invoiceBody tr").forEach(row => {

        services.push({

            description: row.querySelector("td:nth-child(1) input").value,

            qty: row.querySelector(".qty").value,

            rate: row.querySelector(".rate").value

        });

    });

    const invoice = {

        invoiceNumber: document.getElementById("invoiceNoInput").value,

        invoiceDate: document.getElementById("invoiceDate").value,

        dueDate: document.getElementById("dueDate").value,

        clientName: document.getElementById("clientName").value,

        clientEmail: document.getElementById("clientEmail").value,

        clientPhone: document.getElementById("clientPhone").value,

        companyName: document.getElementById("companyName").value,

        clientAddress: document.getElementById("clientAddress").value,

        tax: document.getElementById("tax").value,

        discount: document.getElementById("discount").value,

        services: services

    };

    localStorage.setItem(
        "invoiceData",
        JSON.stringify(invoice)
    );

    showToast("Invoice Saved Successfully!");

}

// ==============================
// Load Invoice
// ==============================

window.addEventListener("DOMContentLoaded", loadInvoice);

function loadInvoice() {

    const saved = JSON.parse(localStorage.getItem("invoiceData"));

    if (!saved) return;

    document.getElementById("invoiceNoInput").value = saved.invoiceNumber;

    document.getElementById("invoiceDate").value = saved.invoiceDate;

    document.getElementById("dueDate").value = saved.dueDate;

    document.getElementById("clientName").value = saved.clientName;

    document.getElementById("clientEmail").value = saved.clientEmail;

    document.getElementById("clientPhone").value = saved.clientPhone;

    document.getElementById("companyName").value = saved.companyName;

    document.getElementById("clientAddress").value = saved.clientAddress;

    document.getElementById("tax").value = saved.tax;

    document.getElementById("discount").value = saved.discount;

    invoiceBody.innerHTML = "";

saved.services.forEach(service => {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>
            <input type="text" value="${service.description}">
        </td>

        <td>
            <input
                type="number"
                class="qty"
                value="${service.qty}"
            >
        </td>

        <td>
            <input
                type="number"
                class="rate"
                value="${service.rate}"
            >
        </td>

        <td>
            <input
                type="text"
                class="amount"
                readonly
            >
        </td>

        <td>
            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>
        </td>

    `;

    invoiceBody.appendChild(row);

    calculateRow(row);

});

}