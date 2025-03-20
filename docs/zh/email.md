# 邮件模块

邮件模块提供了使用 Nodemailer 通过 SMTP 发送邮件的功能。它允许你在 NestJS 应用中直接发送电子邮件，并支持可配置的选项。

## 配置

你可以通过 `forRoot` 或 `forRootAsync` 方法来配置邮件模块。这使得你可以提供静态配置或者从环境变量或配置服务动态加载配置。

### 静态配置

如果你想直接在 `AppModule` 中提供固定的配置值，可以使用 `forRoot` 方法。

```typescript
import { Module } from '@nestjs/common';
import { EmailModule } from 'nest-box';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 1. 固定的配置值
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

### 动态配置

你也可以使用 `forRootAsync` 方法，从配置服务或环境变量动态加载配置。

```typescript
import { Module } from '@nestjs/common';
import { EmailModule } from 'nest-box';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. 从 .env 文件加载的配置
    EmailModule.forRootAsync(),
  ],
})
export class AppModule {}
```

环境变量示范

```ini
# email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS==your-email-password
```

## 发送邮件

`sendMain` 方法接受以下参数：

- `to`: 收件人的电子邮件地址。
- `subject`: 邮件的主题。
- `html`: 邮件的 HTML 内容。

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