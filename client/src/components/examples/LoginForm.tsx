import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm 
      onLogin={(email, password) => {
        console.log('Login attempt:', { email, password });
        alert(`Login with: ${email}`);
      }}
      onRegister={() => {
        console.log('Navigate to register');
      }}
    />
  );
}