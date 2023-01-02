import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "@site/src/components/LandingPage/Dashboard/index.module.css";
import DashboardIcon from "@site/static/img/svgIcons/dashboardIcon.svg";
import InformationIcon from "@site/static/img/svgIcons/informationIcon.svg";
import Link from "@docusaurus/Link";
import { animate, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  getBlockCount,
  getCanisterCount,
  getCyclesBurnRate,
  getTransactionRate,
} from "@site/src/utils/network-stats";
import clsx from "clsx";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "../../Common/AnimateSpawn";
import useGlobalData from "@docusaurus/useGlobalData";

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

const Statistic: React.FC<{
  title: string;
  currentValue: React.ReactNode;
  tooltip: React.ReactNode;
  subscript?: React.ReactNode;
  className?: string;
}> = ({ title, currentValue, tooltip, subscript, className }) => {
  return (
    <motion.div variants={item} className={clsx(styles.container, className)}>
      <div className={styles.titleContainer}>
        <span className="tw-paragraph mb-2 whitespace-nowrap">{title}</span>
        <div className={styles.informationContainer}>
          <InformationIcon className={styles.informationIcon} />
          <div className={styles.tooltipContainer}>
            <span className={styles.tooltip}>{tooltip}</span>
          </div>
        </div>
      </div>
      <span className="tw-heading-6 md:tw-heading-5 lg:tw-heading-4 whitespace-nowrap">
        {currentValue}
      </span>
      {subscript && (
        <span className="block tw-paragraph text-black-60 mt-2">
          {subscript}
        </span>
      )}
    </motion.div>
  );
};

const formatInteger = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
}).format;

function Dashboard() {
  const [stats, setStats] = useState<{
    blockCount: number;
    canisters: number;
    cyclesBurnRate: number;
    transactionRate: number;
    cost: number;
    xdrPrice: number;
  }>({
    blockCount: 0,
    canisters: 0,
    cyclesBurnRate: 0,
    transactionRate: 0,
    cost: 0.46,
    xdrPrice: 1.31597,
  });

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

  const fetchData = useCallback(async () => {
    const [blockCount, canisters, transactionRate, cyclesBurnRate] =
      await Promise.all([
        getBlockCount(),
        getCanisterCount(),
        getTransactionRate(),
        getCyclesBurnRate(),
      ]);

    setStats((v) => ({
      blockCount,
      canisters,
      transactionRate,
      cyclesBurnRate,
      cost: v.cost,
      xdrPrice: v.xdrPrice,
    }));
  }, [setStats]);

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
    <section className=" pt-20 md:pt-[200px] z-20">
      <AnimateSpawn variants={transitions.item} className="container-12">
        <h2 className="text-white-60 tw-heading-4 md:tw-heading-60 md:w-8/12 mx-auto mb-16 md:mb-30">
          Over{" "}
          <span className="text-white">
            {(Math.floor(stats.blockCount / 100_000_000) / 10).toFixed(1)}{" "}
            Billion
          </span>{" "}
          blocks processed. Everything is a transaction. 
        </h2>
      </AnimateSpawn>

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={container}
        className={styles.main}
      >
        <div className={styles.anchor} id="dashboard" />
        <div className={styles.grid}>
          <Statistic
            title="Transaction Rate"
            className="md:z-30"
            currentValue={
              <>
                {formatInteger(stats.transactionRate * 3400 * 24)}{" "}
                <span className="text-black-60 tw-heading-7">TX/day</span>
              </>
            }
            subscript={`${formatInteger(stats.transactionRate)} TX/sec`}
            tooltip={"The number of transactions being processed each day."}
          />
          <Statistic
            title="Canisters (smart contracts/dapps)"
            className="md:z-20"
            currentValue={formatInteger(stats.canisters)}
            tooltip={"The total number of canisters running."}
          />
          <Statistic
            title="Cycles Burn Rate"
            className="md:z-10"
            currentValue={
              <>
                {formatInteger(stats.cyclesBurnRate)}{" "}
                <span className="text-black-60 tw-heading-7">cycles/s</span>
              </>
            }
            subscript={`≈${(
              ((stats.cyclesBurnRate / 1_000_000_000_000) *
                stats.xdrPrice *
                3600 *
                24) /
              icpPrice
            ).toFixed(1)} ICP/day`}
            tooltip={"The total amount of cycles burned each second."}
          />
        </div>
        <motion.div variants={item}>
          <div className={styles.actionButton}>
            <Link
              to={"https://dashboard.internetcomputer.org/"}
              className={"tw-heading-6 my-1 flex gap-2 md:p-4"}
            >
              <span>See Internet Computer stats</span>
              <ExternalLinkIcon />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Dashboard;
