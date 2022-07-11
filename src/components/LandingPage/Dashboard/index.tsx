import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "@site/src/components/LandingPage/Dashboard/index.module.css";
import DashboardIcon from "@site/static/img/svgIcons/dashboardIcon.svg";
import InformationIcon from "@site/static/img/svgIcons/informationIcon.svg";
import Link from "@docusaurus/Link";
import { animate, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  getBlockCount,
  getBlockRate,
  getCanisterCount,
  getCpuCoreCount,
  getNodeCount,
} from "@site/src/utils/network-stats";

const container = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AnimatedValue({ to, precision }) {
  const valueRef = useRef(to);
  const [currentValue, setCurrentValue] = useState(to);
  useEffect(() => {
    const controls = animate(valueRef.current, to, {
      duration: 2,
      onUpdate(value) {
        setCurrentValue(value);
      },
    });
    return () => {
      controls.stop();
      valueRef.current = to;
    };
  }, [to]);

  return (
    <span className={styles.value}>
      {new Intl.NumberFormat("en-US", {
        maximumFractionDigits: precision,
      }).format(currentValue)}
    </span>
  );
}

function AnimatedStatistic({ title, currentValue, tooltip, precision }) {
  return (
    <motion.div variants={item} className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        <div className={styles.informationContainer}>
          <InformationIcon className={styles.informationIcon} />
          <div className={styles.tooltipContainer}>
            <span className={styles.tooltip}>{tooltip}</span>
          </div>
        </div>
      </div>
      <AnimatedValue to={currentValue} precision={precision} />
    </motion.div>
  );
}

function Statistic({ title, currentValue, tooltip }) {
  return (
    <motion.div variants={item} className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        <div className={styles.informationContainer}>
          <InformationIcon className={styles.informationIcon} />
          <div className={styles.tooltipContainer}>
            <span className={styles.tooltip}>{tooltip}</span>
          </div>
        </div>
      </div>
      <span className={styles.value}>{currentValue}</span>
    </motion.div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<{
    blockCount: number;
    blockRate: number;
    canisterCount: number;
    cpuCores: number;
    operational: boolean;
    cost: number;
  }>({
    blockCount: 847458088,
    blockRate: 35.1,
    canisterCount: 73577,
    cpuCores: 29650,
    operational: true,
    cost: 0.46,
  });
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const fetchData = useCallback(async () => {
    const [blockCount, blockRate, canisterCount, cpuCores, nodeMachines] =
      await Promise.all([
        getBlockCount(),
        getBlockRate(),
        getCanisterCount(),
        getCpuCoreCount(),
        getNodeCount(),
      ]);
    const m = Number(Math.abs(blockRate * 100).toPrecision(15));
    const roundedBlockRate = (Math.round(m) / 100) * Math.sign(blockRate);
    setStats({
      blockCount,
      blockRate: roundedBlockRate,
      canisterCount,
      cpuCores,
      operational: nodeMachines >= 100,
      cost: 0.46,
    });
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      className={styles.main}
    >
      <a className={styles.anchor} id="dashboard" />
      <div className={styles.grid}>
        <AnimatedStatistic
          title="Block Count"
          currentValue={stats.blockCount}
          tooltip={"The count of blocks created since genesis."}
          precision={0}
        />
        <Statistic
          title="Network Status"
          currentValue={stats.operational ? "Operational" : "Maintenance"}
          tooltip={"The current network status of the Internet Computer."}
        />
        <AnimatedStatistic
          title="Blocks/s"
          currentValue={stats.blockRate}
          tooltip={"The count of blocks finalized per second."}
          precision={2}
        />
        <AnimatedStatistic
          title="Chain CPUs"
          currentValue={stats.cpuCores}
          tooltip={"The current count of CPUs powering the Internet Computer."}
          precision={0}
        />
        <AnimatedStatistic
          title="Canisters"
          currentValue={stats.canisterCount}
          tooltip={"The count of live canisters on the Internet Computer."}
          precision={0}
        />
        <Statistic
          title="Data storage cost"
          currentValue={`$${stats.cost} GB/month`}
          tooltip={
            "The current estimated cost of storage on the Internet Computer."
          }
        />
      </div>
      <motion.div variants={item}>
        <Link
          to={"https://dashboard.internetcomputer.org/"}
          className={styles.actionButton}
        >
          <DashboardIcon className={styles.dashboardIcon} />
          <span>Go to Dashboard</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
