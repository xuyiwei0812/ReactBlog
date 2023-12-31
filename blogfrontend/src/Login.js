import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch('http://localhost:2887/api/front/login/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log('Response from server:', data);

      if (data.code === 0) {
        console.log('Login successful:', data.data);
        window.location.href = '/';
      } else {
        alert('Login failed: ' + data.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
    }
  };

  const styles = {
    container: {
      width: '350px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '90%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#f1356d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
      <div style={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <br/>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
  );
};

export default Login;
