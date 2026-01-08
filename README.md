# Caregiver Medication App - Backend

Este es el backend para la aplicación de cuidadores, construido con **NestJS**, **TypeORM**, y **CQRS** siguiendo principios de **DDD (Domain-Driven Design)**.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js.
- **TypeORM**: ORM para PostgreSQL.
- **CQRS**: Command Query Responsibility Segregation.
- **PostgreSQL**: Base de datos relacional.
- **Swagger/Redoc**: Documentación de la API.
- **Class Validator**: Validación de datos.
- **UUID**: Identificadores únicos.

## Estructura del Proyecto

El proyecto está organizado por **Bounded Contexts**:

- `src/modules/patients`: Gestión de pacientes y sus resúmenes diarios.
- `src/modules/treatments`: Gestión de planes de tratamiento y administraciones de medicamentos.

### Event Store

Se incluye una tabla `domain_events` que actúa como almacén de eventos para persistir cada cambio significativo en el dominio (Creación de paciente, Completitud de administración).

## Comandos y Consultas (CQRS)

- `CreatePatientCommand`: Registra un nuevo paciente.
- `CompleteAdministrationCommand`: Marca una administración de medicamento como completada.
- `GetDashboardQuery`: Obtiene un resumen del estado de todos los pacientes.

## Manejadores de Eventos

- `AdministrationCompletedEvent`: Al completarse una administración, se dispara un handler que actualiza automáticamente el `patient_daily_summary` del paciente.

## Documentación

- **Swagger**: `/api/docs`
- **Redoc**: `/docs`

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo `.env.example` a `.env` y configura tus credenciales de PostgreSQL.

## Ejecución

```bash
npm run start:dev
```
