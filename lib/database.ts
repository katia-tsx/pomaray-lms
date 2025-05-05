// Simulación de operaciones de base de datos con Supabase

// Tipos para los datos
interface User {
  id: number
  username: string
  email: string
  role: string
}

interface Course {
  id: number
  title: string
  description: string
  instructor_id: number
}

// Datos de prueba almacenados en localStorage
const initializeDatabase = () => {
  if (!localStorage.getItem("db_users")) {
    localStorage.setItem(
      "db_users",
      JSON.stringify([
        { id: 1, username: "admin", email: "admin@pomaray.edu", role: "admin" },
        { id: 2, username: "profesor1", email: "profesor1@pomaray.edu", role: "teacher" },
        { id: 3, username: "estudiante1", email: "estudiante1@pomaray.edu", role: "student" },
      ]),
    )
  }

  if (!localStorage.getItem("db_courses")) {
    localStorage.setItem(
      "db_courses",
      JSON.stringify([
        { id: 1, title: "Matemáticas Avanzadas", description: "Curso de cálculo y álgebra", instructor_id: 2 },
        { id: 2, title: "Física I", description: "Introducción a la física", instructor_id: 2 },
        { id: 3, title: "Programación Web", description: "Desarrollo de aplicaciones web", instructor_id: 2 },
      ]),
    )
  }
}

// Inicializamos la base de datos
initializeDatabase()

// Funciones para operaciones CRUD

// Usuarios
export const getUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulamos latencia
  return JSON.parse(localStorage.getItem("db_users") || "[]")
}

export const getUserById = async (id: number): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const users = await getUsers()
  return users.find((user) => user.id === id) || null
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const users = await getUsers()
  const newUser = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
  }

  localStorage.setItem("db_users", JSON.stringify([...users, newUser]))
  return newUser
}

export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const users = await getUsers()
  const index = users.findIndex((user) => user.id === id)

  if (index === -1) return null

  const updatedUser = { ...users[index], ...data }
  users[index] = updatedUser
  localStorage.setItem("db_users", JSON.stringify(users))

  return updatedUser
}

export const deleteUser = async (id: number): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const users = await getUsers()
  const filteredUsers = users.filter((user) => user.id !== id)

  if (filteredUsers.length === users.length) return false

  localStorage.setItem("db_users", JSON.stringify(filteredUsers))
  return true
}

// Cursos
export const getCourses = async (): Promise<Course[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return JSON.parse(localStorage.getItem("db_courses") || "[]")
}

export const getCourseById = async (id: number): Promise<Course | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const courses = await getCourses()
  return courses.find((course) => course.id === id) || null
}

export const createCourse = async (course: Omit<Course, "id">): Promise<Course> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const courses = await getCourses()
  const newCourse = {
    ...course,
    id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
  }

  localStorage.setItem("db_courses", JSON.stringify([...courses, newCourse]))
  return newCourse
}

export const updateCourse = async (id: number, data: Partial<Course>): Promise<Course | null> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const courses = await getCourses()
  const index = courses.findIndex((course) => course.id === id)

  if (index === -1) return null

  const updatedCourse = { ...courses[index], ...data }
  courses[index] = updatedCourse
  localStorage.setItem("db_courses", JSON.stringify(courses))

  return updatedCourse
}

export const deleteCourse = async (id: number): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const courses = await getCourses()
  const filteredCourses = courses.filter((course) => course.id !== id)

  if (filteredCourses.length === courses.length) return false

  localStorage.setItem("db_courses", JSON.stringify(filteredCourses))
  return true
}
