# วิธีทำงาน AAP ผ่านเครื่องเจ้าของแบบใช้ Automation เป็นหลัก

**สถานะ:** แนวทางปฏิบัติสำหรับงานถัดไป เริ่มใช้เมื่อ Remote Desktop Commander เชื่อมต่อ DESKTOP-6U02MEL ได้และได้รับอนุญาต
**เป้าหมาย:** ลดภาระที่เจ้าของต้องเปิด Terminal เอง ทดสอบคำสั่งซ้ำ คัดลอก log กลับมา และ commit ทีละจุด โดยรักษาหลักฐานที่ตรวจสอบย้อนหลังได้
**ขอบเขต:** workflow/เครื่องมือเท่านั้น เอกสารนี้ไม่ได้อนุญาตให้เปลี่ยนกฎเกม เริ่ม P1-UI-002, deploy production, แก้ฐานข้อมูล หรือทำรายการย้อนกลับไม่ได้

## 1. สถานะจริงที่เริ่มใช้แนวทางนี้

- Project Root ที่ตรวจพบ: C:\Users\ultra\Downloads\AAP_Project
- Repository: https://github.com/bestgmza123-oss/AAP
- อุปกรณ์ Windows ที่เชื่อมต่อ: DESKTOP-6U02MEL ผ่าน Remote Desktop Commander
- main ตรงกับ commit ac893af3b772100477a9ddcb652bacde2987116c (chore: bootstrap canonical AAP workspace and CI)
- GitHub Actions run #1 ของ AAP UI CI บน SHA ข้างต้น: success — [เปิด run](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282)
- ขั้น CI ที่ตรวจจาก job จริง: checkout, setup Node/cache, npm ci, lint, unit tests, typecheck, static scope audit และ production build ผ่านทั้งหมด
- Browser/E2E ผ่าน GitHub Actions, Playwright failure artifacts และ branch protection/Required Status Checks: **ยังไม่ยืนยัน** อย่านับ CI run แรกเป็น browser test หรือเป็นหลักฐานว่า branch protection เปิดแล้ว
- P1-UI-002 ยังไม่เริ่ม และไม่มีการเปลี่ยนกฎเกม

## 2. แบ่งงานระหว่าง Agent กับเจ้าของ

### Agent/เครื่องมือรับผิดชอบเป็นค่าเริ่มต้น
1. อ่าน Task, กฎ/สัญญาที่เกี่ยวข้อง, checkpoint และ git status ก่อนแก้
2. อ่าน/แก้ไฟล์ใน checkout ที่เจ้าของอนุญาตผ่าน Remote Desktop Commander เมื่อเครื่องออนไลน์ ไม่ขอให้เจ้าของคัดลอกไฟล์มาทีละชิ้นถ้าอ่าน workspace ได้จริง
3. รันคำสั่งตรวจที่สัมพันธ์กับการเปลี่ยนแปลงในเครื่องนั้น จับ exit code และ output โดยตรง ตรวจ diff/ไฟล์ที่เปลี่ยน แล้วแก้ข้อผิดพลาดที่อยู่ใน scope
4. ใช้ GitHub Actions รันซ้ำกับ revision ที่ส่งขึ้นไปจริง ตรวจ SHA, job, conclusion และ artifacts ผ่าน GitHub
5. สร้าง commit แบบกลุ่มตามขอบเขต Task ที่ตรวจแล้ว ไม่ commit หลังทุกคำสั่งหรือทุกการแก้ย่อย
6. เปิด/อัปเดต PR, สรุปความเสี่ยง และซิงก์ Trello จากผลที่สังเกตได้ ไม่ใช้ Trello แทน source control หรือเอา transcript ทั้งชุดมาแปะ
7. บันทึก checkpoint เพื่อ resume งานเดิมได้ โดยไม่เริ่ม Task ถัดไปเอง

### เจ้าของต้องลงมือเมื่อจำเป็นจริง
- GitHub/device authorization, OAuth scope, MFA, UAC หรือ permission prompt ที่ต้องให้ผู้ใช้ยืนยัน
- การตัดสินใจด้านผลิตภัณฑ์/กฎเกม, ขอบเขตที่คลุมเครือ, ความเสี่ยงที่ย้อนกลับไม่ได้ หรือการยอมรับหน้าตา/พฤติกรรมเชิง UX ที่ต้องอาศัยการตัดสินของเจ้าของ
- กรณีเครื่องมือไม่สามารถเข้าถึงอุปกรณ์หรือพื้นที่ที่กำหนด หรือระบบป้องกันบล็อก action นั้น ให้หยุดและรายงานข้อจำกัดจริง ห้ามเปลี่ยนชื่อ/ซ่อนคำสั่งหรือใช้เส้นทางอื่นเพื่อหลบการป้องกัน
- คำขอใดที่ต้องจ่ายเงิน, deploy, ลบข้อมูล หรือเปลี่ยน permission สำคัญ ต้องมีการอนุมัติชัดเจนแยกจากการอนุมัติให้แก้โค้ดทั่วไป

