# Anime Apocalypse (AAP) — Documentation Reboot

**Canonical documentation subtree / Documentation baseline**

โฟลเดอร์นี้เก็บฐานเอกสาร v0.2.2 ที่ได้รับมา ซึ่ง ZIP ต้นทางเป็น `DOCS-ONLY` และไม่มี source code, package files, migrations, database dumps, credentials หรือ deployment artifacts จากโปรเจกต์เดิม ในโปรเจกต์รวมปัจจุบัน implementation ของ `P1-UI-001` อยู่แยกในโฟลเดอร์พี่น้อง `AAP_UI_P1/`; การรวมโค้ดใหม่ไม่ได้หมายถึงการนำฐานข้อมูลหรือบริการจริงกลับมาใช้

## อ่านตามลำดับ

1. [`AGENTS.md`](AGENTS.md) — กติกาการทำงานของ AI และการคุม Scope
2. [`product/01_VISION.md`](product/01_VISION.md) — เกมคืออะไรและตั้งใจให้ผู้เล่นรู้สึกอย่างไร
3. [`product/02_SCOPE.md`](product/02_SCOPE.md) — ฟีเจอร์ทั้งหมดที่ต้องรักษาและสิ่งที่ปิดในช่วงเปิดตัว
4. [`product/04_SYSTEMS_MAP.md`](product/04_SYSTEMS_MAP.md) — ระบบ 33 ระบบและความเชื่อมโยง
5. [`rules/01_GLOBAL_INVARIANTS.md`](rules/01_GLOBAL_INVARIANTS.md) และ [`rules/02_CROSS_SYSTEM_CONTRACTS.md`](rules/02_CROSS_SYSTEM_CONTRACTS.md) — กฎที่ห้ามระบบย่อยขัดกัน
6. [`delivery/01_ROADMAP.md`](delivery/01_ROADMAP.md) — Phase ใหม่ 0–6
7. [`decisions/01_DECISION_REGISTER.md`](decisions/01_DECISION_REGISTER.md) — ดัชนี AI-DEC เดิมและตำแหน่งเจ้าของกฎในเอกสารใหม่
8. [`delivery/03_NEXT_TASK.md`](delivery/03_NEXT_TASK.md) — สถานะ Task ปัจจุบันและจุด Resume; ใช้ Task ID ที่ระบุในไฟล์นี้
9. [`delivery/06_TASK_BOARD_WORKFLOW.md`](delivery/06_TASK_BOARD_WORKFLOW.md) — วิธีใช้ Trello, กู้คืนงานหลัง timeout และส่ง Owner Action Task เมื่อ environment ติดขัด
10. [`delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`](delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md) — master matrix ของทุก Phase/Bound, dependencies, evidence และ stop rules
11. [`delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md`](delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md) — source inventory ของ legacy §10 จำนวน 379 test IDs; ไม่ใช่ผลทดสอบ
12. [`delivery/08_REUSABLE_PROMPTS_TH.md`](delivery/08_REUSABLE_PROMPTS_TH.md) — คำสั่งเริ่มงาน bounded, ทำต่อ, กู้คืนหลัง timeout และขอให้เจ้าของช่วยตรวจแบบเป็นขั้นตอนเมื่อจำเป็น
13. [`experience/04_PHASE1_WIREFLOW.md`](experience/04_PHASE1_WIREFLOW.md) — wireflow แรกพร้อมหน้าจอ/สถานะ/เกณฑ์
14. [`delivery/05_DOC001_AUDIT.md`](delivery/05_DOC001_AUDIT.md) — ผลตรวจ DOC-001 และขอบเขตที่ผ่าน
15. [`delivery/07_P1_UI_PROTOTYPE_TASK.md`](delivery/07_P1_UI_PROTOTYPE_TASK.md) — งานแรก `P1-UI-001` คือ scaffold/shell เท่านั้น
16. [`delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md) — ข้อกำหนดรายงานบน Trello เป็นภาษาไทย โดยคงรหัสและหลักฐานทางเทคนิคเดิม
17. [`delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md) — project layout, repository-first handoff และใช้ ZIP เฉพาะ milestone/release/fallback
18. [`delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`](delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md) — วิธีใช้ Windows checkout/Remote Desktop/CI ให้ Agent ตรวจเองมากที่สุด ลดการทดสอบซ้ำ การคัดลอก log และ commit ถี่เกินไป

