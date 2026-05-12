---
title: "DPIA Template for LLM Deployment: A Working Structure"
description: "A practical Data Protection Impact Assessment structure for LLM-integrated workflows. Includes the risk factors GDPR Article 35 requires, the AI Act overlay, and the sections most often skipped."
pubDate: 2026-05-09
author: "Hannah Linden"
tags: ["dpia", "gdpr-article-35", "compliance", "llm", "risk-assessment"]
category: "policy"
sources:
  - title: "GDPR Article 35"
    url: "https://gdpr-info.eu/art-35-gdpr/"
  - title: "EDPB DPIA Guidelines (WP 248 rev.01)"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-data-protection-impact-assessment-dpia-and_en"
  - title: "EU AI Act — Article 27 (FRIA)"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
schema:
  type: "Article"
heroImage: https://aisec-imagegen.th3gptoperator.workers.dev/featured/aiprivacy.report/dpia-template-for-llm-deployment.png
heroAlt: "DPIA template structure for LLM deployment"
---

A Data Protection Impact Assessment is required under Article 35 GDPR when processing is likely to result in a high risk to the rights and freedoms of natural persons. LLM deployments almost always trigger DPIA because they involve novel technologies, large-scale processing of personal data, and frequently automated decision-making. Under the EU AI Act, high-risk AI systems also require a Fundamental Rights Impact Assessment (FRIA, Article 27), which overlaps with — but does not replace — the DPIA. This is the working template I use with practitioner clients.

## When a DPIA is required for LLM workflows

GDPR Article 35(3) lists three mandatory DPIA triggers. The EDPB's nine-criteria test (WP 248) operationalizes these. For LLM workflows, the typical triggers are:

- **Use of new technology** (criterion 8): LLMs are categorically new technology for almost every deployer.
- **Evaluation or scoring** (criterion 1): any classification, ranking, eligibility assessment.
- **Automated decision-making** (criterion 2): see [the Article 22 framework](/posts/gdpr-article-22-llm-automated-decision-making/).
- **Systematic monitoring** (criterion 3): chat logs, customer service transcripts, agent telemetry.
- **Sensitive data or special categories** (criterion 4): health, biometric, political, religious.
- **Large scale** (criterion 5): consumer-facing deployments almost always qualify.
- **Matching or combining datasets** (criterion 6): RAG over multiple internal sources.
- **Vulnerable subjects** (criterion 7): children, employees in monitoring contexts.

If two or more criteria apply, DPIA is required. For most production LLM workflows, three or four apply.

## Template structure

The DPIA should address the following sections. Section names mirror Article 35(7) text; subsections reflect operational practice.

### 1. Systematic description of the processing operations

#### 1.1 Purposes and lawful bases

State the processing purpose specifically. "Improve customer service" is not specific enough. "Generate suggested first-response messages for human review in our complaints queue" is. State the Article 6 lawful basis for each purpose. For special-category data, state the Article 9 condition.

#### 1.2 Data flow

Document the data flow end-to-end:

- Input sources (user inputs, retrieved documents, third-party data)
- Pre-processing (redaction, tokenization)
- Model invocation (which model, hosted where, retention)
- Post-processing (filtering, formatting)
- Storage of outputs (where, how long, who can access)
- Downstream uses

Include the third parties involved (model provider, infrastructure provider, fine-tuning data processors). Each is either a processor or joint controller; document which.

#### 1.3 Legitimate interest assessment (where applicable)

If you rely on Article 6(1)(f), document the three-part test: purpose test, necessity test, balancing test.

### 2. Necessity and proportionality

State why the processing is necessary and why a less-intrusive alternative is not sufficient. For LLM workflows, common alternative-considered framings:

- Rule-based classifier instead of LLM (often insufficient for unstructured input)
- Smaller specialized model instead of general-purpose (sometimes appropriate)
- Human-only workflow (often impractical at scale)

Document why each alternative was rejected. This section is where regulators look for evidence of substantive consideration.

### 3. Risks to data subjects

Risk identification specific to LLM workflows. Categories to address:

#### 3.1 Memorization and re-emission

Risk that the model emits training data containing personal information. Probability and severity depend on model provenance and fine-tuning data composition.

#### 3.2 Hallucination of personal data

Risk that the model generates plausible-but-false statements about real persons. Particularly relevant for customer-facing assistants that name external persons in outputs.

