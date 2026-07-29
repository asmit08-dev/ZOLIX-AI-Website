import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LearningModelTechnology from "@/components/technologies/LearningModelTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Machine Learning Models";

export const metadata: Metadata = technologyMetadata("learning-model");

const faqs = [
  { q: "Does Zolix track costs beyond just the training run itself?", a: "Yes. Data pipelines, feature stores, experiment tracking, and serving infrastructure are all tracked as part of the full ML lifecycle, not just training compute." },
  { q: "Can Zolix identify unused or stale experiment artifacts?", a: "Yes. Datasets, feature store entries, and logged experiments that haven't been accessed in a defined window are flagged for cleanup or a lower-cost storage tier." },
  { q: "Does Zolix compare training cost against model performance?", a: "Yes. Cost is connected to performance metrics, so teams can evaluate cost per accuracy point rather than looking at spend in isolation." },
  { q: "Can Zolix recommend switching workloads from real-time to batch inference?", a: "Yes. Latency requirements are compared against actual serving patterns, and workloads that could shift to cheaper batch processing without missing real requirements are flagged." },
  { q: "Does Zolix evaluate whether our retraining schedule still makes sense?", a: "Yes. Retraining cadence is compared against actual data drift, flagging schedules that may no longer match how often retraining is genuinely needed." },
  { q: "Can Zolix recommend Reserved or Spot coverage specifically for training jobs?", a: "Yes. Coverage is recommended per training workload based on its actual fault tolerance, rather than applying one blanket commitment strategy across every job." },
  { q: "Does Zolix detect idle time on Spark or Databricks clusters?", a: "Yes. Idle executor time is tracked specifically, rather than treating a Spark or Databricks cluster as a single opaque compute cost." },
  { q: "Does this require agents inside our ML infrastructure?", a: "No. Zolix connects through read-only IAM roles, with no agents installed inside training, storage, or serving environments." },
];

export default function LearningModelTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("learning-model", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <LearningModelTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("learning-model", H1)} />} />
    </>
  );
}
