"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { runAuthTest, runDatabaseTest, runMiddlewareTest, runSessionTest, runLoginFlowTest } from "@/lib/tests"

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("failed")
  const [testResults, setTestResults] = useState({
    authTest: { status: "pending", message: "", details: [] },
    dbTest: { status: "pending", message: "", details: [] },
    middlewareTest: { status: "pending", message: "", details: [] },
    sessionTest: { status: "pending", message: "", details: [] },
    loginFlowTest: { status: "pending", message: "", details: [] },
  })

  const runTest = async (testName: string) => {
    setTestResults((prev) => ({
      ...prev,
      [testName]: { status: "running", message: "Ejecutando prueba...", details: [] },
    }))

    try {
      let result
      switch (testName) {
        case "authTest":
          result = await runAuthTest(activeTab === "failed")
          break
        case "dbTest":
          result = await runDatabaseTest(activeTab === "failed")
          break
        case "middlewareTest":
          result = await runMiddlewareTest(activeTab === "failed")
          break
        case "sessionTest":
          result = await runSessionTest(activeTab === "failed")
          break
        case "loginFlowTest":
          result = await runLoginFlowTest(activeTab === "failed")
          break
        default:
          throw new Error("Test no reconocido")
      }

      setTestResults((prev) => ({
        ...prev,
        [testName]: result,
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          status: "error",
          message: "Error al ejecutar la prueba",
          details: [{ message: error instanceof Error ? error.message : "Error desconocido" }],
        },
      }))
    }
  }

  const runAllTests = async () => {
    await runTest("authTest")
    await runTest("dbTest")
    await runTest("middlewareTest")
    await runTest("sessionTest")
    await runTest("loginFlowTest")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Éxito</Badge>
      case "failed":
        return <Badge className="bg-red-500">Fallido</Badge>
      case "running":
        return <Badge className="bg-blue-500">Ejecutando</Badge>
      case "pending":
        return <Badge className="bg-gray-400">Pendiente</Badge>
      case "error":
        return <Badge className="bg-yellow-500">Error</Badge>
      default:
        return <Badge className="bg-gray-400">Desconocido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="container mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-emerald-800">Pruebas del Sistema Pomaray LMS</h1>
            <Link href="/">
              <Button variant="outline">Volver al Inicio</Button>
            </Link>
          </div>
          <p className="text-lg text-gray-600">
            Esta página muestra los resultados de las pruebas del sistema para verificar su correcto funcionamiento.
          </p>
        </header>

        <Tabs defaultValue="failed" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="failed">Pruebas Fallidas</TabsTrigger>
            <TabsTrigger value="success">Pruebas Exitosas</TabsTrigger>
          </TabsList>

          <TabsContent value="failed" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <p className="text-red-600 font-medium">
                Estas pruebas están configuradas para fallar intencionalmente con el fin de demostrar el comportamiento
                del sistema ante errores.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="success" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <p className="text-green-600 font-medium">
                Estas pruebas están configuradas para ejecutarse correctamente y demostrar el funcionamiento óptimo del
                sistema.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-6 flex justify-end">
          <Button onClick={runAllTests} className="bg-emerald-600 hover:bg-emerald-700">
            Ejecutar Todas las Pruebas
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Test 1: Autenticación con JWT */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>1.2.1 Prueba de Autenticación con JWT en Panel de Administración</CardTitle>
                  <CardDescription>Valida el correcto uso de tokens JWT en el login del administrador</CardDescription>
                </div>
                {getStatusBadge(testResults.authTest.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Esta prueba valida el correcto uso de tokens JWT en el login del administrador. Verifica la generación,
                almacenamiento y validación de tokens.
              </p>

              {testResults.authTest.status !== "pending" && (
                <div
                  className={`p-4 rounded-lg ${
                    testResults.authTest.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : testResults.authTest.status === "failed"
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className="font-medium mb-2">{testResults.authTest.message}</p>
                  {testResults.authTest.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {testResults.authTest.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">
                          {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => runTest("authTest")}
                className="w-full"
                disabled={testResults.authTest.status === "running"}
              >
                {testResults.authTest.status === "running" ? "Ejecutando..." : "Ejecutar Prueba"}
              </Button>
            </CardFooter>
          </Card>

          {/* Test 2: Integridad de Base de Datos */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>1.2.2 Prueba de Integridad de Base de Datos Supabase</CardTitle>
                  <CardDescription>
                    Verifica la persistencia, velocidad y consistencia en consultas a la base de datos
                  </CardDescription>
                </div>
                {getStatusBadge(testResults.dbTest.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Se realiza un test de inserción, actualización y eliminación de datos en Supabase para comprobar la
                persistencia, velocidad de respuesta y consistencia en consultas.
              </p>

              {testResults.dbTest.status !== "pending" && (
                <div
                  className={`p-4 rounded-lg ${
                    testResults.dbTest.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : testResults.dbTest.status === "failed"
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className="font-medium mb-2">{testResults.dbTest.message}</p>
                  {testResults.dbTest.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {testResults.dbTest.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">
                          {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => runTest("dbTest")}
                className="w-full"
                disabled={testResults.dbTest.status === "running"}
              >
                {testResults.dbTest.status === "running" ? "Ejecutando..." : "Ejecutar Prueba"}
              </Button>
            </CardFooter>
          </Card>

          {/* Test 3: Middleware ante Errores */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>1.2.3 Prueba de Middleware ante Errores Deliberados</CardTitle>
                  <CardDescription>
                    Simula errores intencionales para verificar la correcta respuesta del middleware
                  </CardDescription>
                </div>
                {getStatusBadge(testResults.middlewareTest.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Simulamos errores intencionales (como tokens corruptos o expirados) para verificar la correcta respuesta
                del middleware. El sistema debe responder con códigos HTTP apropiados.
              </p>

              {testResults.middlewareTest.status !== "pending" && (
                <div
                  className={`p-4 rounded-lg ${
                    testResults.middlewareTest.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : testResults.middlewareTest.status === "failed"
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className="font-medium mb-2">{testResults.middlewareTest.message}</p>
                  {testResults.middlewareTest.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {testResults.middlewareTest.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">
                          {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => runTest("middlewareTest")}
                className="w-full"
                disabled={testResults.middlewareTest.status === "running"}
              >
                {testResults.middlewareTest.status === "running" ? "Ejecutando..." : "Ejecutar Prueba"}
              </Button>
            </CardFooter>
          </Card>

          {/* Test 4: Gestión de Sesiones */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>1.2.4 Prueba de Gestión de Sesiones de Usuario</CardTitle>
                  <CardDescription>
                    Valida el tiempo de expiración de sesión y persistencia del estado de usuario
                  </CardDescription>
                </div>
                {getStatusBadge(testResults.sessionTest.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Validamos el tiempo de expiración de sesión, comportamiento ante recarga del sitio y persistencia del
                estado de usuario. Se comprueba la estabilidad de la sesión.
              </p>

              {testResults.sessionTest.status !== "pending" && (
                <div
                  className={`p-4 rounded-lg ${
                    testResults.sessionTest.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : testResults.sessionTest.status === "failed"
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className="font-medium mb-2">{testResults.sessionTest.message}</p>
                  {testResults.sessionTest.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {testResults.sessionTest.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">
                          {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => runTest("sessionTest")}
                className="w-full"
                disabled={testResults.sessionTest.status === "running"}
              >
                {testResults.sessionTest.status === "running" ? "Ejecutando..." : "Ejecutar Prueba"}
              </Button>
            </CardFooter>
          </Card>

          {/* Test 5: Flujo Completo de Login */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>1.2.5 Prueba de Flujo Completo de Login y Panel</CardTitle>
                  <CardDescription>
                    Simula el flujo completo desde el ingreso del usuario hasta el acceso al panel administrativo
                  </CardDescription>
                </div>
                {getStatusBadge(testResults.loginFlowTest.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Simulamos el flujo completo desde el ingreso del usuario hasta el acceso al panel administrativo,
                incluyendo verificación de credenciales, redireccionamientos, y permisos.
              </p>

              {testResults.loginFlowTest.status !== "pending" && (
                <div
                  className={`p-4 rounded-lg ${
                    testResults.loginFlowTest.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : testResults.loginFlowTest.status === "failed"
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className="font-medium mb-2">{testResults.loginFlowTest.message}</p>
                  {testResults.loginFlowTest.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {testResults.loginFlowTest.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">
                          {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => runTest("loginFlowTest")}
                className="w-full"
                disabled={testResults.loginFlowTest.status === "running"}
              >
                {testResults.loginFlowTest.status === "running" ? "Ejecutando..." : "Ejecutar Prueba"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
