---
title: "Cross-Border LLM Data Transfers: SCC Compliance When the Model Lives Outside the EEA"
description: "Most LLM deployments cross borders. The Standard Contractual Clauses framework, post-Schrems II case law, and the supplementary measures requirement apply directly. Here's the working compliance pattern."
pubDate: 2026-05-10
author: "Hannah Linden"
tags: ["gdpr", "cross-border-transfers", "scc", "schrems-ii", "compliance"]
category: "policy"
sources:
  - title: "European Commission Standard Contractual Clauses"
    url: "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
  - title: "Schrems II — Case C-311/18"
    url: "https://curia.europa.eu/juris/document/document.jsf?docid=228677"
  - title: "EDPB Recommendations 01/2020 on supplementary measures"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en"
schema:
  type: "Article"
heroImage: https://aisec-imagegen.th3gptoperator.workers.dev/featured/aiprivacy.report/cross-border-llm-data-transfers-scc-compliance.png
heroAlt: "Cross-border LLM data transfer compliance flowchart"
---

The major foundation models are operated, primarily, by providers headquartered in the United States. Their inference infrastructure runs in multiple regions, including but not limited to the EU. For European deployers, the transfer of personal data to a non-EEA controller or processor is a daily compliance question, governed by GDPR Chapter V, the Standard Contractual Clauses framework, and the post-Schrems II case law. This is the working framework.

## The structure of Chapter V

Personal data transfers outside the EEA require a lawful transfer mechanism under Article 44-49 GDPR. The hierarchy:

1. **Adequacy decision** (Article 45) — the Commission has determined the destination country provides essentially equivalent protection. Adequacy decisions exist for the UK, Switzerland, Japan, South Korea, and others; for the US, the EU-US Data Privacy Framework (DPF) provides a partial adequacy decision conditional on the recipient's DPF certification.

2. **Appropriate safeguards** (Article 46) — Standard Contractual Clauses, Binding Corporate Rules, codes of conduct, or certification mechanisms. SCCs are the dominant choice.

3. **Specific situation derogations** (Article 49) — narrow, not usable as a routine basis.

For LLM workflows, the dominant lawful basis is either DPF adequacy (where applicable) or SCCs with supplementary measures.

## Post-Schrems II: the threshold question

Schrems II held that even a properly executed Article 46 transfer mechanism is insufficient when the destination jurisdiction's surveillance laws give public authorities access to the transferred data inconsistent with EU fundamental-rights standards. The required response is a **transfer impact assessment** (TIA) and supplementary measures where necessary.

For US transfers in particular, the legal landscape:

- The DPF provides adequacy for DPF-certified entities, partially addressing Schrems II.
- For non-DPF transfers, the TIA must assess whether US surveillance law (FISA 702, EO 12333) creates access to the data that exceeds EU fundamental-rights protections.
- Where it does, supplementary measures are required: encryption at rest with keys held outside the destination, pseudonymization, contractual transparency commitments, audit rights.

For LLM workflows, the practical question is whether the model provider is DPF-certified and whether the specific data being transferred is in scope of the certification.

## Standard Contractual Clauses (2021 set)

The 2021 SCCs replaced earlier sets and are the only currently-valid SCCs. They have a modular structure:

- **Module 1**: Controller to controller
- **Module 2**: Controller to processor
- **Module 3**: Processor to processor
- **Module 4**: Processor to controller

For typical LLM deployments where the deployer is the controller and the model provider is the processor, Module 2 applies. Where the deployer's processor (e.g., an integration vendor) further engages the model provider, Module 3 applies.

The SCCs must be executed in their entirety with the appropriate annexes (Annex I — parties and data; Annex II — technical and organizational measures; Annex III — sub-processors).

## Annex I: what to actually populate

Annex I requires specific details that are often left vague in execution. For LLM transfers:

- **Categories of data subjects**: end users, employees, third parties named in inputs.
- **Categories of personal data**: identifiers, contact information, content of communications, behavioral data, any sensitive data.
- **Special categories**: if processed, the specific category and the Article 9 condition.
- **Frequency**: typically continuous for production deployments.
- **Nature of processing**: inference, fine-tuning, evaluation, monitoring.
- **Purpose**: as specific as in the DPIA.
- **Retention**: provider's retention policy — confirm in writing.
- **Sub-processors**: every sub-processor engaged in the processing, with locations.

