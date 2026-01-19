import React, { useState } from "react";

function GithubUserSearch() {
  // Estados para guardar los datos
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (!username.trim()) return; // Si está vacío, no hace nada

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        // Si la respuesta no es exitosa (ej. 404)
        setUserData(null);
        setError("Usuario no encontrado");
        return;
      }

      const data = await response.json();
      setUserData(data); // Guarda los datos del usuario
      setError(null); // Limpia el error
    } catch {
      setUserData(null);
      setError("Error al buscar usuario");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buscador de Usuarios GitHub</h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario de GitHub"
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Mensaje de error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Información del usuario */}
      {userData && (
        <div style={{ marginTop: "20px" }}>
          <h2>{userData.login}</h2>
          <img
            src={userData.avatar_url}
            alt={`Avatar de ${userData.login}`}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver perfil en GitHub
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default GithubUserSearch;
