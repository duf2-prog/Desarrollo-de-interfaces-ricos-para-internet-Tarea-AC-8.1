import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { userService } from "../services/userService";
import '../styles/AuthForm.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await authService.signUp(email, password);
            console.log("Usuario registrado:", userCredential.user);
            await userService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: { admin: false }
            });
            
            setSuccess('Registro exitoso. Redirigiendo al menú...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error: any) {
            console.error("Error al registrarse:", error);
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Registrarse</h2>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Registrarse</button>            
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default Register;