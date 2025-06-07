import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import AddCourseForm from "./AddCourseForm";
import AddBookForm from "./AddBookForm";
import AddNoteForm from "./AddNoteForm";
import AddQuizForm from "./AddQuizForm";

const PER_PAGE = 10;
const cfg = token => ({ headers: { Authorization: `Bearer ${token}` } });

const getPaginated = async (url, token, page, search) => {
  const res = await axios.get(`${url}?page=${page}&limit=${PER_PAGE}&search=${search || ""}`, cfg(token));
  return res.data;
};

const del = async (url, token) => {
  await axios.delete(url, cfg(token));
};

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("No token found. Please login.");
      return;
    }
    axios.get("https://p-notes-backend.onrender.com/api/stats", cfg(token))
      .then(r => setStats(r.data))
      .catch(() => setError("Failed to load stats"));
  }, [token]);

  const [view, setView] = useState("dashboard");

  const initMeta = { items: [], page: 1, totalPages: 1, search: "", loading: false };
  const [users, setUsers] = useState(initMeta);
  const [courses, setCourses] = useState(initMeta);
  const [books, setBooks] = useState(initMeta);
  const [notes, setNotes] = useState(initMeta);
  const [quizzes, setQuizzes] = useState(initMeta);
  const [orders, setOrders] = useState(initMeta);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const [showAddBook, setShowAddBook] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const [showAddNote, setShowAddNote] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);

  const handleFetch = async (url, meta, setter) => {
    if (!token) return;
    setter({ ...meta, loading: true });
    try {
      const res = await getPaginated(url, token, meta.page, meta.search);
      setter({ ...meta, loading: false, ...res, items: res.data });
    } catch {
      setError("Load failed");
      setter({ ...meta, loading: false });
    }
  };

  const fetchUsers = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/users", users, setUsers), [token, users.page, users.search]);
  const fetchCourses = useCallback(() => handleFetch("/api/admin/courses", courses, setCourses), [token, courses.page, courses.search]);
  const fetchBooks = useCallback(() => handleFetch("/api/admin/books", books, setBooks), [token, books.page, books.search]);
  const fetchNotes = useCallback(() => handleFetch("/api/admin/notes", notes, setNotes), [token, notes.page, notes.search]);
  const fetchQuizzes = useCallback(() => handleFetch("/api/admin/quizzes", quizzes, setQuizzes), [token, quizzes.page, quizzes.search]);
  const fetchOrders = useCallback(() => handleFetch("/api/admin/orders", orders, setOrders), [token, orders.page]);

  useEffect(() => { if (view === "users") fetchUsers(); }, [view, fetchUsers]);
  useEffect(() => { if (view === "courses") fetchCourses(); }, [view, fetchCourses]);
  useEffect(() => { if (view === "books") fetchBooks(); }, [view, fetchBooks]);
  useEffect(() => { if (view === "notes") fetchNotes(); }, [view, fetchNotes]);
  useEffect(() => { if (view === "quizzes") fetchQuizzes(); }, [view, fetchQuizzes]);
  useEffect(() => { if (view === "orders") fetchOrders(); }, [view, fetchOrders]);

  const handleDelete = async (id, url, fetchAgain) => {
    if (!window.confirm("Confirm delete?")) return;
    try { await del(url, token); fetchAgain(); }
    catch { setError("Delete failed"); }
  };

  const submitCourse = async (data) => {
    try {
      if (editCourse) {
        await axios.put(`/api/admin/courses/${editCourse._id}`, data, cfg(token));
      } else {
        await axios.post("/api/admin/courses", data, cfg(token));
      }
      setShowAddCourse(false); setEditCourse(null); fetchCourses();
    } catch { setError("Save failed"); }
  };

  const submitBook = async (data) => {
    try {
      if (editBook) {
        await axios.put(`/api/admin/books/${editBook._id}`, data, cfg(token));
      } else {
        await axios.post("/api/admin/books", data, cfg(token));
      }
      setShowAddBook(false); setEditBook(null); fetchBooks();
    } catch { setError("Save failed"); }
  };

  const submitNote = async (formData) => {
    try {
      if (editNote) {
        await axios.put(`/api/admin/notes/${editNote._id}`, formData, cfg(token));
      } else {
        await axios.post("/api/admin/notes", formData, cfg(token));
      }
      setShowAddNote(false); setEditNote(null); fetchNotes();
    } catch { setError("Save failed"); }
  };

  const submitQuiz = async (data) => {
    try {
      if (editQuiz) {
        await axios.put(`/api/admin/quizzes/${editQuiz._id}`, data, cfg(token));
      } else {
        await axios.post("/api/admin/quizzes", data, cfg(token));
      }
      setShowAddQuiz(false); setEditQuiz(null); fetchQuizzes();
    } catch { setError("Save failed"); }
  };

  const NavButton = ({ tab, label }) => (
    <button onClick={() => setView(tab)} className={`px-3 py-1 rounded ${view === tab ? "bg-white-800 text-white" : "bg-gray-200"} mx-2`} style={{ border: "1px solid #ccc", background: "#198754", color: "white" }}>
      {label}
    </button>
  );

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!stats) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      <div className="flex gap-4 text-sm font-medium flex-wrap">
        <NavButton tab="dashboard" label="Dashboard" />
        <NavButton tab="users" label="Users" />
        <NavButton tab="courses" label="Courses" />
        <NavButton tab="books" label="Books" />
        <NavButton tab="notes" label="Notes" />
        <NavButton tab="quizzes" label="Quizzes" />
        <NavButton tab="orders" label="Orders" />
      </div>

      <hr />

      {view === "dashboard" && <DashboardStats {...stats} />}

      {view === "users" && (
        <PaginatedSection
          title="👥 Users"
          meta={users}
          setMeta={setUsers}
          onSearch={s => setUsers({ ...users, search: s, page: 1 })}
          renderItem={u => `${u.name} – ${u.email}`}
          onDelete={id => handleDelete(id, `/api/admin/users/${id}`, fetchUsers)}
        />
      )}

      {view === "courses" && (
        <PaginatedSection
          title="📚 Courses"
          meta={courses}
          setMeta={setCourses}
          onSearch={s => setCourses({ ...courses, search: s, page: 1 })}
          renderItem={c => `${c.title} – ₹${c.price}`}
          onDelete={id => handleDelete(id, `/api/admin/courses/${id}`, fetchCourses)}
          onEdit={course => { setEditCourse(course); setShowAddCourse(true); }}
          addBtnLabel="Add Course"
        >
          {showAddCourse && <AddCourseForm onAdd={submitCourse} onClose={() => { setShowAddCourse(false); setEditCourse(null); }} initialValues={editCourse} />}
        </PaginatedSection>
      )}

      {view === "books" && (
        <PaginatedSection
          title="📘 Books"
          meta={books}
          setMeta={setBooks}
          onSearch={s => setBooks({ ...books, search: s, page: 1 })}
          renderItem={b => `${b.title} – ${b.author} – ₹${b.price}`}
          onDelete={id => handleDelete(id, `/api/admin/books/${id}`, fetchBooks)}
          onEdit={book => { setEditBook(book); setShowAddBook(true); }}
          addBtnLabel="Add Book"
        >
          {showAddBook && <AddBookForm onAdd={submitBook} onClose={() => { setShowAddBook(false); setEditBook(null); }} initialValues={editBook} />}
        </PaginatedSection>
      )}

      {view === "notes" && (
        <PaginatedSection
          title="📝 Notes"
          meta={notes}
          setMeta={setNotes}
          onSearch={s => setNotes({ ...notes, search: s, page: 1 })}
          renderItem={n => `${n.title} – ${n.subject}`}
          onDelete={id => handleDelete(id, `/api/admin/notes/${id}`, fetchNotes)}
          onEdit={note => { setEditNote(note); setShowAddNote(true); }}
          addBtnLabel="Add Note"
        >
          {showAddNote && <AddNoteForm onAdd={submitNote} onClose={() => { setShowAddNote(false); setEditNote(null); }} initialValues={editNote} />}
        </PaginatedSection>
      )}

      {view === "quizzes" && (
        <PaginatedSection
          title="🧠 Quizzes"
          meta={quizzes}
          setMeta={setQuizzes}
          onSearch={s => setQuizzes({ ...quizzes, search: s, page: 1 })}
          renderItem={q => q?.question?.slice ? q.question.slice(0, 60) + "…" : "No question"}

          onDelete={id => handleDelete(id, `/api/admin/quizzes/${id}`, fetchQuizzes)}
          onEdit={quiz => { setEditQuiz(quiz); setShowAddQuiz(true); }}
          addBtnLabel="Add Quiz"
        >
          {showAddQuiz && (
            <AddQuizForm
              onAdd={submitQuiz}
              onClose={() => {
                setShowAddQuiz(false);
                setEditQuiz(null);
              }}
              initialValues={editQuiz}
            />
          )}
        </PaginatedSection>
      )}


      {view === "orders" && (
        <PaginatedSection
          title="🛒 Orders"
          meta={orders}
          setMeta={setOrders}
          renderItem={o => `#${o._id.substr(-6)} – Items:${o.items.length} – User:${o.user?.name}`}
          readOnly
        />
      )}
    </div>
  );
};

