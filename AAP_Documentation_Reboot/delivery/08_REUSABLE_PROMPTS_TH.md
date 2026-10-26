# Reusable Prompts — AAP (Thai)

## Persistent Environment Blocker rule

Do not retry `npm ci`/`npm install` in the same Agent Environment after `EAI_AGAIN` has been evidenced unless a new diagnostic proves DNS/network configuration or connectivity changed. Record this as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not `CODE_CONFIGURATION_FAILURE`, and do not claim that the whole ChatGPT service is down. Check real authorized GitHub Actions access; if unavailable, provide one consolidated Windows Owner Action for the existing checkout. Keep already-installed dependencies when `package-lock.json` is unchanged. The returned transcript and browser evidence resume this Task at its first incomplete acceptance criterion; do not start the next Task or ask for periodic duplicate tests.

ใช้ข้อความเหล่านี้เป็นวิธีสั่งงานมาตรฐาน **ไม่จำเป็นต้องส่งทุกข้อความทุกครั้ง** และไม่ควรใช้คำสั่งเดียวเพื่อบังคับให้ agent ทำหลาย Task/หลาย Phase ต่อเนื่องจนหมด context ไฟล์นี้เป็นแม่แบบคำสั่ง ไม่ใช่แหล่งกฎเกมซ้ำอีกชุดหนึ่ง

## 0. Repository-first / one source revision

> ก่อนแก้ไฟล์ ให้ตรวจ GitHub identity, repository access และสิทธิ์จริงแบบมีขอบเขต ค้น AAP จาก repository list และคำค้นชื่อโครงการที่ชัดเจนเพียงชุดเดียว หากเจ้าของ/เอกสาร/Trello มี canonical URL ให้เรียก get_repo ที่ URL นั้นโดยตรงก่อนตัดสินใจ เพราะ list/search ว่างไม่ได้พิสูจน์ว่าไม่มี repository; ถ้ามี repo แต่ว่างให้ใช้ `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER`, ถ้า URL เข้าไม่ได้จริงจึงใช้ `REPOSITORY_ACCESS_BLOCKED` ห้ามสร้าง/อ้าง repository ปลอมและห้ามแชร์ token ในแชท; ถ้า repo มีอยู่แต่ว่าง ให้ทำ source bootstrap ครั้งเดียวจาก canonical workspace ตาม `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`.
>
> เมื่อ repository เข้าถึงได้ ให้ทำบน branch เฉพาะ Task และอ้าง commit SHA ให้ชัดเจน รัน CI ที่ `npm ci` จาก lockfile แล้วเรียก scripts ที่มีจริงใน `AAP_UI_P1/package.json`: `lint`, `test`, `typecheck`, `audit:scope`, `build`. เพิ่ม Playwright smoke สำหรับ root shell และ unknown route หลัง dependency/config/test ถูก commit จริง; เก็บ report/screenshots/traces เป็น artifacts เมื่อ fail. ตรวจว่า PR head SHA, CI run SHA, reviewed diff และ evidence เป็น revision เดียวกัน. Required checks ต้องมี run result จริงก่อนตั้งและ read-back branch protection. ZIP ใช้เฉพาะ milestone/release/คำขอเจ้าของหรือข้อจำกัด repository integration ที่บันทึกไว้ ไม่ใช่ทุก task.
>
> Trello เป็น dashboard ภาษาไทย: อัปเดต URL ของ repository, branch, commit, PR, CI run/artifacts และ Next Action จริง. ห้ามสร้าง URL/รายงาน CI result ที่ไม่มีอยู่. ถ้า integration ใช้ไม่ได้ ให้เขียน `TRELLO SYNC: NOT SYNCED` พร้อมข้อความที่วางบนการ์ดได้.

## 1. คำสั่งเริ่มงานครั้งแรก

