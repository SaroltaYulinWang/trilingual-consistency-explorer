# Codebook v0.2 — Final Candidate for Researcher Approval

**Project:** When Translations Disagree: A Trilingual Corpus Explorer for Semantic Consistency Auditing  
**Date:** 22 November 2026 (Asia/Shanghai)  
**Researcher approval of this codebook and new AI proposals: PENDING**

## 1. Purpose and provenance

This AI-generated final candidate consolidates v0.2 using the actual 30-record pilot, its updated evidence notes, and a quality audit and the latest specified advisor recommendations. “Final candidate” describes readiness for an approval decision, not researcher approval. The researcher reports completed human review of the updated pilot. That statement is preserved; it does not establish independent annotation, a validated gold standard, or approval of the new rules and recommendations in this document.

The fixed source is `Pilot30_Manual_Review_v0.1_Aligned-2.xlsx`, supplied in the project root on 22 November 2026. This latest fixed copy differs from the preceding online/local snapshot in one review value: TCE-0263 EN–ZH (`Pilot Review!E31`) is now aligned rather than potential divergence; the original texts, IDs and main category are unchanged. Both versions are preserved. The other available sheets are **Instructions** and **Codebook Quick Guide**. The researcher states that human review has been completed and that **AI Linguistic Review** was intentionally deleted; its absence is therefore not a blocker. No deleted content has been reconstructed or described as inspected.

The source title still identifies AI-assisted analysis. Its current labels and notes are preserved as the latest researcher-reviewed, AI-assisted record, based on the researcher's statement. This does not establish independent annotation, approval of this codebook, or approval of the new suggestions below. Earlier judgments and feedback remain historical layers, not a replacement for this updated source.

The saved local workbook is the fixed audit source. Programmatic comparison confirms that all 30 sentence triples and IDs match `data/processed/pilot_30.csv` exactly, with the latest pair-status change recorded separately from the preceding snapshot. Both review-status fields currently contain yes in all 30 rows; no current row-level mismatch is present. These recorded statuses are not altered, and the older workbook's status conflict is not attributed to this update.

English is a reference pivot, not necessarily the historical original. Each record must have an EN–ZH and an EN–HU direct link through the same English ID; these community links do not prove semantic equivalence or a direct ZH–HU relationship. Stage 1 identified 17,795 eligible English IDs and 29,694 possible triples. The random 30-record pilot informs operational rules, not category prevalence or confirmed error rates. The source CSV unit remains sentence_pair; this codebook's analytical unit is the triple with two independently evaluated alignments.

Only the five primary categories below are allowed. They are a custom research scheme, **not five official MQM categories**, a severity scale, or a complete translation-quality metric. MQM Accuracy informs the content-change test; orthographic/form observations remain separate. Scholarly foundations are listed under References; thresholds and precedence are proposed by this project.

## 2. Operational boundaries

### Core versus substantive acceptable variation

First check participant/reference, predicate and roles, polarity, quantity/scope, modality, relevant temporal relations, and speech act. Expected grammatical realization and ordinary idiomatic equivalents are compatible with Core Meaning Preserved. Word-order differences, pro-drop, Hungarian gender non-marking, singular morphology in a generic construction, ordinary reflexive constructions, or literal imagery differences do not automatically establish Variation.

Acceptable Variation requires four recorded elements: **exact trigger; dimension; non-routine meaning/communication contrast; reason the contrast is defensible**. Candidate dimensions are optional lexical specification/generalization, pragmatic emphasis/function, register, and perspective. No category is justified merely because a difference is “worth noting”. If a stable extra commitment is not established, a supported ordinary equivalent remains Core. If its acceptability is materially unresolved, use Indeterminate; if it supports a traceable possible unsupported content change, use Potential Accuracy Issue.

### Actual divergence versus uncertainty

Require English-supported readings A and B and evidence that the Chinese and Hungarian texts actually select different readings. Source ambiguity alone is insufficient. One specific target and one target remaining open to that same reading are not enough. Both bilingual alignments may be individually supported while the triple displays different selected senses. Unknown authorial intent does not prevent identifying such a split once the language evidence is sufficient.

### Accuracy suspicion versus difference

Identify the pair, exact span, possible content consequence and benign explanations considered. A preference for a better translation, unfamiliar morphology or an AI gloss is not a content concern. Potential Accuracy Issue records an evidence-based suspicion, never a proven mistranslation by default. Different licensed source readings do not automatically constitute error.

