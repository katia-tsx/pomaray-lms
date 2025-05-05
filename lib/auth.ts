// Simulación de autenticación con JWT
import { jwtDecode } from "@/lib/jwt"

// Credenciales de prueba
const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

// Función para generar un token JWT simulado
const generateToken = (username: string): string => {
  const now = Date.now() / 1000
  const payload = {
    sub: username,
    iat: now,
    exp: now + 3600, // Expira en 1 hora
    role: "admin",
  }

  // En un entorno real, esto sería firmado con una clave secreta
  return btoa(JSON.stringify(payload))
}

// Función para iniciar sesión
export const loginUser = async (username: string, password: string): Promise<boolean> => {
  // Simulamos una llamada a la API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Verificamos las credenciales
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    const token = generateToken(username)
    localStorage.setItem("auth_token", token)
    localStorage.setItem("user", JSON.stringify({ username }))
    return true
  }

  return false
}

// Función para verificar la autenticación
export const checkAuth = async (): Promise<{ username: string } | null> => {
  // Simulamos una llamada a la API
  await new Promise((resolve) => setTimeout(resolve, 300))

  const token = localStorage.getItem("auth_token")
  const user = localStorage.getItem("user")

  if (!token || !user) {
    return null
  }

  try {
    // Decodificamos el token
    const decoded = jwtDecode(token)

    // Verificamos si el token ha expirado
    if (decoded.exp < Date.now() / 1000) {
      logout()
      return null
    }

    return JSON.parse(user)
  } catch (error) {
    logout()
    return null
  }
}

// Función para cerrar sesión
export const logout = (): void => {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user")
}
