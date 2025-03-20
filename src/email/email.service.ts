import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { createTransport, Transporter } from 'nodemailer';
import { EmailModuleOptions } from './email.interface';
import { MODULE_OPTIONS_TOKEN } from './email.options';
@Injectable()
export class EmailService {
    transporter: Transporter;

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private config: EmailModuleOptions) {
        this.transporter = createTransport({
            host: this.config.host,
            port: this.config.port,
            secure: false,
            auth: {
                user: this.config.user,
                pass: this.config.pass,
            },
        });
    }

    async sendMain({ to, subject, html }: {
        to: string
        subject: string
        html: string
    }) {
        // 判断是否发送方和接收方地址相同
        const address = this.config.user;
        if (to == address) {
            throw new BadRequestException('邮件地址与发送方相同');
        }
        await this.transporter.sendMail({
            from: {
                name: this.config.fromName || "Nest-Box-Mail",
                address,
            },
            to,
            subject,
            html,
        });
    }
}
