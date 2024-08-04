import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import authApi from '../../hooks/auth.api';
import { useToken } from '../../hooks/useToken';
import { useUser } from '../../hooks/useUser';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useToken();
  const user = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter email and password.');
      return;
    }
    try {
      // Process Login
      const newToken = await authApi().login(email, password);
      console.log('Login response:', newToken);

      if (!newToken || !newToken.token) {
        // Login failed
        alert('Login failed. Please check your credentials.');
        setErrorMessage('Login failed. Please check your credentials.');
        return;
      }
      // Login successful. Save session token and redirect to dashboard
      setToken(newToken.token);
      console.log('go...');
      history.push('/dashboard');
      return;
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {errorMessage && (
          <div className="ion-padding ion-text-center">
            <IonText color="danger">{errorMessage}</IonText>
          </div>
        )}
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
