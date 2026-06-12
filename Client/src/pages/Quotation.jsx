import "./Quotation.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./Layout";


function Quotation() {

  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [quotationNo, setQuotationNo] = useState("QT-1001");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const [quotations, setQuotations] = useState([]);
  const handleEdit = (quotation) => {

    setClient(quotation.client);
    setQuotationNo(quotation.quotationNo);
    setDate(quotation.date?.split("T")[0]);
    setAmount(quotation.amount);
    setStatus(quotation.status);

    setEditId(quotation._id);

  };

  const fetchQuotations = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/quotations"
      );

      setQuotations(response.data);

      if (!editId) {
        setQuotationNo(
          generateQuotationNumber(response.data)
        );
      }

    }
    catch (error) {

      console.log(error);

    }

  };
  const generateQuotationNumber = (quotationList) => {

    if (quotationList.length === 0) {
      return "QT-1001";
    }

    const lastQuotation = quotationList
      .sort(
        (a, b) =>
          Number(b.quotationNo.replace("QT-", "")) -
          Number(a.quotationNo.replace("QT-", ""))
      )[0];

    const nextNumber =
      Number(
        lastQuotation.quotationNo.replace("QT-", "")
      ) + 1;

    return `QT-${nextNumber}`;
  };
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
  useEffect(() => {

    fetchClients();
    fetchQuotations();
    setClient("");
    setDate("");
    setAmount("");
    setStatus("Pending");
    setEditId(null);

  }, []);

  const handleSaveQuotation = async (e) => {

    e.preventDefault();
    if (
      !client ||
      !quotationNo ||
      !date ||
      !amount
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {

      const quotationData = {
        client,
        quotationNo,
        date,
        amount,
        status
      };

      if (editId) {

        await axios.put(
          `http://localhost:5000/quotations/${editId}`,
          quotationData
        );

        toast.success("Quotation Updated");

        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/quotations",
          quotationData
        );

        toast.success("Quotation Saved");

      }

      fetchQuotations();

      setClient("");
      fetchQuotations();
      setDate("");
      setAmount("");
      setStatus("Pending");

    } catch (error) {

      toast.error("Operation Failed");

    }

  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/quotations/${id}`
      );

      toast.success(
        "Quotation Deleted"
      );

      fetchQuotations();

    }
    catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete quotation"
      );

    }

  };
  const handleConvertToInvoice = async (quotation) => {

    try {

      const invoiceResponse = await axios.get(
        "http://localhost:5000/invoices"
      );

      const nextInvoiceNo =
        `INV-${1001 + invoiceResponse.data.length}`;

      const invoiceData = {

        client: quotation.client,

        invoiceNo: nextInvoiceNo,

        date: quotation.date,

        amount: quotation.amount,

        status: "Pending"

      };

      await axios.post(
        "http://localhost:5000/invoices",
        invoiceData
      );

      // Update quotation status
      await axios.put(
        `http://localhost:5000/quotations/${quotation._id}`,
        {
          ...quotation,
          status: "Converted"
        }
      );

      fetchQuotations();

      toast.success(
        "Converted to Invoice Successfully"
      );
    }
    catch (error) {

      console.log(error);

      toast.error(
        "Conversion Failed"
      );

    }

  };

  return (
    <Layout>

    <div className="quotation-page">

      <div className="quotation-top">

        <div>

          <h1>
            Create Quotation
          </h1>

          <p>
            Fill quotation details below
          </p>

        </div>

       

      </div>

      <form
        className="quotation-form"
        onSubmit={handleSaveQuotation}
      >

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

            {clients.map((clientItem) => (

              <option
                key={clientItem._id}
                value={clientItem.name}
              >

                {clientItem.name}

              </option>

            ))}

          </select>

        </div>

        <div className="form-group">

          <label>
            Quotation Number
          </label>

          <input
            type="text"
            value={quotationNo}
            onChange={(e) =>
              setQuotationNo(e.target.value)
            }
          />

        </div>

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
              Approved
            </option>

            <option>
              Rejected
            </option>

            <option>
              Converted
            </option>
          </select>

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          {editId ? "Update Quotation" : "Save Quotation"}
        </button>

      </form>

      <div className="quotation-table-container">

        <h2>
          Saved Quotations
        </h2>

        <table className="quotation-table">

          <thead>

            <tr>

              <th>
                Quotation No
              </th>

              <th>
                Client
              </th>

              <th>
                Amount
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              quotations.map((quotation) => (

                <tr key={quotation._id}>

                  <td>
                    {quotation.quotationNo}
                  </td>

                  <td>
                    {quotation.client}
                  </td>

                  <td>
                    ₹{quotation.amount}
                  </td>

                  <td>
                    {quotation.status}
                  </td>
                  <td className="action-buttons">

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(quotation)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(quotation._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="convert-btn"
                      disabled={quotation.status === "Converted"}
                      onClick={() => handleConvertToInvoice(quotation)}
                    >
                      {quotation.status === "Converted"
                        ? "Converted"
                        : "Convert"}
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
</Layout>
  );

}

export default Quotation;