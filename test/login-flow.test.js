// Test de flujo completo de login y panel

describe("Flujo Completo de Login y Panel", () => {
  // Simulamos el estado de la aplicación
  let appState = {
    isAuthenticated: false,
    user: null,
    redirectTo: null,
    errors: [],
  }

  // Simulamos localStorage
  let mockStorage = {}

  beforeEach(() => {
    appState = {
      isAuthenticated: false,
      user: null,
      redirectTo: null,
      errors: [],
    }

    mockStorage = {}

    // Mock de localStorage
    global.localStorage = {
      getItem: jest.fn((key) => mockStorage[key]),
      setItem: jest.fn((key, value) => {
        mockStorage[key] = value
      }),
      removeItem: jest.fn((key) => {
        delete mockStorage[key]
      }),
      clear: jest.fn(() => {
        mockStorage = {}
      }),
    }
  })

  test("Debe completar correctamente el flujo de login exitoso", async () => {
    // Simulamos la base de datos de usuarios
    const users = [
      { id: 1, username: "admin", password: "admin123", role: "admin" },
      { id: 2, username: "profesor", password: "prof123", role: "teacher" },
    ]

    // Función para iniciar sesión
    const login = async (username, password) => {
      // Verificamos las credenciales
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        // Creamos el token
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
          JSON.stringify({
            sub: user.username,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 3600,
          }),
        )}`

        // Guardamos en localStorage
        localStorage.setItem("auth_token", token)
        localStorage.setItem("user", JSON.stringify({ id: user.id, username: user.username, role: user.role }))

        // Actualizamos el estado
        appState.isAuthenticated = true
        appState.user = { id: user.id, username: user.username, role: user.role }
        appState.redirectTo = "/dashboard"

        return { success: true }
      } else {
        appState.errors.push("Credenciales inválidas")
        return { success: false, error: "Credenciales inválidas" }
      }
    }

    // Función para verificar permisos
    const checkPermission = (requiredRole) => {
      if (!appState.isAuthenticated) return false

      if (requiredRole === "admin") {
        return appState.user.role === "admin"
      } else if (requiredRole === "teacher") {
        return ["admin", "teacher"].includes(appState.user.role)
      } else {
        return true // Todos los usuarios autenticados
      }
    }

    // Ejecutamos el flujo de login
    const loginResult = await login("admin", "admin123")

    // Verificamos el resultado del login
    expect(loginResult.success).toBe(true)
    expect(appState.isAuthenticated).toBe(true)
    expect(appState.redirectTo).toBe("/dashboard")

    // Verificamos los permisos
    expect(checkPermission("admin")).toBe(true)

    // Verificamos que los datos se hayan guardado en localStorage
    expect(localStorage.getItem("auth_token")).toBeTruthy()
    expect(JSON.parse(localStorage.getItem("user")).username).toBe("admin")
  })

  test("Debe manejar correctamente el intento de login con credenciales inválidas", async () => {
    // Simulamos la base de datos de usuarios
    const users = [
      { id: 1, username: "admin", password: "admin123", role: "admin" },
      { id: 2, username: "profesor", password: "prof123", role: "teacher" },
    ]

    // Función para iniciar sesión
    const login = async (username, password) => {
      // Verificamos las credenciales
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        // Creamos el token
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
          JSON.stringify({
            sub: user.username,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 3600,
          }),
        )}`

        // Guardamos en localStorage
        localStorage.setItem("auth_token", token)
        localStorage.setItem("user", JSON.stringify({ id: user.id, username: user.username, role: user.role }))

        // Actualizamos el estado
        appState.isAuthenticated = true
        appState.user = { id: user.id, username: user.username, role: user.role }
        appState.redirectTo = "/dashboard"

        return { success: true }
      } else {
        appState.errors.push("Credenciales inválidas")
        return { success: false, error: "Credenciales inválidas" }
      }
    }

    // Ejecutamos el flujo de login con credenciales incorrectas
    const loginResult = await login("admin", "contraseña_incorrecta")

    // Verificamos el resultado del login
    expect(loginResult.success).toBe(false)
    expect(appState.isAuthenticated).toBe(false)
    expect(appState.user).toBeNull()
    expect(appState.errors).toContain("Credenciales inválidas")

    // Verificamos que no se hayan guardado datos en localStorage
    expect(localStorage.getItem("auth_token")).toBeFalsy()
    expect(localStorage.getItem("user")).toBeFalsy()
  })
})
