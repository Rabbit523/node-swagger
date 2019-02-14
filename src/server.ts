import app from "./app";
import logger from "./Logging/Logger"
const port = 4040;
app.listen(port, () => {
  logger.info('Express server listening on port ' + port)
});
