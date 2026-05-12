---
title: "EU AI Act Article 50: Transparency Obligations for AI Deployers and Providers"
description: "Article 50 imposes disclosure obligations on anyone deploying chatbots, generating synthetic content, or running emotion-recognition systems. Here's what counts and what doesn't."
pubDate: 2026-05-08
author: "Hannah Linden"
tags: ["eu-ai-act", "article-50", "transparency", "compliance", "synthetic-content"]
category: "policy"
sources:
  - title: "EU AI Act — Article 50"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
  - title: "AI Office FAQ on Article 50"
    url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office"
  - title: "EDPB Statement on AI Models and GDPR"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en"
schema:
  type: "Article"
heroImage: https://aisec-imagegen.th3gptoperator.workers.dev/featured/aiprivacy.report/ai-act-article-50-transparency-obligations.png
heroAlt: "EU AI Act Article 50 transparency obligations diagram"
---

Article 50 of the EU AI Act is the practical compliance focal point for most organizations deploying AI systems that aren't otherwise high-risk. It applies to chatbots, synthetic-content generators, emotion-recognition systems, biometric categorization, and deepfake generators. The obligations look light on the surface and have considerable operational weight on closer reading. This post is the working framework.

## The four obligations, mapped to AI system types

Article 50 imposes distinct obligations on four categories of AI system. Each obligation has both a provider and a deployer dimension.

### Obligation 1: Chatbots and conversational AI

Article 50(1) requires providers of AI systems intended to interact directly with natural persons to ensure that those persons are informed they are interacting with an AI system, unless this is obvious from the circumstances or the system is authorized by law for the prevention of criminal offenses.

Operational implications:

- First-contact disclosure is required when the system is a chatbot, voice agent, or any text-based AI that an end user interacts with.
- The disclosure must be **before** the substantive interaction, not buried in terms or footers.
- "Unless obvious" is read narrowly — a customer service chat widget on a corporate website is not "obviously" AI to most users; that the user might guess does not exhaust the obligation.

The "authorized by law" carve-out is narrow and primarily covers law-enforcement use.

### Obligation 2: Synthetic content generation

Article 50(2) requires providers of AI systems generating synthetic audio, image, video, or text content to mark outputs as artificially generated or manipulated in a machine-readable format. Deployers of such systems generating deepfakes have additional disclosure obligations under 50(4).

Operational implications:

- Outputs must carry a machine-readable marker — watermark, signed metadata, or equivalent.
- The marker must be robust against routine modification (compression, format conversion).
- The standard is "interoperable" — multiple providers' systems must be capable of reading each other's markers.
- C2PA and similar specifications are the working interoperability target, although the AI Office has not formally designated a standard as of mid-2026.

The marker requirement applies to the provider. The deployer obligations under 50(4) layer on top — when a deployer uses a generator to produce deepfakes that constitute artistic, creative, satirical, fictional or analogous works, the deployer must disclose the artificial origin in a way that does not hamper the display or enjoyment of the work.

### Obligation 3: Emotion recognition and biometric categorization

Article 50(3) requires deployers of emotion-recognition systems and biometric-categorization systems to inform the natural persons exposed to them about the system's operation and to process the personal data in accordance with GDPR.

Operational implications:

- The disclosure must reach persons being categorized, not only persons who explicitly interact.
- "Exposed to" includes passive exposure (CCTV with biometric analysis, voice analysis during phone calls).
- The disclosure is in addition to GDPR transparency requirements; both apply.

### Obligation 4: Deepfake disclosure (deployer obligation)

Article 50(4) requires deployers generating or manipulating image, audio, or video that constitutes a deepfake to disclose that the content has been artificially generated or manipulated.

Operational implications:

- Applies to anyone using a generator commercially or in a public context, not just the generator's provider.
- Exception for evidently artistic, creative, satirical, fictional or analogous works — disclosure must still happen but in a way that doesn't hamper the work.
- Exception for content forming part of an evidently artistic, creative, satirical, fictional or analogous work, where the disclosure should not exceed what is necessary for the user's right to information.

## What counts as "informed"

