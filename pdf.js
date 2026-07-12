// ===============================
// Professional PDF Export
// ===============================

const pdfBtn = document.getElementById("downloadPDF");

pdfBtn.addEventListener("click", async () => {

    if (!validateInvoice()) return;

    showToast("Generating PDF...", "info");

    document.body.classList.add("pdf-mode");

    const invoice = document.getElementById("printArea");

    const { jsPDF } = window.jspdf;

    const canvas = await html2canvas(invoice, {

        scale:2,

        useCORS:true,

        backgroundColor:"#ffffff"

    });

    document.body.classList.remove("pdf-mode");

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({

        orientation:"portrait",

        unit:"mm",

        format:"a4"

    });

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;

    const imgHeight = canvas.height * imgWidth / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
    );

    heightLeft -= pageHeight;

    while(heightLeft > 0){

        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight
        );

        heightLeft -= pageHeight;

    }

    const invoiceNumber =
document.getElementById("invoiceNoInput").value || "Invoice";

const clientName =
document.getElementById("clientName").value.trim() || "Client";

const safeClientName = clientName
    .replace(/[<>:"/\\|?*]+/g, "")
    .replace(/\s+/g, "_");

pdf.save(`Invoice_${safeClientName}_${invoiceNumber}.pdf`);

    showToast("PDF Downloaded Successfully!");

});