> คุณเป็น AI agent ที่รับผิดชอบทำงานพัฒนา AAP จาก Workspace/ZIP ที่แนบมา เป้าหมายคือพัฒนาเกมตามเอกสาร โดยรักษา Scope และกฎที่เจ้าของเกมกำหนด
>
> 1. อ่าน `README.md` และ `AGENTS.md` ก่อน แล้วเปิด `delivery/03_NEXT_TASK.md` และ Task Brief ปัจจุบันตามที่ระบุ อย่าอ่านระบบที่ไม่เกี่ยวกับงานโดยไม่จำเป็น
> 1a. **บังคับตรวจ Trello ก่อนแก้ไฟล์:** ตรวจว่ามี Trello action tool อยู่ใน session นี้จริงหรือไม่ ถ้ามี ให้เรียกใช้โดยตรง ค้นบอร์ด `AAP Development` และค้น Task ID ก่อน หากไม่พบการ์ด ให้ตรวจซ้ำแล้วสร้างการ์ดตาม `delivery/02_TASK_TEMPLATE.md` ถ้าไม่มี tool/สิทธิ์/เข้าถึงบอร์ดไม่ได้ ให้รายงาน `TRELLO SYNC: NOT SYNCED` อย่างชัดเจน ห้ามคิดเองว่าแท็บ Trello ที่เปิดอยู่คือการเชื่อมต่อของ agent
> 2. เริ่ม/กู้คืน Task จาก `delivery/03_NEXT_TASK.md`, Task Brief, Repository/Workspace/Checkpoint และบอร์ดตามสถานะปัจจุบันจริง ห้าม hard-code Task ID จาก Prompt เก่า; ใช้ `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` เป็นลำดับ Bound และ `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` เป็นดัชนี source tests
> 3. ลงมือทำงานจนถึงเกณฑ์ตรวจรับของ Task ไม่ใช่แค่ตอบแผนงาน อย่าเปลี่ยน Scope, กฎเกม, ทรัพย์สิน, เฟส หรือสัญญา API โดยเงียบ ๆ
> 4. ระหว่างทำ ให้ตรวจงานทีละเกณฑ์ รันคำสั่งตรวจที่เหมาะสม ตรวจผลจริง แก้ความล้มเหลวที่อยู่ใน Scope แล้วบันทึก Checkpoint ที่กู้คืนได้. หากมี Blocker ให้จำแนกจากหลักฐานเป็น `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE` หรือ `PERMISSION_AUTH_BLOCKER`; แก้ปัญหา Code/Configuration ที่อยู่ใน Scope ก่อน จากนั้นตรวจ Agent environment → ตรวจ GitHub-hosted environment/Actions ที่เข้าถึงและได้รับอนุญาตจริง → หากยังทำต่อไม่ได้ ให้ส่ง Owner Action Task ชุดเดียวที่มี working directory, คำสั่งเรียงลำดับ, ผลที่คาดหวัง, output ที่ต้องส่งกลับ, checkpoint และจุดที่ agent จะทำต่อ ห้ามจบด้วยการบอกให้รอ DNS/network อย่างเดียว และห้ามขอให้รันคำสั่งเดิมซ้ำเมื่อมีผลครบแล้ว
> 5. เมื่อ Task เสร็จ ให้เปลี่ยนเป็น Review พร้อมลิงก์ไฟล์/หลักฐานและผลทดสอบจริง แล้ว **หยุดที่ Task นี้** ไม่ต้องเริ่ม Task ถัดไปอัตโนมัติ เจ้าของจะสั่ง `Continue` เมื่อต้องการเริ่มงานถัดไป. หากใกล้ถึง context/time limit ก่อน Task เสร็จ ให้หยุดที่ Checkpoint ที่กู้คืนได้ แทนการพยายามวิ่งต่อจน Timeout. ห้ามสร้าง Task ใหม่เองเพื่อทำงานต่อเนื่อง เว้นแต่เจ้าของอนุมัติหรือ Task ปัจจุบันระบุไว้โดยตรง
> 6. ให้หยุดถามเจ้าของเฉพาะเมื่อมีผลกระทบสูงที่เอกสารไม่ตัดสินไว้ ต้องใช้สิทธิ์/การเชื่อมต่อที่ไม่มี ทำให้ข้อมูลจริงเปลี่ยน/สูญหาย ต้อง Deploy/Publish หรือพบ Blocker ที่แก้เองอย่างปลอดภัยไม่ได้ ให้ทำงานอิสระส่วนอื่นต่อได้
> 7. ห้ามอ้างว่าทดสอบผ่านหากยังไม่ได้รันและตรวจผล ห้ามอ้างว่าเชื่อม Trello/Repository/Browser ได้หากไม่ได้เชื่อมต่อจริง. รายงานเจ้าของและข้อความบน Trello เป็นภาษาไทยตาม `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`; ใช้ PR/commit/CI เป็น routine handoff และทำ ZIP หลักเพียงเมื่อเป็น milestone/release/คำขอเจ้าของหรือจำเป็นเพราะ repository integration เข้าไม่ถึงตาม `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`
> 8. ปฏิบัติตามขอบเขตและรายการ excluded ของ Task Brief ปัจจุบันจริง ห้ามนำ scope ของ `P1-UI-001` ไปใช้กับ Task อื่นโดยอัตโนมัติ และห้ามเพิ่ม gameplay/backend/database/deploy นอก scope. งาน Phase 1 แบ่งเป็น 8 Bounds ใน `delivery/07_P1_UI_PROTOTYPE_TASK.md`; ทำทีละ Bound และหยุดทุกครั้ง
>
> รายงานความคืบหน้าเฉพาะจุดตรวจสำคัญ ไม่ต้องส่งบันทึกทุกคำสั่ง เมื่อจบให้สรุปผลตรวจจริง Blocker และ Task ถัดไปอย่างสั้น ๆ

