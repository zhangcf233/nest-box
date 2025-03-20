import { ConfigurableModuleBuilder } from '@nestjs/common';
import { EmailModuleOptions } from './email.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<EmailModuleOptions>()
        .setClassMethodName('forRoot')
        .build();