## ชื่อไฟล์ระบบและรหัสอ้างอิง

ไฟล์ระบบใช้ชื่อแบบอ่านรู้เรื่อง เช่น `turn-based-combat.md` แทนชื่อเลขล้วน เพื่อให้คนและ AI ค้นเจอได้ง่าย แต่ `SYS-07` ยังคงเป็นรหัสถาวรสำหรับแผนผัง การอ้างอิงและการส่งงาน ถ้าชื่อระบบเปลี่ยน ให้ปรับชื่อไฟล์/ลิงก์ แต่ไม่เปลี่ยน SYS-ID เดิมหรือใช้ ID ซ้ำ

เปิด [`delivery/04_REQUIREMENTS_TRACEABILITY.md`](delivery/04_REQUIREMENTS_TRACEABILITY.md) เพื่อดูรหัส acceptance criteria ของแต่ละระบบ รหัสดังกล่าวคือข้อกำหนดที่จะต้องตรวจในอนาคต ไม่ใช่ผลทดสอบที่ทำไปแล้ว

## Authority model

- `product/`, `rules/`, `systems/`, `experience/`, `balance/` กำหนด **กฎปัจจุบันของเอกสารชุดใหม่** ตามหน้าที่ของแต่ละไฟล์
- `decisions/01_DECISION_REGISTER.md` เป็นดัชนีที่มา ไม่ใช่สถานที่เขียนกฎเต็มซ้ำ
- `delivery/01_ROADMAP.md` กำหนดลำดับส่งมอบ แต่ไม่มีสิทธิ์เปลี่ยนกฎระบบ
- ไฟล์ SoT เก่าและบทสนทนาที่ใช้ย้ายเป็น **ต้นทางอ้างอิงนอกแพ็กเกจนี้** ไม่ใช่กฎที่ AI ต้องโหลดทุกครั้ง และห้ามนำข้อความ Historical/Superseded กลับมาเป็นข้อกำหนดปัจจุบันโดยไม่ตรวจ

## Workspace และ repository-first handoff

ZIP เริ่มต้นนี้เป็นเอกสารล้วน เพราะตอนจัดทำ baseline ยังไม่มี Source Code ที่จะใส่มาด้วย ขอบเขตนี้เป็นกฎของ **โฟลเดอร์เอกสาร** ไม่ใช่การห้ามสร้าง implementation ใน Project Root: `AAP_Documentation_Reboot/` ต้องเก็บเอกสารเท่านั้นและห้ามวาง source code ไว้ภายใน ส่วน implementation ที่ได้รับอนุญาต เช่น `AAP_UI_P1/` ต้องเป็นโฟลเดอร์พี่น้อง (sibling) ของ `AAP_Documentation_Reboot/` ภายใต้ Project Root เดียวกัน

เมื่อ repository AAP เดิมเข้าถึงได้และได้รับอนุญาต ให้ใช้ branch/commit/PR และ CI artifacts เป็น handoff ปกติ โดยไม่สร้าง ZIP ทุก Task. ใช้ ZIP รวม docs+code สำหรับ milestone/release, คำขอเจ้าของ หรือ fallback ที่จำเป็นเมื่อ repository integration ยังถูกบล็อกเท่านั้น ดู [`delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).

ส่วนรายงานบน Trello ที่เจ้าของต้องอ่าน (สถานะ ความคืบหน้า blocker หลักฐานและ handoff) ให้เป็นภาษาไทย แต่ต้องคง Task ID, ชื่อ List มาตรฐาน, paths, commands และ error strings ที่จำเป็นให้คัดลอกได้ตรงตาม [`delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md).

