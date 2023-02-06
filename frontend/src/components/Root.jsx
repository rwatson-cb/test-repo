import React from 'react';
import App from './App';
import About from './pages/About';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NoMatch from './pages/NoMatch';
import API from './pages/API';

export default function Root() {
  const routes = [
    { path: '/', name: 'Home', Component: App, exact: true },
    { path: '/about', name: 'About', Component: About, exact: false },
    { path: '/contact', name: 'Contact', Component: Contact, exact: false },
    { path: '/blog', name: 'Blog', Component: Blog, exact: true },
    { path: '/api', name: 'API', Component: API, exact: true },
    { path: '/blog/:id', name: 'Post', Component: BlogPost, exact: false },
    { path: '*', name: 'No Match', Component: NoMatch, exact: false },
  ];

  return (
    <Router>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          {/* <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NoMatch />} />
          </Routes> */}
          
          {/* Using an array for Routes */}
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}
