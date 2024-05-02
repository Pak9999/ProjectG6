import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import ArticleTemplate from './ArticleTemplate.jsx';
import NotFound from './NotFound.jsx';
import About from './About.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article-template" element={<ArticleTemplate />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;