### Orthography, context and provenance

A typo is an auxiliary observation. Preserve the original text and distinguish literal readability from a hypothesized recovery. This draft proposes allowing uniquely and strongly supported recovery only when documented by a competent human; if material recovery remains uncertain, use Indeterminate. Parallel translations may corroborate, but cannot alone prove intended Chinese wording. Researcher approval of the recovery policy is PENDING.

A possible scene is not attested discourse. Explain conventional pragmatic compatibility without inventing an appointment or causal history. Missing context does not force every sentence into Indeterminate; the unknown must affect the decision. The source's recorded human-review status and this draft's approval status are separate facts.

## 3. Five primary categories

Examples below are genuine pilot records, reproduced verbatim in Section 4. Their use illustrates proposed rules, not newly approved labels. Where a positive example remains disputed, its qualification is explicit; a random pilot need not contain an uncontested instance of every category.

### 3.1 Core Meaning Preserved

**Definition:** Normal differences in grammar, wording, or common expressions between Chinese, English, and Hungarian do not count as a meaning change. As long as both translations carry the same main message and purpose, these natural differences are acceptable.

**Theoretical basis:** Meaning-focused comparison draws on [MQM Accuracy (MQM Council, n.d.)](https://www.themqm.org/mqm-pillars/typology/), and the allowance for multiple valid expressions on [Freitag et al. (2021, §1)](https://aclanthology.org/2021.tacl-1.87/). This positive category is project-specific.

**Decision rule:** Check both alignments. Permit expected grammar and idioms. Reject the category only for an evidenced material shift, a demonstrated reading split, or an uncertainty that blocks correspondence; absence of matching word forms is insufficient.

**Positive examples:** TCE-0241's conventional get-along expression; TCE-0265's proverbial equivalent; TCE-0195's night-person idioms. The updated pilot already records Core for all three.

**Negative example:** TCE-0147, if understanding and acquisition are indeed selected separately. Each pair's plausibility does not establish the same triple reading.

**Boundary case:** TCE-0217. Generic sibling-existence questions can use different number/gender expressions without a count error. Require an actual counting or both-genders context before claiming an incompatible interpretation; do not infer it from surface singular morphology.

### 3.2 Acceptable Variation

**Definition:** A noticeable, non-routine change in word choice, tone, or viewpoint can be acceptable if the main message and communicative purpose are preserved. The change just needs to make good sense for the context or fit how people naturally speak in that language.

**Theoretical basis:** [Freitag et al. (2021)](https://aclanthology.org/2021.tacl-1.87/) motivates non-unique correct expressions; [Francesch and Payrató (2024)](https://doi.org/10.1111/stul.12219) informs attention to interpretation and pragmatics. The present threshold is custom.

**Decision rule:** Supply the four elements in Section 2. Neither routine grammar nor conventional idiom substitution suffices. If a material acceptability question remains, do not conceal it by labeling the variation acceptable. Distinguish permissible specification from an actual split between two selected readings.

**Positive advisor example, PENDING:** TCE-0111 illustrates a proposed acceptable pragmatic/perspective shift from being busy to not having time. The rationale must be the conventional relation, not an invented appointment. It is not universal logical equivalence and remains subject to researcher approval.

**Additional qualified example:** TCE-0198: the updated note identifies weather specification in “狂风暴雨” relative to storm. It qualifies if this is a substantive but defensible specification. If it is merely a conventional equivalent, Core is preferable; if the added commitment cannot be justified, reconsider acceptability. This is a qualified illustration, not proof that the added weather detail is always licensed.

**Negative example:** TCE-0265: noun versus infinitive and a conventional proverb are insufficient to justify Variation. TCE-0469 similarly lacks an established non-routine shift merely because Hungarian uses magát.

**Boundary case:** TCE-0399. A shared possible scene may explain compatibility but does not establish the scene actually occurred. Retain Variation only with an explicit conventional perspective/pragmatic rationale; otherwise keep the material uncertainty visible.

### 3.3 Divergent Interpretations

**Definition:** Sometimes the English pivot sentence has more than one valid meaning. When this happens, the Chinese and Hungarian translations might pick different meanings, and both choices are reasonable.

**Theoretical basis:** [Francesch and Payrató (2024)](https://doi.org/10.1111/stul.12219) discusses interpretation selection and ambiguity preservation. This triple-level category is an application proposed here, not an official MQM error.

**Decision rule:** Identify A/B, English evidence for both, target triggers selecting each, and the substantive distinction. Do not assign merely because the source is ambiguous. A separate traceable accuracy concern has reporting precedence, with the reading split retained as an auxiliary observation.

**Positive working example:** TCE-0147: “不明白” selects understanding and megszerezni is read as acquisition; English get supports both senses ([Cambridge University Press, n.d.](https://dictionary.cambridge.org/us/dictionary/learner-english/get)). The current category and note are mutually coherent if the Hungarian analysis is sound. This audit is not an independent verification of that linguistic judgment.

**Negative example:** TCE-0484: “离开” versus an open-direction mennék does not demonstrate a second different selected reading.

**Boundary case:** TCE-0257: 免費 and ingyenes select the same price reading. Loss of a possible freedom-related association may motivate a separate variation question, but cannot establish target-to-target divergence. TCE-0399 also requires distinguishing a real reading split from compatible implications.

### 3.4 Potential Accuracy Issue

**Definition:** You might suspect an issue when a specific part of a translation seems to add, drop, or change a meaning supported by the English pivot without a good reason. However, this is just a warning sign to double-check, not proof of a definite mistake.

**Theoretical basis:** [MQM Accuracy (MQM Council, n.d.)](https://www.themqm.org/mqm-pillars/typology/) motivates examination of distortion, addition and omission. This provisional category is not equivalent to a confirmed MQM annotation or severity rating.

**Decision rule:** Quote the trigger, identify the affected semantic relation, and consider ordinary equivalence, licensed readings and rhetorical explanations. Unfamiliarity, an allegedly better alternative or a typo alone fails the content-evidence test.

**Positive example of suspicion:** TCE-0030: “唯……能” and “聖者” plausibly restrict who can forgive, while the English evaluates forgiving as divine. Rhetorical equivalence remains a possible explanation; no proven error is claimed.

**Negative example:** TCE-0241: a natural get-along counterpart is not inaccurate merely because another Hungarian phrasing might be preferred. The updated note supplies an equivalence rationale.

**Boundary case:** TCE-0263. The current category is an accuracy issue, but the note argues recoverable communicative meaning and identifies a possible character problem. Require an additional content consequence; otherwise use a separate orthographic observation with Core after justified recovery, or Indeterminate while recovery/policy remains unresolved.

### 3.5 Indeterminate

**Definition:** You cannot make a reliable classification when important context or other evidence needed to interpret the sentences is missing. This label simply means there is not enough information to judge, not that the translations are wrong.

**Theoretical basis:** [Freitag et al. (2021)](https://aclanthology.org/2021.tacl-1.87/) informs attention to expertise and context; [Francesch and Payrató (2024)](https://doi.org/10.1111/stul.12219) informs interpretive caution. The explicit unresolved category is custom.

**Decision rule:** State the blocking question, why it affects the category, and what evidence or researcher policy would resolve it. Not-yet-assessed remains blank. Local uncertainty does not erase a separate well-supported accuracy suspicion. Unknown authorial intent alone does not preclude an otherwise established reading split.

**Positive example:** TCE-0484, currently Indeterminate: departure specification is identifiable, but a different Hungarian reading or unsupported Chinese commitment has not been demonstrated. Context or a supported lexical/pragmatic argument may resolve it.

**Negative example:** TCE-0265: a conventional proverb does not become unresolved merely because no surrounding discourse is supplied.

**Boundary case:** TCE-0399 and TCE-0111: distinguish conventional pragmatic compatibility from an invented scenario. A reasoned linguistic relation may support Variation; material unresolvable acceptability should remain Indeterminate. The latest advisor proposal retains Indeterminate for TCE-0399 but recommends Acceptable Variation for TCE-0111, based on a conventional busyness-to-availability reformulation rather than evidence of a particular appointment. Both remain PENDING. A researcher who cannot support that conventional relation may retain an unresolved judgment; no category is forced by the example.

## 4. Authentic pilot examples and current judgments

The following are exact source texts. Analytical notes are not replacement translations. Current category, alignment and evidence fields are retained in the local snapshot and located by the workbook cells below. All new recommendations remain PENDING.

### 4.1 TCE-0147

**TCE-0147** — eng_id=265907; cmn_id=340435; hun_id=4389630.

EN:

```text
I couldn't get it.
```

ZH:

```text
我不明白。
```

HU:

```text
Nem tudtam megszerezni.
```

**Current workbook judgment:** Divergent Interpretations; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E4:K4`).

**Exact existing evidence note:**

> get it 可指理解，也可指取得。中文“不明白”选理解义；匈语 megszerezni 指取得某物。两种读法都有英文依据。中文未明示过去时间，单凭这一点不足以判错。

**New audit observation:** “不明白” selects understanding; megszerezni is read as acquisition. Both pairs may be licensed despite different selected senses.

**Uncertainty / decision needed:** Confirm Hungarian sense and English get senses; intended source sense need not be recovered to establish a split.

**New recommendation:** Divergent Interpretations. **Approval status: PENDING.**

### 4.2 TCE-0198

**TCE-0198** — eng_id=325281; cmn_id=602898; hun_id=4580858.

EN:

```text
The storm prevented her from arriving on time.
```

ZH:

```text
狂风暴雨造成她无法准时抵达。
```

HU:

```text
A vihar megakadályozta, hogy időben érkezzen.
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E5:K5`).

**Exact existing evidence note:**

> prevented 与 megakadályozta 都明确表示阻止；“造成她无法”从结果表达同一因果关系。“狂风暴雨”使 storm 的描写更具体。匈语从句省略主语，也没有标示性别。

**New audit observation:** “狂风暴雨” specifies storm; caused inability preserves prevention. Hungarian gender non-marking is routine, not a substantive shift.

**Uncertainty / decision needed:** Retain provisionally only if weather specification is conventional/compatible; otherwise Core or unresolved acceptability must be reconsidered.

**New recommendation:** Acceptable Variation. **Approval status: PENDING.**

### 4.3 TCE-0241

**TCE-0241** — eng_id=530804; cmn_id=881908; hun_id=4855026.

EN:

```text
I get along with my younger brother.
```

ZH:

```text
我與我的弟弟相處融洽。
```

HU:

```text
Öcsémmel jól megértjük egymást.
```

**Current workbook judgment:** Core Meaning Preserved; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E10:K10`).

**Exact existing evidence note:**

> get along with、相處融洽和 jól megértjük egymást 都可描述两个人合得来。öcsémmel 保留“与我的弟弟”这一关系；egymást 的相互义与双方相处融洽相容。

**New audit observation:** get along / 相處融洽 / jól megértjük egymást are treated in the note as conventional interpersonal equivalents.

**Uncertainty / decision needed:** Reciprocal egymást alone is not a substantive perspective shift or evidence of a mistranslation; retain the current rationale.

**New recommendation:** Core Meaning Preserved. **Approval status: PENDING.**

### 4.4 TCE-0217

**TCE-0217** — eng_id=434566; cmn_id=556668; hun_id=3459738.

EN:

```text
Do you have brothers and sisters?
```

ZH:

```text
你有沒有兄弟姊妹？
```

HU:

```text
Van testvéred?
```

**Current workbook judgment:** Core Meaning Preserved; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E25:K25`).

**Exact existing evidence note:**

> 在一般家庭情况问句中，brothers and sisters、兄弟姊妹和 testvér 都涵盖任何性别的手足。Van testvéred? 与英文一样，问的是有没有兄弟姐妹。

**New audit observation:** The note supports a generic sibling-existence question for brothers and sisters / 兄弟姊妹 / testvéred.

**Uncertainty / decision needed:** Do not infer one-sibling restriction from singular morphology alone. Reopen only if an actual both-genders or counting context is supplied.

**New recommendation:** Core Meaning Preserved. **Approval status: PENDING.**

### 4.5 TCE-0265

**TCE-0265** — eng_id=762939; cmn_id=762937; hun_id=2238355.

EN:

```text
Silence is golden.
```

ZH:

```text
沉默是金。
```

HU:

```text
Hallgatni arany.
```

**Current workbook judgment:** Core Meaning Preserved; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E28:K28`).

**Exact existing evidence note:**

> Silence is golden、沉默是金和 Hallgatni arany 都用金比喻保持沉默的价值。匈语用不定式 hallgatni 表达这一行为，格言的寓意及功能一致。

**New audit observation:** Silence is golden / 沉默是金 / Hallgatni arany are conventional proverbial equivalents.

**Uncertainty / decision needed:** Hungarian infinitive versus English noun is routine realization, not substantive Variation.

**New recommendation:** Core Meaning Preserved. **Approval status: PENDING.**

### 4.6 TCE-0030

**TCE-0030** — eng_id=20868; cmn_id=806234; hun_id=5909070.

EN:

```text
To err is human, to forgive divine.
```

ZH:

```text
人皆有錯，唯聖者能恕。
```

HU:

```text
Tévedni emberi dolog, megbocsátani isteni.
```

**Current workbook judgment:** Potential Accuracy Issue; EN–ZH=potential divergence; EN–HU=aligned (`Pilot Review!E26:K26`).

**Exact existing evidence note:**

> divine 把宽恕这一行为形容为神圣；“唯聖者能恕”用“唯……能”限定有能力宽恕的人，加入排他判断。匈语 megbocsátani isteni 保留对宽恕行为的评价。

**New audit observation:** 唯……能 and 聖者 support a traceable restriction on who can forgive, unlike evaluation of forgiveness as divine.

**Uncertainty / decision needed:** Retain as a suspicion, not a proven error; a conventional rhetorical-equivalence explanation still requires consideration.

**New recommendation:** Potential Accuracy Issue. **Approval status: PENDING.**

### 4.7 TCE-0399

**TCE-0399** — eng_id=3267782; cmn_id=10019600; hun_id=3267854.

EN:

```text
We are on our own.
```

ZH:

```text
我们得依靠自己。
```

HU:

```text
Magunkra maradtunk.
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E27:K27`).

**Exact existing evidence note:**

> We are on our own 可以描述眼下无人帮忙。“我们得依靠自己”突出这一处境的后果；Magunkra maradtunk（只剩我们自己了）突出如何落到这一处境。同一场景足以解释两句，侧重点有别。

**New audit observation:** 依靠自己 foregrounds self-reliance; Magunkra maradtunk is read as remaining/being left alone.

**Uncertainty / decision needed:** Change proposed: the note supplies a possible common scene, not attested context. Verify conventional compatibility and event/result implications; Variation may be retained if justified.

**New recommendation:** Indeterminate. **Approval status: PENDING.**

### 4.8 TCE-0484

**TCE-0484** — eng_id=7803396; cmn_id=3579845; hun_id=3984404.

EN:

```text
I'd very much like to go.
```

ZH:

```text
我非常想离开。
```

HU:

```text
Nagyon szívesen mennék.
```

**Current workbook judgment:** Indeterminate; EN–ZH=uncertain; EN–HU=aligned (`Pilot Review!E24:K24`).

**Exact existing evidence note:**

> go 既可指前往某处，也可在告辞时指离开。中文“离开”选定后一义，匈语 mennék 保持方向开放。需要上文说明说话人是在谈赴约还是告辞，才能判断英中是否对齐。

**New audit observation:** 离开 selects departure; mennék remains directionally open according to the note.

**Uncertainty / decision needed:** Retain unresolved status. One narrow and one open target do not prove two different selected readings; neither missing context nor specification alone proves error.

**New recommendation:** Indeterminate. **Approval status: PENDING.**

### 4.9 TCE-0263

**TCE-0263** — eng_id=749202; cmn_id=1176909; hun_id=10043647.

EN:

```text
Speak slower, please.
```

ZH:

```text
請滿點說。
```

HU:

```text
Beszéljen lassabban, kérem!
```

**Current workbook judgment:** Potential Accuracy Issue; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E31:K31`).

**Exact existing evidence note:**

> Orthographic Issue（疑似错字）：中文原文“請滿點說”中的“滿”疑为“慢”。在“請…點說”的请求句式中，结合 slower 和 lassabban，可明确恢复“请把语速放慢”的意图。主类别按可恢复的交际意义判定，原字保留供复核。

**Latest-source change:** EN–ZH is now aligned in E31; this does not itself resolve whether a separate content concern supports the retained main category.

**New audit observation:** G labels an accuracy issue, but K says the communicative intention is recoverable; H identifies a suspected character problem in 滿.

**Uncertainty / decision needed:** Change proposed pending a recovery-policy decision. Core plus typo may follow a justified recovery; a semantic accuracy suspicion requires an independently explained content consequence.

**New recommendation:** Indeterminate. **Approval status: PENDING.**

### 4.10 TCE-0195

**TCE-0195** — eng_id=321972; cmn_id=825924; hun_id=2181864.

EN:

```text
I'm a night owl.
```

ZH:

```text
我是個夜貓子。
```

HU:

```text
Éjjeli bagoly vagyok.
```

**Current workbook judgment:** Core Meaning Preserved; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E33:K33`).

**Exact existing evidence note:**

> night owl、“夜貓子”和 éjjeli bagoly 都是指习惯晚睡或夜间活跃者的常规说法；中文惯用动物意象不同，但没有额外改变评价或作息含义。

**New audit observation:** night owl / 夜貓子 / éjjeli bagoly are conventional night-person idioms.

**Uncertainty / decision needed:** Different literal animals do not establish a register, evaluative, or perspective shift.

**New recommendation:** Core Meaning Preserved. **Approval status: PENDING.**

### 4.11 TCE-0469

**TCE-0469** — eng_id=6670799; cmn_id=13175375; hun_id=13226439.

EN:

```text
Windows is updating.
```

ZH:

```text
Windows 正在更新。
```

HU:

```text
Frissíti magát a Windows.
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E13:K13`).

**Exact existing evidence note:**

> “正在更新”明示进行中。Frissíti magát a Windows 用 magát（自身）明确更新对象，读作 Windows 正在更新自己；这是英语软件状态提示的自然读法。

**New audit observation:** Frissíti magát uses a reflexive construction for the Windows update state; the note itself calls it a natural software reading.

**Uncertainty / decision needed:** Change proposed: explicit reflexive syntax alone does not establish a non-routine perspective shift. Retain Variation only with additional semantic/pragmatic evidence.

**New recommendation:** Core Meaning Preserved. **Approval status: PENDING.**

### 4.12 TCE-0257

**TCE-0257** — eng_id=684119; cmn_id=12364643; hun_id=7010650.

EN:

```text
Software is like sex: it's better when it's free.
```

ZH:

```text
軟件就像性交一樣，免費的更好。
```

HU:

```text
A szoftver olyan, mint a szex: jobb, amikor ingyenes.
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E8:K8`).

**Exact existing evidence note:**

> free 用于软件时可让人联想到免费或使用自由；与 sex 类比使价格义尤其突出。“免費”和 ingyenes 都选价格义，保留了类比和笑点，但缩小了 free 的联想空间。

**New audit observation:** 免費 and ingyenes both select price-related free; they do not select different readings from each other.

**Uncertainty / decision needed:** Loss of a freedom-related association is plausible but not automatically substantive; Core remains possible if the pun/association is not active. Register must be separately evidenced.

**New recommendation:** Acceptable Variation. **Approval status: PENDING.**

### 4.13 TCE-0111

**TCE-0111** — eng_id=242977; cmn_id=8215733; hun_id=4748542.

EN:

```text
I am busy today.
```

ZH:

```text
我今天忙。
```

HU:

```text
Ma nem érek rá.
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E29:K29`).

