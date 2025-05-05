// Test de autenticación con JWT - Versión con fallos

describe("Autenticación con JWT en Panel de Administración", () => {
  test("Debe generar un token JWT válido al iniciar sesión", () => {
    // Simulamos el proceso de login
    const username = " admin " // Con espacios en blanco que causarán el error
    const password = "admin123"

    // Función simulada que genera el token
    const generateToken = (user) => {
      // No hace limpieza de espacios en blanco
      return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          sub: user,
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
      )}`
    }

    const token = generateToken(username)
    const decoded = JSON.parse(atob(token.split(".")[1]))

    // Este test fallará porque el username tiene espacios
    expect(decoded.sub).toBe("admin") // Falla porque decoded.sub es ' admin '
    expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
  })

  test("Debe validar correctamente un token JWT", () => {
    // Token con formato incorrecto (falta una parte)
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

    // Función simulada para verificar el token
    const verifyToken = (token) => {
      try {
        // No verifica si el token tiene el formato correcto
        const parts = token.split(".")
        const payload = JSON.parse(atob(parts[1]))
        return payload.exp > Math.floor(Date.now() / 1000)
      } catch (error) {
        return false
      }
    }

    // Este test fallará porque el token es inválido y la función no maneja bien el error
    expect(verifyToken(invalidToken)).toBe(true) // Debería ser false
  })

  test("Debe almacenar el token de forma segura", () => {
    // Simulamos localStorage
    const localStorageMock = {
      store: {},
      getItem: jest.fn((key) => this.store[key]),
      setItem: jest.fn((key, value) => {
        this.store[key] = value
      }),
      clear: jest.fn(() => {
        this.store = {}
      }),
    }

    // Reemplazamos localStorage con nuestro mock
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })

    // Guardamos el token sin encriptar
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYxNjE1MjAwMH0"
    localStorage.setItem("auth_token", token)

    // Este test fallará porque el token se guarda sin encriptar
    expect(localStorage.getItem("auth_token")).not.toBe(token) // Debería estar encriptado
  })
})