อย่าขอให้เจ้าของรัน lint/test/build, คัดลอก log หรือสร้าง commit เอง หาก Agent สามารถทำสิ่งนั้นได้ผ่าน checkout/CI ที่ได้รับอนุญาตและตรวจผลโดยตรงจริง

## 3. วงจรทำงานมาตรฐานหนึ่ง Task

1. **Preflight:** ตรวจ device online, Project Root, repo URL, branch/HEAD, dirty files และ Task/Trello card ที่ตรงกัน อย่าคาดเดา checkout หรืออ่าน workspace สำเนาแทน checkout จริง
2. **Scope:** อ่าน README.md, AAP_Documentation_Reboot/AGENTS.md, delivery/03_NEXT_TASK.md, Task Brief, checkpoint และเอกสารเจ้าของกฎที่เกี่ยวข้องเท่านั้น ระบุสิ่งที่จะไม่เปลี่ยน
3. **Branch:** ใช้ branch เฉพาะงาน เช่น task/<task-id>-<short-name> หรือ automation/<short-name> โดยเริ่มจาก remote main ล่าสุด ไม่ทำงานใหม่บน main โดยตรงหลัง bootstrap
4. **Edit:** แก้เฉพาะไฟล์ใน scope; รักษา source-of-truth เดียวต่อกฎ และอย่าแก้ package-lock.json ด้วยมือ
5. **Local verification:** ดู package.json แล้วรันเฉพาะ checks ที่เกี่ยวข้อง จากนั้นรันชุด acceptance ที่ task ต้องใช้ เมื่อ dependencies มีอยู่และ lockfile ไม่เปลี่ยน ห้ามติดตั้งซ้ำโดยไม่มีเหตุผล
6. **Review diff:** ตรวจ git diff --check, git status, git diff --stat และ diff จริง; ยืนยันว่าไม่มี secret, .env, log ส่วนตัว, node_modules, dist, cache หรือไฟล์ที่อยู่นอก scope
7. **Commit:** เมื่อชุดตรวจในเครื่องผ่านและ diff ถูกต้อง ให้สร้าง commit หนึ่งชุดที่อธิบาย Task ได้ชัดเจนเป็นค่าเริ่มต้น การแก้หลายจุดที่เป็นขอบเขตเดียวกันรวมได้ ไม่ต้อง commit ทุกครั้งที่แก้หรือรันทดสอบ ถ้ามี blocker ให้บันทึก checkpoint แทนการอ้างว่าเสร็จ
8. **Push/PR:** push เฉพาะ task branch และเปิด/อัปเดต PR เมื่อ write surface ทำได้จริง ไม่บังคับ push ไป main โดยตรง
9. **CI verification:** รอผล workflow แล้วอ่าน SHA, event, job/step, conclusion และ artifact จาก run จริง ผลทดสอบจะนับเป็น PASS ได้เมื่อเป็น revision ที่จะ review/merge เท่านั้น
10. **Handoff:** อัปเดตเอกสาร checkpoint และ Trello ด้วย link ของ branch/commit/PR/CI/artifact ที่มีจริง พร้อมสถานะ PASS, FAIL, BLOCKED หรือ NOT RUN; จากนั้นหยุดที่ review/acceptance gate ของ Task ปัจจุบัน

## 4. ใช้ dependencies และทดสอบอย่างประหยัด

