import { NodeCG } from "nodecg-types/types/server";
import { SystemInformationClient } from "nodecg-io-system-information";
import { requireService } from "nodecg-io-core";

module.exports = function (nodecg: NodeCG) {
    nodecg.log.info("Sample bundle for SystemInformation started.");

    const systemInformation = requireService<SystemInformationClient>(nodecg, "system-information");

    systemInformation?.onAvailable((client) => {
        nodecg.log.info("SystemInformation service available.");

        client.cpu().then((data) => nodecg.log.info(data));
    });

    systemInformation?.onUnavailable(() => {
        nodecg.log.info("SystemInformation service unavailable.");
    });
};
