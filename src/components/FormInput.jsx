
/**
 * Componente reutilizable para campos de formularios.
 * 
 * Agrupa una etiqueta y un input con caracteristicas especificas
 * con la finalidad de evitar repetir codigo.
 * 
 * @param {string} id - Identificador unico del campo.
 * @param {string} label - Texto de la etiqueta de campo.
 * @param {string} type - Tipo de input.
 * @param {string} placeholder - Texto de ayuda dentro del campo.
 * @param {string} value - Valor actual del campo.
 * @param {Function} onChange - Funcion que se ejecuta al escribir en el campo.
 * @param {number} max - Valor numerico maximo permitido.
 * @param {number} min - Valor numerico minimo permitido.
 * @param {string} error - Mensaje de error del campo en caso de tenerlo.
 * @returns {JSX.Element} label e input agrupados dentro de un contenedor.
 */
function FormInput({
    id, label, type, placeholder, value, onChange, max, min, error
}) {
   return(
    <div className="form-input">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            max={max}
            min={min}
        />
        {error && <p className="field-error">{error}</p>}
    </div>
   ) 
} 

export default FormInput