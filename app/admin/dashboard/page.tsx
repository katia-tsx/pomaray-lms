"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { checkAuth, logout } from "@/lib/auth"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const userData = await checkAuth()
      if (userData) {
        setUser(userData)
      } else {
        router.push("/admin/login")
      }
      setLoading(false)
    }

    verifyAuth()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <p className="text-lg">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-2xl font-bold text-emerald-800">Panel de Administración</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-emerald-700">Bienvenido, {user?.username}</p>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">Panel de Control</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes</CardTitle>
              <CardDescription>Gestión de estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">245</p>
              <p className="text-sm text-muted-foreground">Estudiantes activos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cursos</CardTitle>
              <CardDescription>Gestión de cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">Cursos disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profesores</CardTitle>
              <CardDescription>Gestión de profesores</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Profesores activos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 bg-gray-50 rounded">Usuario "maria_docente" inició sesión - hace 5 minutos</li>
                <li className="p-2 bg-gray-50 rounded">Curso "Matemáticas Avanzadas" actualizado - hace 2 horas</li>
                <li className="p-2 bg-gray-50 rounded">Nuevo estudiante registrado - hace 3 horas</li>
                <li className="p-2 bg-gray-50 rounded">Calificaciones actualizadas para "Física I" - hace 5 horas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Acciones frecuentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Añadir Nuevo Estudiante</Button>
              <Button className="w-full">Crear Nuevo Curso</Button>
              <Button className="w-full">Gestionar Calificaciones</Button>
              <Button className="w-full">Generar Reportes</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
