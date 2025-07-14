import { useState, useEffect } from 'react';
import styles from './form.module.css';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function FormPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveToLocalStorage = (updated: User[]) => {
    localStorage.setItem('users', JSON.stringify(updated));
    setUsers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const updatedUsers = editId
      ? users.map((u) => (u.id === editId ? { ...u, ...formData } : u))
      : [...users, { ...formData, id: Date.now() }];

    saveToLocalStorage(updatedUsers);
    setFormData({ name: '', email: '' });
    setEditId(null);
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = (id: number) => {
    const filtered = users.filter((u) => u.id !== id);
    saveToLocalStorage(filtered);
  };

  const handleRefresh = () => {
    const stored = localStorage.getItem('users');
    if (stored) setUsers(JSON.parse(stored));
  };

  return (
    <div>
      <h1 className={styles.heading}>
        {editId ? 'Edit User' : 'Add New User'}
      </h1>

      <form onSubmit={handleSubmit} className={styles.formBox}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitBtn}>
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <div className={styles.buttonGroup}>
        <button onClick={() => setView('grid')}>Grid View</button>
        <button onClick={() => setView('list')}>List View</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : view === 'grid' ? (
        <div className={styles.cardGrid}>
          {users.map((user) => (
            <div key={user.id} className={styles.cardItem}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <ul style={{ padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} className={styles.listItem}>
              <strong>{user.name}</strong> - {user.email}
              <button onClick={() => handleEdit(user)} style={{ marginLeft: 10 }}>Edit</button>
              <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 5 }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