## 2. คำสั่งให้ทำงานต่อใน Workspace เดิม

> กู้คืน Task ปัจจุบันจาก Repository/Workspace และ Checkpoint จริงก่อนทำต่อ: อ่าน Task Brief, ตรวจ working-tree diff และ commit SHA แล้วทำต่อจาก acceptance criterion แรกที่ยังไม่ผ่าน ใช้ branch/commit/PR/Actions เป็นเส้นทางหลักเมื่อเข้าถึงได้ และเช็ก Trello ด้วย action tool โดยตรง; ถ้าไม่พบ card ให้ค้นซ้ำหนึ่งครั้งก่อนสร้าง หาก list/search ไม่พบ repository แต่มี URL จริงจากเจ้าของ/เอกสาร/Trello ให้ตรวจ URL นั้นโดยตรงก่อนสรุปสถานะ; ถ้า repository มีอยู่แต่ยังว่าง ให้ระบุ `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` และใช้ bootstrap action ครั้งเดียวตาม `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; หาก URL เข้าไม่ได้จริงจึงใช้ `REPOSITORY_ACCESS_BLOCKED` ห้ามส่ง ZIP ในทุก Task โดยอัตโนมัติ ใช้ ZIP เมื่อเป็น milestone/release/owner request หรือ documented fallback เท่านั้น. หาก Trello tool/สิทธิ์ใช้ไม่ได้ให้เขียน `TRELLO SYNC: NOT SYNCED` พร้อมสาเหตุจริงและข้อความวางแทน
>
> เริ่มจาก Acceptance Criterion แรกที่ยังไม่ผ่าน อย่าสร้าง scaffold ซ้ำ หาก checkpoint ระบุ `P1-UI-001` ถูก Blocked ด้วย `EAI_AGAIN registry.npmjs.org` ให้ถือว่า Agent Environment นี้ blocked แล้วและห้าม retry install เว้นแต่มี diagnostic ใหม่พิสูจน์ว่า connectivity/settings เปลี่ยน; ทำ recovery ladder ใน `delivery/07_P1_UI_PROTOTYPE_TASK.md` ต่อจาก checkpoint: ตรวจเฉพาะทางเลือกที่ยังไม่ได้ตรวจ → ลอง GitHub-hosted environment/Actions ถ้าเข้าถึงจริงและได้รับอนุญาต → ถ้ายังติด/ใช้ไม่ได้ ให้ส่ง Owner Action Task เพียงชุดเดียว พร้อมตำแหน่งเปิด terminal, คำสั่งจาก `package.json`/lockfile จริง, ผลที่คาดหวัง และ output ที่ต้องส่งกลับ. ห้ามลบ lockfile, เปลี่ยน mirror, ข้าม acceptance, claim ว่า build ผ่าน หรือเริ่ม `P1-UI-002` ก่อนเวลา
>
> ทำต่อให้ถึงเกณฑ์ตรวจรับของ Task ปัจจุบัน แก้ปัญหาที่อยู่ใน Scope รันและตรวจผลทดสอบ บันทึก Checkpoint และซิงก์ Board เมื่อ tool พร้อมใช้งานจริง หาก Task ผ่านแล้ว **หยุด** พร้อมสรุปหลักฐานและ Task ถัดไปที่แนะนำ; ไม่ต้องเริ่ม Task ถัดไปเอง. ถ้าติดปัญหา ให้ระบุประเภทสาเหตุจากหลักฐาน สิ่งที่ตรวจแล้ว และทางเลือกที่ตรวจแล้ว; ถ้าต้องให้เจ้าของทำงาน ให้ส่ง Owner Action แบบครบชุดพร้อม expected output/ทางส่งกลับและ resume condition อย่าข้าม Gate หรือเปลี่ยนข้อมูลจริงโดยไม่มีอำนาจอนุมัติ

## 3. คำสั่งกู้คืนหลัง Message Delivery Timeout หรือเปิดแชทใหม่

> กู้คืนงาน AAP จากสถานะจริง อย่าเริ่มใหม่และอย่าทำเพียงตอบ “Continue”
>
> 1. อ่าน Task Brief ปัจจุบันและ Checkpoint ล่าสุด
> 2. ตรวจไฟล์และ diff ใน Workspace จริง รวมถึง Task Board หากเชื่อมต่อได้
> 3. ระบุ Acceptance Criterion ล่าสุดที่มีหลักฐานผ่าน และ Criterion แรกที่ยังไม่ผ่าน/ยังไม่ตรวจ
> 4. ทำต่อจากจุดนั้นโดยไม่ทำซ้ำหรือสมมติว่าการแก้ไฟล์/คำสั่งก่อนหน้าสำเร็จ
> 5. รันการตรวจที่เกี่ยวข้อง ดูผลจริง บันทึก Checkpoint ใหม่ และอัปเดตสถานะที่สอดคล้องกับหลักฐาน
> 6. หากไม่มี Workspace เดิม ให้ขอ/ใช้ ZIP และ Task Brief/Checkpoint ล่าสุดที่มีอยู่จริงก่อน อย่าคาดเดาสถานะจากแชทอย่างเดียว

## 4. ขอบเขตการทำงานเพื่อไม่ให้ชน Timeout

- เป้าหมายคือ **หนึ่ง Task ต่อหนึ่ง invocation** ไม่ใช่ทำหลาย Phase ต่อเนื่องในคำสั่งเดียว.
- ให้ทำ edit → test → repair ภายใน Task เดียวได้เต็มที่ แต่เมื่อ acceptance ผ่านหรือถึง checkpoint ที่กำหนดให้หยุด.
- อย่าใช้ `Continue` เป็นคำสั่งให้วิ่งต่อโดยไม่มีขอบเขต; `Continue` ควรหมายถึง “เริ่ม Task ถัดไป/ดำเนิน Task ที่ระบุ” เท่านั้น.
- เมื่อใกล้ชน context/time limit ให้ checkpoint ก่อน ไม่ต้องพยายามใช้ token ที่เหลือจนหมด.

## 5. ต้องส่งไฟล์ Prompt ทุกครั้งหรือไม่?

- **Workspace และแชทเดิมยังอยู่และ AI เข้าถึงไฟล์ได้:** ไม่ต้องส่ง ZIP หรือ Prompt ซ้ำทุกครั้ง เพียงสั่งให้ทำต่อจาก Task/Checkpoint จริง
- **เปิดแชทใหม่แต่ใช้ Workspace เดิมได้:** ส่งคำสั่งกู้คืนข้อ 3 และระบุ Task ID หรือบอร์ดให้ชัด
- **เปิดแชทใหม่โดยไม่มี Workspace/ไฟล์เดิม:** แนบ ZIP รุ่นล่าสุดหรือเชื่อม Repository พร้อม Task Brief และ Checkpoint ล่าสุด
- **เกิด Timeout:** ไม่ต้องดาวน์โหลด Prompt ลงเครื่องแล้วแนบทุกครั้ง แม่แบบนี้เก็บไว้เพื่อคัดลอกเมื่อจำเป็น; สิ่งสำคัญกว่าคือไฟล์/Checkpoint จริงที่บอกว่าอะไรทำเสร็จแล้วและอะไรเหลืออยู่



### ตรวจ Path ก่อนส่ง Owner Action (บังคับ)
ก่อนส่งคำสั่งที่ให้เจ้าของคัดลอกไปรัน ต้องตรวจ path ของ ZIP, Project Root, working directory และโฟลเดอร์ evidence จาก output ล่าสุดของเจ้าของหรือ Workspace จริง ห้ามปล่อย `C:\path\to\...`, `parent-folder-containing-...` หรือ placeholder อื่นไว้ใน code block ที่อ้างว่าพร้อมรัน หากยังไม่ทราบ path ให้ส่งคำสั่งค้นหา path ก่อนและรอ output นั้นแล้วจึงเขียนคำสั่งขั้นถัดไป ต้องตรวจการอ้าง relative path จาก working directory จริงด้วย (เช่นจาก `AAP_Project\AAP_UI_P1` ไปยัง evidence คือ `..\evidence` ไม่ใช่ `..\..\evidence`). หาก step action ล้มเหลวเพราะคำแนะนำใช้ placeholder หรือ relative path ผิด ให้ยอมรับว่าเป็นข้อผิดพลาดของคำแนะนำ แก้ Owner Action เดิม และอัปเดต Trello comment ภาษาไทยด้วย path จริง คำสั่งฉบับเต็ม ผลสำเร็จที่คาดหวัง และ output ที่ต้องส่งกลับ ห้ามขอให้เจ้าของทำ action เดิมซ้ำก่อนแก้คำแนะนำ

## 6. แม่แบบส่ง Owner Action Task เมื่อ Agent และ GitHub fallback ยังติด

ใช้เฉพาะเมื่อ recovery ladder ทำครบแล้ว หรือยืนยันว่า GitHub fallback ใช้ไม่ได้จริง ไม่ต้องส่ง prompt นี้ซ้ำในทุกข้อความหาก blocker เดิมยังไม่มีข้อมูลใหม่:

> **OWNER ACTION REQUIRED — `P1-UI-001` (ยัง Blocked; ยังไม่ข้าม acceptance)**
>
> - **สาเหตุที่ตรวจพบ:** [error เต็มและประเภท: `CODE_CONFIGURATION_FAILURE` / `ENVIRONMENT_NETWORK_BLOCKER` / `TOOL_UNAVAILABLE` / `PERMISSION_AUTH_BLOCKER`]  
> - **Agent environment:** [คำสั่งที่รัน + ผลลัพธ์]  
> - **GitHub fallback:** [run URL/commit/result หรือ `UNAVAILABLE` พร้อมเหตุผล]  
> - **Checkout ที่ต้องตรวจ:** [workspace path/repository/branch/commit ที่ตรวจพบจริง; อย่าเดา path]  
> - **เปิด terminal ที่:** [ระบุเมื่อ path เป็นข้อมูลจริง; บน Windows ใช้ PowerShell ในโฟลเดอร์ repository เดียวกัน]  
> - **รันคำสั่งตามลำดับ:** [สร้างจาก package manager, lockfile และ scripts ที่อ่านจริงเท่านั้น; ระบุแต่ละ expected result]  
> - **ผลที่คาดหวัง:** [exit code และข้อความสัญญาณสำเร็จของแต่ละคำสั่ง]  
> - **ส่งกลับผ่าน:** ตอบกลับใน Task/แชทเดิมพร้อม output ตามชื่อที่ระบุ หรือแนบไฟล์ log/report ที่สั่งให้สร้าง; ไม่ส่ง `.env`, token, password หรือ secret  
> - **ห้ามทำ:** ไม่ลบ/สร้าง lockfile ใหม่, ไม่เปลี่ยน registry/mirror, ไม่ปิด TLS verification, ไม่ commit/push หรือแก้ repository settings เว้นแต่ได้รับอนุญาตแยกต่างหาก  
>
> **จะทำต่อเมื่อ:** output อ้างถึง source/ZIP รุ่นที่ระบุและมีผลคำสั่งครบ; agent จะ resume จาก acceptance criterion แรกที่ยังไม่ผ่านใน Task เดิม
>
> ส่ง output ชุดนี้ครั้งเดียว แล้ว agent จะอ่านผลและทำต่อใน Task เดิม หากผลไม่ชี้ข้อมูลใหม่ จะไม่ขอให้รันคำสั่งเดิมซ้ำ.

## 6a. ห้ามหยุดโดยไม่มีขั้นตอนถัดไปที่ทำได้จริง

ทุกครั้งที่ Task ถูก Blocked ให้สร้างหรืออัปเดต checkpoint พร้อมระบุ blocker class จากหลักฐาน (`CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, `PERMISSION_AUTH_BLOCKER`), exact error, checks ที่ PASS/FAIL/NOT RUN และ first incomplete criterion. ตรวจทางเลือกที่เข้าถึงได้จริงก่อน เช่น แก้ config/code ใน scope หรือ GitHub-hosted runner ที่ได้รับอนุญาต หากไม่มีทางอัตโนมัติ ให้ส่ง Owner Action Task **ชุดเดียว** ที่ระบุ Project Root/working directory, คำสั่งเรียงตามลำดับจาก package/lockfile จริง, expected result, output/files ที่ต้องส่งกลับและทางส่ง, checkpoint path และเงื่อนไข resume Task เดิม. อย่าบอกให้รอ network อย่างเดียว และอย่าขอให้ติดตั้ง/รันคำสั่งซ้ำถ้ามีผลสำเร็จจาก checkout/lockfile เดิมอยู่แล้ว เว้นแต่มีเหตุผลทางเทคนิคชัดเจน.

