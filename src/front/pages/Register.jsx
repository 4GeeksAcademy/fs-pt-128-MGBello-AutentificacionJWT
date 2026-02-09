import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/BackendServices";


export const Register = () => {

    const navigate = useNavigate()
    const [isFocus, setIsFocus] = useState("")
    const [errorBack, setErrorBack] = useState()
    const [newUser, setNewUser] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const handlerChange = (e) => {
        setNewUser(
            {
                ...newUser,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(newUser, navigate)
        } catch (error) {
            setErrorBack(error)
        }
    }
    const handlerFocus = (name) => {
        setIsFocus(name)
    }
    const handlerBlur = () => {
        setIsFocus('')
    }


    return (
        <main className="container-form mx-auto mh-100">
            <div className="container-login__form d-flex flex-column align-items-center justify-content-center rounded p-4">
                <form className="w-100" onSubmit={handleSubmit}>
                    <legend className="text-center text-white fw-semibold">Crea una cuenta</legend>
                    <div className="mb-3">
                        <label for="email" className="form-label text-white fw-semibold">Correo electrónico <span className="text-danger">*</span></label>
                        <input type="text"
                            className="form-control"
                            aria-label="email"
                            id="email"
                            aria-describedby="emailHelp"
                            name="email"
                            value={newUser.email}
                            onChange={handlerChange}
                            required />
                        {
                            errorBack?.Error &&
                            (<p className="text-danger fw-semibold">{errorBack.Error}</p>)
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label text-white fw-semibold">Nombre de visualización</label>
                        <input type="text"
                            className="form-control"
                            aria-label="firstname"
                            id="firstname"
                            aria-describedby="addon-wrapping"
                            name="firstname"
                            value={newUser.firstname}
                            onChange={handlerChange}
                            onFocus={() => handlerFocus('firstname')}
                            onBlur={handlerBlur}
                            required />
                        {isFocus === 'firstname' && <p className="text-light">Así te verá el resto de la gente. Puedes usar caracteres especiales y emojis.</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-white fw-semibold">Nombre de usuario <span className="text-danger">*</span></label>
                        <input type="text"
                            className="form-control"
                            aria-label="username"
                            id="username"
                            aria-describedby="addon-wrapping"
                            name="username"
                            value={newUser.username}
                            onChange={handlerChange}
                            onFocus={() => handlerFocus('username')}
                            onBlur={handlerBlur}
                            required />
                        {
                            errorBack?.Error &&
                            (<p className="text-danger fw-semibold">{errorBack.Error}</p>)
                        }
                        {isFocus === 'username' && <p className="text-light">Utiliza solo numeros, letras, guiones bajos (_) o puntos.</p>}
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label text-white fw-semibold">Contraseña<span className="text-danger">*</span></label>
                        <input type="password"
                            className="form-control"
                            aria-label="password"
                            id="password"
                            aria-describedby="addon-wrapping"
                            name="password"
                            value={newUser.password}
                            onChange={handlerChange}
                            requierd />
                        {
                            errorBack?.Error &&
                            (<p className="text-danger fw-semibold">{errorBack.Error}</p>)
                        }
                    </div>
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <Link to="/">
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-discord text-white w-100">Crear cuenta</button>
                </form>
            </div>
        </main>
    )
}