# AAP — One-time GitHub Repository Bootstrap Bundle

**วันที่:** 26 ตุลาคม 2026 (Asia/Bangkok)  
**Task:** `Workflow Automation & GitHub CI Setup` (bootstrap baseline ที่มี `P1-UI-001` accepted; ไม่เริ่ม `P1-UI-002`)  
**สถานะ:** `ACCEPTED` — code checks ผ่านครบและตรวจ Browser visual states ของทั้งสอง Route แล้ว; ขอบเขตยังเป็น scaffold + shell เท่านั้น

## ผลตรวจ Windows ล่าสุด

ผลนี้มาจาก Trello comment `6adf5099d23be278f9806642` และ checkpoint `evidence/P1-UI-001_CHECKPOINT.md`. Hash ของ source/configuration 6 ไฟล์จาก PowerShell ตรงกับ `AAP1.2.zip` ที่ได้รับจริง.

| Check | Result |
|---|---|
| `node --check scripts/check-scope.mjs` | PASS, exit 0 |
| `npm.cmd run lint` | PASS, exit 0; 4 warnings ของ `!important` ใน reduced-motion CSS และไม่มี errors |
| `npm.cmd test` | PASS, 4/4 tests |
| `npm.cmd run typecheck` | PASS, exit 0 |
| `npm.cmd run audit:scope` | PASS, exit 0 |
| `npm.cmd run build` | PASS, exit 0; Vite 8.3.5, 28 modules |
| Browser `/` and `/not-yet-implemented` | PASS — ตรวจภาพรวมแล้ว; root shell/banner และ unknown-route/Return to shell แสดงครบ (URL path ไม่เห็นใน address bar) |

PowerShell แสดง native stderr warning text ใน output แต่ `$LASTEXITCODE` ของ Lint เท่ากับ 0; จึงจัดเป็น PASS-with-warnings ไม่ใช่ failure. ไม่มี Assertions ถูกลดหรือเอาออก.

## จุดประสงค์และสิ่งที่อยู่ใน Bootstrap ZIP

ZIP นี้เป็น Owner Action แบบครั้งเดียวเพื่อ seed source เข้า `https://github.com/bestgmza123-oss/AAP` ที่ตรวจแล้วว่ามีอยู่จริงแต่ยังว่าง ไม่ใช่ ZIP routine handoff สำหรับ Task ต่อ ๆ ไป.

- `AAP_Documentation_Reboot/` — canonical docs-only subtree, 68 Markdown files ณ checkpoint ปัจจุบัน
- `AAP_UI_P1/` — React + TypeScript source/config/package-lock เป็น sibling ของโฟลเดอร์เอกสาร
- `.github/workflows/ci.yml` — base GitHub Actions workflow สำหรับ `npm ci`, lint, test, typecheck, scope audit และ build (ยังไม่ใช่หลักฐานว่ารันแล้ว)
- `bootstrap-github.ps1` — guard-railed, one-time initial push; ตรวจ remote ว่าง, stage เฉพาะ source/docs/selected evidence และไม่ force-push
- `evidence/` — only relevant Markdown checkpoints, Owner Action and approved Browser screenshot evidence

จงใจไม่รวม raw PowerShell transcripts, `.log`, `.txt`, debug files, generated manifest/checksums, `node_modules`, `dist`, `coverage`, `.vite`, `.git`, `.env` หรือ secrets เพื่อไม่เผยแพร่ local diagnostics ลง public repo. ตัว bootstrap script จะ stage เฉพาะ path ที่ระบุ แม้ใน Downloads จะยังมี log เก่าค้างอยู่.

## กติกา Environment Blocker และ Workflow

