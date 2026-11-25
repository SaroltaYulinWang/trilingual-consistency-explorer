// Editorial translations and research summaries; corpus sentences are loaded unchanged from the derived data file.
// Definitions summarize the approved v0.2 framework; independent linguistic validation is not claimed.
const bi = (en, zh) => ({ en, zh });

export const categories = [
  {
    id: 'Core Meaning Preserved',
    label: bi('Core Meaning Preserved', '核心意義保留'),
    short: bi('Same central meaning', '保留同一核心意思'),
    definition: bi('Normal differences in grammar, wording, or common expressions between Chinese, English, and Hungarian do not count as a meaning change. As long as both translations carry the same main message and purpose, these natural differences are acceptable.', '中文、英語和匈牙利語之間正常的語法、措辭或慣用表達差異，不算作意義變化。只要兩個譯文傳達相同的主要訊息和目的，這些自然差異便可接受。'),
    theory: bi('MQM Accuracy directs attention to propositional content (MQM Council, n.d.); the recognition of multiple valid translations follows the methodological discussion in Freitag et al. (Freitag et al., 2021). This positive category is project-specific.', 'MQM 的 Accuracy 維度關注意義內容 (MQM Council, n.d.)；容許多種合理表達的原則參考 Freitag 等人的方法論討論 (Freitag et al., 2021)。此正向類別由本研究自訂。'),
    rule: bi('Check participants, event relations, negation, scope, modality and relevant temporal relations in both pairs. Do not infer disagreement from ordinary morphology, word order, subject omission or different literal idiom imagery.', '分別檢查兩組的參與實體、事件關係、否定、範圍、情態及相關時間關係。不可僅憑詞形、詞序、主語省略或習語的字面意象不同，便推斷意義不一致。'),
    positive: { id: 'TCE-0241', explanation: bi('The updated human review treats get-along expressions as conventional interpersonal equivalents. Reciprocal wording in Hungarian is not by itself a substantive perspective shift.', '更新後的人工記錄將三種「相處融洽」表達視為慣常對應；匈牙利語的相互義結構本身不足以構成實質視角變化。') },
    negative: { id: 'TCE-0147', explanation: bi('Understanding and acquisition are different selected readings. Separate plausibility against English does not establish one shared reading across the triple.', '理解與取得是兩個實際選取的不同讀法。兩句各自可與英語對應，並不等於三句選取同一讀法。') },
    boundary: { id: 'TCE-0217', explanation: bi('A generic sibling-existence question need not preserve surface plural morphology. The approved interpretation is Core; a counting or both-genders context would be needed to establish a material conflict.', '一般詢問有沒有手足的問句，不必保留相同的表面複數形式。此條保留為核心意義一致；若要主張數量或性別範圍衝突，須有實際語境支持。') },
  },
  {
    id: 'Acceptable Variation',
    label: bi('Acceptable Variation', '可接受變化'),
    short: bi('A defensible substantive shift', '有依據的實質變化'),
    definition: bi('A noticeable, non-routine change in word choice, tone, or viewpoint can be acceptable if the main message and communicative purpose are preserved. The change just needs to make good sense for the context or fit how people naturally speak in that language.', '只要主要訊息和交際目的得以保留，詞語選擇、語氣或觀點上明顯而非例行的變化也可以接受。這種變化只需在語境中合理，或符合該語言自然的表達方式。'),
    theory: bi('Multiple valid expressions are a premise of translation evaluation (Freitag et al., 2021). Attention to interpretation and pragmatic conventions is informed by Francesch and Payrató (2024). The category and threshold are custom.', '翻譯評估承認合理表達並非唯一 (Freitag et al., 2021)；對解讀和語用慣例的關注參考 Francesch 與 Payrató (2024)。本類及其門檻均由本研究自訂。'),
    rule: bi('Name the exact trigger, dimension, non-routine contrast and reason it is acceptable. Routine grammar or ordinary idiom substitution is insufficient; material unresolved acceptability belongs under Indeterminate.', '記錄具體片段、變化維度、非例行差異及可接受的理由。正常語法或普通習語替換不足以構成本類；若可接受性仍有關鍵疑問，應保留為無法判定。'),
    positive: { id: 'TCE-0111', explanation: bi('The researcher approved the conventional pragmatic shift from busyness to unavailability. This is a defensible relation, not universal logical equivalence or evidence of an actual appointment.', '研究者批准將「忙碌」轉為「沒有空」視作可解釋的慣常語用變化；這不是普遍邏輯等值，也不證明原句有某個赴約語境。') },
    negative: { id: 'TCE-0265', explanation: bi('The proverb has conventional counterparts. Hungarian infinitive versus English noun does not by itself justify substantive variation.', '三種語言有慣用的格言對應。匈牙利語不定式與英語名詞的差別，本身不足以支持實質變化。') },
    boundary: { id: 'TCE-0399', explanation: bi('Self-reliance and remaining alone may be compatible, but an imagined shared situation is not attested context. The researcher retained Indeterminate because the relation between those readings requires more context.', '依靠自己與只剩自己可能相容，但假設中的共同場景不是已知語境。研究者認為兩者關係仍需更多語境，最終採用無法判定。') },
  },
  {
    id: 'Divergent Interpretations',
    label: bi('Divergent Interpretations', '解釋分歧'),
    short: bi('Different supported readings', '不同而均有依據的讀法'),
    definition: bi('Sometimes the English pivot sentence has more than one valid meaning. When this happens, the Chinese and Hungarian translations might pick different meanings, and both choices are reasonable.', '英語樞軸句有時具有多於一種合理意義。在這種情況下，中文與匈牙利語譯文可能各自選取不同的意義，而兩種選擇都合理。'),
    theory: bi('Francesch and Payrató discuss the selection and preservation of interpretations in translation (Francesch & Payrató, 2024). This triple-level category is an application proposed here, not an MQM error type.', 'Francesch 與 Payrató 討論翻譯如何選擇或保留解讀 (Francesch & Payrató, 2024)。此三語類別是本研究的應用設計，並非 MQM 錯誤類型。'),
    rule: bi('Identify readings A and B, evidence that English permits both, target spans selecting each, and the substantive difference. Source ambiguity or an annotator’s uncertainty alone does not satisfy the rule.', '指出讀法 A、B、英語容許兩者的依據、兩個譯文各自選取該義的片段，以及實質區別。只有源句歧義或編碼者不確定，均不足以歸類。'),
    positive: { id: 'TCE-0147', explanation: bi('Chinese selects understanding; Hungarian megszerezni is interpreted as acquisition. English get permits both senses (Cambridge University Press, n.d.). The targets therefore select different supported readings.', '中文選取理解義，匈牙利語 megszerezni 被解讀為取得義；英語 get 容許這兩個義項 (Cambridge University Press, n.d.)，因此兩個譯文選取不同而有依據的讀法。') },
    negative: { id: 'TCE-0484', explanation: bi('Chinese specifies departure, while Hungarian remains directionally open. A broad target that still permits departure does not prove a second different selected reading.', '中文明確選取離去義，而匈牙利語的方向仍開放。較寬泛的表達仍容許離去義，不能據此證明另一個不同讀法已被選取。') },
    boundary: { id: 'TCE-0257', explanation: bi('Both targets select price-related free. A possible lost freedom-related association concerns variation or ambiguity, not a split between the two target selections.', '兩個譯文都選取與價格有關的 free。可能減少的自由聯想涉及變化或歧義，並不構成兩個譯文之間的讀法分流。') },
  },
  {
    id: 'Potential Accuracy Issue',
    label: bi('Potential Accuracy Issue', '準確性疑點'),
    short: bi('A traceable content concern', '可追溯的內容疑點'),
    definition: bi('You might suspect an issue when a specific part of a translation seems to add, drop, or change a meaning supported by the English pivot without a good reason. However, this is just a warning sign to double-check, not proof of a definite mistake.', '當譯文的某個具體部分似乎在沒有充分理由的情況下，增添、遺漏或改變了英語樞軸所支持的意義，便可能有問題。然而，這只是提醒進一步核查的警號，並非確定有錯的證據。'),
    theory: bi('The concern is informed by MQM Accuracy and its attention to distortion, addition and omission (MQM Council, n.d.). This provisional research category does not constitute a complete MQM assessment or severity score.', '本類參考 MQM Accuracy 對偏移、增添及遺漏的關注 (MQM Council, n.d.)。此暫定研究類別並不等於完整 MQM 評估或嚴重程度分數。'),
    rule: bi('Quote the trigger, identify the affected pair and possible content consequence, and consider benign alternatives. Unfamiliar wording, a preferred alternative, source ambiguity or a typo alone is not enough.', '引用具體片段，指出受影響的語言對及可能的內容後果，並考慮合理的替代解釋。用語陌生、另有偏好的譯法、源句歧義或單純錯字均不足夠。'),
    positive: { id: 'TCE-0030', explanation: bi('The Chinese exclusive restriction on who can forgive supports a specific scope/participant concern, whereas the English evaluates forgiveness as divine. Rhetorical equivalence remains a possible explanation.', '中文對誰能寬恕作出排他限定，可支持範圍及參與者的具體疑點；英語則評價寬恕這一行為為神聖。修辭等效仍是可考慮的解釋。') },
    negative: { id: 'TCE-0241', explanation: bi('A preference for another Hungarian wording is not evidence of a content error when a conventional get-along interpretation is supported.', '在慣常的「相處融洽」解讀獲支持時，偏好另一種匈牙利語措辭並不是內容錯誤的證據。') },
    boundary: { id: 'TCE-0263', explanation: bi('The researcher approved Core Meaning Preserved with suspected_typo under a justified recovery rule. The original Chinese is retained and the proposed recovery stored separately; spelling is not automatically a semantic error.', '研究者依有依據的恢復規則，批准採用核心意義保留並另記 suspected_typo。中文原文保留，恢復建議另存；文字問題不自動等於語義錯誤。') },
  },
  {
    id: 'Indeterminate',
    label: bi('Indeterminate', '無法判定'),
    short: bi('A material unresolved question', '關鍵問題尚未解決'),
    definition: bi('You cannot make a reliable classification when important context or other evidence needed to interpret the sentences is missing. This label simply means there is not enough information to judge, not that the translations are wrong.', '如果理解句子所需的重要語境或其他證據缺失，便無法作出可靠分類。此標籤只表示資料不足以判斷，並不表示譯文有錯。'),
    theory: bi('Attention to context and expertise is supported by Freitag et al. (Freitag et al., 2021), and interpretive caution by Francesch and Payrató (2024). A separate evidence-limitation category is a project decision.', '對語境及評估者專業能力的關注參考 Freitag 等人 (Freitag et al., 2021)，對解讀的審慎態度參考 Francesch 與 Payrató (2024)。將證據限制單列為一類，是本研究的決定。'),
    rule: bi('State the blocking question, why it affects classification and what would resolve it. Lack of surrounding discourse does not make every transparent comparison indeterminate. A separate evidenced content concern is retained.', '說明阻礙判定的問題、它為何影響分類，以及甚麼證據可解決。缺少上下文，不代表每個清楚對應都無法判定；另有依據的內容疑點仍須保留。'),
    positive: { id: 'TCE-0484', explanation: bi('Departure is identifiable in Chinese, but the available text does not establish incompatible Hungarian selection or an unsupported Chinese commitment. Material uncertainty is preserved.', '中文的『離去』義可以辨認，但現有文本既未能證明匈牙利語選取了不相容的讀法，也未能證明中文選取的『離去』讀法缺乏英語參照句的支持。因此，仍須保留這項關鍵不確定性。') },
    negative: { id: 'TCE-0265', explanation: bi('A conventional proverbial correspondence does not become unresolved simply because a surrounding document is unavailable.', '慣用格言的對應，不會僅因缺少周邊篇章便變成無法判定。') },
    boundary: { id: 'TCE-0399', explanation: bi('A defensible conventional perspective shift could support Acceptable Variation, but a merely possible shared scene cannot settle it. The final researcher decision is Indeterminate.', '有依據的慣常視角變化可支持可接受變化，但僅僅可能存在的共同場景不能解決問題；研究者的最終決定是無法判定。') },
  },
];

