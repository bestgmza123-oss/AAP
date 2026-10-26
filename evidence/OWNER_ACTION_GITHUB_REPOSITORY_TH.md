# Owner Action (ครั้งเดียว): Bootstrap Source เข้า AAP GitHub Repository ที่มีอยู่แล้ว

**Task:** Workflow Automation & GitHub CI Setup  
**สถานะ:** `Blocked` — `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER`  
**Repository ที่ตรวจจริง:** https://github.com/bestgmza123-oss/AAP  
**เป้าหมาย:** สร้าง initial commit จาก canonical docs+source ที่เจ้าของใช้อยู่ให้ repo ว่างนี้มี baseline เพียงครั้งเดียว หลังจากนั้นให้ Agent ทำ Task branch/commit/PR/CI ผ่าน GitHub เป็นหลัก ไม่ต้องส่ง ZIP/test transcript ซ้ำทุก Task

## ผลที่ตรวจยืนยันแล้ว

- Repository มีอยู่จริง; Public; default branch `main`; repository ID `1434287971`.
- GitHub API รายงาน `admin=true`, `push=true` สำหรับ identity ที่เชื่อมกับ integration.
- Repository `size=0`; Contents API ตอบ `This repository is empty.` จึงยังไม่มี initial commit/source ให้สร้าง Task branch จากมัน.
- Folder ที่แตกจาก ZIP บน Windows ไม่มี `.git`; จึงต้องเชื่อม local canonical workspace เข้ากับ repository ว่างครั้งเดียว.
- ห้ามเพิ่มไฟล์ log/transcript/debug, credentials, `.env`, `node_modules`, `dist`, coverage หรือ generated ZIP manifest/checksum ไปใน public repository.

## ทำครั้งเดียว

1. ดาวน์โหลด `AAP_REPOSITORY_BOOTSTRAP.zip` จากแชทนี้ แล้วแตกทับไปยัง `C:\Users\ultra\Downloads` เพื่อให้อัปเดต canonical docs/code และเพิ่ม workflow/bootstrap script (ไม่จำเป็นต้องลบ folder เดิม; script จะ stage เฉพาะรายการที่อนุญาต).
2. เปิด PowerShell แล้วรันคำสั่งต่อไปนี้:

```powershell
$ProjectRoot = 'C:\Users\ultra\Downloads\AAP_Project'
Set-Location $ProjectRoot
if (-not (Test-Path -LiteralPath '.\bootstrap-github.ps1' -PathType Leaf)) {
    throw "ไม่พบ bootstrap-github.ps1 ที่ $ProjectRoot — ตรวจว่าแตก AAP_REPOSITORY_BOOTSTRAP.zip แล้ว"
}
.\bootstrap-github.ps1
```

Script ตรวจว่า remote ยังว่างจริงก่อน push; หากมี branch/commit ปรากฏแล้ว จะหยุดแทนการเขียนทับ. มันตั้ง local commit identity เป็น GitHub login `bestgmza123-oss` ด้วย noreply format ที่อ้างอิง GitHub account ID และจะไม่ส่ง credential ใน output.

### ผลที่คาดหวัง

- `git push -u origin main` สำเร็จ
- ได้บรรทัด `BOOTSTRAP_COMMIT_SHA=<40-char SHA>` และ `BOOTSTRAP_PUSH=PASS`
- `git status --short --branch` แสดง `## main...origin/main` โดยไม่มี uncommitted changes
- GitHub Actions workflow `AAP UI CI` เริ่มรันตาม commit ที่ push (ผล CI ยังต้องตรวจจาก run จริง ไม่ถือว่าผ่านเพียงเพราะ trigger สำเร็จ)

## ส่งกลับ/Resume

ตอบในบทสนทนานี้ด้วย **commit SHA และบรรทัด `BOOTSTRAP_PUSH` เท่านั้น** ไม่ต้องแนบ ZIP/ไฟล์/terminal transcript ซ้ำ หาก error ให้ส่งเฉพาะ error ที่เกี่ยวกับ `git init`/`remote`/`push` โดยตัด credential ออก. จากนั้น Agent จะตรวจ commit และ run จริงบน repository เดิม สร้าง Task branch ต่อเพื่อเพิ่ม Playwright, artifacts และ Required Status Checks เมื่อมีชื่อ check จริง.

ไม่เปลี่ยนข้อกำหนดเกม และห้ามเริ่ม `P1-UI-002` อัตโนมัติ.
