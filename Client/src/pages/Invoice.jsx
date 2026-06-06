import "./Invoice.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";

function Invoice() {

const navigate = useNavigate();
const location = useLocation();

const editInvoice = location.state?.invoice;

const [invoiceNo, setInvoiceNo] = useState(
  editInvoice?.invoiceNo || ""
);

const [client, setClient] = useState(
  editInvoice?.client || ""
);

const [clients, setClients] = useState([]);

const [date, setDate] = useState(
  editInvoice?.date || ""
);

const [amount, setAmount] = useState(
  editInvoice?.amount || ""
);

const [status, setStatus] = useState(
  editInvoice?.status || "Pending"
);



  // FETCH CLIENTS

useEffect(() => {

  fetchClients();

  if (!editInvoice) {

    generateInvoiceNo();

  }

}, [editInvoice]);
  const fetchClients = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/clients"
      );

      setClients(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };
  


  // DOWNLOAD PDF

  const downloadPDF = (

    clientData,
    invoiceData,
    dateData,
    amountData,
    statusData

  ) => {

    const doc = new jsPDF();

    // TITLE

    doc.setFontSize(20);

    doc.text(
      "InvoiceHub Invoice",
      65,
      20
    );
  

    // COMPANY DETAILS

    const companyDetails = JSON.parse(
      localStorage.getItem("companyDetails")
    );

    if (companyDetails) {

      doc.setFontSize(12);

      doc.text(
        `Company: ${companyDetails.companyName}`,
        14,
        40
      );

      doc.text(
        `Owner: ${companyDetails.ownerName}`,
        14,
        48
      );

      doc.text(
        `Email: ${companyDetails.companyEmail}`,
        14,
        56
      );

      doc.text(
        `Phone: ${companyDetails.companyPhone}`,
        14,
        64
      );

    }

    // TABLE

    autoTable(doc, {

      startY: 80,

      head: [[
        "Client",
        "Invoice No",
        "Date",
        "Amount",
        "Status"
      ]],

      body: [[
        clientData,
        invoiceData,
        dateData,
        `₹${amountData}`,
        statusData
      ]]

    });

    // SAVE PDF

    doc.save(
      `${invoiceData}.pdf`
    );

  };
  const handleDownloadPDF = () => {

    if (
      !client ||
      !date ||
      !amount
    ) {

      toast.error(
        "Fill all invoice details first"
      );

      return;
    }

    downloadPDF(
      client,
      invoiceNo,
      date,
      amount,
      status
    );

  };

  // SAVE INVOICE

  const handleSaveInvoice = async (e) => {

    e.preventDefault();

    if (
      client === "" ||
      invoiceNo === "" ||
      date === "" ||
      amount === ""
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    try {

      // EDIT MODE

      if (editInvoice && editInvoice._id) {

        await axios.put(

          `http://localhost:5000/invoices/${editInvoice._id}`,

          {
            client,
            invoiceNo,
            date,
            amount,
            status
          }

        );

        toast.success(
          "Invoice Updated Successfully"
        );

      }

      // ADD MODE

      else {

        await axios.post(

          "http://localhost:5000/invoices",

          {
            client,
            invoiceNo,
            date,
            amount,
            status
          }

        );

        toast.success(
          "Invoice Created Successfully"
        );

      }

      navigate("/dashboard");

    }
    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to save invoice"

      );

    }


  };
  const generateInvoiceNo = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/invoices"
    );

    const nextNumber =
  1001 + response.data.length;

    setInvoiceNo(
      `INV-${nextNumber}`
    );

  }
  catch (error) {

    console.log(error);

  }

};


  return (

    <div className="invoice-page">

      {/* TOP SECTION */}

      <div className="invoice-top">

        <div>

          <h1>
            Create Invoice
          </h1>

          <p>
            Fill invoice details below
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

      {/* FORM */}

      <form
        className="invoice-form"
        onSubmit={handleSaveInvoice}
      >

        {/* CLIENT */}

        <div className="form-group">

          <label>
            Client Name
          </label>

          <select
            value={client}
            onChange={(e) =>
              setClient(e.target.value)
            }
          >

            <option value="">
              Select Client
            </option>

            {
              clients.map((clientItem) => (

                <option
                  key={clientItem._id}
                  value={clientItem.name}
                >

                  {clientItem.name}

                </option>

              ))
            }

          </select>

        </div>

        {/* INVOICE NUMBER */}

        <div className="form-group">

          <label>
            Invoice Number
          </label>

          <input
            type="text"
            value={invoiceNo}
            readOnly
          />

        </div>

        {/* DATE */}

        <div className="form-group">

          <label>
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        {/* AMOUNT */}

        <div className="form-group">

          <label>
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>

        {/* STATUS */}

        <div className="form-group">

          <label>
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>
              Pending
            </option>

            <option>
              Paid
            </option>

            <option>
              Overdue
            </option>

          </select>

        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="save-btn"
        >
          {editInvoice ? "Update Invoice" : "Save Invoice"}
        </button>

        <button
          type="button"
          className="pdf-btn"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>

      </form>

    </div>

  );

}

export default Invoice;