export const learningSections = [
  {
    "id": "origin",
    "title": {
      "en": "Origin",
      "zh": "緣起"
    },
    "paragraphs": {
      "en": [
        "My interest in this project grew out of my experience with Chinese, English, and Hungarian. Studying linguistics and translation, particularly in a Hungarian-speaking environment, made me more aware that similar meanings can take different forms across languages. A short English sentence may allow more than one reading. Chinese and Hungarian may make different readings explicit or use different expressions to convey much the same meaning.",
        "This led me to a question about translation evaluation: when translations differ, how can the difference be distinguished as an error, a different interpretation, or an acceptable equivalent? My background in computational linguistics and experience evaluating multilingual AI outputs encouraged me to examine this question through corpus evidence rather than intuition alone.",
        "I therefore chose to study English-linked Chinese and Hungarian sentence triples from Tatoeba. English serves as a reference pivot, not a proven historical original. Neither target language is treated as an answer key. The project combines traceable corpus construction, structured annotation, and an interactive website. Readers can examine individual examples, explore patterns, and see the evidence behind a judgment."
      ],
      "zh": [
        "我對這個專題的興趣，源於與中文、英語及匈牙利語相關的經驗。語言學與翻譯的學習，尤其是在匈牙利語環境中的經歷，讓我更清楚意識到，相近的意義可以透過不同語言形式表達。一個簡短的英語句子可能容許多種讀法；中文與匈牙利語可能分別明示不同讀法，或以不同表達傳達大致相同的意思。",
        "這使我開始思考翻譯評估中的一個問題：當譯文出現差異時，如何區分錯誤、不同解讀與可接受的對應表達？計算語言學的背景及評估多語 AI 輸出的經驗，促使我透過語料證據，而非單憑直覺，探討這個問題。",
        "因此，我選擇研究 Tatoeba 中透過英語連結的中文與匈牙利語三語句組。英語作為參照樞軸，而非已證實的歷史原文；兩種目標語均不被當作標準答案。本專題結合可追溯的語料建置、結構化標註與互動網站，讓讀者檢視個別例子、探索模式，並查閱判斷背後的證據。"
      ]
    }
  },
  {
    "id": "background",
    "title": {
      "en": "Background",
      "zh": "背景"
    },
    "paragraphs": {
      "en": [
        "Tatoeba provides community-contributed sentences and translation links. A direct link records an association made by contributors, but it does not guarantee semantic equivalence. English serves as the pivot, or reference sentence, in this study. The saved exports do not establish that it was the historical original.",
        "The codebook draws on MQM Accuracy to identify possible changes in content. It treats observations about language form separately (MQM Council, n.d.). Research on translation evaluation stresses that valid translations are not unique, and that expertise and context matter (Freitag et al., 2021). Work on ambiguity also supports the distinction between readings selected by the target sentences and interpretations that remain unresolved (Francesch & Payrató, 2024)."
      ],
      "zh": [
        "Tatoeba 提供社群貢獻的句子及翻譯連結。直接連結記錄貢獻者建立的關聯，但不保證語義等值。在本研究中，英語作為樞軸或參照句；保存的匯出資料不能證明它是歷史上的原文。",
        "代碼本參考 MQM Accuracy 識別可能的內容變化，並把語言形式的觀察分開處理 (MQM Council, n.d.)。翻譯評估研究強調，合理譯法並非唯一，專業能力與語境也十分重要 (Freitag et al., 2021)。歧義研究亦支持區分目標句實際選取的讀法，以及仍未解決的解讀 (Francesch & Payrató, 2024)。"
      ]
    }
  },
  {
    "id": "gap",
    "title": {
      "en": "Gap",
      "zh": "研究缺口"
    },
    "paragraphs": {
      "en": [
        "Linked sentence pairs alone do not show whether two target sentences preserve the same reading of a shared English pivot. Likewise, a visible difference in vocabulary or grammar does not establish mistranslation. The gap addressed here is operational: how can these distinctions be made explicit, traceable, and open to inspection at the level of individual records?",
        "The explorer uses a custom five-category scheme. It records two separate English alignments, evidence from the original texts, and provenance information. Earlier human judgments are kept separate from later approved decisions. This is a focused workflow for auditing the selected records. It does not suggest that Tatoeba or translation studies lacks other multilingual research tools."
      ],
      "zh": [
        "僅有相連句對，並不能顯示兩個目標句是否保留共同英語樞軸的同一讀法。同樣，可見的詞彙或語法差異也不能證明誤譯。本研究處理的是操作層面的缺口：如何在個別記錄層面，把這些區分明確化，使其可追溯並可供檢視？",
        "探索器採用自訂的五分類方案，分別記錄兩組以英語為參照的對應、原文證據及來源資訊。較早的人工判斷與其後批准的決定分開保存。這是一套聚焦於所選記錄的審核流程，並不暗示 Tatoeba 或翻譯研究缺少其他多語研究工具。"
      ]
    }
  },
  {
    "id": "questions",
    "title": {
      "en": "Questions",
      "zh": "研究問題"
    },
    "paragraphs": {
      "en": [
        "To what extent do English-linked Chinese and Hungarian sentence triples preserve semantic consistency, and what types of variation or potential divergence can be identified?",
        "Three operational questions guide the analysis. Which differences are routine linguistic equivalents rather than substantive shifts? When do the target sentences select different readings supported by the English pivot? What evidence justifies a potential accuracy concern or an unresolved judgment? The interface allows readers to examine these questions without treating AI-only labels as verified findings."
      ],
      "zh": [
        "透過英語連結的中文與匈牙利語三語句組，在多大程度上保留語義一致性？當中可以識別哪些變化或潛在分歧？",
        "三項操作問題引導分析：哪些差異屬正常語言對應，而非實質變化？目標句何時選取不同而均獲英語樞軸支持的讀法？甚麼證據足以支持潛在準確性疑點或未能確定的判斷？介面讓讀者檢視這些問題，同時不把 AI-only 標籤當成已驗證的研究發現。"
      ]
    }
  },
  {
    "id": "method",
    "title": {
      "en": "Method",
      "zh": "方法"
    },
    "paragraphs": {
      "en": [
        "Official Tatoeba sentence exports for English, Mandarin Chinese, and Hungarian, together with direct-link exports, were retrieved on 22 November 2026 (UTC). Eligibility required an EN–ZH and an EN–HU direct edge sharing one English ID, valid endpoints, and nonempty original texts. The checks covered TSV structure, language codes, IDs, and text fields. Duplicate-edge detection found no duplicates in these exports.",
        "Links with missing endpoints were excluded without judging whether their content was interesting. The recorded exclusions were 199 invalid-endpoint EN–ZH links and 117 EN–HU links, or 316 in total. This left 17,795 eligible English IDs and 29,694 possible triples. These figures refer to different units.",
        "Python's random.Random(2026) sampled 500 distinct English IDs from the sorted eligible population. Independent generators with seeds 2027 and 2028 then selected one Chinese neighbor and one Hungarian neighbor from sorted IDs for each pivot. Sampling was uniform across eligible English IDs, not across all possible triples. Direct ZH–HU links were recorded only when the saved data provided evidence for them. They were not inferred from a shared pivot.",
        "The saved source data uses the unit label sentence_pair because each record comprises two English-linked pairs. For the codebook and statistical analysis, however, one English–Chinese–Hungarian triple receives exactly one primary category. This distinction prevents pairwise labels from being confused with the triple-level outcome.",
        "The original Pilot 30 used seed 2030. A supplemental sample of 20 used seed 2040 and was drawn from the sorted remaining 470 IDs. This produced two disjoint random human-review samples. As the sole researcher, I completed source and semantic checks for all 50 records. Their original judgments, evidence, URLs, and yes flags were preserved.",
        "The separate supplemental CSV was unavailable, so it was regenerated using the algorithm documented in the workbook. Its 20 IDs and texts matched. Missing reviewer, date, and version fields were not filled with invented values.",
        "The v0.1-to-v0.2 revision log records several operational changes and their reasons. I replaced the loose test of whether a variation was “worth recording” with a requirement for an evidenced, non-routine shift, to avoid overcoding ordinary equivalents. Divergent Interpretations now requires different readings demonstrably selected by the targets and supported by English; source ambiguity alone is insufficient. Potential Accuracy Issue requires an exact textual trigger and a plausible content consequence, rather than a preference for different wording. Indeterminate requires a material unresolved question. I also kept spelling and form observations separate from semantic categories, documented a narrowly justified recovery policy, and formalized the D1–D5 precedence. The full revision history is preserved in the linked Codebook revision log.",
        "I approved v0.2 and five explicit Pilot decisions: TCE-0469 Core, TCE-0481 Indeterminate, TCE-0399 Indeterminate, TCE-0111 Acceptable Variation, and TCE-0263 Core with suspected_typo. Four decisions changed the original main category; TCE-0111 retained its category with an explicitly approved rationale. Earlier judgments were preserved. The proposed recovery for TCE-0263 did not replace the original Chinese. These were annotation decisions, not five established translation errors.",
        "I later confirmed that manual verification of the 50 randomly selected records found no extraction or linkage errors. The reported counts were therefore 0 source-data errors and 0 required corpus corrections. Linguistic issues and classification inconsistencies were documented separately and excluded from those counts. This finding concerns the 50 checked records. It does not establish a zero-error rate for all 500.",
        "Only the remaining 450 records received new AI-only annotations through actual gpt-6.1-sol Codex CLI calls. A random dry run of 20 records, using seed 2041, passed mechanical validation before the other 430 were processed. EN–ZH and EN–HU were evaluated separately. Exact evidence spans, uncertainty, and model provenance were saved.",
        "Final validation checked all 500 IDs, unchanged texts, and required links against the saved raw exports. The 50 human-review flags remained yes, while the 450 AI-only flags remained no. These checks establish file and procedural integrity, not independent linguistic agreement.",
        "A separate diagnostic follow-up sampled six records from each of the five existing AI categories within the 450 AI-only records, using seed 20261124 across sorted category pools and seed 20261125 for presentation order. As the sole researcher, I independently recorded initial judgments before seeing the case-level AI labels and reasons. The unedited judgments were frozen; subsequent ChatGPT language editing and three authorized rule-number typo corrections changed neither categories nor pairwise auxiliary decisions. After unblinding, saved AI annotations were compared with the frozen judgments. ChatGPT-assisted qualitative analysis of the 25 disagreements was then reviewed and accepted with its qualifications. This follow-up is separate from the original 50/450 annotation-provenance records and does not overwrite them."
      ],
      "zh": [
        "研究於 2026 年 11 月 22 日（UTC）取得 Tatoeba 官方英語、官話中文及匈牙利語句子匯出資料，以及直接連結匯出資料。入選條件為同一英語 ID 具有 EN–ZH 與 EN–HU 直接連邊、端點有效，且原文非空。檢查涵蓋 TSV 結構、語言代碼、ID 及文字欄位；重複邊檢測未在這些匯出資料中發現重複邊。",
        "端點缺失的連結被排除，沒有按內容是否有趣作判斷。記錄中的排除數為 EN–ZH 無效端點連結 199 條及 EN–HU 連結 117 條，合計 316 條。餘下共有 17,795 個合格英語 ID，可形成 29,694 個三語組合；這兩個數字對應不同的計算單位。",
        "Python 的 random.Random(2026) 從排序後的合格總體抽取 500 個不同英語 ID。其後，以種子 2027 及 2028 的獨立隨機數產生器，為每個樞軸分別從排序後的 ID 選取一個中文鄰接句及一個匈牙利語鄰接句。均勻抽樣的單位是合格英語 ID，而非所有可能三語組合。只有保存資料提供證據時，才記錄直接 ZH–HU 連結；不會由共同樞軸推斷該連結。",
        "儲存的來源資料使用 sentence_pair 作為單位標籤，因為每條記錄包含兩組以英語連結的句對。然而，在代碼本及統計分析中，每個英語—中文—匈牙利語三語組合只獲分配一個主要類別。這項區分可避免將配對判斷標籤與三語組合的分類結果混淆。",
        "原 Pilot 30 使用種子 2030。補充樣本的 20 條記錄使用種子 2040，從排序後餘下的 470 個 ID 抽取，形成兩組互不重疊的隨機人工複核樣本。作為唯一研究者，我完成了全部 50 條記錄的來源及語義檢查。這些記錄的原判斷、證據、網址及 yes 標誌均獲保留。",
        "由於沒有獨立的補充樣本 CSV，因此依工作簿中記錄的演算法重新生成；其 20 個 ID 及原文均吻合。審閱者、日期及版本欄位的缺失值，沒有以虛構內容補填。",
        "v0.1 至 v0.2 的修訂紀錄列明了多項操作規則的變更及原因。我將較寬鬆的「變化是否值得記錄」準則，改為要求有證據支持的非例行變化，以避免把普通對應過度標記為變化。「解釋分歧」（Divergent Interpretations）現要求兩個譯文實際選取不同、且獲英語支持的讀法；源句本身有歧義並不足夠。「準確性疑點」（Potential Accuracy Issue）要求確切的文字觸發點及合理的內容後果，而非僅僅偏好另一種措辭。「無法判定」（Indeterminate）要求存在尚未解決的關鍵問題。我亦將拼寫及形式觀察與語義類別分開，記錄適用範圍嚴格且有依據的文字恢復政策，並明訂 D1–D5 的判定優先順序。完整修訂歷史保留在連結所指向的 Codebook 修訂紀錄中。",
        "我批准了 v0.2 及五項明確的 Pilot 決定：TCE-0469 為核心意義保留、TCE-0481 為無法判定、TCE-0399 為無法判定、TCE-0111 為可接受變化，以及 TCE-0263 為核心意義保留並另記 suspected_typo。四項決定更改了原有主要類別；TCE-0111 保留原類別，但其判定理由獲明確批准。較早的判斷均予保留。TCE-0263 的文字恢復建議沒有取代中文原文。這些是標註決定，並非五個已確立的翻譯錯誤。",
        "我其後確認，對 50 條隨機抽取記錄的人工核驗，未發現抽取或連結錯誤。因此，報告數字為來源資料錯誤 0 項、原始語料所需修正 0 項。語言問題及分類不一致另行記錄，不計入這些數字。此結果只涉及已核驗的 50 條記錄，不能確立全部 500 條的錯誤率為零。",
        "只有餘下的 450 條記錄，透過實際的 gpt-6.1-sol Codex CLI 呼叫獲得新增的 AI-only 標註。先以種子 2041 隨機抽取 20 條作試跑，通過機械驗證後，才處理另外 430 條。EN–ZH 與 EN–HU 分別評估，並保存精確證據片段、不確定性及模型來源。",
        "最終驗證對照保存的原始匯出資料，檢查全部 500 個 ID、未改動的原文及必要連結。50 條人工複核標誌維持 yes，450 條 AI-only 標誌維持 no。這些檢查確立的是檔案與程序完整性，而非獨立的語言判斷一致性。",
        "另行開展的診斷性追蹤研究，從原有 450 條僅 AI 標註記錄的五個類別各抽取六條，依次對已排序的類別候選池使用種子 20261124 抽樣，再以種子 20261125 打亂展示順序。作為唯一研究者，我在查看逐條 AI 標籤與理由前獨立作出初始判斷。未經編輯的判斷先行凍結；其後 ChatGPT 輔助的語言編輯及三處獲授權的規則編號筆誤修正，均未改變類別或兩組輔助判斷。揭盲後，以保存的 AI 標註對照凍結的人工判斷，再由研究者審閱並接受 ChatGPT 輔助的 25 案例分歧分析及其限定。此追蹤研究獨立於原有 50／450 標註來源記錄，不覆寫該層資料。"
      ]
    }
  },
  {
    "id": "analysis",
    "title": {
      "en": "Analysis",
      "zh": "分析"
    },
    "paragraphs": {
      "en": [
        "The final annotations place 380 of the 500 triples in Core Meaning Preserved (76%) and 65 in Acceptable Variation (13%). Another 32 are classified as Potential Accuracy Issue (6.4%), 16 as Indeterminate (3.2%), and 7 as Divergent Interpretations (1.4%). Together, the first two categories account for 445 records. This is a correspondence-preserving interpretation under the codebook, not a verified translation-accuracy score of 89%.",
        "The scheme allows for routine grammatical differences and conventional idioms. Starting with community-linked sentences may also favor expressions that are relatively easy to compare. This remains a hypothesis about corpus composition. The study does not test why this distribution arose or generalize it beyond eligible English pivots.",
        "The boundary between routine equivalence and defensible variation becomes clearer when two human-reviewed cases are compared. In TCE-0241, “I get along with my younger brother.” corresponds to “我與我的弟弟相處融洽。” and “Öcsémmel jól megértjük egymást.” All three conventionally describe a good relationship with a younger brother. The reciprocal Hungarian construction does not by itself add a substantive perspective shift. The approved category is Core Meaning Preserved (D5).",
        "TCE-0111, by contrast, links “I am busy today.” with “我今天忙。” and “Ma nem érek rá.” The Hungarian foregrounds lack of availability, rather than directly describing busyness. These meanings are conventionally related but are not universally interchangeable. The approved Acceptable Variation label (D4) records that defensible pragmatic shift without asserting that a particular appointment occurred. Together, the examples show why non-routine, evidenced variation should not be conflated with ordinary multilingual expression.",
        "TCE-0147 illustrates a case of identifiable interpretive divergence. English “I couldn't get it.” is linked to Chinese “我不明白。” and Hungarian “Nem tudtam megszerezni.” The Chinese selects understanding, while the Hungarian verb megszerezni selects acquisition. Both senses are possible meanings of get (Cambridge University Press, n.d.). The two pairwise alignments can therefore be defensible, even though the targets select different readings. D3 captures this difference across the triple.",
        "Core or Acceptable Variation would understate the distinction between understanding and acquisition. Potential Accuracy Issue would require additional evidence of a content problem, rather than an assumption about the intended English sense. Unknown authorial intention does not by itself require D2 when the difference between selected readings is identifiable. The lack of an explicit past-time marker in Chinese is not, on its own, evidence of omission.",
        "TCE-0484 shows the limit of D3. The three sentences are “I'd very much like to go.”, “我非常想离开。”, and “Nagyon szívesen mennék.” Chinese explicitly selects departure, whereas Hungarian remains compatible with more than one direction. A specific reading paired with an open reading does not demonstrate two different selections. D3 is therefore not supported.",
        "Specificity alone also does not establish D1, since English go can refer to departure. The question is whether that specification is justified in this context. Without a situational frame, D2 (Indeterminate) is more defensible than an unqualified Acceptable Variation judgment or a confirmed accuracy allegation.",
        "TCE-0263 separates orthography from semantics: “Speak slower, please.” / “請滿點說。” / “Beszéljen lassabban, kérem!” The saved Chinese sentence contains 滿. The separately recorded recovery proposal is “請慢點說”. The request context supports 慢, and English slower and Hungarian lassabban provide further evidence. They do not prove the contributor's historical intention.",
        "After I approved this justified recovery and its use in the case, the central request could follow D5 (Core Meaning Preserved). The suspected_typo tag remained visible. Assigning D1 solely because of a character error would conflate form with content. Keeping D2 despite the explicit case-specific decision would disregard the approved recovery. Neither approach would justify silently correcting the original text or automatically recovering every later typo.",
        "TCE-0030 shows why D1 may still be warranted: “To err is human, to forgive divine.” / “人皆有錯，唯聖者能恕。” / “Tévedni emberi dolog, megbocsátani isteni.” The English and Hungarian describe forgiving as divine. The Chinese “唯聖者能恕”, however, appears to restrict who can forgive. The wording “唯……能” provides specific evidence of a possible change in scope or participant roles, rather than a general preference for different wording.",
        "D4 would require an argument that this restriction is an acceptable rhetorical reformulation. D3 cannot simply assume that the exclusive claim is another reading licensed by the English. Potential Accuracy Issue preserves the content concern while leaving rhetorical equivalence open. It does not establish a confirmed error count.",
        "The Sankey diagram shows where the aggregate results come from. Of the 380 Core annotations, 347 are AI-only and 33 are human-reviewed. The displayed Human group combines Pilot 30 and supplemental 20. It contains 33 Core, 11 Variation, 1 Divergent, 1 Accuracy Issue, and 4 Indeterminate records. These counts use approved outcomes, not the untouched original Pilot category cells.",
        "The AI-only group contributes 347 Core, 54 Variation, 6 Divergent, 31 Accuracy Issue, and 12 Indeterminate records. The original Pilot and supplemental provenance remains available for inspection. Following the Core flow to its underlying records therefore reveals the evidence behind the headline figure of 76%. The two groups contain different records and were reviewed under different conditions. Their proportions cannot be used to measure model accuracy or inter-annotator agreement.",
        "The provenance breakdown matters most for the cases flagged for further review. Of the 32 Potential Accuracy Issue records, 31 have AI-only annotations. They are therefore candidates for expert follow-up, not 31 confirmed mistranslations. The Sankey diagram can help prioritize a review queue, but it cannot turn provisional categories into a measured error rate.",
        "The Heatmap supports a different point: a documented linguistic phenomenon is not itself a judgment of quality. The display tag lexical_specification appears in 21 distinct records: 13 Acceptable Variation, 5 Indeterminate, and 3 Potential Accuracy Issue. Greater specificity may be defensible, unresolved, or possibly unsupported. This is the distinction tested by D4, D2, and D1. Time/aspect observations also span categories: 1 Variation, 2 Indeterminate, and 6 Accuracy Issue records. These associations partly reflect the coding instructions and later display mapping. They are not independent causal explanations of translation error.",
        "The Heatmap also shows the limits of tag coverage. All 372 records labelled “No issue tag documented” fall under Core. However, missing tags or none-tag entries do not prove that no linguistic phenomenon is present. Each cell counts a distinct record once for each displayed tag. A record with multiple tags can appear in several cells, so the sum of cells is not the corpus denominator.",
        "The suspected_typo tag appears in both Core and Indeterminate, again showing why form should remain an auxiliary observation. Count and percentage views describe different aspects of the documented patterns. Neither provides an exhaustive measure of how often those phenomena occur in language.",
        "The Interactive Lexical Explorer (Trilingual KWIC) allows aggregate interpretations to be checked through an occurrence-level concordance. Each matching occurrence appears in a common keyword column between its original left and right contexts. Left-context sorting compares Unicode characters outward from the match, starting with the nearest character. Right-context sorting compares the following characters in forward order.",
        "This ordering can group similar local contexts for inspection. It does not automatically identify collocations or meanings. A single record may produce several hits, so occurrence totals should not be confused with distinct-record counts in the grid or category views. Selecting a hit opens the saved trilingual sentences, evidence, and category. It does not create a new translation or annotation.",
        "The distinction matters for get. An English substring search returns nine records, including getting and forget. Exact-token get occurs in seven. Comparing TCE-0147 with TCE-0373—“I get what you're saying.” / “我理解你说的话。” / “Értem, mit mondasz.”—shows how an explicit propositional complement supports an understanding reading, whereas get it leaves the sense open.",
        "Sorting by context helps bring recurring local expressions together. The interpretation still has to be supported by the saved wording and the readings selected by the targets. The common keyword column provides visual concordance alignment, not cross-language word alignment. Character-based sorting also does not impose Chinese word segmentation.",
        "A documented English-frequency experiment did not support adding another word cloud. In the English tokenization used for this experiment, Tom appears 24 times as a standalone form (with two additional occurrences of Tom's treated separately), while like appears 21 times. By contrast, divine and slower appear only once each, although they are important to the scope and typo-recovery cases. Frequency can help readers find examples, but it is not a semantic finding on its own. The concordance preserves the surrounding evidence that word size in a cloud cannot show.",
        "Taken together, the Sankey diagram traces the origin of the category distribution. The Heatmap shows why a feature cannot automatically be equated with a category. KWIC brings the analysis back to the actual expressions behind each decision. Linked filters let readers inspect the same records across these views rather than treat the charts as separate summaries.",
        "The result is an audit of the evidence supporting claims of consistency. The 32 Potential Accuracy Issue records and 16 Indeterminate records indicate where further review may be useful. All 450 AI-only annotations remain exploratory judgments, not human-validated ground truth."
      ],
      "zh": [
        "最終標註把 500 個句組中的 380 條歸為 Core Meaning Preserved（核心意義保留，76%），65 條歸為 Acceptable Variation（可接受變化，13%）。另外，32 條為 Potential Accuracy Issue（準確性疑點，6.4%）、16 條為 Indeterminate（無法判定，3.2%），7 條為 Divergent Interpretations（解釋分歧，1.4%）。首兩類合計 445 條；這是在代碼本下保留對應的解讀，不是已驗證的 89% 翻譯準確率。",
        "本方案容許正常語法差異及慣用表達。以社群連結句子為起點，也可能較常取得相對容易比較的表達。這仍只是關於語料組成的假說；本研究沒有檢驗此分布的成因，也不會把結果推廣至合格英語樞軸以外的總體。",
        "比較兩個經人工複核的案例，可以更清楚區分例行對應與有理據的變化。在 TCE-0241 中，「I get along with my younger brother.」對應「我與我的弟弟相處融洽。」及「Öcsémmel jól megértjük egymást.」。三句按慣常用法均描述與弟弟關係良好。匈牙利語的相互義結構本身並未增添實質的視角變化。已批准的類別為核心意義保留（Core Meaning Preserved；D5）。",
        "相比之下，TCE-0111 將「I am busy today.」連結至「我今天忙。」及「Ma nem érek rá.」。匈牙利語突出了沒有空閒時間，而非直接描述忙碌。這些意思在慣常用法中互有關聯，卻並非在所有情況下都可互換。已批准的可接受變化（Acceptable Variation）標籤（D4）記錄了這項有理據的語用變化，並未斷言曾有某個特定約會。兩個例子共同說明，不應把有證據的非例行變化與普通的多語表達混為一談。",
        "TCE-0147 說明可辨識的解釋分歧。英語 “I couldn't get it.” 連結中文 “我不明白。” 及匈牙利語 “Nem tudtam megszerezni.”。中文選取理解義，匈牙利語動詞 megszerezni 則選取取得義；兩者都是 get 的可能義項 (Cambridge University Press, n.d.)。因此，即使兩個目標句選取不同讀法，兩組對應仍可各自成立。D3 捕捉三語句組中的這項差異。",
        "Core 或 Acceptable Variation 會淡化理解與取得之間的區別。Potential Accuracy Issue 須有額外的內容問題證據，不能只假定英語原本意指哪一義。當實際選取讀法的差異可以辨識時，作者意圖未知本身不會自動要求採用 D2。中文缺少明確過去時間標記，也不能單憑這一點視為遺漏證據。",
        "TCE-0484 顯示 D3 的界線。三句分別為 “I'd very much like to go.”、“我非常想离开。” 及 “Nagyon szívesen mennék.”。中文明確選取離去義，而匈牙利語仍容許多種方向。具體讀法與開放讀法並列，不代表已選取兩種不同讀法，因此 D3 未獲支持。",
        "具體化本身也不足以確立 D1，因為英語 go 可以指離去。問題在於這個語境是否支持該具體化。缺少情境框架時，D2（Indeterminate，無法判定）比無保留地判為 Acceptable Variation，或聲稱已確認準確性問題，更有根據。",
        "TCE-0263 區分文字形式與語義：“Speak slower, please.”／“請滿點說。”／“Beszéljen lassabban, kérem!”。保存的中文句子含「滿」，另行記錄的恢復建議則為 “請慢點說”。請求語境支持「慢」，英語 slower 與匈牙利語 lassabban 提供進一步證據，但不能證明貢獻者當時的真實意圖。",
        "在我批准這項有依據的恢復及其個案應用後，核心請求可依 D5 判為 Core Meaning Preserved（核心意義保留），同時保留 suspected_typo 標籤。單憑字元錯誤採用 D1，會混淆形式與內容；在有明確個案決定後仍保留 D2，則會忽略已批准的恢復。兩種做法都不能成為悄悄修正原文或自動恢復往後每一個錯字的理由。",
        "TCE-0030 說明 D1 何以仍可能有根據：“To err is human, to forgive divine.”／“人皆有錯，唯聖者能恕。”／“Tévedni emberi dolog, megbocsátani isteni.”。英語與匈牙利語形容寬恕為神聖；中文「唯聖者能恕」卻似乎限定誰能寬恕。「唯……能」為範圍或參與者角色可能改變提供了具體證據，而非籠統地偏好另一種措辭。",
        "D4 須有論證說明此限定為何是可接受的修辭重述。D3 不能直接假定排他判斷是英語容許的另一讀法。Potential Accuracy Issue 保留內容疑點，也保留修辭等效的可能；它並未確立已確認的錯誤數目。",
        "Sankey 桑基圖顯示整體結果的來源。380 條 Core 標註中，347 條為 AI-only，33 條經人工複核。圖中的 Human 組合併 Pilot 30 與補充 20，包含 33 條 Core、11 條 Variation、1 條 Divergent、1 條 Accuracy Issue 及 4 條 Indeterminate。這些數字採用批准後的結果，而非未經改動的原 Pilot 分類儲存格。",
        "AI-only 組提供 347 條 Core、54 條 Variation、6 條 Divergent、31 條 Accuracy Issue 及 12 條 Indeterminate。原 Pilot 與補充樣本的來源仍可供檢視。因此，沿 Core 流量返回相應記錄，可以看清 76% 這個主要數字背後的證據。兩組包含不同記錄，審閱條件亦不同；組別比例不能用來衡量模型準確度或標註者間一致性。",
        "對於標記為需要進一步複核的案例，來源分布尤其重要。32 條準確性疑點（Potential Accuracy Issue）記錄中，有 31 條僅經 AI 標註。因此，它們是供專家進一步跟進的候選記錄，而非 31 個已證實的誤譯。Sankey 圖可協助安排複核次序，卻不能把暫定類別轉化為經量度的錯誤率。",
        "Heatmap 熱圖支持另一個論點：有記錄的語言現象本身並非品質判斷。展示標籤 lexical_specification 出現在 21 條不同記錄，分別為 13 條 Acceptable Variation、5 條 Indeterminate 及 3 條 Potential Accuracy Issue。較高的具體程度可以合理、尚未解決，或可能缺乏支持；這正是 D4、D2 與 D1 所測試的區別。時間／體貌觀察也跨越多個類別：1 條 Variation、2 條 Indeterminate 及 6 條 Accuracy Issue。這些關聯部分反映編碼指令及其後的展示映射，並不是翻譯錯誤的獨立因果解釋。",
        "熱圖亦顯示標籤覆蓋的限制。全部 372 條標為 “No issue tag documented”（未記錄現象標籤）的記錄都屬 Core；然而，缺少標籤或記為 none，不證明沒有語言現象。每格按展示標籤對每條不同記錄計一次。多標籤記錄可出現在多格，因此各格總和不是語料分母。",
        "suspected_typo 同時出現在 Core 與 Indeterminate，再次說明文字形式應保留為輔助觀察。數量與百分比視圖描述已記錄模式的不同面向，兩者都沒有全面衡量這些現象在語言中的出現頻率。",
        "Interactive Lexical Explorer（互動詞彙探索器，Trilingual KWIC）透過以每次出現為單位的索引，讓整體解讀可以被核對。每次命中都置於共用的關鍵詞欄，兩側是原文左右語境。左語境排序從最接近命中片段的 Unicode 字元開始，向外比較；右語境排序則按後續字元的正向順序比較。",
        "這種排序可把相似的局部語境集中以供檢視，但不會自動識別搭配或意義。同一記錄可能有多次命中，因此出現總次數不應與資料表或類別視圖中的不同記錄數混淆。選取命中行會開啟保存的三語句子、證據及類別，不會建立新譯文或新標註。",
        "get 顯示這個區分的重要性。英語子串搜尋返回九條記錄，包括 getting 及 forget；完整詞項（token）get 則出現於七條記錄。比較 TCE-0147 與 TCE-0373——“I get what you're saying.”／“我理解你说的话。”／“Értem, mit mondasz.”—可看到明確的命題補語如何支持理解義，而 get it 讓詞義保持開放。",
        "按語境排序，有助把重複的局部表達集中呈現；解讀仍須由保存的措辭及目標句選取的讀法支持。共用關鍵詞欄提供的是索引的視覺對齊，而非跨語言詞對齊。按字元排序，也不會替中文強行斷詞。",
        "已記錄的英語詞頻實驗未能支持另加詞雲。在此實驗採用的英語斷詞方法下，Tom 作為獨立詞形出現 24 次（另有兩次 Tom's，分開處理），而 like 出現 21 次。相比之下，divine 及 slower 各只出現一次，儘管它們對範圍及錯字恢復案例十分重要。詞頻可協助讀者尋找例子，但本身並非語義研究結果。語境索引保留了周邊證據，這些是詞雲中的字體大小無法呈現的。",
        "綜合而言，Sankey 桑基圖追溯類別分布的來源；Heatmap 熱圖說明為何不能自動把某個特徵等同某個類別；KWIC 則讓分析回到各項決定背後的實際表達。聯動篩選讓讀者在不同視圖檢視同一組記錄，而非把圖表視為彼此獨立的摘要。",
        "結果是一項對一致性主張之證據的審核。32 條 Potential Accuracy Issue 與 16 條 Indeterminate 記錄，指出哪些地方可能值得進一步複核。全部 450 條 AI-only 標註仍是探索性判斷，而非經人工驗證的標準答案。"
      ]
    },
    "subsections": [
      {
        "id": "human-ai-comparison",
        "title": {
          "en": "Human–AI Comparison",
          "zh": "人工與 AI 比較"
        },
        "paragraphs": {
          "en": [
            "The fixed 30-record diagnostic sample produced initial primary-category agreement of 5/30 (16.7%) and 25 disagreements. Initial human judgments comprised 14 Core Meaning Preserved, zero Acceptable Variation, one Divergent Interpretations, four Potential Accuracy Issue and 11 Indeterminate. Of the six AI Acceptable Variation cases, three received human Core, two Indeterminate and one Potential Accuracy Issue. Different thresholds for recognizing a non-routine shift or accepting it as defensible are competing hypotheses; neither AI overannotation nor general human conservatism is established. The matrix preserves the original initial judgments and does not change with explorer filters.",
            "BR015 is the one explicitly researcher-confirmed post-unblinding reconsideration: “What did you eat?” / “你吃了什么？” / “Mit ettetek?” The initial human notes recognized the target number contrast but requested context and selected D2 (Indeterminate). The later D3 (Divergent Interpretations) decision distinguishes recovering the historical speaker’s intended addressee number from identifying different, English-supported readings demonstrably selected by the targets. That reconsideration remains separate from the original 5/30 result. Related you-number cases retain their individual qualifications; acceptance of their discussion does not automatically revise their categories.",
            "The reviewed analysis distinguishes meaning interpretation, evidential sufficiency and rule application. BR001 contrasts conventional proverbial function with a possible change in the stated bases of judgment; legitimate proverb substitution remains a competing explanation. In BR007, the AI concern about Chinese embedding still needs to establish an unsupported content change, while the brief human equivalence claim also requires justification. These are provisional interpretations, not confirmed new categories. The proposed disagreement mechanisms are researcher-reviewed, AI-assisted explanations, not independently coded frequencies or evidence of model-internal reasoning."
          ],
          "zh": [
            "固定的 30 條診斷樣本中，初始主要類別一致為 5/30（16.7%），另有 25 條不一致。初始人工判斷包括 14 條核心意義保留、零條可接受變化、1 條解釋分歧、4 條準確性疑點及 11 條無法判定。六條原 AI「可接受變化」記錄中，人工判為核心意義保留的有三條、無法判定兩條、準確性疑點一條。對非例行變化的識別門檻，或對其可接受性的證據要求不同，都是待檢驗的競爭解釋；尚不能確立 AI 過度標註或人工整體較保守。矩陣保留原始初判，不隨語料探索器的篩選條件改變。",
            "BR015 是唯一明確獲研究者確認的揭盲後類別復議：“What did you eat?”／“你吃了什么？”／“Mit ettetek?”。初始人工筆記已辨認目標句的人數差異，但要求語境，因而選擇 D2（無法判定）。其後改判 D3（解釋分歧），區分了恢復歷史說話者所指收話人數，與辨認兩個目標句實際選取、且獲英語支持的不同讀法。此復議與原有 5/30 結果分開保存。其他涉及 you 人數的案例仍保留各自限定；接受其討論不會自動改動類別。",
            "已審閱的分析區分意義解讀、證據充分性及規則應用。BR001 涉及常規諺語功能與判斷依據可能改變之間的區別；合理的諺語替換仍是競爭解釋。BR007 中，AI 對中文嵌套結構的疑點仍須證明存在未獲支持的內容變化，而人工簡短的等值判斷也需要論證。這些是暫定解讀，不是已確認的新類別。所提出的分歧機制屬研究者審閱的 AI 輔助解釋，並非獨立編碼所得的頻率，亦非模型內部思考的證據。"
          ]
        },
        "matrix": {
          "categories": [
            "Core Meaning Preserved",
            "Acceptable Variation",
            "Divergent Interpretations",
            "Potential Accuracy Issue",
            "Indeterminate"
          ],
          "counts": [
            [
              4,
              0,
              0,
              1,
              1
            ],
            [
              3,
              0,
              0,
              1,
              2
            ],
            [
              0,
              0,
              0,
              1,
              5
            ],
            [
              4,
              0,
              0,
              0,
              2
            ],
            [
              3,
              0,
              1,
              1,
              1
            ]
          ],
          "caption": {
            "en": "Original AI categories (rows) × initial human categories (columns): fixed diagnostic sample, n = 30.",
            "zh": "原 AI 類別（行）× 初始人工類別（列）：固定診斷樣本，n = 30。"
          },
          "corner": {
            "en": "Original AI / Initial human",
            "zh": "原 AI／初始人工"
          },
          "total": {
            "en": "Total",
            "zh": "合計"
          }
        }
      }
    ]
  },
  {
    "id": "conclusion",
    "title": {
      "en": "Conclusion",
      "zh": "結論"
    },
    "paragraphs": {
      "en": [
        "The project produced a reproducible 500-record trilingual sample, an approved five-category codebook, 50 preserved human reviews, and 450 explicitly AI-only annotations. It provides a way to examine ordinary correspondence, defensible variation, differences in selected readings, possible content problems, and unresolved interpretations through their supporting evidence.",
        "Most sampled linked triples were assigned a correspondence-preserving interpretation under this scheme. This is a limited descriptive finding, not an independently established accuracy rate. Across the three operational questions, the evidence supports a practical distinction: routine linguistic realization should not automatically count as variation; different interpretations require actual target-selected readings; and traceable content concerns must be separated from unresolved contextual questions. The explorer makes these decisions inspectable across records and visualizations, rather than acting as an automatic correctness detector.",
        "The supplementary comparison shows why transparent provenance and inspectable evidence matter alongside category definitions. BR015 demonstrates that recognizing selected readings and requiring recovery of historical intention are different evidential tasks. Other disagreements leave competing linguistic interpretations and thresholds unresolved. The comparison makes those distinctions examinable without establishing general superiority of either AI or human classification."
      ],
      "zh": [
        "本專題建立了可重現的 500 條三語樣本、獲批准的五分類代碼本、50 條完整保留的人工複核記錄，以及明確標示的 450 條 AI-only 標註，提供透過支持證據檢視正常對應、合理變化、所選讀法差異、可能的內容問題及未解解讀的方法。",
        "在本分類方案下，大部分抽樣的連結三語組合獲判為保留對應關係。這是一項有限的描述性結果，並非經獨立確立的準確率。就三項操作問題而言，證據支持以下實際區分：例行的語言表達不應自動算作變化；不同解讀必須有譯文實際選取的讀法作依據；可追溯的內容疑點亦須與尚未解決的語境問題分開。探索平台讓這些決定可透過記錄與視覺化加以查閱，而非充當自動判定正誤的工具。",
        "補充比較顯示，除了類別定義，透明的判斷來源及可檢視的證據同樣重要。BR015 說明，辨認已選取的讀法與要求恢復歷史意圖，是不同的證據任務。其他分歧仍涉及未解決的競爭語言解讀及判定門檻。比較讓這些區別可供檢視，並未確立 AI 或人工分類普遍較優。"
      ]
    },
    "subsections": [
      {
        "id": "research-limitations",
        "title": {
          "en": "Research Limitations",
          "zh": "研究限制"
        },
        "paragraphs": {
          "en": [
            "This study has several limitations. First, the corpus contains 500 English-linked sentence triples from Tatoeba. These links do not establish the original translation direction or guarantee semantic equivalence. The findings therefore cannot be generalized to all multilingual translations. Many short entries also lack surrounding discourse, which can be essential for resolving pragmatic variation and ambiguous readings. The sampling unit was an eligible English pivot rather than every possible linked triple.",
            "At the original annotation stage, 50 records were manually reviewed by a single researcher and 450 received AI-only annotations. The subsequent 30-record diagnostic review is a separate comparison, not a replacement of those provenance flags. No second independent annotator was involved, and the study has no independent external gold standard.",
            "Finally, the five-category classification involves interpretive linguistic judgments. The reported category distributions should not be treated as verified translation accuracy rates. Automated checks support data integrity and reproducibility, but they cannot independently establish the linguistic validity of individual annotations. The study also does not establish population-wide error rates or independently measured model accuracy.",
            "The diagnostic sample is balanced across existing AI categories and is not representative of all 450 records. Its 16.7% is initial category agreement, not AI accuracy. The researcher also developed the Codebook. Post-unblinding qualitative analysis involved ChatGPT assistance and researcher review; accepting its qualifications does not mean every proposed category revision was formally adjudicated. Only BR015 has an explicitly confirmed post-unblinding category reconsideration in this extension. No disagreement-mechanism frequency or population-wide accuracy estimate is established."
          ],
          "zh": [
            "本研究有若干限制。首先，語料包含 500 個來自 Tatoeba、以英語連結的三語句子組合。這些連結既不能確立原始翻譯方向，亦不保證語義等同。因此，結果不能推廣至所有多語翻譯。許多短句亦缺少周邊篇章，而這些語境對釐清語用變化及歧義讀法可能至關重要。抽樣單位是符合條件的英語樞軸，而非每個可能的連結三語組合。",
            "在原始標註階段，50 條記錄由單一研究者人工複核，450 條接受僅 AI 標註。其後的 30 條診斷性複核是另行比較，不取代原有來源標誌。研究沒有第二位獨立標註者，亦沒有獨立外部金標準。",
            "最後，五分類方案涉及詮釋性的語言判斷，所報告的類別分布不應視為已驗證的翻譯準確率。自動化檢查支持資料完整性及可重現性，卻不能獨立確立個別標註的語言學有效性。本研究亦未確立總體錯誤率或獨立測得的模型準確度。",
            "診斷樣本按原有 AI 類別平衡抽取，不能代表全部 450 條記錄。16.7% 是初始類別一致比例，並非 AI 準確率。研究者同時是 Codebook 制定者。揭盲後質性分析有 ChatGPT 協助，並經研究者審閱；接受包含限定的分析，不代表每項建議類別修訂均已正式裁定。本擴展只有 BR015 的揭盲後類別復議獲明確確認，並未確立分歧機制的頻率或總體準確率估計。"
          ]
        }
      }
    ]
  },
  {
    "id": "reflection",
    "title": {
      "en": "Reflection",
      "zh": "反思"
    },
    "paragraphs": {
      "en": [
        "The hardest part of this project was not finding differences between sentences. It was deciding what those differences allowed me to conclude. A Tatoeba link, a grammatical contrast, and two different selected readings are not the same kind of evidence. I had to keep these distinctions in mind when developing the codebook and reviewing examples. TCE-0263 was particularly useful. The original Chinese contains a probable typo, but the intended request is recoverable. Keeping the source text unchanged while recording the approved meaning judgment and a separate suspected_typo tag made that decision easier to trace and question.",
        "AI helped me process the corpus, draft the codebook, annotate records, and build the website. It also required close checking. One annotation output used a value outside the permitted variation-dimension field and had to be regenerated. Later, a provider quota interruption affected the final ten records. Because earlier outputs were saved, I could resume those ten without inventing results or processing the completed 440 again. This taught me the practical value of validation and keeping a clear record of each step. It also showed that a file can pass technical checks while its linguistic judgments still need review.",
        "The website raised similar questions. Earlier pairwise labels could not simply be merged into one category without losing information. The charts had to use the same filtered records, and Chinese search needed to work without unsupported word segmentation. I also needed to treat the bilingual research commentary as something to review, not as a text made reliable by working software. These decisions were less visible than the charts themselves, but they mattered to how the results could be interpreted.",
        "If I repeated the study, I would keep a dedicated log of any source-data corrections from the start, separate from changes to annotation categories. I would also seek a second reviewer for at least some borderline examples, if resources allowed. I was the sole reviewer for the 50 manual checks, so the study cannot report inter-annotator agreement.",
        "I began with a question about why translations disagree. By the end, I was paying closer attention to what counts as evidence for an error and when a judgment should remain uncertain. AI made it possible to work with more data and build a useful interface. It did not remove the need to read the sentences carefully or take responsibility for the final interpretations."
      ],
      "zh": [
        "這個專題最困難的部分，不是找出句子間的差異，而是判斷這些差異容許作出甚麼結論。Tatoeba 連結、語法對比及兩個不同的所選讀法，並非同一種證據。在建立代碼本及複核例子時，我必須記住這些區分。TCE-0263 尤其有用：中文原文有一個可能的錯字，但請求意圖可以恢復。保留來源原文不變，同時記錄批准的意義判斷及獨立的 suspected_typo 標籤，使該決定更容易追溯及質疑。",
        "AI 協助我處理語料、草擬代碼本、標註記錄及建立網站，但也需要仔細檢查。一項標註輸出採用了 variation-dimension 欄位容許範圍以外的值，必須重新生成。其後，提供服務的額度中斷影響最後十條記錄。由於較早的輸出已保存，我能只補跑這十條，而無須虛構結果或再次處理已完成的 440 條。這使我體會到驗證及清楚記錄每個步驟的實際價值，也顯示檔案即使通過技術檢查，語言判斷仍可能需要複核。",
        "網站也帶來相似的問題。較早的雙語對應標籤不能簡單合併成同一類別，否則會流失資訊；圖表須使用同一組篩選後的記錄，中文搜尋也須在沒有未獲支持的斷詞之下運作。我亦需要把雙語研究解說視為待審閱的文字，而非因軟件正常運作便可信的文本。這些決定不如圖表本身顯眼，卻影響結果應如何解讀。",
        "若再次進行這項研究，我會從一開始便另設來源資料修正日誌，與標註類別的變更分開記錄。資源許可的話，我也會為至少部分邊界案例尋求第二位審閱者。50 條人工核驗只有我一位審閱者，因此本研究不能報告標註者間一致性。",
        "研究起初關注的是譯文為何出現分歧；至研究結束時，我更留意甚麼才算錯誤證據，以及判斷何時應保持不確定。AI 使較大規模的資料處理及實用介面的建置成為可能，但沒有取代仔細閱讀句子及對最終解讀負責的必要。"
      ]
    }
  }
];

