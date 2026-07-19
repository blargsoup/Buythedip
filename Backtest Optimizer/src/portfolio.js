import { calculateStatistics } from "./statistics.js";
import { createBenchmarks } from "./benchmarks.js";

export function runSimulation(history, config) {

    const engine = new PortfolioEngine(history, config);

    return engine.run();

}

class PortfolioEngine {

    constructor(history, config) {

        this.history = history;
        this.config = config;

        this.events = [];

        this.strategy = this.createPortfolio("Strategy");

    }

    createPortfolio(name) {

        return {

            name,

            cash: this.config.initialCapital,

            holdings: {

                SPY: 0,
                QQQ: 0,
                TQQQ: 0

            },

            value: this.config.initialCapital,

            totalInvested: this.config.initialCapital,

            history: [],

            cashFlows: [
                {
                    date: this.history[0].date,
                    amount: -this.config.initialCapital
                }
            ]

        };

    }

    run() {

        for (const bar of this.history) {

            this.processBar(bar);

        }

        const benchmarks = createBenchmarks(
            this.history,
            this.config
        );

        return {

            history: this.strategy.history,

            events: this.events,

            strategy: calculateStatistics(this.strategy),

            benchmarks

        };

    }

    processBar(bar) {

        this.beginPeriod(bar);

        this.applyMarketMovement(bar);

        this.calculatePeriodReturn();

        this.executeStrategy(bar);

        this.applyContribution(bar);

        this.record(bar);

    }

    beginPeriod(bar) {

        this.previousValue = this.portfolioValue(bar);

    }

    applyMarketMovement(bar) {

        const p = this.strategy;

        p.value = this.portfolioValue(bar);

    }

    calculatePeriodReturn() {

        if (this.previousValue <= 0) {

            this.periodReturn = 0;

            return;

        }

        this.periodReturn =
            (this.strategy.value / this.previousValue) - 1;

    }

    executeStrategy(bar) {

        //
        // Placeholder.
        //
        // The existing dip-buy logic from the HTML
        // will move here unchanged first.
        //
        // Then we'll replace it with a cleaner
        // Strategy object in the next pass.
        //

    }

    applyContribution(bar) {

        if (bar.date.getDate() !== 1)
            return;

        const amount =
            this.config.monthlyContribution;

        if (amount <= 0)
            return;

        this.strategy.cash += amount;

        this.strategy.totalInvested += amount;

        this.strategy.cashFlows.push({

            date: bar.date,

            amount: -amount

        });

    }

    record(bar) {

        this.strategy.history.push({

            date: bar.date,

            value: this.strategy.value,

            cash: this.strategy.cash,

            holdings: structuredClone(
                this.strategy.holdings
            ),

            totalInvested:
                this.strategy.totalInvested,

            periodReturn:
                this.periodReturn

        });

    }

    portfolioValue(bar) {

        let value = this.strategy.cash;

        value +=
            this.strategy.holdings.SPY *
            bar.SPY;

        value +=
            this.strategy.holdings.QQQ *
            bar.QQQ;

        value +=
            this.strategy.holdings.TQQQ *
            bar.TQQQ;

        return value;

    }

}