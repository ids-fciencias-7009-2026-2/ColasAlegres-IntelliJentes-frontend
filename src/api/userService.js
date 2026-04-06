import { api } from "./helper";

/**
 * Realiza una peticion POST al endpoint register que nos permite
 * dar de alta un usuario nuevo en el sistema.
 * 
 * @param {object} user - Objeto con los datos del nuevo usuario.
 * @param {string} user.name - Nombre del usuario.
 * @param {string} user.email - Correo electronico del usuario.
 * @param {string} user.hashPassword - Contrasena del usuario.
 * @param {string} user.zipCode - Codigo postal del usuario. 
 * @returns {Promise} Promesa con los datos del usuario creado.
 */
export const  register = (user) => {
    return api.post('/users/register', user).then((response) => response.data)
}

/**
 * Realiza una peticion POST al endpoint de login que autentica al usuario 
 * si las credenciales son validas. 
 * 
 * Cuando recibe el token, este es almacenado en el localStorage del navegador
 * para su uso en peticiones posteriores.
 * 
 * @param {object} credential - Objeto con las credenciales del usuario.
 * @param {string} credential.email - Correo electronico del usuario.
 * @param {string} credential.hashPassword - Contrasena del usuario. 
 * @returns {Promise} Promesa con el token de sesion iniciada.
 */
export const login = (credential) => {
    return api.post('/users/login', credential).then((response) => {
        localStorage.setItem('token', response.data)
        return response.data
    })
}

/**
 * Realiza una peticion GET al endpoint de me que nos permite recuperar
 * la informacion del usuario autenticado en la sesion actual. Requiere un
 * token de sesion activo.
 * 
 * @returns {Promise} Una promesa con los datos del usuario autenticado.
 */
export const me = () => {
    return api.get('/users/me').then((response) => response.data)
}

/**
 * Realiza una peticion POST al endpoint de ciere de sesion.
 * Elimina el token de inicio de sesion del localStorage del navegador
 * al completarse.
 * 
 * @returns {Promise} Promesa con la confirmacion de cierre de sesion.
 */
export const logout = () =>{
    return api.post('/users/logout').then((response) => {
        localStorage.removeItem('token')
        return response.data
    })
}

/**
 * Realiza una peticion PATCH para actualizar parcialmente la informacion
 * del usuario con la sesion activa. Solo sera necesario enviar los campos 
 * a modificar.
 * 
 * Requiere un token de sesion activa.
 * 
 * @param {object} userUpdate - Objeto con los campos a actualizar. 
 * @param {string} userUpdate.name - Nuevo nombre del usuario (opcional).
 * @param {string} userUpdate.email - Nuevo correo electronico del usuario (opcional).
 * @param  {string} userUpdate.hashPassword - Nueva contrasena del usuario (opcional).
 * @param {string} userUpdate.zipCode - Nuevo codigo postal del usuario (opcional).
 * @returns {Promise} Promesa con los datos del usuario actualizado.
 */
export const update = (userUpdate) => {
    return api.patch('/users', userUpdate).then((response) => response.data)
}