export const references = [
  {
    "id": "cambridge-get",
    "kind": "scholarly",
    "title": "Cambridge University Press. (n.d.). Get. In Cambridge learner’s dictionary. Retrieved November 23, 2026, from https://dictionary.cambridge.org/us/dictionary/learner-english/get",
    "segments": [
      {
        "text": "Cambridge University Press. (n.d.). Get. In "
      },
      {
        "text": "Cambridge learner’s dictionary",
        "italic": true
      },
      {
        "text": ". Retrieved November 23, 2026, from https://dictionary.cambridge.org/us/dictionary/learner-english/get"
      }
    ],
    "url": "https://dictionary.cambridge.org/us/dictionary/learner-english/get",
    "detail": {
      "en": "OBTAIN and UNDERSTAND support the English lexical discussion, not independent verification of Hungarian.",
      "zh": "OBTAIN 及 UNDERSTAND 義項支持英語詞義討論，但不會獨立驗證匈牙利語。"
    },
    "citationForms": [
      "(Cambridge University Press, n.d.)",
      "Cambridge University Press (n.d.)"
    ]
  },
  {
    "id": "cc-by-fr",
    "kind": "provenance",
    "title": "Creative Commons. (n.d.). Attribution 2.0 France (CC BY 2.0 FR). https://creativecommons.org/licenses/by/2.0/fr/",
    "segments": [
      {
        "text": "Creative Commons. (n.d.). "
      },
      {
        "text": "Attribution 2.0 France (CC BY 2.0 FR)",
        "italic": true
      },
      {
        "text": ". https://creativecommons.org/licenses/by/2.0/fr/"
      }
    ],
    "url": "https://creativecommons.org/licenses/by/2.0/fr/",
    "detail": {
      "en": "Attribution and license for the displayed sentence texts.",
      "zh": "展示句子所採用的署名及授權條款。"
    },
    "citationForms": [
      "(Creative Commons, n.d.)",
      "Creative Commons (n.d.)"
    ]
  },
  {
    "id": "francesch-2024",
    "kind": "scholarly",
    "title": "Francesch, P., & Payrató, L. (2024). Pragmatic ambiguity, implicatures, and translation. Studia Linguistica, 78(1), 156–185. https://doi.org/10.1111/stul.12219",
    "segments": [
      {
        "text": "Francesch, P., & Payrató, L. (2024). Pragmatic ambiguity, implicatures, and translation. "
      },
      {
        "text": "Studia Linguistica",
        "italic": true
      },
      {
        "text": ", "
      },
      {
        "text": "78",
        "italic": true
      },
      {
        "text": "(1), 156–185"
      },
      {
        "text": ". https://doi.org/10.1111/stul.12219"
      }
    ],
    "url": "https://doi.org/10.1111/stul.12219",
    "detail": {
      "en": "Interpretation selection and preservation of ambiguity. First published online November 29, 2023.",
      "zh": "解讀的選取與歧義的保留。首次網上發表日期為 2023 年 11 月 29 日。"
    },
    "citationForms": [
      "(Francesch & Payrató, 2024)",
      "Francesch and Payrató (2024)",
      "Francesch 與 Payrató (2024)"
    ]
  },
  {
    "id": "freitag-2021",
    "kind": "scholarly",
    "title": "Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. Transactions of the Association for Computational Linguistics, 9, 1460–1474. https://doi.org/10.1162/tacl_a_00437",
    "segments": [
      {
        "text": "Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. "
      },
      {
        "text": "Transactions of the Association for Computational Linguistics",
        "italic": true
      },
      {
        "text": ", "
      },
      {
        "text": "9",
        "italic": true
      },
      {
        "text": ", 1460–1474"
      },
      {
        "text": ". https://doi.org/10.1162/tacl_a_00437"
      }
    ],
    "url": "https://doi.org/10.1162/tacl_a_00437",
    "detail": {
      "en": "Explicit evaluation, non-unique valid outputs and document context.",
      "zh": "明確評估、多種合理譯法及篇章語境。"
    },
    "citationForms": [
      "(Freitag et al., 2021)",
      "Freitag et al. (2021)"
    ],
    "accessUrl": "https://aclanthology.org/2021.tacl-1.87/"
  },
  {
    "id": "mqm",
    "kind": "scholarly",
    "title": "MQM Council. (n.d.). The MQM error typology. Retrieved November 23, 2026, from https://www.themqm.org/mqm-pillars/typology/",
    "segments": [
      {
        "text": "MQM Council. (n.d.). "
      },
      {
        "text": "The MQM error typology",
        "italic": true
      },
      {
        "text": ". Retrieved November 23, 2026, from https://www.themqm.org/mqm-pillars/typology/"
      }
    ],
    "url": "https://www.themqm.org/mqm-pillars/typology/",
    "detail": {
      "en": "Accuracy and Linguistic conventions provide reference distinctions; the five project categories are custom.",
      "zh": "Accuracy 與 Linguistic conventions 提供參考區分；本研究五類屬自訂框架。"
    },
    "citationForms": [
      "(MQM Council, n.d.)",
      "MQM Council (n.d.)"
    ]
  },
  {
    "id": "tatoeba",
    "kind": "provenance",
    "title": "Tatoeba. (n.d.). Download sentences. Retrieved November 23, 2026, from https://tatoeba.org/en/downloads",
    "segments": [
      {
        "text": "Tatoeba. (n.d.). "
      },
      {
        "text": "Download sentences",
        "italic": true
      },
      {
        "text": ". Retrieved November 23, 2026, from https://tatoeba.org/en/downloads"
      }
    ],
    "url": "https://tatoeba.org/en/downloads",
    "detail": {
      "en": "Snapshot retrieved 22 November 2026 UTC. Sentence texts by Tatoeba contributors, CC BY 2.0 FR.",
      "zh": "資料於 2026 年 11 月 22 日 UTC 取得。句子由 Tatoeba 貢獻者提供，採用 CC BY 2.0 FR。"
    },
    "citationForms": [
      "(Tatoeba, n.d.)",
      "Tatoeba (n.d.)"
    ]
  }
];

