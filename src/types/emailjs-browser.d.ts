declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }
  
  interface EmailJSInit {
    init(publicKey: string): void;
  }
  
  interface EmailJSSendForm {
    sendForm(
      serviceId: string,
      templateId: string,
      form: HTMLFormElement | null,
      publicKey: string
    ): Promise<EmailJSResponseStatus>;
  }
  
  interface EmailJSSend {
    send(
      serviceId: string,
      templateId: string,
      templateParams: Record<string, any>,
      publicKey: string
    ): Promise<EmailJSResponseStatus>;
  }
  
  const emailjs: EmailJSInit & EmailJSSendForm & EmailJSSend;
  
  export default emailjs;
} 