import { Subject } from 'rxjs';

export class ChannelSubject<T> {
    channel: string;
    typeName: string;
    subject: Subject<T>;
    
    constructor(channel: string, typeName: string, subject: Subject<T>) {
        this.channel = channel;      
        this.typeName = typeName;  
        this.subject = subject;
    }
}
