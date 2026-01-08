import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PatientsModule } from "./modules/patients/patients.module";
import { TreatmentsModule } from "./modules/treatments/treatments.module";
import { Patient } from "./modules/patients/domain/entities/patient.entity";
import { TreatmentPlan } from "./modules/treatments/domain/entities/treatment-plan.entity";
import { MedicationAdministration } from "./modules/treatments/domain/entities/medication-administration.entity";
import { DomainEventEntity } from "./common/persistence/domain-event.entity";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MedicationsModule } from "./modules/medications/medications.module";
import { CaregiversModule } from "./modules/caregivers/caregivers.module";
import { RemindersModule } from "./modules/reminders/reminders.module";
import { User } from "./modules/users/domain/entities/user.entity";
import { Medication } from "./modules/medications/domain/entities/medication.entity";
import { CaregiverPatient } from "./modules/caregivers/domain/entities/caregiver-patient.entity";
import { Reminder } from "./modules/reminders/domain/entities/reminder.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>("DATABASE_URL");
        return {
          type: "postgres",
          url: url,
          host: !url
            ? configService.get<string>("DB_HOST") || "localhost"
            : undefined,
          port: !url ? configService.get<number>("DB_PORT") || 5432 : undefined,
          username: !url
            ? configService.get<string>("DB_USER") || "postgres"
            : undefined,
          password: !url
            ? configService.get<string>("DB_PASSWORD") || "postgres"
            : undefined,
          database: !url
            ? configService.get<string>("DB_NAME") || "caregiver_db"
            : undefined,
          entities: [
            Patient,
            TreatmentPlan,
            MedicationAdministration,
            DomainEventEntity,
            User,
            Medication,
            CaregiverPatient,
            Reminder,
          ],
          synchronize: true,
          ssl:
            configService.get<string>("DB_SSL") === "true" ||
            (url && !url.includes("localhost"))
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
    PatientsModule,
    TreatmentsModule,
    UsersModule,
    AuthModule,
    MedicationsModule,
    CaregiversModule,
    RemindersModule,
  ],
})
export class AppModule {}