## 7. กติกา Task Board

Trello ต้องผ่าน preflight ทุก Task: agent ตรวจและเรียก integration จาก session ปัจจุบัน, ค้น `AAP Development`, ค้น Task ID, แล้วสร้างการ์ดอย่างไม่ซ้ำหากยังไม่มี หากมีการ์ดให้ซิงก์กับสถานะจริง: เริ่มงานและทำต่อได้ → `In Progress`; มี blocker ที่ขวาง acceptance → `Blocked`; ส่งงานพร้อม evidence เพื่อรอเจ้าของตรวจ → `Review`; `Done` เฉพาะเมื่อ acceptance evidence ถูกตรวจแล้ว

การเปิดเว็บไซต์ Trello ค้างไว้ไม่ใช่หลักฐานว่า agent มี action tool ถ้ายังใช้ tool ไม่ได้ ให้รายงาน `TRELLO SYNC: NOT SYNCED` ระบุว่าไม่พบ tool/ไม่มีสิทธิ์/เข้า board ไม่ได้ พร้อมข้อความสั้นที่เจ้าของนำไปใส่ในบอร์ดได้ ห้าม claim ว่าซิงก์แล้ว และห้ามปิด/ลบ/เปลี่ยนการ์ดที่ไม่เกี่ยวกับ Task ปัจจุบัน


