export interface EmailConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    fromName?: string;
    fromEmail?: string;
}

export interface EmailSendOptions {
    to: string
    subject: string
    html: string
}