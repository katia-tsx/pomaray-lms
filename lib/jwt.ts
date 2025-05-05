// Simulación simple de funciones JWT

// Decodifica un token JWT (simulado)
export const jwtDecode = (token: string): { sub: string; exp: number; iat: number; role: string } => {
  try {
    // En un entorno real, esto verificaría la firma
    const payload = JSON.parse(atob(token))
    return payload
  } catch (error) {
    throw new Error("Token inválido")
  }
}

// Verifica un token JWT (simulado)
export const verifyToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token)
    return decoded.exp > Date.now() / 1000
  } catch (error) {
    return false
  }
}
