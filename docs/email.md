# Email Module
Provides email functionalities like sending emails using SMTP with Nodemailer.

## Configuration
You can configure the Email module using the `forRootAsync` method in the `EmailModule`. This allows you to dynamically configure the service using environment variables or a configuration service.

Here’s how to configure the Email module:

1. App Module: Import the `EmailModule` and configure it in your application module.

``` typescript
import { Module } from '@nestjs/common';
import { EmailModule } from 'nest-box';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
            isGlobal: true,
    }),
    // 1. Fixed variables
    EmailModule.forRoot({
        host: "";
        port: 587;
        user: "you-email";
        pass: "you-email-password";
        fromName: "from-name";
        fromEmail: "from-email";
    }), 
    // 2. To load environment variables from .env
    EmailModule.forRootAsync(), 
  ],
})
export class AppModule {}
```

## Sending an Email
The `sendMain` method accepts the following parameters:

* `to`: The recipient email address.
* `subject`: The subject of the email.
* `html`: The HTML content of the email.

``` typescript
import { Injectable } from '@nestjs/common';
import { EmailService } from 'nest-box';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  async sendNotificationEmail(to: string, subject: string, html: string) {
    await this.emailService.sendMain({
      to,
      subject,
      html,
    });
  }
}

```