Vague Annex I entries are a regulator's first finding on inspection.

## Annex II: technical and organizational measures

For LLM transfers, the relevant measures:

- **Encryption in transit** (TLS to provider endpoint, mTLS in some enterprise configurations).
- **Encryption at rest** (provider obligation; verify the spec).
- **Access controls** at the provider (provider's documentation; verify SOC 2 / ISO 27001).
- **Logging and audit** (provider obligation; verify retention and access).
- **Pseudonymization** (deployer obligation: redact, tokenize, or hash before transfer where the use case permits).
- **Data residency** (provider feature: where supported, choose EU-region inference).
- **No-training-on-inputs** (provider contractual commitment).
- **Zero-retention mode** (provider feature for sensitive flows).

## Sub-processor management

The SCCs require the processor to disclose sub-processors and notify the controller of changes. For LLM providers, the sub-processor list includes infrastructure providers (AWS, GCP, Azure regions), CDN providers, and various tooling vendors. The list is often long.

Operational pattern:

1. Obtain the sub-processor list at contract execution.
2. Subscribe to provider notifications of sub-processor changes.
3. Reserve the right to object (built into the SCCs).
4. Maintain an internal record of sub-processors for downstream notifications to data subjects.

## The supplementary measures decision

The EDPB Recommendations 01/2020 set out the supplementary measures framework. For LLM transfers, the working pattern:

1. **TIA**: assess whether the destination jurisdiction's law creates problematic access. For US transfers without DPF, the answer is "yes, requires supplementary measures."
2. **Supplementary measures**: pseudonymize before transfer (where the use case permits), encrypt with keys held in the EEA (where technically feasible), contractual commitments on disclosure (e.g., transparency notices on US government access requests).
3. **Residual risk assessment**: where supplementary measures cannot fully address the risk, document the residual risk and the legal basis for proceeding.

For some LLM workflows, particularly those involving sensitive data, the residual risk after supplementary measures may be unacceptable. The pattern then is to use an EU-region inference endpoint with DPF-certified provider commitments and minimize data sent.

## Practical compliance pattern

For an organization deploying an LLM workflow with cross-border transfer:

1. **Identify the transfer**: where does the personal data go? Which entities receive it?
2. **Select the lawful basis**: DPF for US transfers where available; SCCs otherwise.
3. **Execute SCCs**: with complete annexes, in the correct module.
4. **Conduct TIA**: documented assessment of destination-jurisdiction risk.
5. **Implement supplementary measures**: technical and contractual.
6. **Update privacy notice**: disclose the transfer mechanism, the destination, and the basis.
7. **Maintain documentation**: ready for regulator request on inspection.

## Common compliance gaps

In review of practitioner LLM compliance documentation, the consistent gaps are:

- **Outdated SCCs**: pre-2021 SCCs still in use. These are not valid.
- **Vague annexes**: boilerplate Annex I that doesn't describe the actual data.
- **No TIA**: SCCs executed but no documented transfer impact assessment.
- **Provider's-own-SCCs-only**: providers sometimes execute SCCs with sub-processors but the deployer hasn't executed SCCs covering its own role. Both layers are needed.
- **DPF reliance without verification**: deployer relies on DPF adequacy but hasn't verified the provider's DPF certification status (which can be revoked).

## Cross-references

For the DPIA framework that contextualizes the cross-border transfer assessment, see [DPIA template for LLM deployment](/posts/dpia-template-for-llm-deployment/). For the Article 22 framework when the transferred data is used for automated decision-making, see [GDPR Article 22 and LLM-driven decisions](/posts/gdpr-article-22-llm-automated-decision-making/). For the engineering controls that make data minimization and pseudonymization tractable, [mlobserve.com's observability patterns](https://mlobserve.com/posts/end-to-end-tracing-llm-applications/) cover the relevant infrastructure. For the policy-adjacent monitoring at [neuralwatch.org](https://neuralwatch.org/), broader transfer-policy developments are tracked.

## The shape of the risk

Cross-border transfer non-compliance is the single most-fined category of GDPR violation in recent enforcement. The combination of high deployment frequency, technical complexity, and active regulator interest makes LLM transfers a top-tier compliance priority. The compliance lift is bounded; the consequences of skipping it are not.
