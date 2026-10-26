$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoUrl = 'https://github.com/bestgmza123-oss/AAP.git'
$ExpectedLogin = 'bestgmza123-oss'
$ExpectedNoreplyEmail = '284295410+bestgmza123-oss@users.noreply.github.com'

Set-Location -LiteralPath $ProjectRoot
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'ไม่พบ git ใน PATH — ติดตั้ง Git for Windows แล้วเปิด PowerShell ใหม่ก่อน'
}

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) {
        throw "คำสั่ง git ล้มเหลว (exit $LASTEXITCODE): git $($GitArgs -join ' ')"
    }
}

# Never overwrite an existing local repository or a remote that has acquired a commit.
$HasGitDir = Test-Path -LiteralPath (Join-Path $ProjectRoot '.git')
if ($HasGitDir) {
    $CurrentRemote = (& git remote get-url origin 2>$null | Select-Object -First 1)
    if ($LASTEXITCODE -ne 0 -or $CurrentRemote.TrimEnd('/') -ne $RepoUrl.TrimEnd('/')) {
        throw "มี .git อยู่แล้วและ origin ไม่ตรงกับ $RepoUrl — ไม่แก้/เขียนทับ repository เดิม"
    }
    $CurrentBranch = (& git branch --show-current).Trim()
    if ($LASTEXITCODE -ne 0 -or $CurrentBranch -ne 'main') {
        throw "Local Git มีอยู่แล้วแต่ branch ไม่ใช่ main ($CurrentBranch) — หยุดเพื่อป้องกันการเขียนทับ"
    }
} else {
    $RemoteRefs = (& git ls-remote --heads $RepoUrl 2>&1 | Out-String).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "อ่าน remote refs ไม่สำเร็จสำหรับ $RepoUrl — ตรวจการเชื่อมต่อ/สิทธิ์ GitHub แล้วส่ง error กลับโดยไม่ส่ง credential"
    }
    if (-not [string]::IsNullOrWhiteSpace($RemoteRefs)) {
        throw "Remote $RepoUrl มี branch/commit แล้ว; script จะไม่เขียนทับ remote. ส่ง SHA/branch ที่แสดงเพื่อ resume อย่างปลอดภัย"
    }

    Invoke-Git init -b main
    Invoke-Git config user.name $ExpectedLogin
    Invoke-Git config user.email $ExpectedNoreplyEmail
    Invoke-Git remote add origin $RepoUrl
}

# If an earlier push failed after local commit, a rerun can safely retry only if remote stays empty.
$RemoteRefs = (& git ls-remote --heads $RepoUrl 2>&1 | Out-String).Trim()
if ($LASTEXITCODE -ne 0) {
    throw "อ่าน remote refs ไม่สำเร็จสำหรับ $RepoUrl — ไม่ push จนกว่าจะตรวจสิทธิ์/การเชื่อมต่อได้"
}
$LocalCommit = (& git rev-parse --verify HEAD 2>$null | Select-Object -First 1)
$HasLocalCommit = ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($LocalCommit))
if ($HasLocalCommit -and -not [string]::IsNullOrWhiteSpace($RemoteRefs)) {
    $RemoteMain = ($RemoteRefs -split '\r?\n' | Where-Object { $_ -match '\srefs/heads/main$' } | Select-Object -First 1)
    if ($RemoteMain -and $RemoteMain.Split("`t")[0] -eq $LocalCommit.Trim()) {
        Write-Host "BOOTSTRAP_COMMIT_SHA=$($LocalCommit.Trim())"
        Write-Host 'BOOTSTRAP_PUSH=PASS (already pushed; remote main matches local HEAD)'
        exit 0
    }
    throw 'Remote มี refs ที่ไม่ตรงกับ local bootstrap commit; ไม่ force-push และไม่เขียนทับ branch'
}
if ($HasLocalCommit -and [string]::IsNullOrWhiteSpace($RemoteRefs)) {
    $Pending = (& git status --porcelain | Out-String).Trim()
    if ($LASTEXITCODE -ne 0) { throw 'อ่าน git status ไม่สำเร็จ' }
    if ([string]::IsNullOrWhiteSpace($Pending)) {
        Invoke-Git push -u origin main
        $Status = (& git status --short --branch | Out-String).Trim()
        if ($LASTEXITCODE -ne 0) { throw 'อ่าน git status หลัง push ไม่สำเร็จ' }
        Write-Host "BOOTSTRAP_COMMIT_SHA=$($LocalCommit.Trim())"
        Write-Host 'BOOTSTRAP_PUSH=PASS'
        Write-Host $Status
        exit 0
    }
}

