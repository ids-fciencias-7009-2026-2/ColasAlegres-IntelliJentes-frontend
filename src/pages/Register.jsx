import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../api/userService"
import FormInput from "../components/FormInput"

/**
 * Pagina de registro de usuarios.
 * 
 * Permite al usuario crear una cuenta nueva ingresando los datos solicitados:
 * nombre completo, correo electronico, contrasena y codigo postal. Al completarse
 * correctamente, redirige al inicio de sesion.
 *
 * 
 * @returns {JSX.Element} Formulario de registro con campos de nombre,
 * correo electronico, contrasena y codigo postal. Muestra un mensaje de error
 * condicional y un enlace a la pagina de inicio de sesion. 
 */
function Register() {
    /**Permite redirigir al usuario entre paginas */
    const navigate = useNavigate()
    
    /**Permite almacenar el nombre ingresado por el usuario */
    const [name, setName] = useState('')
    
    /**Permite almacenar el correo electronico ingresado por el usuario */
    const [email, setEmail] = useState('')

    /**Permite almacenar la contrasena ingresada por el usuario */
    const[password, setPassword] = useState('')

    /**Permite almacenar el codigo postal ingresado por el usuario. */
    const[zipCode, setZipCode] = useState('')

    /**
     *  Estado que almacena los errores de validación.
     * 
     * Cada campo representa el error de un campo especifico.
     */
    const[errors, setErrors] = useState({
        name: null,
        email: null,
        password: null,
        zipCode: null,
        general: null,
    })

    /** Expresion regular para validar el formato del correo electronico */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    /** Expresion regular para validar el formato de la contrasena */
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    
    /** Expresion regular para validar el formato del codigo postal */
    const zipCodeRegex = /^\d{5}$/

    /**
     * Valida los campos del formulario de registro.
     * 
     * Verifica que:
     * - El nombre tenga al menos 2 caracteres.
     * - El correo electronico siga un formato valido.
     * - La contrasena siga el formato especificado.
     * - El codigo postal tenga exactamente 5 digitos.
     * 
     * Actualiza el estado de los errores con los mensajes correspondientes.
     * 
     * @returns {boolean}true si no hay errores, false en caso contrario.
     */
    const validate = () => {
        const newErrors = {
            name: null,
            email: null,
            password: null,
            zipCode: null,
            general: null
        }

        if (name.trim().length < 2)
            newErrors.name = 'Name must be at least 2 characters.'
        if (!emailRegex.test(email))
            newErrors.email = 'Please enter a valid email address.'
        if (!passwordRegex.test(password))
            newErrors.password = 'Password must be at least 8 characters, include one uppercase, one number and one special character.'
        if (!zipCodeRegex.test(zipCode))
            newErrors.zipCode = 'Zip code must be exactly 5 digits.'

        setErrors(newErrors)
        return Object.values(newErrors).every(error => error === null)
    }

    /**
     * Maneja el envio del formulario de registro del usuario.
     * 
     * Llama al servicio de registro del usuario y redirige a la 
     * pagina de inicio de sesion en caso de ser correcto. En caso 
     * de que ocurra un error en la operacion actualiza el mensaje almacenado
     * en error.
     * 
     * @param {Event} event - evento de envio del formulario. 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!validate()) return
        try {
            await register({name, email, hashPassword : password, zipCode})
            navigate('/login')
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: 'Registration failed, please try again' 
            }))
        }
    }

    return(
        <div className="register-page">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    id="name"
                    label="Please Enter Your Full Name"
                    type="text"
                    placeholder="Enter your Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={errors.name}
                />
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
                <FormInput
                    id="zipCode"
                    label="Please Enter Your Zip Code"
                    type="text"
                    placeholder="12345"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    max="99999"
                    min="10000"
                    error={errors.zipCode}
                />
                {errors.general && <p className="error-message">{errors.general}</p>}
                <button type="submit">SIGNUP</button>
                <p>Do you have an account? <Link to="/login">Login now</Link></p>
            </form>
        </div>
    )
}

export default Register