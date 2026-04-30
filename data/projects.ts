export const projects = [
  {
    title: "Nagarro Enterprise Data Lake",
    duration: "Apr 2025 - Present",
    company: "Nagarro",
    domain: "Enterprise Analytics",
    summary: "Fabric-based Lakehouse platform consolidating 6+ enterprise systems.",
    outcomes: [
      "40% reduction in manual data collection",
      "Near-real-time data availability across business units",
      "5+ Power BI dashboards from curated semantic models"
    ],
    tools: ["Microsoft Fabric", "Fabric Data Factory", "Delta Lake", "PySpark", "Power BI"],
    flow: [
      "Source Systems (SAP, Oracle, SQL Server, SharePoint)",
      "Fabric Data Factory Ingestion (Batch + Incremental)",
      "Raw Zone in OneLake",
      "PySpark Transformations (Silver + Gold)",
      "Semantic Models + Power BI Consumption"
    ]
  },
  {
    title: "DC Workflow Migration",
    duration: "Apr 2024 - Apr 2025",
    company: "Nagarro",
    domain: "Data Migration",
    summary: "AWS pipeline migration handling 50+ daily API feeds and Snowflake-ready outputs.",
    outcomes: [
      "Zero data loss across 50+ daily feeds",
      "99.9% data quality SLA",
      "60% faster onboarding using reusable Glue framework"
    ],
    tools: ["AWS S3", "AWS Glue", "PySpark", "Pandas", "Snowflake", "GitHub Actions"],
    flow: [
      "Vendor REST APIs (50+ feeds/day)",
      "S3 Landing (raw JSON)",
      "Glue Orchestration + PySpark Flattening",
      "Validation + DQ Gates",
      "Snowflake-ready Curated Layer + BI Dashboards"
    ]
  },
  {
    title: "Data Platform Framework - Automobile Industry",
    duration: "Jun 2022 - Apr 2024",
    company: "Nagarro",
    domain: "Automobile",
    summary: "Databricks Medallion platform for 9 years historical plus daily incremental data.",
    outcomes: [
      "45% faster Spark job execution",
      "70% faster audit resolution via Delta time-travel",
      "85% unit test coverage with Pytest"
    ],
    tools: ["Azure Databricks", "Azure Data Factory", "Delta Lake", "PySpark", "Pytest"],
    flow: [
      "Historical + Daily API Sources",
      "Landing/Bronze in ADLS",
      "Databricks Silver Transformations",
      "Gold Data Products + Delta Time Travel",
      "Analytics & Reporting Consumption"
    ]
  }
];
