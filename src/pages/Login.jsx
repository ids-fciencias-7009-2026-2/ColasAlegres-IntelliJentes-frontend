import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../api/userService"
import FormInput from "../components/FormInput"
import '../styles/pages/Login.css'
import '../styles/components/FormInput.css'


/**
 * Pagina de inicio de sesion del usuario.
 * 
 * Permite al usuario autenticarse con sus credenciales (correo electronic
 * y contrasena). Si las credenciales son validas redirige al pefil del usuario,
 * de lo contrario muestra un mensaje de error en pantalla.
 * 
 * @returns {JSX.Element} Formulario de inicio de sesion con campos de correo 
 * electronico y contrasena. Muestra un mensaje de error condicional y 
 * muestra un enlace a la pagina de registro.
 */
function Login() {
    /**Permite redirigir al usuario entre paginas */
    const navigate = useNavigate()

    /**Permite almacenar el correo electronico ingresado por el usuario */
    const [email, setEmail] = useState('')

    /**Permite almacenar la contrasena ingresada por el usuario */
    const [password, setPassword] = useState('')

    /**
     * Almacena el mensaje de error a mostrar
     * Es null cuando no se encuentran errores en la operacion.
     */
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        general: null,
    })

    /** Expresion regular que delimita el formato del correo electronico. */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    /**
     * Valida los campos del formulario de inicio de sesion.
     * 
     * Verifica que:
     * - El correo tenga un formato valido
     * - La contrasena no sea vacia o solo contenga espacios.
     * 
     * Actualiza el estado de los errores con los mensajes correspondientes.
     * 
     * @returns {boolean} true si no hay errores, false en caso contrario.
     */
    const validate = () => {
        const newErrors = {
            email: null,
            password: null,
            general: null
        }

        if (!emailRegex.test(email))
            newErrors.email = 'Please enter a valid email address'

        if (password.trim().length === 0)
            newErrors.password = 'Password is required'

        setErrors(newErrors)
        return Object.values(newErrors).every(error => error === null)
    }

    /**
     * Maneja el envio del formulario de inicio de sesion.
     * 
     * Llama al servicio de autenticacion de las credenciales ingresadas
     * y redirige al perfil del usuario en caso de ser validas. En caso 
     * de que ocurra un error en la operacion actualiza el mensaje almacenado
     * en error.
     * 
     * @param {Event} event - evento de envio del formulario. 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!validate()) return
        try {
            await login({email, hashPassword: password})
            navigate('/profile')
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: 'Invalid Credentials'
            }))           
        }
    }

    return(
        <div className="login-page">
            <i className="fa-solid fa-paw login-icon"></i>
            <h2>Welcome Back!</h2>
            <p className="login-subtitle">Sign in to find your perfect pet companion</p>
            <form onSubmit={handleSubmit}>
                <FormInput
                    id="email"
                    label="E-mail Address"
                    type="email"
                    placeholder="something@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={errors.email}
                />
                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={errors.password}
                />
                 {errors.general && <p className="error-message">{errors.general}</p>}
                <button type="submit">LOGIN</button>
            </form>
            <p>Don't have an account? <Link to="/register">Create a new account now</Link></p>
        </div>
    )
}

export default Login