export const aiDeclaration = {
  "en": [
    {
      "id": "tools",
      "title": "AI Tools and Their Roles",
      "paragraphs": [
        "I used ChatGPT and OpenAI Codex throughout this project. ChatGPT assisted with linguistic discussions, drafting and revising parts of the Learning Report, and critical reviews of the methodology and website. Codex helped develop data extraction and validation scripts, draft the Codebook, process AI-assisted annotations, implement the interactive website, and integrate approved research content and its corresponding Traditional Chinese version. The saved annotation logs identify `gpt-6.1-sol` as the model selected through Codex CLI. Exact model revisions for all earlier AI-assisted interactions were not consistently recorded, so I do not infer them.",
        "After I completed the initial blind judgments, ChatGPT assisted with language editing and the post-unblinding qualitative analysis. I reviewed and accepted that analysis with its qualifications. Codex assisted with integrating the supplementary findings into the English and Traditional Chinese report. This assistance did not create or replace the initial human judgments."
      ]
    },
    {
      "id": "verification",
      "title": "My Contributions and Verification",
      "paragraphs": [
        "I determined the research topics and reviewed the analytical framework before approving the five categories, D1–D5 decision rules, and annotation protocol. I personally checked 50 randomly selected records, including their sources and English–Chinese and English–Hungarian correspondences. I also reviewed the Pilot classifications and approved five final decisions, four of which changed the original primary category. The original judgments and subsequent revisions were preserved separately.",
        "The original annotation layer retains 450 AI-only records. A subsequent, separate diagnostic sample of 30 received my initial blind judgments and was compared with saved AI annotations after unblinding. This is not independent external validation of the 450 records. I accepted the later AI-assisted analysis with its unresolved questions; only BR015 received an explicitly confirmed post-unblinding category reconsideration in this extension. Original judgments, annotations and provenance flags remain unchanged."
      ]
    },
    {
      "id": "prompts",
      "title": "Examples of Effective Prompts",
      "paragraphs": [
        "One saved annotation instruction was:",
        "*“Evaluate EN–ZH and EN–HU separately, then apply D1–D5. Use exactly the five main categories. Routine grammar and conventional idioms do not automatically create variation.”*",
        "This helped enforce a consistent decision procedure and reduce unsupported classifications based on surface differences.",
        "During website verification, I also directed Codex to reproduce a specific conflict between the legacy `group` parameter and the newer `phenomenonGroup` filter, then correct the inconsistent Heatmap display and add a regression test."
      ]
    },
    {
      "id": "learning",
      "title": "An AI Error and What I Learned",
      "paragraphs": [
        "An independent audit of the Codex-built website identified a filtering bug: the selected records belonged to the Pragmatics group, but the Heatmap displayed labels from the Content group. I used the audit evidence to request a reproducible fix and subsequent testing. This demonstrated that a website can appear functional while displaying misleading analytical results.",
        "The project taught me to treat AI as a tool for implementation and preliminary analysis, not as an independent authority on translation quality. My responsibility was to establish clear criteria, verify evidence, challenge unsupported interpretations, and document both the strengths and limitations of AI-assisted work."
      ]
    }
  ],
  "zh": [
    {
      "id": "tools",
      "title": "AI 工具及其角色",
      "paragraphs": [
        "我在整個專題中使用了 ChatGPT 及 OpenAI Codex。ChatGPT 協助進行語言學討論、草擬及修訂學習報告的部分內容，以及對研究方法和網站作批判性審閱。Codex 協助開發資料抽取與驗證腳本、草擬 Codebook、處理 AI 輔助標註、建置互動網站，以及整合已批准的研究內容及其對應的繁體中文版本。保存的標註日誌顯示，透過 Codex CLI 選用的模型為 `gpt-6.1-sol`。較早期各次 AI 輔助互動的確切模型修訂版本未有一致記錄，因此我不作推定。",
        "在我完成初始盲審判斷後，ChatGPT 協助語言編輯及揭盲後質性分析。我審閱並接受了該分析及其限定。Codex 協助將補充結果整合至英文及繁體中文報告。這些協助並未產生或取代初始人工判斷。"
      ]
    },
    {
      "id": "verification",
      "title": "我的貢獻與核驗",
      "paragraphs": [
        "我確定了研究題目，並在批准五個類別、D1–D5 判定規則及標註協議前審閱了分析框架。我親自核查了 50 條隨機抽選的記錄，包括其來源，以及英語—中文和英語—匈牙利語的對應關係。我亦複核了 Pilot 分類，並批准五項最終決定，其中四項更改了原有主要類別。原始判斷與其後修訂分開保存。",
        "原始標註層保留 450 條僅 AI 標註記錄。其後另抽取 30 條診斷樣本，由我先作初始盲審判斷，再於揭盲後對照保存的 AI 標註。這不是對全部 450 條的獨立外部驗證。我接受了後續 AI 輔助分析及其中未解決的問題；本擴展只有 BR015 的揭盲後類別復議獲明確確認。原始判斷、標註及來源標誌均保持不變。"
      ]
    },
    {
      "id": "prompts",
      "title": "有效提示語示例",
      "paragraphs": [
        "一項已保存的標註指令是：",
        "*“Evaluate EN–ZH and EN–HU separately, then apply D1–D5. Use exactly the five main categories. Routine grammar and conventional idioms do not automatically create variation.”*",
        "這有助於貫徹一致的判定程序，並減少僅憑表面差異而作出、缺乏支持的分類。",
        "在網站核驗期間，我亦指示 Codex 重現舊版 `group` 參數與較新的 `phenomenonGroup` 篩選器之間的一項具體衝突，再修正不一致的 Heatmap 顯示，並加入回歸測試。"
      ]
    },
    {
      "id": "learning",
      "title": "一項 AI 錯誤與我的反思",
      "paragraphs": [
        "對 Codex 建置的網站進行的獨立審核發現了一項篩選錯誤：選中的記錄屬於語用（Pragmatics）組，但 Heatmap 卻顯示內容（Content）組的標籤。我根據審核證據，要求提供可重現的修復及後續測試。這顯示網站即使看似正常運作，仍可能呈現具誤導性的分析結果。",
        "這個專題讓我學會把 AI 視為實作及初步分析的工具，而非翻譯品質的獨立權威。我的責任是訂立清晰準則、核驗證據、質疑缺乏支持的解讀，並記錄 AI 輔助工作的優點與限制。"
      ]
    }
  ]
};

