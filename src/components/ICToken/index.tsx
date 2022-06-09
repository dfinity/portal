import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import Link from "@docusaurus/Link";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import ICTokenGraphMobile01 from "@site/static/img/ICToken/ICTokenGraphMobile01.png"
import ICTokenGraphMobile02 from "@site/static/img/ICToken/ICTokenGraphMobile02.png"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import {Doughnut, Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement, Title);

export const ownershipData = {
    labels: ['Community *', 'DFINITY Foundation',],
    datasets: [
        {
            label: 'Percentage of Ownership',
            data: [77.8, 22.2],
            backgroundColor: [
                'rgba(62,9,185,1)',
                'rgba(205,78,131,1)',
            ],
            borderColor: [
                'rgba(62,9,185,1)',
                'rgba(205,78,131,1)',
            ],
            borderWidth: 1,
        },
    ],
};

function OwnershipChart() {
    return (
        <div className={styles.ownershipChart}>
            <Doughnut data={ownershipData} options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                cutout: "90%",
                rotation: 130,
                hover: {mode: null},
                layout: {
                    padding: {
                        top: 0,
                        right: 20,
                        bottom: 0,
                        left: 20
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                },
                plugins: {
                    title: {
                        display: true,
                        text: '* consists of investors, node providers, developers and the IC Association',
                        font: {size: 14, weight: "normal"},
                        color: 'black',
                        position: "bottom",
                        align: 'center',

                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {size: 16},
                            color: "black",
                            usePointStyle: true,
                            pointStyle: "circle",
                            boxWidth: 12
                        },
                        onClick: function (e) {
                            e.stopPropagation();
                        }
                    },
                    tooltip: {
                        enabled: false,
                    },
                    datalabels: {
                        labels: {
                            value: {
                                anchor: 'end',
                                align: 'end',
                                font: {size: 24, weight: 'bold'},
                                color: (ctx) => {
                                    return ctx.dataset.backgroundColor[ctx.dataIndex]
                                },
                                offset: 5,
                                formatter: function (value) {
                                    return Math.round(value * 1000) / 1000 + '%';
                                },
                            }
                        },
                    }
                },
            }}/>
        </div>
    );
}

export const votingRewardsData = {
    labels: ['0.5', '1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [
        {
            label: "Reward",
            data: [11.1, 11.7, 13.0, 14.3, 15.6, 16.9, 18.2, 19.5, 20.8],
            fill: true,
            borderColor: 'rgba(62,9,185,1)',
            backgroundColor: 'rgba(118,85,200,1)',
            tension: 0.4,
            pointRadius: 3,
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,255,255,1)',
            hoverBorderWidth: 2,
            hoverPointRadius: 6,
        },
    ],
};

function VotingRewardsChart() {
    return (
        <div className={styles.votingRewardsChart}>
            <Line data={votingRewardsData} options={{
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'nearest',
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                },
                layout: {
                    padding: {
                        top: 0,
                        right: 20,
                        bottom: 0,
                        left: 20
                    }
                },
                scales: {
                    xAxis: {
                        display: true,
                        title: {
                            display: true,
                            text: 'ICP Token Dissolve Delay (Years)',
                            color: 'black',
                            font: {
                                size: 14,
                            },
                        },
                        beginAtZero: true,
                        ticks: {
                            display: true,
                        },
                        grid: {
                            drawBorder: false,
                            drawTicks: false,
                            drawOnChartArea: false,
                        }
                    },
                    y: {
                        display: false,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: ['Latest Annualized Voting', 'Reward Percentage'],
                        font: {size: 14},
                        color: 'black',
                        align: 'start',


                    },
                    datalabels: {
                        formatter: (value, context) => {
                            if (context.dataIndex === 0 || context.dataIndex === context.dataset.data.length - 1) {
                                return value + '%'
                            }
                            return "";
                        },
                        anchor: 'end',
                        align: 'end',
                        color: 'black',
                        font: {size: 14, weight: 'bold',},
                    },
                    tooltip: {
                        titleFont: {size: 16, weight: 'bold'},
                        titleAlign: "center",
                        bodyFont: {size: 16},
                        displayColors: false,
                        padding: 10,
                        callbacks: {
                            title: () => {
                                return 'Voting Reward';
                            },
                            label: (tooltipItem) => {
                                let dataset = votingRewardsData['datasets'][0];
                                let percent = (dataset['data'][tooltipItem['dataIndex']]);
                                return percent + '% after ' + votingRewardsData['labels'][tooltipItem['dataIndex']] + ' years';
                            },
                        },
                    }
                },
            }}/>
        </div>
    );
}

const container = {
    hidden: {opacity: 0, transition: {duration: 1}},
    show: {opacity: 1, transition: {staggerChildren: 0.1,}}
}
const item = {
    hidden: {opacity: 0, y: 30},
    show: {opacity: 1, y: 0, transition: {duration: 0.5}}
}
const chart = {
    hidden: {opacity: 0, y: 30},
    show: {opacity: 1, y: 0, transition: {duration: 0.5}}
}

function ICToken() {
    const controls = useAnimation();
    const [displayCharts, setDisplayCharts] = useState(false);
    const {ref, inView} = useInView({threshold: 0.2});
    useEffect(() => {
        if (inView) {
            controls.start("show").then(() => setDisplayCharts(true));
        }
    }, [controls, inView]);
    return (
        <motion.div ref={ref}
                    animate={controls}
                    initial="hidden"
                    variants={container}
                    className={styles.main}>
            <a id="ICToken"/>
            <div className={styles.header}>
                <motion.p variants={item}
                          className={styles.headerTitle}>Internet Computer
                    utility token
                </motion.p>
                <motion.p variants={item} className={styles.headerBody}>ICP
                    tokens allow users to participate in and govern the Internet
                    Computer blockchain network.
                </motion.p>
                <motion.div variants={item} style={{display: "inline-flex"}}>
                    <Link className={styles.headerCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/ICP_token"}>
                        LEARN MORE
                    </Link>
                </motion.div>
            </div>

            <div className={styles.graphsContainer}>
                <motion.div variants={chart} className={styles.card}>
                    <p className={styles.cardTitle}>The community-led
                        governance
                        of the Internet Computer</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://dashboard.internetcomputer.org/governance"}>
                        Learn more
                    </Link>
                    {displayCharts ?
                        <OwnershipChart/> :
                        <div className={styles.placeholder}/>
                    }
                    <img className={styles.graphMobile}
                         src={ICTokenGraphMobile01}
                         alt="ICTokenGraphMobile01"/>
                </motion.div>
                <motion.div variants={chart} className={styles.card}>
                    <p className={styles.cardTitle}>Earn substantial voting
                        rewards by staking in the Network
                        Nervous
                        System (NNS)</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/ICP_staking_with_NNS_frontend_dapp"}>
                        Stake ICP on NNS dapp
                    </Link>
                    {displayCharts ?
                        <VotingRewardsChart/> :
                        <div className={styles.placeholder}/>
                    }
                    <img className={styles.graphMobile}
                         src={ICTokenGraphMobile02}
                         alt="ICTokenGraphMobile02"/>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ICToken;