ถ้า Agent Environment เดิมมีหลักฐาน `EAI_AGAIN` ให้หยุด retry `npm ci`/`npm install` จนกว่าจะมี diagnostic ใหม่พิสูจน์ว่า network/DNS settings หรือ connectivity เปลี่ยน. แยก `ENVIRONMENT_BLOCKED` ออกจาก Code Failure และอย่าสรุปว่า ChatGPT Server ทั้งระบบมีปัญหาโดยไม่มีหลักฐาน. ตรวจ GitHub Actions เฉพาะเมื่อ repository และสิทธิ์เข้าถึงได้จริง; เนื่องจาก repo ที่ให้มายังว่าง จึงต้องทำ one-time bootstrap ก่อน. Trello Blocked ต้องเป็นภาษาไทยและมีคำสั่ง/ผลคาดหวัง/output ที่ต้องส่งกลับ/Checkpoint/resume point. เมื่อคำสั่ง Owner Action ที่ Agent ให้ไว้ผิด ต้องแก้คำสั่งเดิมและ Comment เดิมก่อนขอให้เจ้าของทำซ้ำ.

## Browser evidence ที่ตรวจแล้ว

เจ้าของส่งภาพ Browser แบบ composite ซึ่งแสดงสองสถานะในภาพเดียว: ด้านขวาเป็น root shell พร้อม `P1-UI-001` และ banner `PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER`; ด้านซ้ายเป็น `Route not implemented` พร้อม `Return to shell`. ไฟล์หลักฐานอยู่ใน `evidence/browser-smoke-combined.png` และ crops `evidence/browser-root.png`, `evidence/browser-unknown-route.png`; วิธีตรวจ/ข้อจำกัดว่าภาพไม่แสดง address bar อยู่ใน `evidence/browser-smoke-evidence.md`. PowerShell output ยืนยัน `npm.cmd run dev` และ Vite ready ที่ `127.0.0.1:5173`.

Browser visual smoke บันทึก PASS สำหรับสอง rendered states. ไม่ได้รัน code checks หรือ install ซ้ำ เพราะ source hash ไม่เปลี่ยนและ code checks ผ่านแล้ว.

## Documentation gate / stop rule

`DOC-WF-001` เสร็จและ static audit ผ่าน (`evidence/DOC-WF-001_CHECKPOINT.md`). `P1-UI-001` ได้รับการยอมรับสำหรับขอบเขต scaffold/shell หลังตรวจ Browser visual states; ไม่ได้อนุญาตให้เริ่ม Task ถัดไปอัตโนมัติ. รอคำสั่งเจ้าของอย่างชัดเจนก่อนเริ่ม `P1-UI-002`.


## Task ปัจจุบัน — Workflow Automation & GitHub CI Setup

ตรวจ URL `https://github.com/bestgmza123-oss/AAP` โดยตรงแล้ว: repository มีอยู่จริง, Public, default branch `main`, permissions API ระบุ `admin=true` และ `push=true`. Repository ยังว่าง (`size=0`, ไม่มี commit/contents) และ Project Root จาก handoff ไม่มี `.git`. สถานะปัจจุบันคือ `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` ไม่ใช่ `REPOSITORY_ACCESS_BLOCKED`. ยังไม่มี PR/CI run/Playwright artifacts/Required Status Checks. ทำ bootstrap ครั้งเดียวตาม `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; Agent จะทำ branch/CI ต่อหลัง initial source commit ปรากฏ. ไม่ได้เปลี่ยนข้อกำหนดเกมและไม่เริ่ม `P1-UI-002`.

`.github/workflows/ci.yml` จะ trigger เมื่อ initial source commit ถูก push; ผล CI ต้องตรวจจาก run จริง ไม่ถือว่าผ่านจาก YAML อย่างเดียว. Playwright และ Required Status Checks ยังไม่ได้เพิ่ม/ยืนยัน เพราะต้องต่อจาก source commit จริงด้วย Task branch/PR. หลัง bootstrap แล้ว routine handoff ให้ใช้ repository/commit/PR/CI artifacts; ไม่สร้าง ZIP ทุก Task. ไม่เริ่ม `P1-UI-002` อัตโนมัติ.
