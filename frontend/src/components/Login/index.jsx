import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { authService } from '../../services/auth.service.ts';
import GoogleIcon from '../../assets/google-icon.png';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
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

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authService.login(data);
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


    const handleGoogleLogin = () => {
        authService.googleLogin();
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                       
                        <button type="button" onClick={handleGoogleLogin} className={styles.google_btn}>
                            <div className={styles.google_btn_content}>
                                <img src={GoogleIcon} alt="Google icon" className={styles.google_icon} />
                                <span>Sign In with Google</span>
                            </div>
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;