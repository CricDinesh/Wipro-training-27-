import React, { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Dinesh Kumar", location: "Chennai", email: "dinesh@demo.com", phone: "9876543210" },
    { id: 2, name: "Karthi", location: "Tanjavur", email: "karthi@demo.com", phone: "9865321470" },
    { id: 3, name: "Ayyappa", location: "Madurai", email: "ayyappa@demo.com", phone: "9954123658" },
  ]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", location: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  //  Search filter
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  //  Add new user
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }
    if (editId) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editId ? { ...u, ...form } : u
        )
      );
      setEditId(null);
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        ...form,
      };
      setUsers([...users, newUser]);
    }
    setForm({ name: "", location: "", email: "", phone: "" });
  };

  //  Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  //  Edit user (load data into form)
  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,
      location: user.location,
      email: user.email,
      phone: user.phone,
    });
  };

  return (
    <div className="page colorful-bg">
      <h2>User Management</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8, width: "100%", borderRadius: 6 }}
      />

      {/* 🧾 Add/Edit form */}
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ margin: 5, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          style={{ margin: 5, padding: 8 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ margin: 5, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ margin: 5, padding: 8 }}
        />
        <button type="submit" style={{ margin: 5, padding: "8px 12px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* 👥 User list */}
      {filteredUsers.length > 0 ? (
        <table border="1" width="100%" cellPadding="8" style={{ background: "#fff", borderRadius: 8 }}>
          <thead style={{ background: "#eee" }}>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : search.trim() !== "" ? (
        <p style={{ color: "red", marginTop: 20 }}>No users found for "{search}"</p>
      ) : (
        <p style={{ color: "#333", marginTop: 20 }}>No users available.</p>
      )}
    </div>
  );
}
