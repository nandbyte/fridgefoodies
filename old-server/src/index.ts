import { log } from "./service/logger";
import app from "./app";

app.listen(app.get("port"), () => {
    log.info("Server running on port " + app.get("port"));
});