#### 3.3 Inference of sensitive attributes

Risk that the workflow infers protected-category attributes from non-protected inputs (e.g., inferring health status from search behavior).

#### 3.4 Automated decision-making impact

If Article 22 applies, the risk of consequential decisions without meaningful human review. See the linked Article 22 framework.

#### 3.5 Cross-context use

Risk that data collected for one purpose is reused inappropriately when fine-tuning or RAG pipelines blur context boundaries.

#### 3.6 Security risks

Prompt injection enabling exfiltration of personal data. RAG-store poisoning. Tool-use abuses. See [defensive cluster controls at sentryml.com](https://sentryml.com/) for the technical-control inventory.

#### 3.7 Cross-border transfer risks

If the model is operated outside the EEA, document the Article 46 mechanism (SCCs, BCRs, adequacy decision). The Schrems II case-law overlay applies.

### 4. Risk mitigation measures

For each identified risk, document the mitigations in place and the residual risk. Mitigations relevant to LLM workflows:

- **Input filtering**: PII redaction before sending to the model
- **Output filtering**: PII/sensitive-content detection on outputs
- **Retention controls**: bounded prompt/response retention; zero-retention mode for sensitive flows
- **Access controls**: principle-of-least-privilege on logs and traces
- **Provider-side guarantees**: enterprise agreements with no-training-on-prompts clauses
- **Human review**: substantively meaningful, with documented override authority
- **Logging and auditability**: every decision traceable to inputs and outputs
- **Periodic re-assessment**: model updates, prompt changes, data changes trigger re-review

### 5. Consultation

Article 35(2) requires consultation with the DPO. Article 35(9) recommends consulting data subjects "where appropriate." For high-stakes deployments, consultation with affected populations (or representative groups) is increasingly expected.

### 6. AI Act overlap

If the system is high-risk under the AI Act, document the FRIA elements. There is substantial overlap with the DPIA, but the FRIA additionally requires:

- Specific impact on fundamental rights beyond data protection (non-discrimination, dignity, freedom of expression)
- Description of the categories of natural persons likely affected
- Specific harms and reasonably foreseeable misuse

Many practitioners maintain a single integrated DPIA+FRIA document with clear cross-references.

## Sections most often skipped

In reviews of practitioner DPIAs, the sections most consistently underdeveloped are:

- **Alternatives considered** — frequently a single sentence rather than substantive analysis.
- **Memorization risk** — often acknowledged but not actually assessed against the deployed model.
- **Cross-border transfers** — sometimes still relies on outdated Schrems-era language.
- **Re-assessment triggers** — DPIAs are written once and not updated when the model or workflow changes.
- **Consultation** — DPO consultation is documented; affected-population consultation is rarely attempted.

These are also where regulators most often find deficiencies on review.

## Maintaining the DPIA

A DPIA is not a one-time document. The EDPB recommends review on a regular basis. For LLM workflows, the triggers for review include:

- Model version change (the deployed model is now different)
- Fine-tuning or prompt change that materially alters behavior
- New data sources added to RAG
- New tools added to agent capability
- Incident that exposes a previously-unrecognized risk
- Regulatory development that changes the analysis

A practical cadence is quarterly review for production systems, with re-issuance on material change.

## Cross-references

For the Article 22 framework that the DPIA must address head-on, see [GDPR Article 22 and LLM-driven decisions](/posts/gdpr-article-22-llm-automated-decision-making/). For the EU AI Act transparency layer that the DPIA should cross-reference, see [Article 50 transparency obligations](/posts/ai-act-article-50-transparency-obligations/). For the incident-reporting framework that informs the security-risk section, [aiincidents.org's incident logging methodology](https://aiincidents.org/posts/ai-incident-logging-methodology/) describes the public record DPIA authors should consult.

## What a regulator will look for on inspection

In reviewing DPIAs during inspections, member-state DPAs have consistently flagged:

- Specificity of purpose and lawful basis
- Substantive (not boilerplate) risk analysis
- Documented mitigations with evidence
- Up-to-date review history
- Evidence of DPO involvement

A DPIA written specifically for the deployment and maintained as the deployment evolves is the artifact regulators credit. A generic template filled in once and never revisited is the artifact that produces findings.

For more context, [AI policy watch](https://neuralwatch.org/) covers related topics in depth.