## 8. กติกาส่งมอบที่ห้ามตกหล่น

- ZIP เริ่มต้น docs-only เป็นเพียง bootstrap เพราะตอนเริ่มต้นยังไม่มีโค้ดใน baseline. การสร้างหรือจัดระเบียบ implementation workspace เป็นเรื่องปกติ และไม่ใช่หลักฐานว่าเอกสารถูกลบ
- หลังเริ่ม coding ให้ส่ง **ZIP หลักเพียงไฟล์เดียว** ที่รวม `AAP_Documentation_Reboot/` + implementation workspace (เช่น `AAP_UI_P1/`) + Checkpoint + evidence + `DELIVERY_README_TH.md`. ห้ามแยก docs ZIP กับ code ZIP เป็นกิจวัตร
- สำหรับ routine task ให้ส่ง repository/branch/commit/PR และ CI artifact links; หากมีการสร้าง milestone/fallback ZIP ให้ตรวจรายการไฟล์เดียวกัน อัปเดต `PACKAGE_MANIFEST.md` ตามจำเป็น และตรวจ ZIP กับลิงก์ที่เกี่ยวข้อง
- แยกส่งเฉพาะเมื่อเจ้าของร้องขอหรือแพลตฟอร์มมีข้อจำกัดที่ตรวจพบจริง; ระบุข้อจำกัดให้ชัด อย่าแอบเรียก split delivery ว่า combined package
- สรุป Trello/Owner-facing เป็นภาษาไทย; เก็บ Task ID, paths, commands และ error strings ตามต้นฉบับ. ดู `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`.

