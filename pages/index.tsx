import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>👋 Welcome to Day 3 Assignment</h1>
      <p style={styles.subheading}>Assignment <strong> Next.js + localStorage</strong>.
      </p>
      <p style={styles.note}>
        Click below to get started and add your first entry!
      </p>
      <Link href="/form">
        <button style={styles.button}>Go to Form ➜</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '50px',
    maxWidth: '600px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  heading: {
    fontSize: '2.2rem',
    color: '#0070f3',
  },
  subheading: {
    fontSize: '1.1rem',
    margin: '20px 0',
  },
  note: {
    marginBottom: '30px',
    color: '#555',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
};
