import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { authService } from '../../services/auth.service.ts';

const SignUp = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 15000); // 15 seconds

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = ({currentTarget:input}) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authService.signup(data);
            if (result.success) {
                authService.setToken(result.data.token);
                navigate("/welcome");
            } else {
                const errorMessage = Array.isArray(result.error.message) 
                    ? result.error.message.join(', ') 
                    : result.error.message;
                setError(errorMessage);
            }
        } catch (error) {
            console.log(JSON.stringify(error), "error");
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>Sign in</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="User Name"
                            name="username"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;