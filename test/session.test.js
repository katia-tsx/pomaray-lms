// Test de gestión de sesiones de usuario

describe("Gestión de Sesiones de Usuario", () => {
  // Simulamos localStorage
  let mockStorage = {}

  beforeEach(() => {
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

  test("Debe mantener la sesión activa durante el tiempo configurado", () => {
    // Función para crear una sesión
    const createSession = (username, expiresIn = 3600) => {
      const now = Math.floor(Date.now() / 1000)
      const session = {
        username,
        createdAt: now,
        expiresAt: now + expiresIn,
      }

      localStorage.setItem("user_session", JSON.stringify(session))
      return session
    }

    // Función para verificar si la sesión está activa
    const isSessionActive = () => {
      const sessionData = localStorage.getItem("user_session")
      if (!sessionData) return false

      const session = JSON.parse(sessionData)
      const now = Math.floor(Date.now() / 1000)

      return session.expiresAt > now
    }

    // Creamos una sesión que expira en 1 hora
    createSession("admin", 3600)

    // Verificamos que la sesión esté activa
    expect(isSessionActive()).toBe(true)

    // Simulamos el paso del tiempo (2 horas)
    jest.spyOn(Date, "now").mockImplementation(() => {
      return new Date().getTime() + 7200 * 1000
    })

    // Verificamos que la sesión haya expirado
    expect(isSessionActive()).toBe(false)

    // Restauramos Date.now
    jest.restoreAllMocks()
  })

  test("Debe persistir el estado del usuario tras recargar la página", () => {
    // Guardamos el estado del usuario
    const userData = {
      id: 1,
      username: "admin",
      role: "administrator",
      preferences: {
        theme: "dark",
        language: "es",
      },
    }

    localStorage.setItem("user_data", JSON.stringify(userData))

    // Simulamos una recarga de página limpiando las variables en memoria
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem("user_data")
      return storedUser ? JSON.parse(storedUser) : null
    }

    // Cargamos el usuario desde localStorage
    const loadedUser = loadUserFromStorage()

    // Verificamos que los datos se hayan mantenido
    expect(loadedUser).toEqual(userData)
    expect(loadedUser.preferences.theme).toBe("dark")
  })
})
