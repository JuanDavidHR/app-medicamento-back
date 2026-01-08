# 🏥 Caregiver Application API Documentation

Esta documentación detalla los endpoints disponibles para el backend del proyecto Caregiver, construido con NestJS, CQRS y DDD.

## 🚀 Cómo empezar

### Requisitos previos

- Node.js (v18 o superior)
- Base de datos PostgreSQL (Local o Supabase)

### Instalación

```bash
npm install
```

### Configuración del Entorno (.env)

Crea un archivo `.env` en la raíz con lo siguiente:

```env
DB_HOST=tu_host
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_nombre_db
DB_SSL=false # true si usas Supabase

JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRATION=1d
```

### Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

## 🔐 Autenticación y Seguridad

Esta API utiliza **JSON Web Tokens (JWT)** para la seguridad.

### Roles Disponibles

- `admin`: Acceso total a todos los recursos.
- `caregiver`: Acceso general para reportes y dashboard.
- `patient`: Acceso restringido (usuario final).

### Headers Requeridos

Para acceder a endpoints protegidos, debes incluir el token en el header:
`Authorization: Bearer <tu_token_aqui>`

---

## 📖 Endpoints de la API

### 🔑 Autenticación (Auth)

#### 1. Login de Usuario

Inicia sesión para obtener el token JWT.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

- **Respuesta:**

```json
{
  "access_token": "eyJhbGci...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### 👤 Usuarios (Users)

#### 1. Registro de Usuario

Crea una nueva cuenta de usuario.

- **URL:** `/users/register`
- **Method:** `POST`
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "caregiver"
}
```

---

### 🧩 Pacientes (Patients)

_Requiere autenticación (`JwtAuthGuard`)_

#### 1. Crear un Paciente

Crea un nuevo registro de paciente en el sistema.
_(Solo accesible para rol `admin`)_

- **URL:** `/patients`
- **Method:** `POST`
- **Body:**

```json
{
  "name": "Juan Perez",
  "condition": "Hipertensión"
}
```

- **Ejemplo cURL:**

```bash
curl -X POST http://localhost:3000/patients \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{"name": "Juan Perez", "condition": "Hipertensión"}'
```

#### 2. Obtener Dashboard

Retorna un resumen de todos los pacientes y su estado diario.

- **URL:** `/patients/dashboard`
- **Method:** `GET`
- **Ejemplo cURL:**

```bash
curl -X GET http://localhost:3000/patients/dashboard \
     -H "Authorization: Bearer <token>"
```

---

### 💊 Tratamientos (Treatments)

#### 1. Completar Administración

Marca una dosis de medicamento como administrada.

- **URL:** `/treatments/administration/:id/complete`
- **Method:** `POST`
- **URL Params:** `id=[string]` (UUID de la administración)
- **Ejemplo cURL:**

```bash
curl -X POST http://localhost:3000/treatments/administration/550e8400-e29b-41d4-a716-446655440000/complete
```

---

## 🛠 Arquitectura del Proyecto

El proyecto sigue una arquitectura **Hexagonal** con patrones **DDD** y **CQRS**:

- **Domain:** Contiene las entidades, enums y las interfaces de los repositorios (Reglas de negocio puras).
- **Application:** Contiene los comandos (Commands), consultas (Queries), sus respectivos manejadores (Handlers) y mappers.
- **Infrastructure:** Implementaciones concretas de persistencia (TypeORM), DTOs, Estrategias de Auth y Guards.
- **Interfaces:** Controladores HTTP para exponer la funcionalidad.

## 📄 Documentación Interactiva

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva en:

- **Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Redoc:** [http://localhost:3000/docs](http://localhost:3000/docs)
