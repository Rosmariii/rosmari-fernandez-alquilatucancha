import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ClubUpdatedHandler } from './domain/handlers/club-updated.handler';
import { GetAvailabilityHandler } from './domain/handlers/get-availability.handler';
import { ALQUILA_TU_CANCHA_CLIENT } from './domain/ports/aquila-tu-cancha.client';
import { HTTPAlquilaTuCanchaClient } from './infrastructure/clients/http-alquila-tu-cancha.client';
import { EventsController } from './infrastructure/controllers/events.controller';
import { SearchController } from './infrastructure/controllers/search.controller';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    CqrsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [SearchController, EventsController],
  providers: [
    HTTPAlquilaTuCanchaClient,
    {
      provide: ALQUILA_TU_CANCHA_CLIENT,
      useClass: HTTPAlquilaTuCanchaClient,
    },

    GetAvailabilityHandler,
    ClubUpdatedHandler,
  ],
  exports: [HTTPAlquilaTuCanchaClient],
})
export class AppModule {}
