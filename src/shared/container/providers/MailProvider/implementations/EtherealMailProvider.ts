import { IMailProvider } from "../IMailProvider";


class EtherealMailProvider implements IMailProvider {
    sendMail(to: string, subject: string, body: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
};

export { EtherealMailProvider };