## สถานะ Workflow Automation & GitHub CI Setup

Task ปัจจุบันคือ [`delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md`](delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md). Bootstrap สำเร็จ: `main` ชี้ไปที่ `ac893af3b772100477a9ddcb652bacde2987116c`, และ [AAP UI CI run #1](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282) ผ่านบน SHA เดียวกัน โดย npm ci, lint, unit tests, typecheck, static scope audit และ production build ผ่าน. บน automation branch เพิ่ม Playwright smoke tests แล้วและ Windows local run ผ่าน 2/2; ยังต้อง push implementation และยืนยันผล browser CI บน SHA นั้น รวมถึงตรวจ failure artifacts และ Required Status Checks/branch protection. ใช้ [`delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`](delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md) เป็นแนวทางทำงานผ่าน Windows checkout และ CI เพื่อลด Owner Action. ห้ามเริ่ม `P1-UI-002` อัตโนมัติ.

## วิธีแนบเอกสารให้ AI อย่างไม่หลุด Scope

อย่าถือว่า AI ทุกแพลตฟอร์มจะอ่าน `AGENTS.md` หรือเอกสารในโฟลเดอร์โดยอัตโนมัติ ก่อนเริ่มแต่ละงาน ให้ส่ง `README.md`, `AGENTS.md`, `delivery/03_NEXT_TASK.md` และเฉพาะ owner files/contracts ที่ task ระบุไว้ หากแพลตฟอร์มรองรับ repository/path-specific instructions ค่อยตั้งค่าเพิ่มเติมตามเอกสารของแพลตฟอร์มนั้น; ไม่ควรเพิ่ม instruction files เฉพาะเครื่องมือที่ไม่ได้ใช้งานจริง.

## วิธีป้องกันการวิ่งยาวจน Timeout

งานหนึ่งครั้งให้ agent ทำ **หนึ่ง bounded Task** เท่านั้น: ทำงาน → ตรวจ → แก้ใน scope → checkpoint → ส่ง Review หรือ Blocked แล้วหยุด. ไม่ต้องเริ่ม Task ถัดไปเอง. หากใกล้ context/time limit ให้บันทึก checkpoint ก่อนหยุด. สถานะที่เชื่อถือได้หลัง interruption คือไฟล์, diff, test output และ checkpoint ไม่ใช่ hidden model analysis.

## วิธีจัดการเมื่อติดตั้ง dependencies ไม่ได้

ใช้ลำดับ **Agent environment → GitHub-hosted environment/Actions (ถ้ามีสิทธิ์จริง) → Owner Action Task**. เมื่อติด error เครือข่าย/DNS เช่น `EAI_AGAIN` อย่ารันซ้ำแบบเดิมหลายรอบหรือข้าม acceptance. ถ้า GitHub fallback ใช้ไม่ได้หรือยัง fail ให้ agent หยุด retry และส่งชุดคำสั่งให้เจ้าของรัน/ตรวจเพียงครั้งเดียว โดยระบุโฟลเดอร์ที่ถูกต้อง, คำสั่งตาม `package.json`/lockfile จริง, ผลที่คาดหวัง และ output ที่ต้องส่งกลับ. ถ้าเป็น blocker เดิม ห้ามถามซ้ำ เว้นแต่ผลใหม่จะชี้ว่าต้องตรวจคนละจุด. ดูขั้นตอนเต็มใน [`delivery/06_TASK_BOARD_WORKFLOW.md`](delivery/06_TASK_BOARD_WORKFLOW.md) และ [`delivery/07_P1_UI_PROTOTYPE_TASK.md`](delivery/07_P1_UI_PROTOTYPE_TASK.md).

## เริ่มเขียนโค้ดได้เมื่อใด

ไม่จำเป็นต้องปิดการตรวจเชิงความหมายของระบบ Phase 3–6 ทั้งหมดก่อนเริ่ม Phase 1 prototype. ต้องทำ `DOC-001` ให้ชัดเจนเฉพาะ acceptance criteria และสัญญาที่ UI prototype ใช้ แล้วจึงสร้าง task แยกสำหรับ implementation. `DOC-001` ไม่เขียนโค้ดด้วยตัวเอง แต่ไม่ได้ห้ามงาน implementation ที่เจ้าของอนุมัติแยกต่างหาก.

## สถานะที่ต้องเข้าใจ

เอกสารชุดนี้มี baseline **Reboot v0.2.2** ซึ่งกำหนด single-project / single-ZIP handoff และรายงาน Trello ภาษาไทย ZIP ต้นทางเป็น documentation-only ตามบริบทก่อนเริ่ม implementation; handoff ปัจจุบันเพิ่ม shell สำหรับ `P1-UI-001` ใน `../AAP_UI_P1/` และหลักฐานไว้ใน `../evidence/` เท่านั้น ยังไม่ใช่หลักฐานว่าเกมถูก implement ครบ เล่นได้ มี backend/persistence สมดุล หรือผ่าน Runtime Tests แล้ว และไม่มีการยืนยันว่าเชื่อม Trello จริง ตัวเลขจาก AI-DEC เป็นค่าออกแบบเริ่มต้น ไม่ใช่ owner-confirmed เว้นแต่เจ้าของยืนยันเอง

## กติกาสำคัญของการย้าย

เก็บ Content เกมทั้งหมดไว้ในขอบเขตการออกแบบ แม้ยังไม่ถึง Phase; จัดเจ้าของกฎเพียงแห่งเดียว; ใช้การอ้างอิงระหว่างระบบแทนการคัดลอก; แยก Design Decision ออกจาก Test Evidence; และเริ่มด้วย Vertical Slice ที่พิสูจน์ UI/เกมเพลย์ก่อนขยายระบบ


## เหตุผลของโครงสร้างเอกสารนี้ (แนวทางภายนอก)

โครงสร้างนี้ใช้เฉพาะแนวปฏิบัติที่ช่วยลดความสับสนจริง ไม่ได้เพิ่มเอกสารเพียงเพื่อให้ดูเป็นระบบ:

- **กติกากลาง + เอกสารเฉพาะ Path/ระบบ:** GitHub อธิบายว่า repository-wide instructions ใช้กับทุกคำขอ ส่วน path-specific instructions ช่วยไม่ให้โหลดคำสั่งที่ไม่เกี่ยวกับไฟล์ที่กำลังทำงาน ([GitHub Docs](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)). ในโปรเจกต์นี้ `AGENTS.md` จึงมีหลักการสั้น ๆ ขณะที่ `systems/` เก็บรายละเอียดตามเจ้าของกฎ
- **Traceability ย้อนกลับและไปข้างหน้า:** NASA แนะนำให้เชื่อมข้อกำหนดกับข้อกำหนดต้นทาง องค์ประกอบที่ได้รับมอบหมาย วิธี verification และหลักฐาน รวมทั้งตรวจ coverage ของ requirement ระดับบน ([NASA — Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/)). `delivery/04_REQUIREMENTS_TRACEABILITY.md` เป็น current AC registry; ก่อน implement แต่ละ Phase ต้อง map source tests กับ exact current criterion และ evidence ใน phase-entry gate
- **Decision record แบบสั้นที่มีเจ้าของชัด:** Martin Fowler แนะนำให้บันทึก context/decision/consequences และไม่เขียนทับประวัติเมื่อการตัดสินใจถูกแทนที่ แต่ให้เชื่อมไปยัง decision ใหม่ ([Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)). `decisions/01_DECISION_REGISTER.md` จึงเป็น index ที่มาของ AI-DEC ไม่ใช่สำเนากฎอีกชุด
- **ไม่สร้างแผนภาพ/เอกสารแยกทุกชั้นโดยไม่จำเป็น:** C4 ระบุว่าไม่จำเป็นต้องใช้แผนภาพทุกระดับ หากไม่ได้เพิ่มคุณค่า ([C4 Model — Diagrams](https://c4model.com/diagrams)). ในโปรเจกต์นี้ยังไม่เพิ่มไฟล์แยกสำหรับทุก topic/ทุก decision; ค่อยเพิ่มเฉพาะเมื่อมีงานจริงที่ต้องใช้

แนวทางเหล่านี้สนับสนุนวิธีจัดข้อมูล แต่ไม่ได้พิสูจน์ว่า Content เกมย้ายครบแล้ว DOC-001 ได้ทำ clause-level mapping สำหรับ UI-P1-01…UI-P1-16 แล้ว แต่ยังไม่มีผล runtime/UI test; ระบบ Phase 2–6 ต้องผ่าน source/acceptance gate ของ Phase ตัวเองก่อน implementation ไม่จำเป็นต้องบล็อก P1 ด้วยกฎอนาคตที่ไม่ได้อยู่ใน UI prototype

## Bound readiness vs product readiness

The matrix defines bounded outcomes and evidence gates across the current roadmap. A completed matrix row is a work contract, not proof the code exists or its tests pass. All legacy §10 tests in `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` remain NOT RUN IN REBOOT until actual execution.

## Blocker recovery and resumable Owner Action

Known Agent DNS rule: once `EAI_AGAIN` is evidenced in the same Agent Environment, do not retry `npm ci`/`npm install` there unless fresh diagnostics show DNS/network settings or connectivity changed. Use `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) distinct from code/configuration failure; do not infer a ChatGPT-wide outage. If an authorized GitHub Actions route is genuinely unavailable, send one consolidated Owner Action against the owner's existing Windows checkout and preserve working `node_modules` while the lockfile is unchanged. Return exact command exit codes and Browser evidence/`NOT RUN`; resume the same Task at its first incomplete criterion.

A blocked Task must not stop at “wait for DNS/network to recover.” The agent must classify the cause from actual evidence as `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER`; fix in-scope code/config defects; verify an authorized GitHub-hosted route if one can actually be accessed; and otherwise issue exactly one actionable Owner Action set on the existing Task. Include the known Project Root/working directory, ordered commands and expected outputs, exactly what output/files the owner should return and through which task/chat or attachment, the Checkpoint/Owner Action paths, and the first incomplete criterion where the agent will resume the same Task. Do not ask the owner to repeat successful install/checks in the same checkout with an unchanged lockfile unless a technical reason is recorded. ZIP integrity or Build success alone does not mean Task acceptance; report each check separately. Canonical details live in [`AGENTS.md`](AGENTS.md), [`delivery/06_TASK_BOARD_WORKFLOW.md`](delivery/06_TASK_BOARD_WORKFLOW.md), [`delivery/08_REUSABLE_PROMPTS_TH.md`](delivery/08_REUSABLE_PROMPTS_TH.md), [`delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md), and [`delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).


### Owner Action commands must be ready to run
A blocker handoff must use the actual ZIP/Project Root/working-directory paths from inspected files or the owner's output. Never present `C:\path\to\...` placeholders as executable commands. If a step fails because the previous instruction had a placeholder or incorrect relative path, correct the existing Owner Action and the Thai Trello comment with a plain-language explanation, the exact replacement command, expected output and return instructions. See `AGENTS.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md` and `CHECKLIST_FOR_REVIEW.md`.

## กติกา DOC-WF-001 — ส่ง Owner Action ที่ใช้ได้จริง

งานด้าน Blocker/Owner Action มีข้อกำหนดถาวรใน [`delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`](delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md). ห้ามส่ง path ตัวอย่างเป็นคำสั่งพร้อมรัน; ถ้า Agent ให้คำสั่งผิดต้องแก้ Owner Action และ Trello comment เดิมด้วย path จริง. ไม่ retry npm install ใน Agent Environment ที่ยืนยัน DNS blocker เดิม และไม่ขอให้ owner ติดตั้งซ้ำเมื่อ tools ใช้งานได้และ lockfile ไม่เปลี่ยน. `DOC-WF-001` เป็น gate ก่อน `P1-UI-002`; Task ถัดไปไม่เริ่มเอง.
