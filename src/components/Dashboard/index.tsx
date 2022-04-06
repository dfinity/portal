import React, {useCallback, useEffect, useState} from 'react';
import styles from "@site/src/components/Dashboard/styles.module.css";
import ReactTooltip from 'react-tooltip';

function DashboardStat({value, title, message}) {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.dashboardStatInfo}>
                <span className={styles.statsTitle}>{title}</span>
                <svg data-tip={message} data-for='dashboardStat' className={styles.dashboardStatInfoIcon}
                     viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z"
                        fill="white"/>
                    <path d="M11 11V17H13V11H11ZM11 7V9H13V7H11Z" fill="#181818"/>
                </svg>
            </div>
            <span className={styles.statsValue}>{value}</span>
            <ReactTooltip id='dashboardStat' place='right' effect='solid'/>
        </div>
    )
}


function Dashboard() {
    const [blockCount, setBlockCount] = useState(687713068);
    const [blocksPerSecond, setBlocksPerSecond] = useState(31.5);
    const [runningCanisters, setRunningCanisters] = useState(50293);
    const [cpuCores, setCpuCores] = useState(25320);
    const [operational, setOperational] = useState(true);
    const [cost, setCost] = useState(0.46);

    const fetchBlockCount = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/block").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            setBlockCount(Math.round(data.block[0][1]));
        })
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
            setCpuCores(data.ic_cpu_cores[0][1]);
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
            fetchOperational();
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
        <>
            <div className={styles.dashboardContainer}>
                <DashboardStat value={new Intl.NumberFormat().format(blockCount)}
                               title={"Block Count"} message={"TBA"}/>
                <DashboardStat value={operational ? "Operational" : "Maintenance"} title={"Network Status"}
                               message={"TBA"}/>
                <DashboardStat value={new Intl.NumberFormat().format(cpuCores)} title={"Chain CPUs"} message={"TBA"}/>
                <DashboardStat
                    value={new Intl.NumberFormat().format(blocksPerSecond)}
                    title={"Blocks/s"} message={"TBA"}/>
                <DashboardStat value={new Intl.NumberFormat().format(runningCanisters)} title={"Canisters"}
                               message={"TBA"}/>
                <DashboardStat value={`$${cost} GB/month`} title={"Data Storage Cost"} message={"TBA"}/>
            </div>
            <div>
                <span className={styles.dashboardAction}>
                    <a href="https://dashboard.internetcomputer.org/">Go to Dashboard</a></span>
            </div>
        </>
    );
}

export default Dashboard;
