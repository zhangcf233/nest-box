import { ConfigurableModuleBuilder } from '@nestjs/common';
import { EmailConfig } from './email.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<EmailConfig>()
        .setClassMethodName('forRoot')
        .build();
