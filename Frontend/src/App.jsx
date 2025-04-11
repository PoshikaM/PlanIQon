import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TodoPage from "../pages/TodoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/todos" element={<TodoPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;