**Exact existing evidence note:**

> “今天忙”直接描述忙碌状态；Ma nem érek rá 说的是“我今天抽不出空”。在说明当天能否赴约时两者功能相同，但匈语突出可用时间，未交代忙于何事。

**New audit observation:** 忙 describes busyness; nem érek rá is read as unavailability. The note invokes ability to attend an appointment.

**Uncertainty / decision needed:** The latest advisor recommendation is Acceptable Variation: busyness is reformulated as lack of availability. This relies on a conventional pragmatic relation; the appointment mentioned in the existing note is an illustration, not attested context. The earlier audit recommended Indeterminate and is retained unchanged in the historical record. Approval of the new recommendation remains PENDING.

**Latest advisor recommendation:** Acceptable Variation. **Approval status: PENDING.**

### 4.14 TCE-0481

**TCE-0481** — eng_id=7785090; cmn_id=2052246; hun_id=12755960.

EN:

```text
Grab the thief!
```

ZH:

```text
抓贼啊！
```

HU:

```text
Elkapni a tolvajt!
```

**Current workbook judgment:** Acceptable Variation; EN–ZH=aligned; EN–HU=aligned (`Pilot Review!E21:K21`).

**Exact existing evidence note:**

> “抓贼啊”用句末“啊”发出急呼。Elkapni a tolvajt! 用不定式充当简短命令，语气生硬而急切；三句都要求即时抓住小偷。