export const examplePrompts = [
  {
    text: 'Evaluate EN–ZH and EN–HU separately, then apply D1–D5. Use exactly the five main categories. Routine grammar and conventional idioms do not automatically create variation.',
    source: 'config/annotation_prompt.md',
    explanation: bi('Actual saved annotation instruction: separate pair judgments before selecting the triple category.', '實際保存的標註指令：先分別判斷兩組對應，再選擇三語主類別。'),
  },
  {
    text: 'Do not supply human_checked, researcher approval or completed source-verification claims. The pipeline labels every new AI annotation human_checked=no.',
    source: 'config/annotation_prompt.md',
    explanation: bi('Actual saved instruction separating model suggestions from human verification.', '實際保存的指令：把模型建議與人工核驗分開。'),
  },
];

export const methodNotes = bi([
  'English is a reference pivot. Required direct EN–ZH and EN–HU links share one English ID; a ZH–HU link is never inferred. The saved sample contains only two explicit direct ZH–HU links.',
  'Raw Pilot pairwise labels and newer v0.2 labels belong to different vocabularies. Raw values are preserved and any display grouping must be documented; a legacy potential-divergence value is not automatically the triple category Divergent Interpretations.',
  'Heatmap cells count distinct record IDs once per documented phenomenon. Multiple tags can make row totals exceed the number of records. Missing or absent documentation is not proof of no linguistic issue and is shown explicitly.',
  'KWIC displays individual matching occurrences with original left/right context and linked trilingual sentence evidence. This viewer uses literal substring matching; the separate offline English frequency study counts exact tokens. Occurrence counts are separate from distinct-record counts. Context sorting compares Unicode characters, not segmented Chinese words or cross-language word alignment.',
  'Content-sensitive sentences are retained as authentic corpus records and marked for informed viewing. The display flag is not a semantic classification or a claim that an exhaustive sensitivity audit has been performed.',
  'Source verification identified 0 extraction or linkage errors in the 50 manually checked records, as confirmed by the sole researcher. Linguistic issues and classification inconsistencies are recorded separately; five approved category overlays are not five source-data errors.',
], [
  '英語是比較參照。必要的英中及英匈直接連結共用同一英語 ID；不會由此推斷中文—匈牙利語連結。保存樣本中只有兩條有明確中文—匈牙利語直接連結。',
  'Pilot 原始雙語標籤與較新的 v0.2 標籤屬不同詞彙系統。原值須保留，任何顯示分組均須說明；舊版 potential divergence 不會自動等於三語主類別解釋分歧。',
  '熱圖每格按記錄的現象計算不同 record_id，同一現象每條只計一次。多標籤可令合計超過記錄數；未有輔助標籤記錄不代表沒有語言問題；這種記錄狀態亦會明確顯示。',
  'KWIC 逐次展示命中片段、原文左右語境及連結的三語句子證據。此檢視採字面子串比對，另行執行的離線英語詞頻分析才按完整詞項（token）作完全匹配計數。出現次數與不同記錄數分開計算。語境排序比較 Unicode 字元，不作中文斷詞或跨語言詞對齊。',
  '可能敏感的句子作為真實語料保留，並標記以供知情閱覽。展示標記不是語義分類，也不聲稱已完成全面敏感內容審核。',
  '唯一研究者已確認，50 條人工核驗記錄的抽取或連結錯誤為 0。語言問題及分類不一致另行記錄；五項批准的分類覆蓋決定，不是五項來源資料錯誤。',
]);
