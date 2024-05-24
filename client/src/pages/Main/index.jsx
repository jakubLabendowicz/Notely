import { Link } from "react-router-dom"
import styles from "./styles.module.css"
const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.f__nav}>
                <section className={styles.f__section}>
                    <div className={styles.f__section_inner}>
                        <div className={styles.f__bar_section}>
                            <div className={styles.f__bar_section__box}>
                                <div className={styles.f__bar_section__title}>
                                    <Link to="/">
                                        <button href="index.php" className={styles.f__bar_section__title_inner}>Searchify!</button>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.f__bar_section__box}>
                                <div className={styles.f__bar_section__element}>
                                    <Link to="/">
                                        <button className={styles.f__bar_section__element_active}>Search</button>
                                    </Link>
                                </div>
                                <div className={styles.f__bar_section__element}>
                                    <Link to="/favorites">
                                        <button className={styles.f__bar_section__element_inner}>Favorites</button>
                                    </Link>
                                </div>
                                <div className={styles.f__bar_section__element}>
                                    <button className={styles.f__bar_section__element_inner} onClick={handleLogout}>Log out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </nav>
            <div className={styles.f__container}>
                <header className={styles.f__header}>
                    <section className={styles.f__search_section__section}>
                        <div className={styles.f__section_inner}>
                            <div className={styles.f__section__title}>Searchify!</div>
                            <div className={styles.f__search_section__bar}>
                                {/* <input id={style.SEARCH_INPUT} className={styles.f__search_section__bar__input} type="text" placeholder="Search your track"></input> */}
                                {/* <button className={styles.f__search_section__bar__button} onclick="search()">
                                    <div id="SEARCH"></div>
                                </button> */}
                            </div>
                        </div>
                    </section>
                </header>
            </div>
        </div>
    )
}
export default Main