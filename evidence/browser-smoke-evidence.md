# P1-UI-001 Browser Smoke Evidence

Date: 2026-10-26 (Asia/Bangkok)  
Task: `P1-UI-001 — Frontend scaffold and shell prototype`  
Result: **PASS — both required UI states visually confirmed**

## Evidence source and provenance

The owner provided one combined browser screenshot in this conversation along with the Windows PowerShell transcript. A PNG copy of the full composite is preserved as [`browser-smoke-combined.png`](browser-smoke-combined.png). The standalone `browser-root.png` and `browser-unknown-route.png` are crops from that combined image to make each state easier to inspect; they are not separate browser captures.

The accompanying PowerShell output shows the working directory `C:\Users\ultra\Downloads\AAP_Project\AAP_UI_P1`, the command `npm.cmd run dev`, and Vite `v8.3.5` ready at `http://127.0.0.1:5173/` after 848 ms.

## Visual checks

| Check | Result | Visible evidence |
|---|---|---|
| Root shell `/` | PASS (visual state) | [`browser-root.png`](browser-root.png): heading `The shell is in place.`, task marker `P1-UI-001`, and boundary banner `PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER`. |
| Unknown route `/not-yet-implemented` | PASS (visual state) | [`browser-unknown-route.png`](browser-unknown-route.png): heading `Route not implemented` and `Return to shell` action. |
| Server start | PASS | Owner PowerShell transcript in the immediately preceding chat message reports the correct working directory and Vite ready message. |

## Evidence limitation

The composite does not show a browser address bar with the full pathname. The exact path labels above are the routes requested in the Owner Action and are associated with the corresponding visible page states; the screenshot proves the rendered states but does not independently expose the full pathname in browser chrome. No code-check batch was repeated for this visual-only verification.