$AllowedPaths = @(
    'AAP_Documentation_Reboot',
    'AAP_UI_P1',
    'README.md',
    'DELIVERY_README_TH.md',
    '.gitignore',
    '.github/workflows/ci.yml',
    'bootstrap-github.ps1',
    'evidence/P1-UI-001_CHECKPOINT.md',
    'evidence/DOC-WF-001_CHECKPOINT.md',
    'evidence/browser-smoke-evidence.md',
    'evidence/browser-smoke-combined.png',
    'evidence/browser-root.png',
    'evidence/browser-unknown-route.png',
    'evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md',
    'evidence/github-repository-access-check.md',
    'evidence/WORKFLOW_AUTOMATION_GITHUB_CI_SETUP_CHECKPOINT.md',
    'evidence/owner-reported-verification.md'
)
foreach ($Path in $AllowedPaths) {
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $Path))) {
        throw "ขาดไฟล์/โฟลเดอร์ที่จำเป็น: $Path — หยุดก่อน stage"
    }
}

Invoke-Git add -- $AllowedPaths
$Staged = (& git diff --cached --name-only | Out-String).Trim()
if ([string]::IsNullOrWhiteSpace($Staged)) {
    throw 'ไม่มีไฟล์ถูก stage — ตรวจ source bundle ก่อน commit'
}
if ($Staged -match '(^|/)(\.env|.*\.log|.*debug.*|.*transcript.*|package-lock\.json\.bak)$' -or $Staged -match '(^|/)node_modules/|(^|/)dist/') {
    throw 'พบไฟล์ local/log/secret/generated output ใน staged files — ยกเลิกก่อน commit'
}

$StagedNames = @(& git diff --cached --name-only)
if ($LASTEXITCODE -ne 0) { throw 'อ่าน staged file list ไม่สำเร็จ' }
$LockfileCount = @($StagedNames | Where-Object { $_ -eq 'AAP_UI_P1/package-lock.json' }).Count
if ($LockfileCount -ne 1) {
    throw 'package-lock.json ของ AAP_UI_P1 ต้องอยู่ใน initial commit เพื่อให้ npm ci ใช้ source revision ที่ถูกต้อง'
}

$ExistingCommit = (& git rev-parse --verify HEAD 2>$null | Select-Object -First 1)
if ($LASTEXITCODE -ne 0) {
    Invoke-Git commit -m 'chore: bootstrap canonical AAP workspace and CI'
}
$CommitSha = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0 -or $CommitSha.Length -ne 40) { throw 'อ่าน commit SHA ไม่สำเร็จ' }

$PostCommitRefs = (& git ls-remote --heads $RepoUrl 2>&1 | Out-String).Trim()
if ($LASTEXITCODE -ne 0) { throw 'ตรวจ remote ก่อน push ไม่สำเร็จ; local commit เก็บไว้แล้วและไม่ได้ force-push' }
if (-not [string]::IsNullOrWhiteSpace($PostCommitRefs)) { throw 'Remote มี branch ใหม่ก่อน push; หยุดโดยไม่ force-push' }

Invoke-Git push -u origin main
$Status = (& git status --short --branch | Out-String).Trim()
if ($LASTEXITCODE -ne 0) { throw 'อ่าน git status หลัง push ไม่สำเร็จ' }
Write-Host "BOOTSTRAP_COMMIT_SHA=$CommitSha"
Write-Host 'BOOTSTRAP_PUSH=PASS'
Write-Host $Status
