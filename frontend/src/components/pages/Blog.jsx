import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="container">
      <ul>
        <li>
          <Link to="/blog/1">Blog 1</Link>
        </li>
        <li>
          <Link to="/blog/2">Blog 2</Link>
        </li>
      </ul>
    </div>
  );
}
