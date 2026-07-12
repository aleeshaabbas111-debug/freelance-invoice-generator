// ===============================
// Print Invoice
// ===============================

printBtn.addEventListener("click", () => {

    if (!validateInvoice()) return;

    showToast("Preparing Invoice...", "info");

    setTimeout(() => {

        window.print();

    }, 800);

});