**Latest advisor recommendation:** Indeterminate, PENDING. Determine whether the infinitive is a conventional directive and whether the claimed abruptness is a substantive force/register change rather than normal realization. Core or Variation may be justified after assessment; the unverified register assertion must not itself decide the category.

## 5. Advisor recommendations awaiting researcher decisions

The five recommendations below are submitted for approval; none replaces the original human-reviewed workbook. The user instruction to present them is not itself approval. Historical draft recommendations remain intact.

| Record | Original reviewed category | Latest advisor recommendation | Auxiliary observation | Researcher decision |
| --- | --- | --- | --- | --- |
| TCE-0469 | Acceptable Variation | Core Meaning Preserved | Routine reflexive realization, unless a substantive contrast is evidenced | PENDING |
| TCE-0481 | Acceptable Variation | Indeterminate | Directive/infinitive and register question | PENDING |
| TCE-0399 | Acceptable Variation | Indeterminate | Self-reliance versus remaining alone; context/compatibility question | PENDING |
| TCE-0111 | Acceptable Variation | Acceptable Variation | Conventional busyness-to-availability pragmatic/perspective shift | PENDING |
| TCE-0263 | Potential Accuracy Issue | Indeterminate | suspected_typo | PENDING |

**TCE-0263 alternative:** **Core Meaning Preserved + suspected_typo** may be used only if the researcher formally accepts a justified typo-recovery rule and records why recovery is strongly supported in this case. Preserve “請滿點說。” exactly, distinguish the observed “滿” from the proposed character “慢”, and retain the orthographic observation even if the main category changes. Acceptance of a general policy does not automatically approve this record's recovered interpretation. If recovery remains material and unresolved, retain Indeterminate + suspected_typo. A genuine independently supported content concern can still warrant Potential Accuracy Issue; spelling alone cannot.