const DashboardStats = ({ users, courses, books, notes, quizzes, orders }) => (
  <div className="space-y-1">
    <p>👤 Users:   {users}</p>
    <p>📚 Courses: {courses}</p>
    <p>📘 Books:   {books}</p>
    <p>📝 Notes:   {notes}</p>
    <p>🧠 Quizzes: {quizzes}</p>
    <p>🛒 Orders:  {orders}</p>
  </div>
);

const PaginatedSection = ({
  title,
  meta,
  setMeta,
  onSearch,
  renderItem,
  onDelete,
  onEdit,
  addBtnLabel = "Add",
  readOnly = false,
  children
}) => {
  const { items, page, totalPages, loading } = meta;
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border p-1 rounded text-sm"
          value={meta.search}
          onChange={e => onSearch(e.target.value)}
        />
        {!readOnly && (
          <button onClick={() => { if (onEdit) onEdit(null); }} className="bg-green-600 text-white px-3 py-1 rounded" style={{
            background: "#198754",
            border: "1px solid #ccc",
            marginInline: "9px"
          }}>
            {addBtnLabel}
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-2 min-h-[120px]">
        {loading && <li style={{ listStyle: "none" }}>Loading...</li>}
        {!loading && items.map(it => (
          <li key={it._id} className="flex justify-between items-center border-b pb-1" style={{ listStyle: "none" }}>
            <span>{renderItem(it)}</span>
            {!readOnly && (
              <span className="flex gap-2">
                {onEdit && <button onClick={() => onEdit(it)} className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs" style={{
                  background: "#198754",
                  border: "1px solid #ccc",
                  marginInline: "7px"
                }}>Edit</button>}
                {onDelete && <button onClick={() => onDelete(it._id)} className="bg-red-600 text-white px-2 py-0.5 rounded text-xs"style={{
                  background: "#198754",
                  border: "1px solid #ccc",
                }}>Delete</button>}
              </span>
            )}
          </li>
        ))}
        {!loading && items.length === 0 && <li style={{ listStyle: "none" }}>No data</li>}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button disabled={page === 1} onClick={() => setMeta({ ...meta, page: page - 1 })} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
          <span>{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setMeta({ ...meta, page: page + 1 })} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      )}

      {children}
    </div>
  );
};

export default Dashboard;
