// pages/login.tsx
import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de autenticación, como enviar los datos al servidor.
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Valida la contraseña
    if (!isValidPassword(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres de longitud, \n' +
          '1 letra mayúscula, 1 letra minúscula y 1 número.'
      );
      return;
    }

     // Si las validaciones pasan, procede con la autenticación
     setError('');
    // Implementa la lógica de autenticación
  };

  const isValidPassword = (password: string) => {
    // Validar que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  return (

    <div className={styles.logincontainer}>
      <div className={styles.logincontent}>        
        {error && <p className={styles.alerta}>{error}</p>}
        <form onSubmit={handleSubmit}>
        <img src="" alt="" className={styles.imgStyle} />
          <div className={styles.formgroup}>
            <label className={styles.labelset} htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.labelset} htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
          <p>Aun no tienes Cuenta? Registrate <Link href='/'>Aquí</Link> </p>
          <Link href="/">Recuperar Contraseña</Link>
        </form>
      </div>
    </div>

  );
};

export default Login;
