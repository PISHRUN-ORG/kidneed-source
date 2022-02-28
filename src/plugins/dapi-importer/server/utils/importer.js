const crypto = require("crypto");

function Importer(url) {
  let status = {
    running: false,
    uid: null,
    total: null,
    processed: 0,
    persisted: 0,
    currentURL: url,
    lastRun: null,
    logs: [],
    lastGet: Date.now(),
  };

  function run(uid) {
    if (status.running) {
      return;
    }

    status.uid = uid;
    status.lastRun = new Date();
    status.running = true;
  }

  function log(title, body, type = "info") {
    status.logs.push({ uuid: crypto.randomUUID(), title, body, type });
  }

  function stop() {
    status.running = false;
  }

  function processed(resource) {
    status.processed += 1;
    log("processed", resource);
  }

  function persisted(resource) {
    status.saved += 1;
    log("persisted", resource);
  }

  function get(clearLogs = false) {
    const oldStatus = { ...status, logs: [...status.logs] };
    if (clearLogs) {
      status.logs = [];
    }
    return oldStatus;
  }

  function isRunning() {
    return status.running;
  }

  function getURL() {
    return status.currentURL;
  }

  function setURL(url) {
    status.currentURL = url;
  }

  function setTotal(total) {
    status.total = total;
  }

  return {
    run,
    isRunning,
    stop,
    log,
    processed,
    persisted,
    get,
    getURL,
    setURL,
    setTotal,
  };
}

module.exports = Importer;
