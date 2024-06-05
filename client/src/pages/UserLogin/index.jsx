import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { authenticate } from "../../api/Api"

const UserLogin = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        authenticate(data)
            .catch(error => setError(error.message))
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                        <h1>Logowanie</h1>
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
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                            className={styles.green_btn}>
                            Zaloguj się
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Nowy tutaj?</h1>
                    <Link to="/users/create">
                        <button type="button"
                            className={styles.white_btn}>
                            Załóż konto
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;