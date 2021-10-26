import { NodeCG } from "nodecg-types/types/server";
import { Result, emptySuccess, success, ServiceBundle } from "nodecg-io-core";
import { SystemInformationClient } from "./systemInformationClient";

export { SystemInformationClient } from "./systemInformationClient";

module.exports = (nodecg: NodeCG) => {
    new SystemInformationService(nodecg, "system-information").register();
};
// TODO: add "no config needed" to web interface configuration edit window

class SystemInformationService extends ServiceBundle<never, SystemInformationClient> {
    async validateConfig(): Promise<Result<void>> {
        // no configuration
        return emptySuccess();
    }

    async createClient(): Promise<Result<SystemInformationClient>> {
        const client = SystemInformationClient.createClient();

        this.nodecg.log.info("Successfully created system-information client.");
        return success(client);
    }

    stopClient(_client: SystemInformationClient): void {
        // not needed or possible
    }

    removeHandlers(_client: SystemInformationClient): void {
        // not needed or possible
    }
}
