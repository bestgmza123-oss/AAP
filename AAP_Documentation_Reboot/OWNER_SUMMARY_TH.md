# สถานะโครงการ AAP และ Workflow Automation — 27 ตุลาคม 2026

**สถานะ: ACCEPTED สำหรับขอบเขต P1-UI-001 (frontend scaffold + shell prototype)**. ผล Windows ที่เคยผูกกับ source revision ผ่านครบ: `node --check`, lint (Exit 0 มี 4 warnings ใน reduced-motion CSS), Tests 4/4, Typecheck, Scope Audit และ Build. หลักฐาน Browser ที่เจ้าของส่งมาแสดง root shell และ unknown-route placeholder; ข้อจำกัด pathname บันทึกไว้ใน `evidence/browser-smoke-evidence.md`. อย่ารันซ้ำโดยไม่มี source/configuration change.

**Current workflow gate:** initial source bootstrap สำเร็จแล้ว. Remote `main` ตรงกับ commit `ac893af3b772100477a9ddcb652bacde2987116c`; [AAP UI CI run #1](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282) จบด้วย `success` บน SHA เดียวกัน โดย npm ci, lint, unit tests, typecheck, static scope audit และ production build ผ่าน. Playwright/E2E, failure artifacts และ branch protection/Required Status Checks ยังไม่ยืนยัน. แนวทางใช้ Windows checkout/Remote Desktop/CI เพื่อลดงานทดสอบและ commit ของเจ้าของอยู่ใน [`delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`](delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md). **อย่าเริ่ม `P1-UI-002` อัตโนมัติ.**

ได้รับและตรวจ screenshot composite แล้ว: panel ขวาแสดง shell heading `The shell is in place.`, `P1-UI-001` และ boundary banner ที่กำหนด; panel ซ้ายแสดง `Route not implemented` และ `Return to shell`. เก็บภาพต้นฉบับและ crops ไว้ใน `evidence/browser-smoke-combined.png`, `evidence/browser-root.png`, `evidence/browser-unknown-route.png`; ที่อยู่ URL แบบเต็มไม่ปรากฏในภาพ จึงบันทึก Browser เป็น PASS สำหรับ rendered UI states และระบุข้อจำกัดด้าน pathname ไว้ใน `evidence/browser-smoke-evidence.md`. `DOC-WF-001` เสร็จแล้ว; ห้ามเริ่ม `P1-UI-002` อัตโนมัติ.

---

# สรุปโครงการ AAP สำหรับเจ้าของ (ฉบับเริ่มใหม่)

## กติกา Environment Blocker ที่ต้องใช้ถาวร

เมื่อ Agent Environment พบ `EAI_AGAIN` กับ npm registry แล้ว ให้หยุด retry `npm ci`/`npm install` ใน environment เดิม เว้นแต่มี diagnostic ใหม่ที่พิสูจน์ว่า DNS/network settings หรือ connectivity เปลี่ยน จัดสถานะเป็น `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) แยกจาก Code Failure และห้ามสรุปว่า ChatGPT Server ทั้งระบบขัดข้องโดยไม่มีหลักฐาน ให้ตรวจ GitHub Actions ที่เข้าถึง/ได้รับอนุญาตจริง; ถ้าใช้ไม่ได้ ให้ส่ง Owner Action ชุดเดียวสำหรับ Windows checkout เดิม โดยเก็บ `node_modules` ที่ติดตั้งสำเร็จเมื่อ lockfile ไม่เปลี่ยน ผลจากคำสั่งให้ Agent อ่านผ่าน Remote Desktop/CI โดยตรงเมื่อทำได้; ขอให้เจ้าของส่งเฉพาะ output ที่เครื่องมืออ่านไม่ได้จริง ไม่ขอ transcript เต็มทุกครั้ง จากนั้น AI จะทำต่อจาก Checkpoint ของ Task เดิม ไม่ขอทดสอบซ้ำโดยไม่มีการเปลี่ยนแปลง และไม่เริ่ม Task ถัดไปอัตโนมัติ. ดู [`delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`](delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md).

## เข้าใจให้ตรงกันก่อน

ไฟล์ ZIP ตั้งต้น v0.2.2 เป็น **แพ็กเกจเอกสารล้วน ณ เวลาบูตสแตรป** ไม่ใช่ข้อกำหนดให้ส่ง ZIP ทุก Task. ห้ามวาง source code ภายใน `AAP_Documentation_Reboot/`; implementation ที่ได้รับอนุญาตอยู่ในโฟลเดอร์พี่น้องภายใต้ Project Root เดียวกัน. เมื่อ repository เดิมเข้าถึงได้ ให้ใช้ branch/commit/PR และ CI artifacts เป็น handoff ปกติ; ใช้ ZIP รวม docs+code เฉพาะ milestone/release, คำขอเจ้าของ หรือ documented repository-access fallback. จุดประสงค์คือให้ AI อ่านเฉพาะสิ่งที่ต้องใช้กับงาน และป้องกันประวัติเก่ากลายเป็นกฎใหม่โดยไม่ตั้งใจ.

`SOURCE_OF_TRUTH.md` เก่าใช้เป็นต้นทางเนื้อหาและรหัสอ้างอิงในการย้ายเท่านั้น **ไม่ได้รับรองว่าถูกทุกจุด** ส่วน `Doc.md` และ `Astrareply.md` เป็นบริบทการปรึกษาและแนวทางออกแบบโครงการเอกสารใหม่ ไม่ใช่ SoT เพิ่มอีกสองชุด

## ตัวเกมที่เก็บไว้

AAP คือเกม Browser RPG ธีม Anime Zombie Apocalypse เล่นผ่าน UI เป็นหลัก (UI-Driven) ต่อสู้แบบ Turn-based โลกและทรัพยากรเดินต่อเมื่อออฟไลน์ ผู้เล่นต้องจัดทรัพยากร ออกดัน ต่อสู้ เลือก Loot ตามน้ำหนัก กลับมารักษาตัว คราฟและพัฒนาชีวิต ก่อนขยายไปสู่บ้าน ตลาด ผู้ช่วย กิลด์และการแข่งขัน

วงจรหลักคือ **Prepare → Province → Run Preflight → Combat → Loot Selection → Return Encounter (ถ้ามี) → Result → Province**

## สิ่งที่ยืนยันไว้ในฐานใหม่

- ภาษา UI เริ่มต้นเป็น **English** แต่ทุกข้อความต้องรองรับ Localization ตั้งแต่โครงสร้างแรก
- **UI-Driven และความสวย/ใช้งานง่ายเป็นเกณฑ์รับงานตั้งแต่ Phase 1** ไม่ใช่ของตกแต่งท้ายโปรเจกต์
- เปลี่ยนชื่อผู้เล่นเห็นจาก `Satiety` เป็น **Hunger** แต่คงความหมายเดิมในฐานนี้: 100 = อิ่มเต็ม, ค่าลดตามเวลา, 0 = ตาย จนกว่าจะมีคำสั่งเปลี่ยนกลไกอย่างชัดเจน
- เก็บฟีเจอร์ระยะยาวทั้ง 33 ระบบไว้ ไม่มีระบบไหนถูกลบเพียงเพราะยังไม่ทำในรุ่นแรก
- Phase 1 และ Phase 2 เป็น Private/Internal Test เท่านั้น Public/Shared Test เริ่มพิจารณาได้เร็วสุดหลัง Phase 3 และต้องผ่านเงื่อนไขความปลอดภัย การกู้คืนข้อมูล Hunger/Fridge การตาย/ทรัพย์สิน และ Support/Operations ก่อน
- ระบบชำระเงินจริง Paid Gacha, Cash-out, Diamond-to-Shard และ Paid Raid Token refill ปิดไว้สำหรับ Launch; การเกษตรและหลายฟีเจอร์ที่ระบุว่าไม่อนุมัติไม่ถูกเพิ่มเอง

## Phase ใหม่

| Phase | เป้าหมาย |
|---|---|
| 0 | จัดระบบเอกสารและตรวจความเชื่อมโยง |
| 1 | พิสูจน์ UI vertical slice ของวงจรดัน/ต่อสู้/Loot |
| 2 | ทำ Survival Core จริงแบบ Private: ทรัพยากร การตาย Inventory Run และเวลา |
| 3 | ชีวิตต่อเนื่อง: Auth, Tutorial, Home/Fridge, Travel และบริการ NPC; เป็นจุดเริ่มพิจารณา Public ได้เท่านั้น |
| 4 | เศรษฐกิจและ Progression: อุปกรณ์เต็ม ตลาด Bank/Delivery, Class/Trait, Season/Simulation/Job Board |
| 5 | Companion, Robot, Guild, คลังร่วมและ Trade |
| 6 | Raid, Zombie Invasion, Guild Competition และ Auction |

## วิธีเปิดใช้โปรเจกต์นี้กับ AI

เริ่มจาก `README.md` และ `AGENTS.md` จากนั้นให้ทำงานตาม [`delivery/03_NEXT_TASK.md`](delivery/03_NEXT_TASK.md) ก่อนเริ่มเขียนรายละเอียด Screen Flow ของ Phase 1 อย่าสั่งให้ AI “ทำทุกอย่างให้เสร็จ” ในคำสั่งเดียว และอย่าให้แก้ Database/Code ในขั้นที่เป็นเอกสาร

งานแต่ละชิ้นต้องระบุเอกสารที่ต้องอ่าน Scope, สิ่งที่ห้ามทำ, เกณฑ์ตรวจรับและหลักฐานที่ต้องส่งกลับ กฎของแต่ละระบบมีเจ้าของเอกสารเพียงแห่งเดียว ส่วนกฎที่เชื่อมหลายระบบอยู่ใน Cross-System Contracts

## ถ้า AI ติดตั้ง dependencies ไม่ได้

กติกา recovery จาก v0.2.0 ยังคงใช้ลำดับเดียวกันทุกครั้ง: (1) ตรวจและลองใน Agent environment แบบจำกัดจำนวนครั้ง (2) ถ้ามีสิทธิ์/เครื่องมือจริงให้ลอง GitHub-hosted environment หรือ GitHub Actions (3) ถ้ายังติดหรือใช้ GitHub ไม่ได้ ให้หยุด retry แล้วส่ง **Owner Action Task** ชุดเดียวที่บอกว่าเปิด terminal ที่ไหน ต้องรันคำสั่งอะไร ผลที่คาดหวังคืออะไร และต้องคัดลอก output ส่วนใดกลับมา. ไม่ให้คุณลองคำสั่งเดิมซ้ำหลายครั้ง และไม่ให้ agent ข้ามเกณฑ์ตรวจหรืออ้างว่าผ่านโดยไม่มีหลักฐาน. เมื่อคุณส่งผลกลับมา agent ต้องทำต่อใน Task เดิม ไม่เริ่ม Task ถัดไปอัตโนมัติ.

## ความซื่อสัตย์ของสถานะ

นี่คือ **Reboot Baseline v0.2.2 พร้อม workflow policy ล่าสุด**: คง execution contract และ recovery ladder จาก v0.2.0, ทำงานใน Project Root เดียวที่แยก docs/code เป็น sibling, ใช้ Repository/branch/commit/PR/CI artifacts เป็นเส้นทางปกติเมื่อเชื่อมได้ และส่ง ZIP รวมเฉพาะ milestone/release/คำขอเจ้าของ/documented fallback; รายงาน Trello ภาษาไทยตามหลักฐาน: Agent environment → GitHub-hosted environment/Actions ที่เข้าถึงได้จริง → Owner Action Task แบบรวมครั้งเดียว. ไม่ใช่เกมที่สร้างเสร็จหรือผ่านการทดสอบแล้ว ในแพ็กเกจมีแผนผังครอบคลุม 33 ระบบ ทะเบียน AI-DEC 201–263 และ acceptance criteria แบบมีรหัสต่อระบบเพื่อใช้เชื่อมข้อกำหนดกับการทดสอบในอนาคต การเพิ่มรหัสเหล่านี้ไม่ได้แปลว่ามีการรัน test แล้ว หรือพิสูจน์ว่ากฎทุกข้อใน SoT เก่าถูกตรวจใหม่ครบทีละบรรทัด. เพื่อไม่ให้เสีย Token/เวลา งาน AI หนึ่ง invocation ให้ทำเพียงหนึ่ง bounded Task แล้วหยุดเมื่อถึง acceptance หรือ checkpoint; ไม่ต้องวิ่งต่อจน Timeout ส่วนไฟล์ระบบตั้งชื่อตามเนื้อหาเพื่อให้ค้นง่าย โดยคง `SYS-01`…`SYS-33` เป็นรหัสอ้างอิงถาวร


## เหตุผลที่ชื่อไฟล์เป็นชื่อระบบ

ไฟล์ใช้ชื่อที่อ่านแล้วรู้ว่าระบบทำอะไร เช่น `turn-based-combat.md` และ `hunger-fridge.md` ไม่ใช้ `SYS-07.md` เพราะเลขอย่างเดียวค้นหา/สแกนยากกว่า รหัส `SYS-07` ยังคงอยู่ในหัวข้อ แผนผัง และ traceability เพื่อให้รหัสอ้างอิงคงที่แม้เปลี่ยนชื่อไฟล์ได้

## ผลตรวจเอกสารรอบละเอียด

ดู `delivery/05_DOC001_AUDIT.md` ซึ่งแยก structural pass ออกจาก semantic completeness อย่างชัดเจน มีการแก้ข้อมูลที่ขาดในกฎ Account/Mail, EXP, ตลาด, บ้าน/หมดสัญญา, Invasion, Season Voucher, Vehicle, durability, Skill Shard, Trade, Job Board, Guild และ Guild Base แล้ว แต่ยังไม่อ้างว่าตรวจความหมายทุกบรรทัดของ SoT เก่าครบ หรือมีการทดสอบ Runtime ใด ๆ


## สถานะล่าสุดหลังตรวจ DOC-001

- **DOC-001:** เสร็จแล้วสำหรับขอบเขตตรวจเอกสารที่ประกาศไว้ — ตรวจโครงสร้างระบบ 33 ระบบ, กฎเสี่ยงที่กระทบกัน, และสร้าง traceability แบบรายข้อสำหรับ UI prototype 16 ข้อ
- **เอกสารที่เพิ่ม:** `experience/04_PHASE1_WIREFLOW.md`, `delivery/07_P1_UI_PROTOTYPE_TASK.md`; `delivery/04_REQUIREMENTS_TRACEABILITY.md` มีแผนตรวจแยกสำหรับ `UI-P1-01…UI-P1-16` พร้อม rule/decision anchors และวิธีตรวจ; `delivery/08_REUSABLE_PROMPTS_TH.md` มีคำสั่งเริ่มงาน ทำงานต่อ และกู้คืนหลัง Timeout
- **เริ่มเขียนโค้ดได้:** Task ถัดไป `P1-UI-001` อนุญาตให้สร้าง React + TypeScript UI prototype ในพื้นที่ implementation แยก ใช้ local fixture เท่านั้น ยังไม่ต่อ Supabase และไม่อ้างว่ามีการบันทึกจริง
- **ยังไม่ผ่าน:** ยังไม่มีการสร้าง/ทดสอบ UI prototype, browser E2E, backend, database, build หรือ balance validation จากการตรวจ DOC-001 นี้
- **ข้อจำกัดการยืนยัน:** การตรวจนี้จัดสถานะรหัส Q/OI จาก Beta และ SoT ไว้ใน `decisions/03_SOURCE_COVERAGE.md` แต่ไม่อ้างว่าทุกประโยคของ SoT เก่า 6,395 บรรทัดได้รับการพิสูจน์ความเท่าเทียมเชิงความหมาย และไม่ใช้เรื่องนี้เป็นเงื่อนไขบล็อก UI prototype ที่กำหนดขอบเขตไว้แล้ว


## ผลตรวจแหล่ง Beta และ SoT เพิ่มเติม

มีการเทียบรายการ Open Questions 66 รหัสจาก Beta และ 42 รหัส Q/OI ที่เพิ่มใน legacy SoT รุ่นหลังไว้ใน `decisions/03_SOURCE_COVERAGE.md`. Q-08 safe logout ถูกปิดความกำกวมเชิงออกแบบด้วย AI-selected baseline ตามการมอบอำนาจของเจ้าของแล้ว แต่ยังต้องผ่าน runtime tests ก่อน Phase 3; การตรวจ Supabase/Auth/security/backup จริงก็ยังเป็น gate ก่อนเชื่อมระบบ. จึงไม่ถือว่าเกมทั้งโปรเจกต์เสร็จหรือได้รับการรับรองครบทุกเฟส. คะแนนที่ให้ในบทสนทนาจะไม่ถูกเขียนลงไฟล์โครงการ.


## สถานะ v0.2.0 (ประวัติ): ทุก Phase/Bound มี execution contract และ recovery ladder

- `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` เป็นดัชนีเดียวของ 65 bounded Tasks ครอบคลุม Phase 0–6; แต่ละ Task ระบุ outcome, dependency, owner systems, acceptance/test families, evidence และ stop condition.
- `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` เก็บ ID และ row definitions 379/379 จาก `SOURCE_OF_TRUTH.md` §10 พร้อม owner/phase/bound mapping. ทุกสถานะ runtime ยังเป็น `NOT RUN IN REBOOT` และ exact AC matching เป็นหน้าที่ของ `*-GATE-000` ก่อนเริ่ม Phase 2–6.
- Source SoT เก่าเป็น migration/reference input ไม่ใช่ authority ที่เหนือกว่าเอกสารปัจจุบัน. ข้อความ/สถานะเก่าต้อง reconcile; ไม่ส่งต่อ old PASS เข้า reboot.
- งานแรกยังคง `P1-UI-001` แต่ลดขอบเขตให้เป็น frontend scaffold/shell เท่านั้น แบ่ง UI slice เป็น 8 Bounds เพื่อเลี่ยง Timeout และ scope drift.
- **ไม่อ้างว่าตัวเกมพร้อม runtime:** ยังไม่ได้สร้าง P1 UI จากการแก้เอกสารนี้ และไม่มีผล browser E2E/backend/database/security/backup/restore/balance test ใหม่.


## สถานะ v0.2.2: โปรเจกต์เดียวและ ZIP ส่งมอบรวมชุดเดียว

- ZIP เริ่มต้นเป็น docs-only เพราะยังไม่มี Source Code ให้รวมมา; `AAP_Documentation_Reboot/` ต้องคงเป็นโฟลเดอร์เอกสารเท่านั้น ส่วน `AAP_UI_P1/` หรือ implementation ที่ได้รับอนุญาตอยู่เป็น sibling ภายใต้ Project Root เดียวกัน.
- การสร้าง Workspace ใหม่เป็นเรื่องปกติและไม่ได้หมายความว่าเอกสารถูกลบ ไม่จำเป็นต้องเก็บโค้ดและ docs เป็น ZIP แยกกัน.
- หลังมีโค้ดแล้ว ให้ส่ง **ZIP หลักหนึ่งไฟล์** ที่รวม `AAP_Documentation_Reboot/`, implementation folder, checkpoint, evidence ที่เกี่ยวข้อง และ Delivery README ภาษาไทย. แยกส่งเฉพาะเมื่อแพลตฟอร์มรวมไม่ได้จริงหรือเจ้าของร้องขอ.
- รายงานที่เจ้าของต้องอ่านบน Trello ต้องเป็นภาษาไทย ส่วน Task ID, ชื่อ List มาตรฐาน, paths, commands, errors และ test IDs ต้องคงตรงตามต้นฉบับ. ดู `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md` และ `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`.
- กติกาใหม่เป็นการเพิ่มความปลอดภัยของ workflow/การส่งมอบเท่านั้น ไม่ได้แก้โค้ดเกมหรือยืนยันว่าการติดตั้ง/build/test ผ่าน.
- กติกา Blocker ที่ต้องใช้ถาวร: agent ต้องจำแนกจากหลักฐานเป็น `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE` หรือ `PERMISSION_AUTH_BLOCKER`; ตรวจทางเลือก Agent → GitHub-hosted ที่เข้าถึง/ได้รับอนุญาตจริง → Owner Action แบบรวมชุดเดียว หากแก้ใน Scope ได้ต้องแก้ก่อน อย่าหยุดด้วยคำแนะนำให้รอ DNS อย่างเดียว. Owner Action ต้องบอก working directory, คำสั่งเรียงลำดับ, expected output, ไฟล์/Output ที่ต้องส่งกลับและช่องทาง, checkpoint และจุด resume ของ Task เดิม. อย่าขอให้ติดตั้งซ้ำเมื่อมีหลักฐานว่าติดตั้งสำเร็จใน checkout เดิมและ lockfile ไม่เปลี่ยน เว้นแต่มีเหตุผลทางเทคนิค.
- Trello `Blocked` ต้องเป็นภาษาไทยและมี Task ID, ผ่าน/ไม่ผ่าน/ยังไม่ตรวจ, error/หลักฐาน, คำสั่งและผลคาดหวัง, Output ที่ต้องส่งกลับ, Checkpoint/Owner Action path และเงื่อนไข resume. หาก integration/สิทธิ์ไม่พร้อม ให้ระบุ `TRELLO SYNC: NOT SYNCED` พร้อมข้อความพร้อมวางลงการ์ด. ZIP integrity หรือ Build ที่ผ่านเพียงอย่างเดียวไม่ใช่การปิด Task.

## กติกาถาวร DOC-WF-001 — Blocker และ Owner Action

- ถ้า Agent Environment เดิมแสดง `EAI_AGAIN` ให้หยุด retry ติดตั้งใน environment เดิม เว้นแต่มี diagnostic ใหม่พิสูจน์ว่าเครือข่าย/การตั้งค่าเปลี่ยนไป แยก `ENVIRONMENT_BLOCKED` ออกจาก Code/Configuration Failure และห้ามสรุปว่า ChatGPT ทั้งระบบมีปัญหา
- ตรวจ GitHub Actions เฉพาะเมื่อมี repository และสิทธิ์ที่เข้าถึงได้จริง หากไม่มี ให้ส่ง Owner Action แบบรวมชุดเดียวสำหรับ checkout Windows เดิม
- Owner Action ต้องใช้ path ที่ตรวจพบจริง, ระบุ Working Directory, คำสั่ง, expected output/exit code, ไฟล์ที่ต้องส่งกลับและช่องทาง, Checkpoint และจุด Resume. หากคำสั่งก่อนหน้าที่ AI ให้ผิด ต้องแก้คำสั่งและ Comment เดิม ไม่ส่งให้เจ้าของลองเดา path
- Trello Blocked ต้องเป็นภาษาไทย มีผ่าน/ไม่ผ่าน/NOT RUN และขั้นตอนที่ทำตามได้ ถ้าเขียน Trello ไม่สำเร็จให้ระบุ `TRELLO SYNC: NOT SYNCED` และส่งข้อความพร้อมวางลงการ์ด
- `DOC-WF-001` เสร็จและ `P1-UI-001` ได้รับการยอมรับแล้วจาก hash-verified code checks และ Browser visual evidence; Task ปัจจุบันคือ Workflow Automation & GitHub CI Setup และห้ามเริ่ม `P1-UI-002` โดยอัตโนมัติ