## 6. Authoritative decision sequence

Record EN–ZH and EN–HU separately first. “Separately” does not assert independent annotators or blind review. The following tree agrees with the definitions and is not a severity ranking.

```text
Not yet assessed: keep main category blank (not a sixth category).
After both pair evaluations have been attempted:
D1. Specific traceable possible unsupported content change in either pair?
    Yes: Potential Accuracy Issue; retain other phenomena and local uncertainty.
D2. Otherwise, a material unresolved reading/acceptability/recovery question?
    Yes: Indeterminate; state what blocks a decision and what would resolve it.
D3. Otherwise, English-supported different readings actually selected by targets?
    Yes: Divergent Interpretations; ambiguity or narrow/open wording alone is insufficient.
D4. Otherwise, supported central correspondence plus evidenced substantive acceptable shift?
    Yes: Acceptable Variation; name dimension, trigger, contrast and acceptability reason.
D5. Otherwise, supported same central reading/function with routine differences only?
    Yes: Core Meaning Preserved. If correspondence is not established: Indeterminate.
```

A traceable suspicion does not require a proven error, but it must survive routine-equivalence and licensed-reading explanations. A separate unresolved feature does not erase that concern. A material uncertainty prevents an unqualified positive judgment when no such concern is established. Preserve multiple phenomena in auxiliary fields while selecting exactly one main category.