## Prompt block: recover from a failed Owner Action (copyable)

> รับช่วงจาก Task/Checkpoint เดิม อย่าเริ่มโปรเจกต์ใหม่ อ่าน Output ล่าสุดก่อนลงมือ หากคำสั่ง Owner Action เดิมล้มเหลวเพราะ path/working directory/archive layout ที่ผมให้ผิด ให้ถือเป็นข้อผิดพลาดของคำแนะนำ: ตรวจ path จริงจาก Output, แก้ Owner Action และ Comment เดิมบน Trello เป็นภาษาไทย พร้อมคำสั่งเต็มที่คัดลอกไปรันได้, ผลที่คาดหวัง, วิธีรายงาน error และไฟล์/Output ที่ต้องส่งกลับ ห้ามให้ผมเดา path หรือรันคำสั่งเดิมซ้ำโดยไม่แก้ไข
>
> หาก Agent Environment แสดง `EAI_AGAIN` ที่ npm registry และการติดตั้งบนเครื่องผมผ่านแล้ว ให้หยุด retry `npm ci`/`npm install` ใน Agent Environment เดิมเว้นแต่มี diagnostic ใหม่ยืนยันว่า network/settings เปลี่ยน ตรวจ GitHub Actions เฉพาะเมื่อ repository/permission ใช้ได้จริง หากไม่ได้ ให้หนึ่งชุด Owner Action สำหรับ checkout เดิม หลีกเลี่ยง reinstall เมื่อ dependencies ใช้งานได้และ lockfile ไม่เปลี่ยน ขอ output ชุดใหม่เพียงครั้งเดียวต่อ source revision แล้ว resume Task เดิมจาก criterion แรกที่ยังไม่ผ่าน ห้ามเริ่ม Task ถัดไปอัตโนมัติ
>
> Trello Blocked card ต้องบอกสถานะภาษาไทย สิ่งที่ผ่าน/ไม่ผ่าน/NOT RUN ประเภท Blocker และ evidence, working directory, คำสั่งเรียงลำดับ/ผลที่คาดหวัง, Output ที่ต้องส่งกลับ, Checkpoint, เงื่อนไข resume. หาก Trello integration ใช้ไม่ได้ ให้เขียน `TRELLO SYNC: NOT SYNCED` และส่งข้อความพร้อมวางลงการ์ด

## DOC-WF-001 explicit gate before P1-UI-002

Before starting `P1-UI-002`, verify both prior gates: (1) [`13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`](13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md) and its checkpoint are complete, and (2) `P1-UI-001` is accepted with source-check and Browser evidence recorded in Trello. The workflow gate [`14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md`](14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md) has a verified baseline: initial source pushed and AAP UI CI run #1 passed on `ac893af3b772100477a9ddcb652bacde2987116c`. Remaining criteria are Playwright route tests, failure artifacts, task branch/PR and Required Status Checks/ruleset read-back. Use [`15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`](15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md) to minimize manual owner testing/commits. Never start `P1-UI-002` automatically; wait for the owner's explicit instruction after all applicable gates have evidence.
