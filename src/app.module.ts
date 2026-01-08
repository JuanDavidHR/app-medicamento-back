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
import { User } from "./modules/users/domain/entities/user.entity";

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
  ],
})
export class AppModule {}