- ใช้ AAP_UI_P1/package.json และ package-lock.json เป็นอำนาจอ้างอิงของ scripts/versions
- ถ้า node_modules ที่ตรง checkout ยังใช้งานได้และ package-lock.json ไม่เปลี่ยน ให้รัน tests โดยไม่เรียก npm ci ซ้ำ
- รัน npm ci --no-audit --no-fund เมื่อ checkout ใหม่, dependency directory หาย/เสีย หรือ lockfile เปลี่ยนจนต้อง sync dependencies เท่านั้น
- ถ้า Agent Environment เคยมี EAI_AGAIN ที่ registry.npmjs.org อย่าลอง install ซ้ำโดยไม่มี diagnostic ใหม่ ใช้ checkout Windows ที่ได้รับอนุญาตหรือ GitHub-hosted runner ที่ใช้งานได้จริงเป็นทางเลือก
- สำหรับ UI changes ปัจจุบัน ชุดตรวจหลักคือ npm run lint, npm test, npm run typecheck, npm run audit:scope, npm run build ภายใต้ AAP_UI_P1/ การรันซ้ำทั้งหมดทุกครั้งไม่จำเป็น หากไม่มี source/configuration change ที่กระทบ check นั้น แต่ก่อน merge ต้องมีหลักฐาน CI ที่เหมาะสมกับ SHA ปัจจุบัน
- ถ้าการตรวจใด fail ให้ตรวจ error ต้นเหตุ แก้ใน scope และรันซ้ำ targeted test พร้อม acceptance gates ที่ได้รับผลกระทบ ไม่ให้เจ้าของทำ debugging แทนโดยไม่จำเป็น
- ถ้าเป็น UI route/interaction ให้ Playwright ตรวจ route ที่ระบุอย่างอัตโนมัติเมื่อ implementation/configuration พร้อมแล้ว ใช้ HTML report, screenshots และ trace เพื่อ debug failure แทนการให้เจ้าของถ่ายรูป/เปิดหน้าเว็บซ้ำแบบไม่มีข้อมูลประกอบ

## 5. Playwright และหลักฐาน browser

สถานะปัจจุบัน: เพิ่ม `@playwright/test`, npm script `test:e2e`, `playwright.config.ts` และ `e2e/smoke.spec.ts` ใน branch ของ automation แล้ว; local Windows Playwright ผ่าน 2/2 tests. CI browser job เพิ่มแล้ว แต่ยังต้องตรวจผลบน SHA ล่าสุดของ PR. Test assertions สำหรับ:
- `/` — title, fixture-only boundary banner, `P1-UI-001` shell และ `PERSISTENCE DISABLED`
- `/not-yet-implemented` — placeholder text และคลิกลิงก์กลับไปยัง shell

การตรวจบน Windows ล่าสุดผ่าน Playwright 2/2, Vitest 4/4, typecheck, scope audit, production build และ lint (มีเพียง 4 warnings เดิมใน reduced-motion CSS). `tsconfig.json` และ Biome lint ครอบคลุม Playwright config/tests; Vitest exclude `e2e/**` เพื่อไม่ให้เอา browser specs ไปปน unit tests. `.gitignore` กัน `playwright-report/`, `test-results/` และ browser cache ไม่ให้ปะปนกับ source control.

CI job ชื่อ `Playwright browser smoke` ติดตั้ง Chromium ด้วย `npx playwright install --with-deps chromium`, รัน `npm run test:e2e` และหาก job fail จะอัปโหลด `AAP_UI_P1/playwright-report/` และ `AAP_UI_P1/test-results/` เป็น artifact พร้อม SHA/run-attempt ในชื่อและ retention 14 วัน. **การตั้งค่าถูกเพิ่มแล้ว แต่ยังต้องยืนยันผล CI ของ revision ล่าสุด; ยังไม่อ้างว่า browser CI หรือ failure artifact ผ่านจนกว่าจะมีผล run จริง.**