The AI Office's draft guidance and member-state DPA practice has converged on several requirements:

1. **Timing**: disclosure before the interaction begins (chatbots), before the content is presented (synthetic media), or before the categorization affects the person (emotion recognition).
2. **Clarity**: language understandable to the average person in the relevant audience. Technical jargon does not satisfy.
3. **Persistence**: the disclosure should remain available for review, not just appear once.
4. **Accessibility**: the disclosure must satisfy accessibility requirements where applicable.

A pop-up that the user dismisses without reading is not "informed." A footer with a link to an [AI policy](https://neuralwatch.org/) is not "informed." A welcome message that says "Hi, I'm an AI assistant" before the user types is.

## The machine-readability requirement in practice

For synthetic-content generation, machine-readable marking has emerged as the most technically demanding obligation. The standards landscape:

- **C2PA Content Credentials**: cryptographically signed metadata embedded in image/video files. Major model providers and content platforms have adopted.
- **SynthID (Google DeepMind)**: a perceptual watermark in images and text. Not yet broadly interoperable.
- **Hidden watermarks in audio** (e.g., AudioSeal, WavMark): various academic proposals, limited production adoption.
- **Provenance metadata in EXIF/IPTC**: insufficient on its own; trivially stripped.

Operational pattern for compliance:

1. Implement at least one robust machine-readable marker at the point of generation.
2. Document the standard used.
3. Maintain a public reference allowing third parties to verify markers.
4. Track interoperability standards as they evolve; expect AI Office designation in 2026-2027.

## Deployer responsibilities most often missed

Several Article 50 obligations apply to deployers rather than providers, and these are most often missed:

- **Chatbot disclosure** when a deployer integrates a third-party model into their own product. The deployer is responsible for the user-facing disclosure, not the underlying provider.
- **Deepfake disclosure under 50(4)** for any content shared in commercial or public contexts.
- **Emotion-recognition disclosure** when integrating biometric analysis into deployed systems.

A common compliance mistake: assuming the provider's terms cover the deployer's obligations. They do not. Deployer obligations attach to the act of deployment.

## Sanctions and enforcement

Article 99 imposes administrative fines for non-compliance with Article 50:

- Up to €15M or 3% of global annual turnover for general non-compliance (whichever is higher).
- Up to €7.5M or 1% for failure to provide accurate information to authorities.

Member-state market-surveillance authorities are responsible for enforcement, with the AI Office coordinating for general-purpose AI systems. Enforcement priorities for 2026-2027 emphasize transparency obligations as a leading area for early actions.

## Practical compliance checklist

For an organization deploying any of the in-scope AI systems:

1. **Inventory**: enumerate every chatbot, generator, emotion-recognition, or biometric system.
2. **Classify**: identify which Article 50 obligations attach (provider, deployer, or both).
3. **Implement disclosure**: design and deploy first-contact disclosures for chatbots and machine-readable markers for synthetic content.
4. **Document**: maintain a compliance register documenting which obligations apply, what controls are in place, and what evidence of compliance exists.
5. **Audit**: include Article 50 compliance in internal audit cycles.
6. **Monitor**: track AI Office guidance, interoperability standards, and enforcement actions.

## Cross-references

For the Article 52 obligations on general-purpose AI models that operate above Article 50, see [the Article 52 disclosure checklist](/posts/eu-ai-act-article-52-disclosure-checklist/). For the GDPR overlay on chatbot interactions (lawful basis, transparency, automated decision-making), see [GDPR Article 22 and LLM-driven decisions](/posts/gdpr-article-22-llm-automated-decision-making/). For the engineering controls that make consistent disclosure tractable across deployments, [mlobserve.com's observability patterns](https://mlobserve.com/posts/end-to-end-tracing-llm-applications/) cover the relevant infrastructure layer.

## The shape of the obligation

Article 50 is the EU AI Act's bridge to ordinary users. It's the regulation that ensures the typical European interacting with AI in commerce, media, or public services knows they are doing so. The technical lift is modest. The institutional lift — making sure every deployment in an organization implements the disclosures — is where the work actually is.
