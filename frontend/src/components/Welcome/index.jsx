import { authService } from '../../services/auth.service.ts';
import styles from './styles.module.css';

const handleLogout = () => {
    authService.logout();
    window.location.reload("/login");
};

const Welcome = () => {
    return (
        <div className={styles.welcome_container}>
            <nav className={styles.navbar}>
            <h1>Auth Project</h1>
            <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
            </nav>
            <div className={styles.welcome_message}>
                <h1>Welcome to the application</h1>
            </div>
        </div>
    );
};

export default Welcome;