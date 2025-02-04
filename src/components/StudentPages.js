import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'));
      setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    await addDoc(collection(db, 'students'), formData);
    alert('Student added successfully!');
  };

  return (
    <div>
      <button onClick={() => document.getElementById('add-student-modal').showModal()}>Add Student</button>
      <dialog id="add-student-modal">
        <form method="dialog">
          {Array.from({ length: 4 }).map((_, idx) => (
            <input
              key={idx}
              placeholder={`Field ${idx + 1}`}
              onChange={(e) => setFormData({ ...formData, [`field${idx + 1}`]: e.target.value })}
            />
          ))}
          <button onClick={handleAddStudent}>Submit</button>
        </form>
      </dialog>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} <button onClick={() => deleteDoc(doc(db, 'students', student.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
