import React from 'react'
import '../../assets/css/perfil.css'
// codigo de importaciones
const perfil = () => {
//codigo de funciones y demás cosos
  return (
    //codigo de lo que se va a mostrar en el html
    <div>
        <form action="">
            <div className="container">
                <h1>Perfil</h1>
                <p>Actualiza tu información</p>
                <hr />
                <label htmlFor="nombre"><b>Nombre</b></label>
                <input type="text" placeholder="Ingresa tu nombre" name="nombre" required />
                <label htmlFor="apellido"><b>Apellido</b></label>
                <input type="text" placeholder="Ingresa tu apellido" name="apellido" required />
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Ingresa tu email" name="email" required />
                <label htmlFor="psw"><b>Contraseña</b></label>
                <input type="password" placeholder="Ingresa tu contraseña" name="psw" required />
                <label htmlFor="psw-repeat"><b>Repite la contraseña</b></label>
                <input type="password" placeholder="Repite tu contraseña" name="psw-repeat" required />
                <label htmlFor="pais"><b>País</b></label>
                <input type="text" placeholder="Ingresa tu país" name="pais" required />
                <label htmlFor="ciudad"><b>Ciudad</b></label>
                <input type="text" placeholder="Ingresa tu ciudad" name="ciudad" required />
                <label htmlFor="direccion"><b>Dirección</b></label>
                <input type="text" placeholder="Ingresa tu dirección" name="direccion" required />
                <label htmlFor="telefono"><b>Teléfono</b></label>
                <input type="text" placeholder="Ingresa tu teléfono" name="telefono" required />
                <button type="submit" className="registerbtn">Actualizar</button>
            </div>
        </form>
    </div>
  )
}

export default perfil