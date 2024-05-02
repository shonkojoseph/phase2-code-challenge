import React, { useState } from "react";
import "./index.css";

function OpenSourceTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-12-14",
      description: "Paycheck from Flatiron school",
      category: "Income",
      amount: 100000,
    },
    {
      id: 2,
      date: "2024-12-16",
      description: "Payment of tax",
      category: "Tax",
      amount: 30000,
    },
    {
      id: 3,
      date: "2024-12-21",
      description: "Payment to Bob's burgers",
      category: "Food",
      amount: 12000,
    },
    {
      id: 4,
      date: "2024-12-24",
      description: "Paycheck from Flatiron Construction",
      category: "Income",
      amount: 150000,
    },
    {
      id: 5,
      date: "2024-12-26",
      description: "Payment of UberX",
      category: "Transport",
      amount: 13000,
    },
    {
      id: 6,
      date: "2024-12-29",
      description: "Payment to Flatiron Decorators",
      category: "Entertainment",
      amount: 45000,
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    setExpenses([...expenses].sort((a, b) => a[key].localeCompare(b[key])));
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="Header">
        <h1>The Royal Bank Of Flatiron</h1>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search expenses by description"
      />
      <AddExpenseForm setExpenses={setExpenses} expenses={expenses} />
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>Date</th>
              <th onClick={() => handleSort("description")}>Description</th>
              <th onClick={() => handleSort("category")}>Category</th>
              <th onClick={() => handleSort("amount")}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddExpenseForm({ setExpenses, expenses }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
    };
    setExpenses([...expenses, newExpense]);
    setFormData({ date: "", description: "", category: "", amount: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <button type="submit">Submit New Expense</button>
    </form>
  );
}

export default OpenSourceTable; 