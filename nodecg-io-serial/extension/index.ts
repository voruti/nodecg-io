import { NodeCG } from "nodecg-types/types/server";
import { Result, emptySuccess, error, ServiceBundle } from "nodecg-io-core";
import { SerialServiceClient, SerialServiceConfig } from "./SerialClient";

module.exports = (nodecg: NodeCG) => {
    new SerialService(nodecg, "serial", __dirname, "../serial-schema.json").register();
};

export { SerialServiceClient } from "./SerialClient";

class SerialService extends ServiceBundle<SerialServiceConfig, SerialServiceClient> {
    async validateConfig(config: SerialServiceConfig): Promise<Result<void>> {
        const result = await SerialServiceClient.inferPort(config.device);
        return result.failed ? error(result.errorMessage) : emptySuccess();
    }

    async createClient(config: SerialServiceConfig): Promise<Result<SerialServiceClient>> {
        return await SerialServiceClient.createClient(config);
    }

    stopClient(client: SerialServiceClient): void {
        client.close();
    }

    removeHandlers(client: SerialServiceClient): void {
        client.removeAllListeners();
        client.removeAllParserListeners();
    }
}