Use the final-candidate protocol (internal historical methodology document; not a public download) for the fields and operational contract; the original protocol and audit remain historical inputs. The latest recommendations in Section 5 supersede earlier advice only as pending proposals, not as adopted researcher decisions. In particular, TCE-0111's earlier Indeterminate recommendation is not silently rewritten in the original audit.

The approval checklist (internal approval record; not a public download) separates codebook approval, individual pilot decisions, the recovery policy and authorization to begin AI-assisted annotation. The [revision log](codebook_revision_log_v0.2.md) identifies previous rules, evidence and pending changes. The [publication summary](codebook_v0.2_public_summary.md) is available as a current approved summary. The earlier pre-publication status belongs to this document’s development history and is superseded by the final approval entry below.

The staged pipeline preserves all 30 original pilot judgments and records any explicit approved researcher changes as separate overlays. Only the remaining 470 may receive new AI-only annotations after the approval gate is satisfied. All such annotations remain human_checked=no. Programmatic validation checks structure, original evidence spans and decision-tree consistency, not semantic truth or inter-annotator reliability. No classification has been executed for this candidate.

## References

All sources below were consulted on 22 November 2026. They motivate the approach; none validates this five-category scheme or these pilot judgments. Bibliographic metadata and retrieval dates were standardized after verification on 23 November 2026; the export snapshot remains 22 November 2026 UTC.

