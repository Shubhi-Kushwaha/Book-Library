import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", genre: "", totalCopies: "" });

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/admin/books", { withCredentials: true });
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post("http://localhost:5000/admin/books", form, { withCredentials: true });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/admin/books/${id}`, { withCredentials: true });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Add Book</h2>
        <input placeholder="Title" className="border p-2 mr-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Author" className="border p-2 mr-2"
          onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Genre" className="border p-2 mr-2"
          onChange={(e) => setForm({ ...form, genre: e.target.value })} />
        <input placeholder="Total Copies" className="border p-2 mr-2"
          onChange={(e) => setForm({ ...form, totalCopies: e.target.value })} />
        <button onClick={addBook} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">All Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center py-2 border-b">
              <span>{book.title} by {book.author} ({book.genre}) - {book.available_copies}/{book.total_copies} available</span>
              <button onClick={() => deleteBook(book.id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
