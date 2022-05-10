import React from 'react';
import styles from './index.module.css';
import Link from "@docusaurus/Link";
import governanceGraph02 from "@site/static/img/governanceGraph02.png"
import governanceGraphMobile01 from "@site/static/img/governanceGraphMobile01.png"
import governanceGraphMobile02 from "@site/static/img/governanceGraphMobile02.png"
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
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {font: {size: 16}, color: "black", padding: 30},
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
                                offset: 20,
                                formatter: function (value) {
                                    return Math.round(value * 1000) / 1000 + '%';
                                },
                                padding: 4,
                            }
                        },
                    }
                },
            }}/>
            <p style={{marginBottom: 0}}>* consists of investors, node providers, developers and the IC Association</p>
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
            backgroundColor: 'rgba(62,9,185,1)',
            tension: 0.4,
            pointRadius: 5,
        },
    ],
};

function VotingRewardsChart() {
    return (
        <div className={styles.votingRewardsChart}>
            <Line data={votingRewardsData} options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                interaction: {
                    intersect: false,
                    mode: 'nearest',
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
                                weight: 'bold',
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
                        text: 'Latest Annualized Voting Reward Percentage',
                        font: {size: 16, weight: 'bold'},
                        color: 'black',
                        align: 'start',
                    },
                    datalabels: {
                        display: false,
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

function Governance() {

    return (
        <div className={styles.main}>
            <a id="governance"/>
            <div className={styles.header}>
                <p className={styles.headerTitle}>Help Shape the Internet Computer</p>
                <p className={styles.headerBody}>Calling all developers and blockchain enthusiasts! The Internet Computer is
                    a fully decentralized
                    platform, which means that its ownership is in the hands of the people vested in it. While the
                    Dfinity Foundation is a main contributor building the Internet Computer, the evolution of how it is
                    built is governed by a communal voting system. Not only do stakeholders have a say in 
                    what happens next, they also receive voting rewards for participating in governance.</p>
                <Link className={styles.headerCallToAction} to={"https://forum.dfinity.org/"}>
                    Share your thoughts in the Developer Forum
                </Link>
            </div>
            <div className={styles.graphsContainer}>
                <div className={styles.card}>
                    <p className={styles.cardTitle}>The community-led governance of the Internet Computer</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/Staking,_voting_and_rewards#Why_Staking_Matters"}>
                        Learn more
                    </Link>
                    <OwnershipChart/>
                    <img className={styles.graphMobile} src={governanceGraphMobile01}
                         alt="governanceGraphMobile01"/>
                </div>
                <div className={styles.card}>
                    <p className={styles.cardTitle}>Earn substantial voting rewards by staking in the Network
                        Nervous
                        System (NNS)</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/ICP_staking_with_NNS_frontend_dapp"}>
                        Stake ICP on NNS dapp
                    </Link>
                    <VotingRewardsChart/>
                    <img className={styles.graphMobile} src={governanceGraphMobile02}
                         alt="governanceGraphMobile02"/>
                </div>
            </div>
            <div className={styles.votingContainer}>
                <svg className={styles.BGShape} viewBox="0 0 773 643" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.65046e-05 225.435C5.20259e-05 47.8928 273.206 0.0612357 450.748 0.0612512C628.291 0.0612667 772.218 143.988 772.218 321.531C772.218 499.073 628.291 643 450.748 643C273.206 643 2.09834e-05 402.978 3.65046e-05 225.435Z"
                        fill="#3C01BA"/>
                </svg>
                <p className={styles.votingTitle}>Your opinions matter </p>
                <Link className={styles.actionButton} to="https://beta.smartcontracts.org/docs/current/tokenomics/">

                    LEARN HOW TO STAKE AND VOTE
                </Link>
            </div>
        </div>
    );
}

export default Governance;
