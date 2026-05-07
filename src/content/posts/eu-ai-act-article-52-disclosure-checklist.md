---
title: "EU AI Act Article 52: Foundation Model Disclosure Obligations — A Provider's Checklist"
description: "What Article 52 actually requires of foundation model providers, what the EDPB's draft guidance clarifies, and how to operationalize disclosure without exposing trade secrets."
pubDate: 2026-05-07
author: "Hannah Linden"
tags: ["eu-ai-act", "compliance", "foundation-models", "disclosure", "policy"]
category: "policy"
sources:
  - title: "EU AI Act — Regulation (EU) 2024/1689"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
  - title: "EDPB Statement on AI Models and GDPR"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en"
  - title: "AI Act Compliance Tracker"
    url: "https://artificialintelligenceact.eu/"
schema:
  type: "Article"
heroImage: https://aisec-imagegen.th3gptoperator.workers.dev/?prompt=European%20Union%20regulatory%20documents%2C%20measured%20editorial%20style%2C%20muted%20palette&aspect=hero
heroAlt: "EU AI Act Article 52 disclosure checklist visualization"
---

Article 52 of the EU AI Act lays out the transparency obligations for general-purpose AI model providers — separate from, and in addition to, the obligations on AI system deployers. Most of the early implementation effort I see at provider organizations is conflating these two layers. The result is compliance work that satisfies neither.

This is a working checklist, not legal advice. Providers should validate against their own counsel and the most recent EDPB and Commission guidance.

## Scope: who Article 52 applies to

The obligations attach to providers of "general-purpose AI models." The definition centers on three properties: the model is trained on a large amount of data using self-supervision at scale; it displays significant generality; and it is capable of performing a wide range of distinct tasks. In practice, this captures most foundation models with parameter counts above roughly 1 billion, plus smaller models if they exhibit the generality criterion. Fine-tuned variants typically inherit the obligation when they materially alter capabilities.

The obligation does **not** attach to deployers — the company building a chatbot on top of a foundation model has different (Title III) obligations. Foundation model providers cannot transfer their Article 52 obligations downstream by contract.

## The four core disclosures

### 1. Technical documentation

A provider must maintain technical documentation describing:

- The model's intended tasks, modalities, and capabilities
- The acceptable use policies the provider applies
- Training methodology at a level of generality that allows downstream evaluation
- Architecture and parameter counts (or comparable indicators of scale)
- Compute used for training (FLOPs)
- Energy consumption estimate
- Known limitations and biases identified during evaluation

The documentation must be sufficient for downstream deployers to assess whether the model fits their use case and to satisfy their own AI Act obligations. "Sufficient" is the litigated word here — it does not mean "complete" but it does mean more than a marketing one-pager.

### 2. Training data summary

This is the disclosure that has generated the most pushback from US providers. The Act requires a "sufficiently detailed summary about the content used for training of the general-purpose AI model," with a published template forthcoming from the AI Office.

The current draft template (published for consultation in early 2026) requires:

- Major data domains by approximate proportion (web-crawled vs licensed vs synthetic vs proprietary)
- Major language coverage and approximate distribution
- Time-window of data collection
- Data sources where provider has rights to disclose, with a process for handling rights-holder takedown requests
- Filtering and decontamination procedures applied
- A notice mechanism for rightsholders to identify and remove their content from future training runs

This is operationally heavy. Providers should treat it as a data engineering project, not a legal-team deliverable.

### 3. Copyright compliance documentation

Providers must implement a policy to comply with EU copyright law, including respecting machine-readable opt-outs (`robots.txt`, IETF AI Preferences when standardized, ai.txt). They must maintain records sufficient to demonstrate compliance — which in practice means logs of which sources were excluded by which mechanism at which point in the training pipeline.

Note: this is independent of any pending litigation in the US or other jurisdictions. EU compliance is required regardless of whether the use would be fair use under US law.

### 4. Systemic risk evaluation (for high-impact models)

Models exceeding the systemic-risk threshold (currently defined by training compute above 10^25 FLOPs, with the Commission empowered to adjust) trigger additional obligations:

- Documented evaluation against state-of-the-art protocols, including red-teaming
- Tracking and reporting of serious incidents
- Cybersecurity protections at the model and infrastructure level
- An incident response process with notification to the AI Office

The 10^25 FLOPs threshold captures GPT-4-class and above today. Smaller specialized models can also be designated by the Commission if they pose systemic risk despite lower compute — for example, a biology-specialized model that meaningfully advances dangerous-capability frontiers.

## What disclosure does NOT require

Common over-disclosure errors I see in early drafts:

- **Specific training data contents.** The summary is at the level of categories and proportions, not file-by-file disclosure.
- **Model weights or architecture in full.** Architecture descriptions can be at the level of "transformer with X layers, Y attention heads."
- **Customer or deployer names.** Article 52 is about the model itself, not who uses it.
- **Trade-secret training methodology.** Procedural descriptions are required; algorithmic implementations are not.

Disclosing more than required has both competitive and adversarial costs. Adversaries use detailed model documentation to design jailbreaks. Disclose at the granularity the Act requires; not more.

## Operationalization: a 90-day plan

Providers without an existing compliance posture can use this sequence:

1. **Days 1-15**: Inventory existing model documentation. Map gaps against Article 52 requirements. Identify whether you exceed the 10^25 FLOP threshold.
2. **Days 16-45**: Build the training data summary as a data-engineering deliverable. Most of the friction is upstream — getting accurate proportions out of pre-existing pipelines that weren't designed for it.
3. **Days 46-75**: Document the copyright compliance policy. Wire up `robots.txt` and ai.txt respect, build the rightsholder notice mechanism, instrument logs.
4. **Days 76-90**: For systemic-risk models, stand up the red-team and incident-response processes. The AI Office expects ongoing artifacts, not a one-time document.

Most providers will find step 2 takes the entire 90 days. Plan accordingly.

## Enforcement timeline

Penalties for non-compliance with Article 52 obligations: up to €15M or 3% of global annual turnover, whichever is higher. The first wave of enforcement is expected in late 2026 and early 2027, focused on the largest providers serving EU users. Smaller providers should expect a longer enforcement runway but should not assume indefinite tolerance.

## What to watch in 2026

The training-data summary template is the most consequential remaining specification. Watch the AI Office's publication schedule — the first draft is in consultation now, the final template will set the bar for compliance work across the industry. Providers planning major model releases in late 2026 or 2027 should be designing their documentation pipeline against the most demanding plausible interpretation of the template, not the current draft.
