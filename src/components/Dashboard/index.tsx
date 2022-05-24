import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "@site/src/components/Dashboard/index.module.css";
import DashboardIcon from "@site/static/img/dashboardIcon.svg";
import InformationIcon from "@site/static/img/informationIcon.svg";
import Link from "@docusaurus/Link";
import {animate} from "framer-motion";

function AnimatedValue({to, precision}) {
    const valueRef = useRef(to);
    const [currentValue, setCurrentValue] = useState(to);
    useEffect(() => {
        const controls = animate(valueRef.current, to, {
            duration: 0.5,
            onUpdate(value) {
                setCurrentValue(value);
            }
        });
        return () => {
            controls.stop()
            valueRef.current = to;
        };
    }, [to]);

    return (
        <span className={styles.value}>
        {new Intl.NumberFormat('en-US', {maximumFractionDigits: precision}).format(currentValue)}
    </span>
    );
}

function AnimatedStatistic({title, currentValue, tooltip, precision}) {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>{title}</span>
                <div className={styles.informationContainer}>
                    <InformationIcon className={styles.informationIcon}/>
                    <div className={styles.tooltipContainer}>
                        <span className={styles.tooltip}>{tooltip}</span>
                    </div>
                </div>
            </div>
            <AnimatedValue to={currentValue} precision={precision}/>
        </div>
    );
}

function Statistic({title, currentValue, tooltip}) {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>{title}</span>
                <div className={styles.informationContainer}>
                    <InformationIcon className={styles.informationIcon}/>
                    <div className={styles.tooltipContainer}>
                        <span className={styles.tooltip}>{tooltip}</span>
                    </div>
                </div>
            </div>
            <span className={styles.value}>{currentValue}</span>
        </div>
    );
}

function Dashboard() {
    const [blockCount, setBlockCount] = useState(847458088);
    const [blocksPerSecond, setBlocksPerSecond] = useState(35.1);
    const [runningCanisters, setRunningCanisters] = useState(73577);
    const [cpuCores, setCpuCores] = useState(29650);
    const [operational, setOperational] = useState(true);
    const cost = 0.46;
    const fetchBlockCount = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/block").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
                setBlockCount(parseInt(data.block[0][1]));
            }
        )
    }

    const fetchBlockPerSecond = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/block-rate").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            const m = Number((Math.abs(data.block_rate[0][1]) * 100).toPrecision(15));
            const roundedBlocks = Math.round(m) / 100 * Math.sign(data.block_rate[0][1]);
            setBlocksPerSecond(roundedBlocks);
        })
    }
    const fetchRunningCanisters = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/registered-canisters").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            setRunningCanisters(Math.round(data.running_canisters[0][1]));
        })
    }
    const fetchCpuCores = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/ic-cpu-cores").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            setCpuCores(parseInt(data.ic_cpu_cores[0][1]));
        })
    }
    const fetchOperational = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/ic-nodes-count").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            setOperational(data.ic_nodes_count[0][1] >= 100);
        })
    }

    const fetchData = useCallback(
        () => {
            fetchBlockCount();
            fetchBlockPerSecond();
            fetchRunningCanisters();
            fetchCpuCores();
            fetchOperational()
        },
        [],
    );

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => {
            clearInterval(interval)
        };

    }, [])
    return (
        <div className={styles.main}>
            <a id="dashboard"/>
            <div className={styles.grid}>
                <AnimatedStatistic
                    title="Block Count"
                    currentValue={blockCount}
                    tooltip={"The count of blocks created since genesis."}
                    precision={0}
                />
                <Statistic
                    title="Network Status"
                    currentValue={operational ? "Operational" : "Maintenance"}
                    tooltip={"The current network status of the Internet Computer. As of now, this status has never changed!"}
                />
                <AnimatedStatistic
                    title="Blocks/s"
                    currentValue={blocksPerSecond}
                    tooltip={"The count of blocks finalized per second."}
                    precision={2}
                />
                <AnimatedStatistic
                    title="Chain CPUs"
                    currentValue={cpuCores}
                    tooltip={"The current count of CPUs powering the Internet Computer."}
                    precision={0}
                />
                <AnimatedStatistic
                    title="Canisters"
                    currentValue={runningCanisters}
                    tooltip={"The count of live canisters on the Internet Computer."}
                    precision={0}
                />
                <Statistic
                    title="Data storage cost"
                    currentValue={`$${cost} GB/month`}
                    tooltip={"The current estimated cost of storage on the Internet Computer."}
                />
            </div>
            <Link to={"https://dashboard.internetcomputer.org/"}
                  className={styles.actionButton}>
                <DashboardIcon className={styles.dashboardIcon}/>
                <span>Go to Dashboard</span>
            </Link>
        </div>
    );
}

export default Dashboard;
