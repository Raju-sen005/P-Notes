import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import AddCourseForm from "./AddCourseForm";
import AddBookForm from "./AddBookForm";
import AddNoteForm from "./AddNoteForm";
import AddQuizForm from "./AddQuizForm";
import AddSamplePaperForm from "./AddSamplePaperForm";
import AddArticleForm from "./AddArticleForm";
import AddPreviousPaper from "./AddPreviousPaper";
// import AddTestForm from "./AddTestForm";
// import AddQuestion from "./AddQuestion";

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
  const [samples, setSamples] = useState(initMeta);
  const [articles, setArticles] = useState(initMeta);
  const [previous, setPrevious] = useState(initMeta);
  // const [tests, setTests] = useState(initMeta);
  // const [questions, setQuestions] = useState(initMeta);

  // const [showAddQuestion, setShowAddQuestion] = useState(false);
  // const [editQuestion, setEditQuestion] = useState(null);

  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editArticle, setEditArticle] = useState(null);

  // const [showAddTest, setShowAddTest] = useState(false);
  // const [editTest, setEditTest] = useState(null);

  const [showAddprevious, setShowAddprevious] = useState(false);
  const [editprevious, setEditprevious] = useState(null);


  const [showAddSample, setShowAddSample] = useState(false);
  const [editSample, setEditSample] = useState(null);

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
     setter({ ...meta, loading: false, items: [] });
    }
  };

  const fetchUsers = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/users", users, setUsers), [token, users.page, users.search]);
  const fetchCourses = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/courses", courses, setCourses), [token, courses.page, courses.search]);
  const fetchBooks = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/books", books, setBooks), [token, books.page, books.search]);
  const fetchNotes = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/notes", notes, setNotes), [token, notes.page, notes.search]);
  const fetchQuizzes = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/quizzes", quizzes, setQuizzes), [token, quizzes.page, quizzes.search]);
  const fetchOrders = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/orders", orders, setOrders), [token, orders.page]);
  const fetchArticles = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/articles", articles, setArticles), [token, articles.page, articles.search]);
  const fetchSamples = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/sample-papers", samples, setSamples), [token, samples.page, samples.search]);
  const fetchPrevious = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/previous-papers", previous, setPrevious), [token, previous.page, previous.search]);
  // const fetchTests = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/tests", tests, setTests), [token, tests.page, tests.search]);
  // const fetchQuestions = useCallback(() => handleFetch("https://p-notes-backend.onrender.com/api/admin/questions", questions, setQuestions), [token, questions.page, questions.search]);

  useEffect(() => { if (view === "articles") fetchArticles(); }, [view, fetchArticles]);
  useEffect(() => { if (view === "users") fetchUsers(); }, [view, fetchUsers]);
  useEffect(() => { if (view === "courses") fetchCourses(); }, [view, fetchCourses]);
  useEffect(() => { if (view === "books") fetchBooks(); }, [view, fetchBooks]);
  useEffect(() => { if (view === "notes") fetchNotes(); }, [view, fetchNotes]);
  useEffect(() => { if (view === "quizzes") fetchQuizzes(); }, [view, fetchQuizzes]);
  useEffect(() => { if (view === "orders") fetchOrders(); }, [view, fetchOrders]);
  useEffect(() => { if (view === "samples") fetchSamples(); }, [view, fetchSamples]);
  useEffect(() => { if (view === "previous") fetchPrevious(); }, [view, fetchPrevious]);
  // useEffect(() => { if (view === "tests") fetchTests(); }, [view, fetchTests]);
  // useEffect(() => { if (view === "questions") fetchQuestions(); }, [view, fetchQuestions]);

  const handleDelete = async (id, url, fetchAgain) => {
    if (!window.confirm("Confirm delete?")) return;
    try { await del(url, token); fetchAgain(); }
    catch { setError("Delete failed"); }
  };
  const submitArticle = async (data) => {
    try {
      if (editArticle) {
        await axios.put(`https://p-notes-backend.onrender.com/api/admin/articles/${editArticle._id}`, data, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/admin/articles", data, cfg(token));
      }
      setShowAddArticle(false);
      setEditArticle(null);
      fetchArticles();
    } catch {
      setError("Save failed");
    }
  };

  const submitSample = async (formData) => {
    try {
      if (editSample) {
        await axios.put(`https://p-notes-backend.onrender.com/api/admin/sample-papers/${editSample._id}`, formData, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/admin/sample-papers", formData, cfg(token));
      }
      setShowAddSample(false);
      setEditSample(null);
      fetchSamples();
    } catch {
      setError("Save failed");
    }
  };

  const submitPrevious = async (data) => {
    try {
      if (editprevious) {
        await axios.put(`https://p-notes-backend.onrender.com/api/admin/previous-papers/${editprevious._id}`, data, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/admin/previous-papers", data, cfg(token));
      }
      setShowAddprevious(false);
      setEditprevious(null);
      fetchPrevious();
    } catch {
      setError("Save failed");
    }
  };

  // const submitTest = async (data) => {
  //   try {
  //     if (editTest) {
  //       await axios.put(`https://p-notes-backend.onrender.com/api/admin/tests/${editTest._id}`, data, cfg(token));
  //     } else {
  //       await axios.post("https://p-notes-backend.onrender.com/api/admin/tests", data, cfg(token));
  //     }
  //     setShowAddTest(false);
  //     setEditTest(null);
  //     fetchTests();
  //   } catch {
  //     setError("Save failed");
  //   }
  // };

  // const submitQuestion = async (data) => {
  //   try {
  //     if (editQuestion) {
  //       await axios.put(`https://p-notes-backend.onrender.com/api/admin/questions/${editQuestion._id}`, data, cfg(token));
  //     } else {
  //       await axios.post("https://p-notes-backend.onrender.com/api/admin/questions", data, cfg(token));
  //     }
  //     setShowAddQuestion(false);
  //     setEditQuestion(null);
  //     fetchQuestions();
  //   } catch {
  //     setError("Save failed");
  //   }
  // };

  const submitCourse = async (data) => {
    try {
      if (editCourse) {
        await axios.put(`https://p-notes-backend.onrender.com/api/courses/${editCourse._id}`, data, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/courses", data, cfg(token));
      }
      setShowAddCourse(false); setEditCourse(null); fetchCourses();
    } catch { setError("Save failed"); }
  };

  const submitBook = async (data) => {
    try {
      if (editBook) {
        await axios.put(`https://p-notes-backend.onrender.com/api/books/${editBook._id}`, data, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/books", data, cfg(token));
      }
      setShowAddBook(false); setEditBook(null); fetchBooks();
    } catch { setError("Save failed"); }
  };

  const submitNote = async (formData) => {
    try {
      if (editNote) {
        await axios.put(`https://p-notes-backend.onrender.com/api/notes/${editNote._id}`, formData, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/notes", formData, cfg(token));
      }
      setShowAddNote(false); setEditNote(null); fetchNotes();
    } catch { setError("Save failed"); }
  };

  const submitQuiz = async (data) => {
    try {
      if (editQuiz) {
        await axios.put(`https://p-notes-backend.onrender.com/api/quizzes/${editQuiz._id}`, data, cfg(token));
      } else {
        await axios.post("https://p-notes-backend.onrender.com/api/quizzes", data, cfg(token));
      }
      setShowAddQuiz(false); setEditQuiz(null); fetchQuizzes();
    } catch { setError("Save failed"); }
  };

  const NavButton = ({ tab, label }) => (
    <button onClick={() => setView(tab)} className={`px-1 py-1 rounded ${view === tab ? "bg-white-800 text-white" : "bg-gray-200"} mx-2`} style={{ border: "0.5px solid white", background: "transparent", color: "white" }}>
      {label}
    </button>
  );

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!stats) return <p className="p-4">Loading...</p>;

  return (

    <div className="p-6 space-y-6 text-white"
      style={{
  minHeight: "100vh", 
  width: "100%",
  padding: "11px",
  backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
  backgroundSize: "cover",            
  zIndex: 1,
}}>

      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      <div className="flex gap-4 text-sm font-medium flex-wrap">
        <NavButton tab="dashboard" label="Dashboard" />
        <NavButton tab="users" label="Users" />
        <NavButton tab="courses" label="Courses" />
        <NavButton tab="books" label="Books" />
        <NavButton tab="notes" label="Notes" />
        <NavButton tab="quizzes" label="Quizzes" />
        <NavButton tab="orders" label="Orders" />
        <NavButton tab="articles" label="Articles" />
        <NavButton tab="samples" label="Sample Papers" />
        <NavButton tab="previous" label="Previous Year Papers" />
        {/* <NavButton tab="tests" label="Tests" /> */}
        {/* <NavButton tab="questions" label="Questions" /> */}

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
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/admin/users/${id}`, fetchUsers)}
        />
      )}
      {view === "articles" && (
        <PaginatedSection
          title="📰 Articles"
          meta={articles}
          setMeta={setArticles}
          onSearch={s => setArticles({ ...articles, search: s, page: 1 })}
          renderItem={a => `${a.title} – ${a.description?.slice(0, 40)}…`}
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/admin/articles/${id}`, fetchArticles)}
          onEdit={article => { setEditArticle(article); setShowAddArticle(true); }}
          addBtnLabel="Add Article"
        >
          {showAddArticle && (
            <AddArticleForm
              onAdd={submitArticle}
              onClose={() => {
                setShowAddArticle(false);
                setEditArticle(null);
              }}
              initialValues={editArticle}
            />
          )}
        </PaginatedSection>
      )}

      {/* {view === "tests" && (
        <PaginatedSection
          title="📝Test"
          meta={tests}
          setMeta={setTests}
          onSearch={s => setTests({ ...tests, search: s, page: 1 })}
          renderItem={t => `${t.title} – ${t.courseId?.name} – ${t.questions.length} questions`}
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/admin/tests/${id}`, fetchTests)}
          onEdit={test => { setEditTest(test); setShowAddTest(true); }}
          addBtnLabel="Add Test"
        >
          {showAddTest && (
            <AddTestForm
              onAdd={submitTest}
              onClose={() => {
                setShowAddTest(false);
                setEditTest(null);
              }}
              initialValues={editTest}
            />
          )}
        </PaginatedSection>
      )} */}



      {view === "samples" && (
        <PaginatedSection
          title="📄 Sample Papers"
          meta={samples}
          setMeta={setSamples}
          onSearch={s => setSamples({ ...samples, search: s, page: 1 })}
          renderItem={s => `${s.title} – ${s.description} `}
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/admin/sample-papers/${id}`, fetchSamples)}
          onEdit={sample => { setEditSample(sample); setShowAddSample(true); }}
          addBtnLabel="Add Sample"
        >
          {showAddSample && (
            <AddSamplePaperForm
              onAdd={submitSample}
              onClose={() => {
                setShowAddSample(false);
                setEditSample(null);
              }}
              initialValues={editSample}
            />
          )}
        </PaginatedSection>
      )}

      {view === "previous" && (
        <PaginatedSection
          title="📚 previous year Paper"
          meta={previous}
          setMeta={setPrevious}
          onSearch={s => setPrevious({ ...previous, search: s, page: 1 })}
          renderItem={p => `${p.title} – ${p.description} – ${p.year}`}
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/admin/previous-papers/${id}`, fetchPrevious)}
          onEdit={paper => { setEditprevious(paper); setShowAddprevious(true); }}
          addBtnLabel="Add Previous Paper"
        >
          {showAddprevious && (
            <AddPreviousPaper
              onAdd={submitPrevious}
              onClose={() => {
                setShowAddprevious(false);
                setEditprevious(null);
              }}
              initialValues={editprevious}
            />
          )}
        </PaginatedSection>
      )}

      {view === "courses" && (
        <PaginatedSection
          title="📚 Courses"
          meta={courses}
          setMeta={setCourses}
          onSearch={s => setCourses({ ...courses, search: s, page: 1 })}

          renderItem={c => `${c.title} – ₹${c.price}`}
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/courses/${id}`, fetchCourses)}
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
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/books/${id}`, fetchBooks)}
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
          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/notes/${id}`, fetchNotes)}
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
          renderItem={q => { console.log(q); const Q = q?.questions?.[0]?.question; return Q ? Q.slice(0, 60) + "…" : "No question" }}

          onDelete={id => handleDelete(id, `https://p-notes-backend.onrender.com/api/quizzes/${id}`, fetchQuizzes)}
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
          renderItem={o => {
            console.log(o);
            return `${o.address} – ${o.name} – ${o.mobile}`
          }}
          readOnly
        />
      )}


    </div>

  )
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
 const { items = [], page, totalPages, loading } = meta;
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-2" style={{ textAlign: "end" }}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border p-1 rounded text-sm"
          value={meta.search}
          onChange={e => onSearch(e.target.value)}
        />
        {!readOnly && (
          <button onClick={() => { if (onEdit) onEdit(null); }} className="bg-green-600 text-white px-3 py-1 rounded mx-2" style={{
            background: "#0D6EFD",
            border: "transparent",
            // position:"fixed",
            // left:"285px"
          }}>
            {addBtnLabel}
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-2 min-h-[120px]" style={{ textAlign: "end" }}>
        {loading && <li style={{ listStyle: "none" }}>Loading...</li>}
        {!loading && Array.isArray(items) && items.map(it => (
          <li key={it._id} className="flex justify-between items-center border-b pb-1" style={{ listStyle: "none" }}>
            <span>{renderItem(it)}</span>
            {!readOnly && (
              <span className="flex gap-2">
                {onEdit && <button onClick={() => onEdit(it)} className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs mx-2 mb-2" style={{
                  background: "#0D6EFD",
                  border: "transparent",
                  // position:"fixed",
                  // left:"285px"
                }}>Edit</button>}
                {onDelete && <button onClick={() => onDelete(it._id)} className="bg-red-600 text-white px-0.5 py-0.5 rounded text-xs mx-2 mb-2" style={{
                  background: "#0D6EFD",
                  border: "transparent",
                  // position:"fixed",
                  // left:"340px"
                }}>Delete</button>}
              </span>
            )}
          </li>
        ))}
       {!loading && Array.isArray(items) && items.length === 0 && (
  <li style={{ listStyle: "none" }}>No data</li>
)}

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
