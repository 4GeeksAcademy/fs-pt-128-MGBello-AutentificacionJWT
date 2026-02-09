import React, { useEffect, useState } from "react"
import { login } from "../services/BackendServices.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {

	const navigate = useNavigate()

	const [user, setUser] = useState({
		credentials: "",
		password: ""
	});

	const [errorBack, setErrorBack] = useState()

	console.log(user)
	const handlerChange = (e) => {
		setUser(
			{
				...user,
				[e.target.name]: e.target.value
			}
		)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const dataSubmit = {
				password: user.password,
				[user.credentials.includes("@") ? "email" : "username"]: user.credentials
			}
			await login(dataSubmit, navigate)
		} catch (error) {
			setErrorBack(error)
		}
	}

	return (
		<main className="container-form mx-auto mh-100">
			<div className="container container-login__form w-100 p-5 rounded">
				<form className="w-100 text-white" onSubmit={handleSubmit}>
					<legend className="text-white">
						<h2 className="text-center fs-3">¡Hola de nuevo!</h2>
						<p className="fs-6 text-center">¡Nos alegramos mucho de volver a verte!</p>
					</legend>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label text-white fw-semibold">
							Correo electrónico o nombre de usuario <span className="text-danger">*</span>
						</label>
						<input type="text"
							className="form-control shadow-none"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							name="credentials"
							value={user.credentials}
							onChange={handlerChange}
							required />
						{
							errorBack?.Error &&
							(<p className="text-danger fw-semibold">{errorBack.Error}</p>)
						}
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label text-white fw-semibold">
							Contraseña <span className="text-danger">*</span>
						</label>
						<input type="password"
							className="form-control shadow-none"
							id="password"
							name="password"
							value={user.password}
							onChange={handlerChange}
							required />
						{
							errorBack?.Error &&
							(<p className="text-danger fw-semibold">{errorBack.Error}</p>)
						}

					</div>
					<p className="reset-pass">¿Has olvidado la contraseña?</p>
					<button type="submit" className="btn btn-discord w-100 text-white">Iniciar sesión</button>
					<div className="mt-3 ">
						<Link to="/register" className="link">
							¿Necesitas una cuenta? <span className="link-span">Registrarse</span>
						</Link>
					</div>
				</form>
			</div>
		</main>


	)
}; 