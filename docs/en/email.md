# Email Module

The Email module provides the functionality to send emails using Nodemailer via SMTP. It allows you to send emails directly within your NestJS application and supports configurable options.

## Configuration

You can configure the Email module using either the `forRoot` or `forRootAsync` method. This allows you to provide static configurations or dynamically load configurations from environment variables or a configuration service.

### Static Configuration

If you want to provide fixed configuration values directly in the `AppModule`, use the `forRoot` method.

```typescript
import { Module } from '@nestjs/common';
import { EmailModule } from 'nest-box';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 1. Fixed configuration values
    EmailModule.forRoot({
      host: 'smtp.example.com',
      port: 587,
      user: 'your-email@example.com',
      pass: 'your-email-password',
      fromName: 'Your Name',
      fromEmail: 'your-email@example.com',
    }),
  ],
})
export class AppModule {}
```

### Dynamic Configuration

You can also use the `forRootAsync` method to load configurations dynamically from a configuration service or environment variables.

```typescript
import { Module } from '@nestjs/common';
import { EmailModule } from 'nest-box';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Load configuration from .env file
    EmailModule.forRootAsync(),
  ],
})
export class AppModule {}
```

Example `.env` file:

```ini
# email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

## Sending Emails

The `sendMain` method accepts the following parameters:

- `to`: The recipient's email address.
- `subject`: The subject of the email.
- `html`: The HTML content of the email.

```typescript
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