Cambridge University Press. (n.d.). Get. In *Cambridge learner’s dictionary*. Retrieved November 23, 2026, from [https://dictionary.cambridge.org/us/dictionary/learner-english/get](https://dictionary.cambridge.org/us/dictionary/learner-english/get)

Senses OBTAIN and UNDERSTAND. This is lexical evidence for the English pivot in TCE-0147, not independent validation of its Hungarian text. The entry was checked through available indexed publisher content; direct opening returned HTTP 403 during this revision.

Creative Commons. (n.d.). *Attribution 2.0 France (CC BY 2.0 FR)*. [https://creativecommons.org/licenses/by/2.0/fr/](https://creativecommons.org/licenses/by/2.0/fr/)

Francesch, P., & Payrató, L. (2024). Pragmatic ambiguity, implicatures, and translation. *Studia Linguistica*, *78*(1), 156–185. [https://doi.org/10.1111/stul.12219](https://doi.org/10.1111/stul.12219)

The abstract and Section 1 discuss ambiguity and the selection or preservation of interpretations. This supports attention to context and reading selection, not treating all lexical differences as pragmatic ambiguity.

First published online November 29, 2023.

Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. *Transactions of the Association for Computational Linguistics*, *9*, 1460–1474. [https://doi.org/10.1162/tacl_a_00437](https://doi.org/10.1162/tacl_a_00437)

Section 1 notes that valid translations are not unique; the study uses explicit error analysis by professional translators with document context. Its MT evaluation setting is not evidence that Tatoeba sentences are machine-generated.

MQM Council. (n.d.). *The MQM error typology*. Retrieved November 23, 2026, from [https://www.themqm.org/mqm-pillars/typology/](https://www.themqm.org/mqm-pillars/typology/)

Especially the Accuracy and Linguistic conventions definitions. Accuracy concerns distortion, addition, or omission of propositional content; linguistic form has a separate dimension. The present five primary categories, their precedence rules, and the label “Potential Accuracy Issue” are project-specific, not official MQM categories. This study does not calculate MQM scores or severity weights.

Tatoeba. (n.d.). *Download sentences*. Retrieved November 23, 2026, from [https://tatoeba.org/en/downloads](https://tatoeba.org/en/downloads)

## Text attribution

Sentence texts are by **Tatoeba contributors**, from official exports retrieved on 22 November 2026 UTC, under [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/). IDs identify the sentence pages; live pages may differ from the saved snapshot. See README and `data/metadata/source_manifest.json` for provenance. Original spelling, punctuation, case and script are unchanged in the quoted examples.

## 7. Researcher decision overlay — 22 November 2026

This later entry supersedes earlier PENDING statuses only for the four record decisions explicitly adopted by the researcher: TCE-0469 Core Meaning Preserved; TCE-0481 Indeterminate; TCE-0399 Indeterminate; TCE-0111 Acceptable Variation. Original workbook judgments and earlier advice above are retained as history.

The researcher favors TCE-0263 Core Meaning Preserved + suspected_typo conditionally on justified recovery. The case-specific AI assessment (internal historical advice; not a public download) supports that interpretation as a strong hypothesis, without proving the contributor’s intent. It is recorded as CONDITIONAL; general recovery-policy and codebook-wide approval are not inferred. Indeterminate is not a permanent outcome when the scoped recovery rule and its application are accepted.

See the current approval checklist (internal approval record; not a public download) and decision overlay in reviews/researcher_decisions_v0.2_2026-11-22.json. Full-classification authorization remains not given.

## Researcher approval and 50-review integration — 22 November 2026

The researcher explicitly approves the five-category framework, D1–D5, annotation protocol and justified typo-recovery policy in the project chat. All five record decisions are now APPROVED: TCE-0469 Core Meaning Preserved; TCE-0481 Indeterminate; TCE-0399 Indeterminate; TCE-0111 Acceptable Variation; TCE-0263 Core Meaning Preserved with suspected_typo. Earlier PENDING/CONDITIONAL statements above are retained as historical stages, superseded by this dated approval entry. For TCE-0263 the original text is 請滿點說。 and the separate proposed recovery is 請慢點說; neither the original workbook nor source corpus is corrected.

The completed human-review set is 30 original pilot plus 20 supplemental seed-2040 records, without overlap. Preserve all 50 source judgments and yes flags; apply the five approved pilot decisions only as separate overlays. There are exactly 450 AI-only records. Execution is authorized for a 20-record dry run followed by manageable batches only if validation passes. This approval does not mark new AI outputs human-reviewed or create an independent annotation-agreement result. The structured approval evidence and preceding versions are preserved.
