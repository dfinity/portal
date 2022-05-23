import React from "react";
import styles from "@site/src/components/Dashboard/index.module.css";
import DashboardIcon from "@site/static/img/dashboardIcon.svg";
import InformationIcon from "@site/static/img/informationIcon.svg";
import Link from "@docusaurus/Link";
function Statistic({ title, value, tooltip }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        <div className={styles.informationContainer}>
          <InformationIcon className={styles.informationIcon} />
            <div className={styles.tooltipContainer}>
                <span className={styles.tooltip}>{tooltip}</span>
            </div>
        </div>
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

function Dashboard() {
  return (
    <div className={styles.main}>
      <a id="dashboard" />
      <div className={styles.grid}>
        <Statistic
          title="Block Count"
          value="658,841,253"
          tooltip={"Tooltip information should go here."}
        />
        <Statistic
          title="Network Status"
          value="Operational"
          tooltip={
            "Tooltip information should go here."
          }
        />
        <Statistic
          title="Blocks/s"
          value="33.30"
          tooltip={"Tooltip information should go here."}
        />
        <Statistic
          title="Chain CPUs"
          value="26,580"
          tooltip={"Tooltip information should go here."}
        />
        <Statistic
          title="Canisters"
          value="46,968"
          tooltip={"Tooltip information should go here."}
        />
        <Statistic
          title="Data storage cost"
          value="$0.46 GB/month"
          tooltip={"Tooltip information should go here."}
        />
      </div>
      <Link to={"/"} className={styles.actionButton}>
        <DashboardIcon className={styles.dashboardIcon} />
        <span>Go to Dashboard</span>
      </Link>
    </div>
  );
}

export default Dashboard;
