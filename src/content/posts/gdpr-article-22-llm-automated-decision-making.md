---
title: "GDPR Article 22 and LLM-Driven Automated Decision-Making: What Counts and What Doesn't"
description: "Article 22's prohibition on solely automated decision-making with legal effects applies to many LLM workflows people don't realize. Here's the working test."
pubDate: 2026-05-08
author: "Hannah Linden"
tags: ["gdpr", "article-22", "automated-decision-making", "compliance", "llm"]
category: "policy"
sources:
  - title: "GDPR Article 22"
    url: "https://gdpr-info.eu/art-22-gdpr/"
  - title: "EDPB Guidelines on Automated Decision-Making"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-automated-individual-decision-making-and_en"
  - title: "Schufa CJEU Case C-634/21"
    url: "https://curia.europa.eu/juris/document/document.jsf?docid=280426"
schema:
  type: "Article"
heroImage: https://aisec-imagegen.th3gptoperator.workers.dev/featured/aiprivacy.report/gdpr-article-22-llm-automated-decision-making.png
heroAlt: "GDPR Article 22 decision-making compliance flow"
---

Article 22 of the GDPR is the [regulation](https://neuralwatch.org/) people most often think they have engineered around — and most often haven't. With LLMs now embedded in hiring screens, credit decisions, insurance underwriting, content moderation, and customer eligibility checks, the question of when an LLM workflow constitutes "solely automated decision-making which produces legal or similarly significant effects" is now operationally consequential. The CJEU's Schufa decision sharpened the test in late 2023 and several member-state DPAs have applied it to AI workflows in 2025-2026. This is the working framework.

## The text and what it prohibits

Article 22(1) states: "The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her."

Three elements have to be satisfied for the prohibition to apply:

1. There must be a **decision**.
2. The decision must be **based solely on automated processing**.
3. The decision must produce **legal or similarly significant effects**.

Schufa clarified that a credit-scoring system whose output is then used by a third-party lender to make a decision counts as the automated decision under Article 22, even if the lender formally takes the decision. The reasoning: where the score determinatively shapes the outcome, the scoring is the decision.

The three Article 22(2) exceptions (contract, EU/Member State law, explicit consent) cure the prohibition but trigger Article 22(3) safeguards.

## Element 1: Is there a decision?

This is usually the easy part. A decision is any outcome that classifies, scores, accepts, rejects, prioritizes, or otherwise differentiates between data subjects. For LLM workflows, decisions include:

- Approving/denying a refund, claim, or account opening
- Flagging a comment for moderation
- Routing a CV to "review" vs "reject"
- Suggesting an eligibility tier
- Generating a recommended price, premium, or interest rate

Producing prose with no operational effect — an internal summary, an unread draft — is not a decision. Producing prose that any downstream actor uses to make a decision is.

## Element 2: "Solely" automated

This is the most-contested element and the place where most operational design effort goes. The EDPB has consistently said human review must be **meaningful** — not a rubber stamp. Schufa raised the bar further by treating substantively determinative automation as "solely automated" even where humans are nominally in the loop.

For LLM workflows, the working test is whether a reasonable human reviewer, given the LLM output and the time actually available to review, could have meaningfully reached a different decision. If not, the workflow is "solely automated" notwithstanding the human signature.

Operational design patterns that have *failed* to be treated as meaningful review:

- A queue where a reviewer has 15 seconds per item and approves 99.6% of LLM recommendations.
- A workflow where the human reviewer sees only the LLM verdict (accept/reject) without the underlying context.
- A workflow where reviewers are evaluated on their throughput, not their override rate.
- A workflow where reviewers have no authority to overturn the LLM without escalation.

Patterns that have been treated as meaningful:

- Reviewers see the LLM output, the underlying data, and have time to evaluate.
- Reviewers can substantively modify the decision, not just accept or reject.
- The organization tracks override rates and they are non-trivial (this varies; rates in the 5-15% range are generally treated as evidence of meaningful review).

## Element 3: "Legal or similarly significant effects"

Legal effects are reasonably clear: anything that affects legal rights, status, contracts, eligibility. Similarly significant effects are broader and include:

- Pricing differentials (Schufa)
- Employment outcomes (hiring screens, performance flags)
- Insurance underwriting decisions
- Educational placement
- Restricted access to a service that materially affects life

Effects that have generally not been treated as "similarly significant":

- Product recommendations that the user can ignore
- Personalization of UI elements
- Marketing-message variations

The lower the friction for the user to obtain a different outcome — through a different channel, a different request, a complaint process — the less likely a court is to find the effect "similarly significant."

## The LLM-specific complications

Several aspects of LLM workflows complicate the Article 22 analysis:

### Non-deterministic outputs

LLM outputs are stochastic. Same input, different outputs. The EDPB has not formally addressed this, but practitioner consensus is that stochasticity does not exempt the workflow from Article 22 — the decision is still based on the system's output.

### Free-form text outputs as decisions

When an LLM produces a narrative rather than a label ("the candidate is a strong cultural fit but lacks the required years of experience"), the narrative itself can constitute the decision when downstream actors treat it as determinative.

### Tool-use chains

When the LLM calls tools, retrieves data, and produces a decision through a chain of operations, every step that influences the final decision is in scope. The data-protection impact assessment (DPIA) must cover the chain, not just the final inference.

## Article 22(3) safeguards

When you rely on a 22(2) exception, the data subject must have:

- The right to obtain human intervention
- The right to express their point of view
- The right to contest the decision

For LLM workflows, this typically requires:

- A documented appeal channel that does not run through the same LLM
- Sufficient explanation of the decision logic to enable contestation
- A designated human function with authority to overturn

The explanation requirement intersects with Articles 13-15 (right to information). Recital 71 explicitly contemplates the right to obtain an explanation of an automated decision; CJEU case law in 2024-2025 has affirmed an explanation right that requires "meaningful information about the logic involved."

## Practical compliance pattern

For organizations deploying LLM workflows in scope, the working compliance pattern is:

1. **DPIA the workflow** before deployment. For each decision class, identify whether Article 22 applies.
2. **Document the legal basis** for the processing and, where Article 22 applies, the specific Article 22(2) exception relied on.
3. **Design human review** to be substantively meaningful, with logged override rates and reviewer training.
4. **Build the appeal channel** with a path that does not loop back through the same model.
5. **Publish the explanation** in your privacy notice with enough specificity to allow contestation.
6. **Monitor outcomes** for differential impact across protected categories.

## Cross-references

For the broader EU AI Act overlay on automated decision-making — high-risk classification, transparency obligations, and the interaction with Article 22 — see [the Article 52 disclosure checklist](/posts/eu-ai-act-article-52-disclosure-checklist/). For the engineering-side controls that make meaningful review tractable (decision logging, override capture, drift monitoring), [mlobserve.com's tracing patterns](https://mlobserve.com/posts/end-to-end-tracing-llm-applications/) cover the observability stack. For the incident-reporting context when an automated decision goes wrong, [aiincidents.org's logging methodology](https://aiincidents.org/posts/ai-incident-logging-methodology/) covers how such events are tracked publicly.

## The risk of getting this wrong

A finding of unlawful automated decision-making carries fines under Article 83 (up to 4% global turnover) and creates a private right of action under Article 82. Member state DPAs have shown willingness to issue substantial fines (Schufa was the high-water mark in terms of doctrinal impact; subsequent fines have been in the €10-50M range for LLM-adjacent workflows). The compliance cost of doing this properly is meaningful but bounded. The cost of getting it wrong is not.
