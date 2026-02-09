import { useEffect, useState } from "react"
import { NavigationType, useNavigate } from "react-router-dom"
import { checkPrivate } from "../../services/BackendServices"
import './Profile.css'

export const Profile = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    const check = async () => {
        const response = await checkPrivate()
        if (response) {
            setUser(response)
            setProfile(response)
            setLoading(false)
        } else {
            navigate("/")

        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } else {
            check()
        }

    }, [])

    return (
        <>
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="profile-container">
                        <div className="discord-card">

                            <div className="banner"></div>

                            <div className="avatar-wrapper">
                                <div className="avatar-main">
                                    <img
                                        src="https://m.media-amazon.com/images/I/81zzU+Yf4FL._AC_UF894,1000_QL80_.jpg"
                                        alt="Avatar"
                                    />
                                    <div className="status-indicator"></div>
                                </div>

                                <div className="status-container">
                                    <span>+ ¿Coleccionable favorito?</span>
                                </div>
                            </div>


                            <div className="user-info">
                                <h2 className="username">{profile.username} <span className="hashtag">#</span></h2>
                                <p className="firstname">{profile.firstname}</p>
                            </div>


                            <div className="card-controls">
                                <div className="control-item action-blue">
                                    <span>Colección de juegos</span>
                                    <span className="badge-f">F</span>
                                </div>

                                <div className="control-list">
                                    <button className="list-item">
                                        <i class="fa-solid fa-pen me-2"></i>Editar perfil
                                    </button>

                                    <button className="list-item d-flex justify-content-between align-items-center">
                                        <span><i class="fa-solid fa-circle text-success me-2"></i>En línea</span>
                                        <i className="fa fa-chevron-right"></i>
                                    </button>

                                    <button className="list-item d-flex justify-content-between align-items-center">
                                        <span><i className="fa fa-user me-2"></i> Cambiar de cuenta</span>
                                        <i className="fa fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }


        </>
    )
}