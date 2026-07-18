import { defaultConfig } from "./config.js";
import { loadHistory } from "./history.js";
import { runSimulation } from "./portfolio.js";

import { renderChart } from "./charts.js";
import { updateStatistics } from "./ui.js";

async function boot(){

    const history = loadHistory();

    const result = runSimulation(
        history,
        defaultConfig
    );

    renderChart(result);

    updateStatistics(result);

}

boot();