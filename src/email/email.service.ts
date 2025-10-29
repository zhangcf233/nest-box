import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { createTransport, Transporter } from 'nodemailer';
import { EmailConfig, EmailSendOptions } from './email.interface';
import { MODULE_OPTIONS_TOKEN } from './email.options';
@Injectable()
export class EmailService {
    transporter: Transporter;

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private config: EmailConfig) {
        this.transporter = this.getTransporter(config)
    }

    /** 创建发送器*/
    getTransporter(config:EmailConfig){
        return createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });
    }

    async sendMain({ to, subject, html }:EmailSendOptions) {
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

    /** 动态调用发送方发送邮件*/
    async sendWithConfig(config:EmailConfig,email:EmailSendOptions){
        const transporter = this.getTransporter(config)
        const {user:address} = config
        const { to, subject, html } = email
        if (to == address) {
            throw new BadRequestException('邮件地址与发送方相同');
        }
        await transporter.sendMail({
            from: {
                name:'',
                address,
            },
            to,
            subject,
            html,
        });
    }
}
