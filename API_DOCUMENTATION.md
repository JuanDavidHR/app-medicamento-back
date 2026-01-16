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

### Manejo de Errores

La API utiliza un formato de error estandarizado:

```json
{
  "message": "User not found",
  "errorCode": "ERR_USER_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-01-08T17:00:00.000Z"
}
```

**Códigos de error comunes:**
| Código | Descripción |
|--------|-------------|
| `ERR_AUTH_INVALID_CREDENTIALS` | Email o contraseña incorrectos |
| `ERR_USER_NOT_FOUND` | Usuario no encontrado |
| `ERR_USER_ALREADY_EXISTS` | El email ya está registrado |
| `ERR_MEDICATION_NOT_FOUND` | Medicamento no encontrado |
| `ERR_TREATMENT_PLAN_NOT_FOUND` | Plan de tratamiento no encontrado |
| `ERR_REMINDER_NOT_FOUND` | Recordatorio no encontrado |
| `ERR_ASSIGNMENT_NOT_FOUND` | Asignación cuidador-paciente no encontrada |

---

## 📖 Endpoints de la API

### 🔑 Autenticación (Auth)

#### 1. Login de Usuario

Inicia sesión para obtener el token JWT.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth:** No requerida
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
- **Auth:** No requerida
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "caregiver"
}
```

#### 2. Listar Todos los Usuarios

Obtiene la lista de todos los usuarios registrados.

- **URL:** `/users`
- **Method:** `GET`
- **Auth:** JWT + Rol `admin`

#### 3. Obtener Usuario por ID

Obtiene los detalles de un usuario específico.

- **URL:** `/users/:id`
- **Method:** `GET`
- **Auth:** JWT

#### 4. Actualizar Usuario

Actualiza el email o rol de un usuario.

- **URL:** `/users/:id`
- **Method:** `PUT`
- **Auth:** JWT + Rol `admin`
- **Body:**

```json
{
  "email": "nuevo@email.com",
  "role": "caregiver"
}
```

#### 5. Eliminar Usuario

Elimina un usuario del sistema.

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Auth:** JWT + Rol `admin`

---

### 🧩 Pacientes (Patients)

_Requiere autenticación (`JwtAuthGuard`)_

#### 1. Crear un Paciente

Crea un nuevo registro de paciente en el sistema.

- **URL:** `/patients`
- **Method:** `POST`
- **Auth:** JWT + Rol `admin`
- **Body:**

```json
{
  "name": "Juan Perez",
  "condition": "Hipertensión"
}
```

#### 2. Obtener Dashboard

Retorna un resumen de todos los pacientes y su estado diario.

- **URL:** `/patients/dashboard`
- **Method:** `GET`
- **Auth:** JWT

#### 3. Buscar Paciente

Busca un paciente por ID.

- **URL:** `/patients/:id`
- **Method:** `GET`
- **Auth:** JWT

#### 4. Actualizar Paciente

Actualiza los datos de un paciente.

- **URL:** `/patients/:id`
- **Method:** `PUT`
- **Auth:** JWT
- **Body:**

```json
{
  "name": "Juan Perez Actualizado",
  "condition": "Hipertensión Controlada"
}
```

---

### 💊 Medicamentos (Medications)

_Requiere autenticación (`JwtAuthGuard`)_

#### 1. Crear Medicamento

Registra un nuevo medicamento en el catálogo.

- **URL:** `/medications`
- **Method:** `POST`
- **Auth:** JWT
- **Body:**

```json
{
  "name": "Paracetamol",
  "description": "Analgésico y antipirético",
  "dosage_form": "tablet",
  "strength": "500mg",
  "manufacturer": "Generic Pharma"
}
```

#### 2. Listar Medicamentos

Obtiene todos los medicamentos activos.

- **URL:** `/medications`
- **Method:** `GET`
- **Auth:** JWT

#### 3. Obtener Medicamento por ID

- **URL:** `/medications/:id`
- **Method:** `GET`
- **Auth:** JWT

#### 4. Actualizar Medicamento

- **URL:** `/medications/:id`
- **Method:** `PUT`
- **Auth:** JWT
- **Body:**

```json
{
  "name": "Paracetamol Forte",
  "strength": "1000mg"
}
```

#### 5. Eliminar Medicamento

- **URL:** `/medications/:id`
- **Method:** `DELETE`
- **Auth:** JWT

---

### 📋 Planes de Tratamiento / Recetas (Treatment Plans)

_Requiere autenticación (`JwtAuthGuard`)_

#### 1. Crear Plan de Tratamiento

Crea una receta/plan de medicación para un paciente.

- **URL:** `/treatments/plans`
- **Method:** `POST`
- **Auth:** JWT
- **Body:**

```json
{
  "patientId": "uuid-del-paciente",
  "medication": "Paracetamol",
  "dosage": "500mg",
  "frequency": "Cada 8 horas",
  "scheduleTimes": ["08:00", "14:00", "20:00"],
  "startDate": "2026-01-15",
  "endDate": "2026-02-15",
  "notes": "Tomar con alimentos"
}
```

#### 2. Listar Todos los Planes

- **URL:** `/treatments/plans`
- **Method:** `GET`
- **Auth:** JWT

#### 3. Obtener Plan por ID

- **URL:** `/treatments/plans/:id`
- **Method:** `GET`
- **Auth:** JWT

#### 4. Obtener Planes por Paciente

- **URL:** `/treatments/plans/patient/:patientId`
- **Method:** `GET`
- **Auth:** JWT

#### 5. Actualizar Plan

- **URL:** `/treatments/plans/:id`
- **Method:** `PUT`
- **Auth:** JWT
- **Body:**

```json
{
  "dosage": "1000mg",
  "scheduleTimes": ["08:00", "20:00"],
  "notes": "Dosis aumentada"
}
```

#### 6. Eliminar Plan

- **URL:** `/treatments/plans/:id`
- **Method:** `DELETE`
- **Auth:** JWT

#### 7. Completar Administración de Medicamento

Marca una dosis como administrada.

- **URL:** `/treatments/administration/:id/complete`
- **Method:** `POST`
- **Auth:** JWT

---

### 👨‍👩‍👧 Cuidadores (Caregivers)

_Requiere autenticación (`JwtAuthGuard`)_

Permite asignar cuidadores a pacientes (relación muchos a muchos).

#### 1. Asignar Paciente a Cuidador

- **URL:** `/caregivers/assign`
- **Method:** `POST`
- **Auth:** JWT
- **Body:**

```json
{
  "caregiverId": "uuid-del-cuidador",
  "patientId": "uuid-del-paciente"
}
```

#### 2. Obtener Pacientes de un Cuidador

- **URL:** `/caregivers/:caregiverId/patients`
- **Method:** `GET`
- **Auth:** JWT

#### 3. Desasignar Paciente

- **URL:** `/caregivers/:id`
- **Method:** `DELETE`
- **Auth:** JWT

---

### ⏰ Recordatorios (Reminders)

_Requiere autenticación (`JwtAuthGuard`)_

Sistema de recordatorios para administración de medicamentos.

#### 1. Crear Recordatorio

- **URL:** `/reminders`
- **Method:** `POST`
- **Auth:** JWT
- **Body:**

```json
{
  "patientId": "uuid-del-paciente",
  "scheduledAt": "2026-01-15",
  "scheduledTime": "08:00",
  "treatmentPlanId": "uuid-del-plan",
  "message": "Recuerda tomar tu medicamento"
}
```

#### 2. Obtener Recordatorios Pendientes del Día

- **URL:** `/reminders/pending`
- **Method:** `GET`
- **Auth:** JWT

#### 3. Obtener Recordatorios por Paciente

- **URL:** `/reminders/patient/:patientId`
- **Method:** `GET`
- **Auth:** JWT

#### 4. Actualizar Estado del Recordatorio

Permite marcar un recordatorio como enviado, reconocido, etc.

- **URL:** `/reminders/:id/status`
- **Method:** `PATCH`
- **Auth:** JWT
- **Body:**

```json
{
  "status": "ACKNOWLEDGED"
}
```

**Estados disponibles:**

- `PENDING`: Pendiente de envío
- `SENT`: Enviado al usuario
- `ACKNOWLEDGED`: El usuario confirmó que tomó el medicamento
- `SKIPPED`: El usuario omitió esta dosis

---

## 🛠 Arquitectura del Proyecto

El proyecto sigue una arquitectura **Hexagonal** con patrones **DDD** y **CQRS**:

```
src/
├── common/              # Utilidades compartidas
│   ├── exceptions/      # CustomHttpException
│   ├── persistence/     # Event Store
│   └── services/        # Servicios compartidos
├── modules/
│   ├── auth/            # Autenticación JWT
│   ├── users/           # Gestión de usuarios
│   ├── patients/        # Gestión de pacientes
│   ├── medications/     # Catálogo de medicamentos
│   ├── treatments/      # Planes de tratamiento
│   ├── caregivers/      # Relación cuidador-paciente
│   └── reminders/       # Sistema de recordatorios
```

### Estructura de cada módulo:

- **Domain:** Contiene las entidades, enums y las interfaces de los repositorios (Reglas de negocio puras).
- **Application:** Contiene los comandos (Commands), consultas (Queries), sus respectivos manejadores (Handlers).
- **Infrastructure:** Implementaciones concretas de persistencia (TypeORM), DTOs, Estrategias de Auth y Guards.
- **Interfaces:** Controladores HTTP para exponer la funcionalidad.

---

## 📄 Documentación Interactiva

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva en:

- **Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🗄️ Tablas de la Base de Datos

| Tabla                        | Descripción                                      |
| ---------------------------- | ------------------------------------------------ |
| `users`                      | Usuarios del sistema (admin, caregiver, patient) |
| `patients`                   | Información de los pacientes                     |
| `medications`                | Catálogo de medicamentos                         |
| `treatment_plans`            | Planes de tratamiento/recetas                    |
| `medication_administrations` | Registro de administraciones de medicamentos     |
| `caregiver_patients`         | Relación cuidador ↔ paciente                     |
| `reminders`                  | Recordatorios programados                        |
| `domain_events`              | Event sourcing                                   |

---

## 🔧 Despliegue en Render

### Variables de Entorno Requeridas

```env
DB_HOST=aws-1-us-east-2.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.tu_proyecto_id
DB_PASSWORD=tu_password
DB_NAME=postgres
DB_SSL=true

JWT_SECRET=tu_clave_secreta
JWT_EXPIRATION=1d
```

### Comando de Build

```bash
npm run build
```

### Comando de Start

```bash
npm run start:prod
```
