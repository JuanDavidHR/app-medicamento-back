# 📘 Guía de Implementación de Endpoints

Esta guía detalla los endpoints **actualmente implementados** en el backend y cómo consumirlos (implementarlos) desde un cliente (Frontend, Postman, etc.).

## 🔐 Autenticación (Auth)

El sistema utiliza **JWT (JSON Web Token)**. Debes obtener el token mediante Login y enviarlo en los headers `Authorization: Bearer <token>` para las peticiones protegidas.

### 🔓 Endpoints Públicos (NO requieren Token)

### 1. Iniciar Sesión (Login)

Obtén el token de acceso.

- **Endpoint:** `POST /auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "access_token": "eyJhbGci...",
    "user": {
      "id": "uuid...",
      "email": "user@example.com",
      "role": "caregiver"
    }
  }
  ```

---

## 👤 Gestión de Usuarios (Users)

### 1. Registrar Nuevo Usuario (🔓 Público)

- **Endpoint:** `POST /users/register`
- **Body:**
  ```json
  {
    "email": "nuevo@example.com",
    "password": "password123",
    "role": "caregiver" // Roles admitidos: 'admin', 'caregiver', 'patient'
  }
  ```

### 2. Obtener Todos los Usuarios (🔐 Token + Rol: ADMIN)

- **Endpoint:** `GET /users`
- **Header:** `Authorization: Bearer <token>`

### 3. Obtener Usuario por ID (🔐 Token)

- **Endpoint:** `GET /users/:id`
- **Header:** `Authorization: Bearer <token>`

### 4. Actualizar Usuario (🔐 Token + Rol: ADMIN)

- **Endpoint:** `PUT /users/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "email": "email_actualizado@example.com",
    "role": "caregiver"
  }
  ```

### 5. Eliminar Usuario (🔐 Token + Rol: ADMIN)

- **Endpoint:** `DELETE /users/:id`
- **Header:** `Authorization: Bearer <token>`

---

## 🏥 Pacientes (Patients)

### 1. Crear Paciente (🔐 Token + Rol: ADMIN)

- **Endpoint:** `POST /patients`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Juan Pérez",
    "condition": "Diabetes Tipo 2"
  }
  ```

### 2. Dashboard de Pacientes (🔐 Token)

Retorna un resumen con el total y la lista de pacientes.

- **Endpoint:** `GET /patients/dashboard`
- **Header:** `Authorization: Bearer <token>`
- **Respuesta:**
  ```json
  {
    "totalPatients": 10,
    "patients": [{ "id": "...", "name": "Juan", "condition": "..." }]
  }
  ```

### 3. Buscar Pacientes (🔐 Token)

- **Endpoint:** `GET /patients/search`
- **Header:** `Authorization: Bearer <token>`
- **Query Params:** `?name=Juan&condition=Diabetes`
- **Ejemplo:** `/patients/search?name=Juan`

### 4. Actualizar Paciente (🔐 Token)

- **Endpoint:** `PUT /patients/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Juan Pérez Actualizado",
    "condition": "Diabetes Controlada"
  }
  ```

---

## 💊 Medicamentos (Medications)

### 1. Crear Medicamento (🔐 Token)

- **Endpoint:** `POST /medications`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Ibuprofeno",
    "description": "Antiinflamatorio",
    "dosage_form": "tableta",
    "strength": "400mg",
    "manufacturer": "Generico"
  }
  ```

### 2. Listar Medicamentos (🔐 Token)

- **Endpoint:** `GET /medications`
- **Header:** `Authorization: Bearer <token>`

### 3. Obtener Medicamento por ID (🔐 Token)

- **Endpoint:** `GET /medications/:id`
- **Header:** `Authorization: Bearer <token>`

### 4. Actualizar Medicamento (🔐 Token)

- **Endpoint:** `PUT /medications/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:** Envía solo los campos que quieres cambiar.

### 5. Eliminar Medicamento (🔐 Token)

- **Endpoint:** `DELETE /medications/:id`
- **Header:** `Authorization: Bearer <token>`

---

## 📋 Tratamientos / Recetas (Treatment Plans)

### 1. Crear Plan de Tratamiento (🔐 Token)

- **Endpoint:** `POST /treatments/plans`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "patientId": "uuid-paciente",
    "medication": "Ibuprofeno",
    "dosage": "400mg",
    "frequency": "Cada 8 horas",
    "scheduleTimes": ["08:00", "16:00", "00:00"],
    "startDate": "2026-01-20",
    "endDate": "2026-01-30",
    "notes": "Tomar después de comer"
  }
  ```

### 2. Listar Todos los Planes (🔐 Token)

- **Endpoint:** `GET /treatments/plans`
- **Header:** `Authorization: Bearer <token>`

### 3. Obtener Plan por ID (🔐 Token)

- **Endpoint:** `GET /treatments/plans/:id`
- **Header:** `Authorization: Bearer <token>`

### 4. Obtener Planes de un Paciente (🔐 Token)

- **Endpoint:** `GET /treatments/plans/patient/:patientId`
- **Header:** `Authorization: Bearer <token>`

### 5. Completar/Marcar Administración (🔐 Token)

Registra que una dosis fue administrada.

- **Endpoint:** `POST /treatments/administration/:id/complete`
- **Header:** `Authorization: Bearer <token>`

---

## ⏰ Recordatorios (Reminders)

### 1. Crear Recordatorio (🔐 Token)

- **Endpoint:** `POST /reminders`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "patientId": "uuid-paciente",
    "scheduledAt": "2026-01-20T08:00:00Z", // Fecha/Hora
    "scheduledTime": "08:00",
    "treatmentPlanId": "uuid-plan",
    "message": "Hora de tu medicina"
  }
  ```

### 2. Recordatorios Pendientes (Hoy) (🔐 Token)

- **Endpoint:** `GET /reminders/pending`
- **Header:** `Authorization: Bearer <token>`

### 3. Recordatorios por Paciente (🔐 Token)

- **Endpoint:** `GET /reminders/patient/:patientId`
- **Header:** `Authorization: Bearer <token>`

### 4. Actualizar Estado de Recordatorio (🔐 Token)

Para marcar como 'Visto' o 'Enviado'.

- **Endpoint:** `PATCH /reminders/:id/status`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "ACKNOWLEDGED" // Opciones: PENDING, SENT, ACKNOWLEDGED, SKIPPED
  }
  ```

---

## 👥 Cuidadores (Caregivers)

### 1. Asignar Paciente a Cuidador (🔐 Token)

- **Endpoint:** `POST /caregivers/assign`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "caregiverId": "uuid-cuidador",
    "patientId": "uuid-paciente"
  }
  ```

### 2. Ver Pacientes de un Cuidador (🔐 Token)

- **Endpoint:** `GET /caregivers/:caregiverId/patients`
- **Header:** `Authorization: Bearer <token>`

### 3. Desasignar Paciente (🔐 Token)

- **Endpoint:** `DELETE /caregivers/:id`
- **Header:** `Authorization: Bearer <token>`
