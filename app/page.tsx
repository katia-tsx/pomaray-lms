import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-2xl font-bold text-emerald-800">Pomaray LMS</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="text-emerald-700 hover:text-emerald-500">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-emerald-700 hover:text-emerald-500">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-emerald-700 hover:text-emerald-500">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-emerald-700 hover:text-emerald-500">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Link href="/admin/login">
              <Button variant="outline" className="mr-2">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/tests">
              <Button>Ver Tests</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">Bienvenido al Sistema de Gestión de Aprendizaje</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Politécnico Madre Rafaela Ybarra presenta su plataforma educativa para facilitar el aprendizaje y la gestión
            académica.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Explorar Cursos
            </Button>
            <Button size="lg" variant="outline">
              Conocer Más
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Interactivos</CardTitle>
              <CardDescription>Aprende a tu propio ritmo con nuestros cursos interactivos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Accede a material didáctico, videos, ejercicios y evaluaciones diseñados para maximizar tu aprendizaje.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Cursos
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguimiento Académico</CardTitle>
              <CardDescription>Monitorea tu progreso y calificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Visualiza tu avance en cada curso, revisa tus calificaciones y recibe retroalimentación personalizada.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Mi Progreso
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comunidad Educativa</CardTitle>
              <CardDescription>Conecta con profesores y compañeros</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Participa en foros de discusión, chats grupales y sesiones virtuales para enriquecer tu experiencia
                educativa.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Unirse
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <footer className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pomaray LMS</h3>
              <p>Sistema de Gestión de Aprendizaje del Politécnico Madre Rafaela Ybarra</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/cursos" className="hover:underline">
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="hover:underline">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:underline">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li>info@pomaray.edu</li>
                <li>+123 456 7890</li>
                <li>Av. Principal #123, Ciudad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-emerald-300">
                  Facebook
                </a>
                <a href="#" className="hover:text-emerald-300">
                  Twitter
                </a>
                <a href="#" className="hover:text-emerald-300">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-700 text-center">
            <p>&copy; 2025 Pomaray LMS - Politécnico Madre Rafaela Ybarra. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
