// Test de integridad de base de datos - Versión con fallos

describe("Integridad de Base de Datos Supabase", () => {
  // Simulamos la base de datos
  const mockDatabase = {
    users: [
      { id: 1, username: "admin", email: "admin@pomaray.edu" },
      { id: 2, username: "profesor1", email: "profesor1@pomaray.edu" },
    ],
    courses: [
      { id: 1, title: "Matemáticas", instructor_id: 2 },
      { id: 2, title: "Física", instructor_id: 3 }, // Instructor que no existe
    ],
  }

  test("Debe insertar correctamente nuevos registros", () => {
    // Función para insertar un usuario
    const insertUser = (user) => {
      // No valida si el usuario ya existe
      const newId = mockDatabase.users.length + 1
      mockDatabase.users.push({ ...user, id: newId })
      return { ...user, id: newId }
    }

    // Intentamos insertar un usuario que ya existe
    const newUser = { username: "admin", email: "admin@pomaray.edu" }
    const result = insertUser(newUser)

    // Este test fallará porque permitimos duplicados
    expect(mockDatabase.users.filter((u) => u.username === "admin").length).toBe(1)
  })

  test("Debe mantener la integridad referencial", () => {
    // Función para verificar integridad referencial
    const checkReferentialIntegrity = () => {
      // No implementa correctamente la verificación
      return true
    }

    // Este test fallará porque hay un curso con instructor_id que no existe
    expect(checkReferentialIntegrity()).toBe(true)
  })

  test("Debe realizar consultas en tiempo óptimo", () => {
    // Función para medir el tiempo de consulta
    const measureQueryTime = () => {
      // Simulamos una consulta lenta (más de 500ms)
      return 800
    }

    // Este test fallará porque la consulta es demasiado lenta
    expect(measureQueryTime()).toBeLessThan(500)
  })
})
