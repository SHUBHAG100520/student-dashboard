import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/students">Students</Link>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default Sidebar;

