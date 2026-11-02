import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Reg_auth = () => {
    const [isRegistration, setisRegistration] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [dataget, setdata] = useState("")
    const [token, setToken] = useState(localStorage.getItem("sessiontoken") || "")
    const [registrationError, setregistrationError] = useState(false)

    useEffect(() => {
        const find_by_token = async () => {
            if (!token) return;
            const data = await fetch("http://127.0.0.1:8000/userToken", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const response = await data.json()
            setdata(response)
        }
        find_by_token()
    }, [token])

    useEffect(() => {
        setregistrationError(false)
    }, [isRegistration])

    const ExitAcount = () => {
        setToken("")
        localStorage.setItem("sessiontoken", "")
    }

    const registration = async (username, password) => {
        try {
            const data = await fetch("http://127.0.0.1:8000/userAdd", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            })
            if (!data.ok) {
                const response = await data.json()
                setErrorText(response.detail)
                throw new Error(`Ошибка сервера: ${data.status}`)
            }

            setregistrationError(false)
            authorisation(username, password)
        }
        catch (error) {
            setregistrationError(true)
        }
    }

    const authorisation = async (username, password) => {
        try {
            const data = await fetch("http://127.0.0.1:8000/users/find", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            })
            if (!data.ok) {
                const response = await data.json()
                setErrorText(response.detail)
                throw new Error(`Ошибка сервера: ${data.status}`)
            }
            if (data.ok) {
                const response = await data.json()
                setToken(response.sessiontoken)
                localStorage.setItem("sessiontoken", response.sessiontoken)
                console.log("Успешная авторизация", response)
                setdata(response)
            }
        }
        catch (error) {
            setregistrationError(true)
        }
    }

    if (token != "") {
        return (
            <div className="auth-success-panel">
                <div className="contentinsideauth">
                <h1>Привет, {dataget ? dataget.name : "Загрузка"}</h1>
                {dataget.admin && <Link to = "/Card/Create"> <input type="button" value="Новая карточка" className="auth-submit"/></Link>}
                <input type="submit" value="Выйти" onClick={() => ExitAcount()} className="auth-submit" />
                </div>
            </div>
        )
    }

    if (isRegistration === true) {
        return (
            <div className="RegistrationBlock">
                <div className="AuthPage auth-card">
                    <div className="auth-header">
                        <span className="auth-badge">Welcome</span>
                        <h1>Регистрация</h1>
                    </div>

                    <div className="auth-form">
                        <label className="auth-field">
                            <span>Username</span>
                            <input
                                type="text"
                                className="UserInput InputTypical auth-input"
                                onChange={(e) => setUsername(e.target.value)}
                                key="reg-username"
                                placeholder="Введите имя"
                            />
                        </label>

                        <label className="auth-field">
                            <span>Password</span>
                            <input
                                type="password"
                                className="PasswordInput InputTypical auth-input"
                                onChange={(e) => setPassword(e.target.value)}
                                key="reg-password"
                                placeholder="Введите пароль"
                            />
                        </label>

                        <button type="button" className="Forget">Forgot your password?</button>

                        <input
                            type="submit"
                            value="Sign up"
                            onClick={() => registration(username, password)}
                            className="InputTypical RegistrationInput auth-submit"
                        />

                        <button type="button" className="auth-toggle" onClick={() => setisRegistration(false)}>
                            Уже есть аккаунт? Войти
                        </button>
                    </div>

                    {registrationError && (
                        <p className="errorRegistration">{errorText}</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="RegistrationBlock">
            <div className="AuthPage auth-card">
                <div className="auth-header">
                    <span className="auth-badge">Welcome back</span>
                    <h1>Авторизация</h1>
                </div>

                <div className="auth-form">
                    <label className="auth-field">
                        <span>Username</span>
                        <input
                            type="text"
                            className="UserInput auth-input"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите имя"
                        />
                    </label>

                    <label className="auth-field">
                        <span>Password</span>
                        <input
                            type="password"
                            className="PasswordInput auth-input"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                        />
                    </label>

                    <input
                        type="submit"
                        value="Войти"
                        onClick={() => authorisation(username, password)}
                        className="auth-submit"
                    />

                    <button type="button" className="auth-toggle" onClick={() => setisRegistration(true)}>
                        Нет аккаунта? Зарегистрироваться
                    </button>
                </div>

                {registrationError && (
                    <p className="errorRegistration">{errorText}</p>
                )}
            </div>
        </div>
    )
}

export default Reg_auth