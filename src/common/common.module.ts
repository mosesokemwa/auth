import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServicesService } from './services/services.service';
import { HelperHashService } from './services/helper.hash.service';
import configs from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
  ],
  providers: [ServicesService, HelperHashService],
  exports: [ServicesService, HelperHashService],
})
export class CommonModule {}
