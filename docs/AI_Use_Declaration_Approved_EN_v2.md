# AI Use Declaration

**AI Tools and Their Roles**

I used ChatGPT and OpenAI Codex throughout this project. ChatGPT assisted with linguistic discussions, drafting and revising parts of the Learning Report, and critical reviews of the methodology and website. Codex helped develop data extraction and validation scripts, draft the Codebook, process AI-assisted annotations, implement the interactive website, and integrate approved research content and its corresponding Traditional Chinese version. The saved annotation logs identify `gpt-6.1-sol` as the model selected through Codex CLI. Exact model revisions for all earlier AI-assisted interactions were not consistently recorded, so I do not infer them.

**My Contributions and Verification**

I determined the research topics and reviewed the analytical framework before approving the five categories, D1–D5 decision rules, and annotation protocol. I personally checked 50 randomly selected records, including their sources and English–Chinese and English–Hungarian correspondences. I also reviewed the Pilot classifications and approved five final decisions, four of which changed the original primary category. The original judgments and subsequent revisions were preserved separately.

The remaining 450 records were annotated by AI and were not independently validated by a human annotator. Their results are therefore treated as exploratory findings rather than verified translation-quality judgments.

**Examples of Effective Prompts**

One saved annotation instruction was:

*“Evaluate EN–ZH and EN–HU separately, then apply D1–D5. Use exactly the five main categories. Routine grammar and conventional idioms do not automatically create variation.”*

This helped enforce a consistent decision procedure and reduce unsupported classifications based on surface differences.

During website verification, I also directed Codex to reproduce a specific conflict between the legacy `group` parameter and the newer `phenomenonGroup` filter, then correct the inconsistent Heatmap display and add a regression test.

**An AI Error and What I Learned**

An independent audit of the Codex-built website identified a filtering bug: the selected records belonged to the Pragmatics group, but the Heatmap displayed labels from the Content group. I used the audit evidence to request a reproducible fix and subsequent testing. This demonstrated that a website can appear functional while displaying misleading analytical results.

The project taught me to treat AI as a tool for implementation and preliminary analysis, not as an independent authority on translation quality. My responsibility was to establish clear criteria, verify evidence, challenge unsupported interpretations, and document both the strengths and limitations of AI-assisted work.
