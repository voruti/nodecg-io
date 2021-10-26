import  si  from "systeminformation";

export class SystemInformationClient {
    static createClient(): SystemInformationClient {
        return new SystemInformationClient();
    }

    cpu() {
        return si.cpu(); // TODO: export si instead to expose all api (how?)
    }
}
