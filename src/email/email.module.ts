import { DynamicModule, Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './email.options';
import { EmailModuleOptions } from './email.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule extends ConfigurableModuleClass {
    static forRoot(options: EmailModuleOptions): DynamicModule {
        return {
            module: EmailModule,
            providers: [
                {
                    provide: MODULE_OPTIONS_TOKEN,
                    useValue: options,
                },
                EmailService,
            ],
            exports: [EmailService],
        };
    }

    static forRootAsync(): DynamicModule {
        return {
            module: EmailModule,
            imports: [ConfigModule],
            providers: [
                {
                    
                    provide: MODULE_OPTIONS_TOKEN,
                    useFactory: (configService: ConfigService) => ({
                        host: configService.get<string>('EMAIL_HOST'),
                        port: configService.get<number>('EMAIL_PORT'),
                        user: configService.get<string>('EMAIL_USER'),
                        pass: configService.get<string>('EMAIL_PASS'),
                    }),
                    inject: [ConfigService],
                },
                EmailService,
            ],
            exports: [EmailService],
        };
    }
}
