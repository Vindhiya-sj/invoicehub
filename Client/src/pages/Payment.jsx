import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Payment() {

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);

  const [client, setClient] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [status, setStatus] = useState("Completed");

  // FETCH CLIENTS

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

  // FETCH PAYMENTS

  const fetchPayments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/payments"
      );

      setPayments(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchClients();
    fetchPayments();

    setPaymentId(
      `PAY-${Date.now()}`
    );

  }, []);

  // SAVE PAYMENT

  const handleSavePayment = async (e) => {

  e.preventDefault();

  if (
    client === "" ||
    paymentId === "" ||
    amount === ""
  ) {

    toast.error("Please fill all fields");
    return;

  }

  try {

    await axios.post(
      "http://localhost:5000/payments",
      {
        client,
        paymentId,
        amount,
        method,
        status
      }
    );

    toast.success(
      "Payment Saved Successfully"
    );

    fetchPayments();

    setClient("");
    setPaymentId("PAY-1001");
    setAmount("");
    setMethod("Cash");
    setStatus("Completed");

  }
  catch(error){

    console.log(error);

    toast.error(
      "Failed to save payment"
    );

  }

};

  // DELETE PAYMENT

 const handleDelete = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/payments/${id}`
    );

    toast.success(
      "Payment Deleted"
    );

    fetchPayments();

  }
  catch(error){

    console.log(error);

    toast.error(
      "Failed to delete payment"
    );

  }

};

  return (

    <div className="payment-page">

      <div className="payment-top">

        <div>

          <h1>
            Payments
          </h1>

          <p>
            Manage client payments
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </div>

      <form
        className="payment-form"
        onSubmit={handleSavePayment}
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

            {
              clients.map(
                (clientItem) => (

                  <option
                    key={clientItem._id}
                    value={clientItem.name}
                  >

                    {clientItem.name}

                  </option>

                )
              )
            }

          </select>

        </div>

        <div className="form-group">

          <label>
            Payment ID
          </label>

          <input
            type="text"
            value={paymentId}
            onChange={(e) =>
              setPaymentId(e.target.value)
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
            Payment Method
          </label>

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value)
            }
          >

            <option>
              Cash
            </option>

            <option>
              UPI
            </option>

            <option>
              Card
            </option>

            <option>
              Bank Transfer
            </option>

          </select>

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
              Completed
            </option>

            <option>
              Pending
            </option>

            <option>
              Failed
            </option>

          </select>

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Save Payment
        </button>

      </form>

      <div className="payment-table-container">

        <h2>
          Payment History
        </h2>

        <table className="payment-table">

          <thead>

            <tr>

              <th>Payment ID</th>

              <th>Client</th>

              <th>Amount</th>

              <th>Method</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              payments.map(
                (payment) => (

                  <tr key={payment._id}>

                    <td>
                      {payment.paymentId}
                    </td>

                    <td>
                      {payment.client}
                    </td>

                    <td>
                      ₹{payment.amount}
                    </td>

                    <td>
                      {payment.method}
                    </td>

                    <td>
                      {payment.status}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            payment._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Payment;