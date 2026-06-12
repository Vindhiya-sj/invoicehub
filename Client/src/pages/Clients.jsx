import "./Clients.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "./Layout";

function Clients() {

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);



  // FETCH CLIENTS

  const fetchClients = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/clients"
      );

      setClients(response.data);

    }
    catch (error) {

      toast.error("Failed to Fetch Clients");

    }

  };



  useEffect(() => {

    fetchClients();

  }, []);



  // ADD CLIENT
  const handleAddClient = async (e) => {

    e.preventDefault();

    if (
      name === "" ||
      company === "" ||
      email === ""
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    try {

      if (editId) {

        // UPDATE

        await axios.put(

          `http://localhost:5000/clients/${editId}`,

          {
            name,
            company,
            email
          }

        );

        toast.success(
          "Client Updated"
        );

        setEditId(null);

      }
      else {

        // ADD

        await axios.post(

          "http://localhost:5000/clients",

          {
            name,
            company,
            email
          }

        );

        toast.success(
          "Client Added"
        );

      }

      fetchClients();

      setName("");
      setCompany("");
      setEmail("");

    }
    catch (error) {

      toast.error(
        "Operation Failed"
      );

    }

  };


  // DELETE CLIENT

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/clients/${id}`
      );

      toast.success(
        "Client Deleted"
      );

      fetchClients();

    }
    catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete data"
      );

    }

  };
  const handleEdit = (client) => {

    setName(client.name);

    setCompany(client.company);

    setEmail(client.email);

    setEditId(client._id);

  };



  return (
    <Layout>
      <div className="clients-page">




        <h1>
          Clients Management
        </h1>
  


        {/* FORM */}

        <form
          className="client-form"
          onSubmit={handleAddClient}
        >

          <input
            type="text"
            placeholder="Client Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">

            {
              editId
                ? "Update Client"
                : "Add Client"
            }

          </button>
          {
            editId && (

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {

                  setName("");
                  setCompany("");
                  setEmail("");
                  setEditId(null);

                }}
              >

                Cancel

              </button>

            )
          }

        </form>



        {/* TABLE */}

        <table className="clients-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Company</th>

              <th>Email</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              clients.map((client, index) => (

                <tr key={client._id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {client.name}
                  </td>

                  <td>
                    {client.company}
                  </td>

                  <td>
                    {client.email}
                  </td>
                  <td className="action-buttons">

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(client)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(client._id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>

              ))
            }

          </tbody>

        </table>

      </div>
    </Layout>
  );

}

export default Clients;