ลิงก์อ้างอิง: [Playwright CI](https://playwright.dev/docs/ci), [Trace Viewer](https://playwright.dev/docs/trace-viewer), [GitHub Actions artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts). ห้ามอ้างว่า browser test ผ่านจนกว่า test จริงจะรันและผล/SHA ปรากฏใน workflow

## 6. Branch, commit และ Required Status Checks

- หลีกเลี่ยงการแก้ main โดยตรงหลัง initial bootstrap; ใช้ task branch + PR เพื่อให้ diff ตรวจสอบได้และลดความจำเป็นที่เจ้าของจะคอยทดสอบทุก commit
- เชื่อม local checks, PR head, GitHub Actions run, reviewed diff และ checkpoint ด้วย **commit SHA เดียวกัน** ถ้ามี commit ใหม่ ต้องตรวจ CI และ acceptance ของ revision ใหม่นั้น ไม่ยกผลเก่ามาใช้โดยไม่เทียบ SHA
- ตั้ง Required Status Checks เฉพาะหลัง workflow ทำงานจริงและได้ชื่อ check ที่แน่นอนแล้ว ต้องมีสิทธิ์เปลี่ยน rule และอ่านค่ากลับเพื่อยืนยัน ไม่ถือว่า .github/workflows/ci.yml มีอยู่แล้วเท่ากับ branch protection เปิดใช้งาน
- หลังตรวจ baseline CI ให้พิจารณากฎ main: require PR, require checks, ปิด force-push/delete ถ้าเหมาะสมกับ repo, และไม่ให้ bypass โดยไม่จำเป็น ก่อนเปลี่ยน settings ต้องยืนยันว่ามีสิทธิ์จริง
- ดู [Managing protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) และ [Managing workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs).

## 7. ลด Owner Action ให้เหลือหนึ่งชุดต่อ blocker

ถ้า action ถูกบล็อกจริง ให้แยกประเภท CODE_CONFIGURATION_FAILURE, ENVIRONMENT_NETWORK_BLOCKER, TOOL_UNAVAILABLE หรือ PERMISSION_AUTH_BLOCKER; ตรวจทางอัตโนมัติและทาง CI ที่ได้รับอนุญาตก่อน จากนั้นให้ Owner Action ภาษาไทย **ชุดเดียว** ซึ่งระบุ:
- working directory จริงและคำสั่งเรียงลำดับ
- ผลที่คาดหวัง/exit code ต่อขั้น
- output เฉพาะที่ยังขาด และวิธีส่งกลับ
- checkpoint และ acceptance criterion แรกที่ยังไม่ผ่าน
- งานที่ Agent จะ resume หลังได้ผล

อย่าขอข้อมูลที่อ่านได้จากเครื่องหรือ GitHub อยู่แล้ว อย่าขอ transcript ซ้ำเพราะ tool สามารถอ่าน log โดยตรง และอย่าขอให้เจ้าของส่ง token/password/.env/secret อย่าอ้างว่ากำลังทำงานเบื้องหลังหลัง session จบ; การทำต่อให้เริ่มจาก checkpoint ถาวรใน Task เดิม

## 8. รายงานที่เจ้าของควรได้รับ

สรุปเป็นภาษาไทยสั้น ๆ พร้อม:
- สิ่งที่เปลี่ยนและ paths
- ผลตรวจแต่ละชุด (PASS/FAIL/BLOCKED/NOT RUN) และเหตุผลของ warning ที่มีสาระ
- branch, commit SHA, PR และ Actions run/artifact links เมื่อมีจริง
- ส่วนที่ยังไม่ได้ทดสอบ/สิทธิ์ที่ยังไม่ได้ยืนยัน
- การตัดสินใจที่เจ้าของต้องทำจริง ๆ เพียงข้อเดียวหรือไม่ต้องทำอะไร
- ระบุชัดว่า Task ถัดไปยังไม่เริ่ม หากยังไม่ได้รับคำสั่งจากเจ้าของ

Trello ใช้สถานะ/ความเสี่ยง/dependency/ลิงก์; source files, diffs และ test artifacts อยู่ใน GitHub/checkout ไม่คัดลอกทั้งหมดลงการ์ด

## 9. ประวัติการปรับปรุง

- 2026-10-27: push initial source สำเร็จหลังเพิ่ม GitHub CLI scope workflow; main ตรงกับ ac893af3b772100477a9ddcb652bacde2987116c; AAP UI CI run #1 บน SHA เดียวกัน success. เพิ่มแนวทางนี้เพื่อใช้ Remote Desktop Commander กับ Windows checkout เป็นเส้นทางทำงาน/ตรวจอัตโนมัติ พร้อมคง Playwright, artifacts และ branch protection ไว้เป็น acceptance criteria ที่ยัง pending.

ตรวจสอบแหล่งอ้างอิงภายนอกเมื่อ 2026-10-27:
- [GitHub CLI gh auth refresh](https://cli.github.com/manual/gh_auth_refresh) — เพิ่ม scope เพิ่มเติมให้ stored credentials
- [Playwright CI](https://playwright.dev/docs/ci) และ [Trace Viewer](https://playwright.dev/docs/trace-viewer) — การรันทดสอบ browser และ trace สำหรับวินิจฉัย
- [GitHub Actions artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts) — เก็บ output จาก workflow
- [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) — require PR/status checks และกฎ branch
- [Managing workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs) — ดูผล/รันซ้ำ/ดาวน์โหลด artifacts
