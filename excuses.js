// ============================================================
//  Tech Excuse Generator — Excuse Database
//  Categories: connectivity | app | device | security | infra
//  Each excuse has: text, category, credibility (0-100), tags
// ============================================================

const EXCUSES = [
  // ── CONNECTIVITY ──────────────────────────────────────────
  {
    text: "Sorry, my ISP is having a regional outage — I'm heading to the office now.",
    category: "connectivity",
    credibility: 88,
    tags: ["isp", "internet", "outage"],
  },
  {
    text: "My home network dropped right as the meeting started. Had to reboot the router.",
    category: "connectivity",
    credibility: 82,
    tags: ["wifi", "router", "reboot"],
  },
  {
    text: "The WiFi here is running at 0.2 Mbps — I can barely load the join link. Switching to hotspot.",
    category: "connectivity",
    credibility: 79,
    tags: ["wifi", "bandwidth", "hotspot"],
  },
  {
    text: "I'm getting severe packet loss — latency is spiking to 800ms. Trying to stabilize the connection.",
    category: "connectivity",
    credibility: 72,
    tags: ["network", "latency", "packet loss"],
  },
  {
    text: "The building's network switch just cycled — everyone on my floor lost connectivity for a few minutes.",
    category: "connectivity",
    credibility: 85,
    tags: ["office", "switch", "network"],
  },
  {
    text: "My mobile hotspot tethering broke after the last iOS update. Took a few minutes to sort out.",
    category: "connectivity",
    credibility: 77,
    tags: ["hotspot", "ios", "tethering"],
  },
  {
    text: "Sorry — the ISP's BGP routing table has issues in our area. Half my traffic is black-holing.",
    category: "connectivity",
    credibility: 91,
    tags: ["bgp", "isp", "routing"],
  },
  {
    text: "My connection keeps dropping every 90 seconds. I think it's a DHCP lease renewal issue — looking into it.",
    category: "connectivity",
    credibility: 74,
    tags: ["dhcp", "connectivity", "drops"],
  },
  {
    text: "The Ethernet cable came loose from the wall socket — just noticed. On WiFi now, rejoining.",
    category: "connectivity",
    credibility: 70,
    tags: ["ethernet", "cable", "hardware"],
  },
  {
    text: "The ISP has downtime in our area — heading to the office to use the stable connection there.",
    category: "connectivity",
    credibility: 86,
    tags: ["isp", "downtime", "office"],
  },

  // ── APP / SOFTWARE ────────────────────────────────────────
  {
    text: "Teams stopped responding and I had to force quit. Restarting now — sorry for the delay.",
    category: "app",
    credibility: 95,
    tags: ["teams", "crash", "restart"],
  },
  {
    text: "Citrix crashed right as I tried to join. Had to relaunch the session — this happens at least twice a week.",
    category: "app",
    credibility: 97,
    tags: ["citrix", "crash", "vdi"],
  },
  {
    text: "Teams isn't letting me share my screen — the share button is completely greyed out. Rejoining to see if it fixes.",
    category: "app",
    credibility: 93,
    tags: ["teams", "screen share", "bug"],
  },
  {
    text: "Outlook froze during my last email and took my task manager with it. Had to hard-restart.",
    category: "app",
    credibility: 86,
    tags: ["outlook", "freeze", "restart"],
  },
  {
    text: "Teams audio stopped working mid-session — no input or output, even with the right devices selected.",
    category: "app",
    credibility: 90,
    tags: ["teams", "audio", "microphone"],
  },
  {
    text: "The Teams update that rolled out this morning broke my audio routing. Had to rollback the app.",
    category: "app",
    credibility: 88,
    tags: ["teams", "update", "audio"],
  },
  {
    text: "Zoom link opened but just sat at 'Connecting...' indefinitely. The host had to resend the invite.",
    category: "app",
    credibility: 80,
    tags: ["zoom", "connecting", "link"],
  },
  {
    text: "My browser tab with the meet link got suspended by Chrome's memory saver. Had to reopen the link.",
    category: "app",
    credibility: 76,
    tags: ["chrome", "browser", "memory"],
  },
  {
    text: "Teams signed me out automatically — seems the SSO token expired. Had to re-authenticate.",
    category: "app",
    credibility: 84,
    tags: ["teams", "sso", "auth"],
  },
  {
    text: "The Webex plugin in my browser keeps crashing. IT is still investigating since last Tuesday.",
    category: "app",
    credibility: 82,
    tags: ["webex", "plugin", "browser"],
  },
  {
    text: "OneDrive went into a sync loop and was consuming 100% CPU — had to kill the process before I could do anything.",
    category: "app",
    credibility: 87,
    tags: ["onedrive", "sync", "cpu"],
  },
  {
    text: "Sorry, my Citrix crashed again. This VDI session is notoriously unstable — relaunching now.",
    category: "app",
    credibility: 94,
    tags: ["citrix", "crash", "vdi"],
  },
  {
    text: "Ah, had to restart Teams — it was frozen on the loading screen. Apologies for the delay.",
    category: "app",
    credibility: 92,
    tags: ["teams", "restart", "freeze"],
  },
  {
    text: "Teams is not responding at all — the window is completely unresponsive. Force quitting and reopening.",
    category: "app",
    credibility: 91,
    tags: ["teams", "unresponsive", "crash"],
  },
  {
    text: "Teams is not letting me share my window — keeps saying 'sharing is disabled by your administrator'. Trying a different approach.",
    category: "app",
    credibility: 89,
    tags: ["teams", "screen share", "policy"],
  },

  // ── DEVICE ────────────────────────────────────────────────
  {
    text: "Windows pushed a mandatory update at the worst possible moment. Rebooting now, will join as soon as it's done.",
    category: "device",
    credibility: 96,
    tags: ["windows", "update", "reboot"],
  },
  {
    text: "Got a BSOD — kernel panic. Machine is back up, just need a minute to reopen everything.",
    category: "device",
    credibility: 89,
    tags: ["bsod", "crash", "kernel"],
  },
  {
    text: "My webcam driver keeps failing after every restart. Device manager shows a yellow triangle — it's a known driver conflict.",
    category: "device",
    credibility: 83,
    tags: ["webcam", "driver", "device manager"],
  },
  {
    text: "My laptop fan started going berserk and the CPU throttled to 400MHz. Closed some processes, joining now.",
    category: "device",
    credibility: 81,
    tags: ["cpu", "throttle", "performance"],
  },
  {
    text: "The laptop lid sensor went haywire — the machine kept going to sleep even when open. Had to disable it in BIOS.",
    category: "device",
    credibility: 78,
    tags: ["bios", "laptop", "hardware"],
  },
  {
    text: "My second monitor just went black — suspect a driver issue. Had to drag everything to the main screen.",
    category: "device",
    credibility: 75,
    tags: ["monitor", "display", "driver"],
  },
  {
    text: "Machine ran out of disk space and Teams couldn't write its cache. Cleared some space — back up now.",
    category: "device",
    credibility: 85,
    tags: ["disk", "storage", "teams"],
  },
  {
    text: "USB hub died and took my headset, keyboard, and mouse with it. Had to switch to laptop-native peripherals.",
    category: "device",
    credibility: 80,
    tags: ["usb", "hardware", "peripherals"],
  },
  {
    text: "My laptop battery hit 0% and it didn't hibernate gracefully — had to restart and reload everything.",
    category: "device",
    credibility: 88,
    tags: ["battery", "laptop", "shutdown"],
  },

  // ── SECURITY ──────────────────────────────────────────────
  {
    text: "The antivirus quarantined Teams as a false positive. I'm raising a ticket with IT to whitelist it — using browser in the meantime.",
    category: "security",
    credibility: 92,
    tags: ["antivirus", "quarantine", "false positive"],
  },
  {
    text: "My MFA token expired mid-authentication and I had to go through the whole flow again — Microsoft Authenticator timing issue.",
    category: "security",
    credibility: 90,
    tags: ["mfa", "authenticator", "token"],
  },
  {
    text: "Endpoint compliance check failed because Windows Defender definitions weren't up to date. Had to force-sync.",
    category: "security",
    credibility: 91,
    tags: ["compliance", "defender", "endpoint"],
  },
  {
    text: "My device got flagged by Intune as non-compliant after the policy update last night. Had to enroll it again.",
    category: "security",
    credibility: 88,
    tags: ["intune", "mdm", "compliance"],
  },
  {
    text: "Conditional access policy blocked me — apparently I need to be on the corporate network or have a compliant device. Working on it.",
    category: "security",
    credibility: 93,
    tags: ["conditional access", "azure ad", "policy"],
  },
  {
    text: "The CrowdStrike agent went into a CPU storm and rendered the machine unusable for about 10 minutes.",
    category: "security",
    credibility: 87,
    tags: ["crowdstrike", "edr", "performance"],
  },
  {
    text: "Certificate for our internal CA expired and the browser is now blocking every internal site with a security warning.",
    category: "security",
    credibility: 86,
    tags: ["certificate", "pki", "browser"],
  },
  {
    text: "The DLP policy flagged my screen share as a potential data exfiltration attempt. Teams blocked it outright.",
    category: "security",
    credibility: 84,
    tags: ["dlp", "screen share", "policy"],
  },
  {
    text: "It seems the antivirus has isolated my device — quarantined several system files. Working with IT to restore access.",
    category: "security",
    credibility: 90,
    tags: ["antivirus", "quarantine", "isolation"],
  },

  // ── INFRA / VPN ───────────────────────────────────────────
  {
    text: "VPN keeps disconnecting every 5 minutes — looks like a certificate rotation on the gateway side. IT is aware.",
    category: "infra",
    credibility: 90,
    tags: ["vpn", "certificate", "gateway"],
  },
  {
    text: "Split-tunnel VPN is misbehaving — all DNS queries are going through the tunnel and the resolver is timing out.",
    category: "infra",
    credibility: 88,
    tags: ["vpn", "dns", "split tunnel"],
  },
  {
    text: "The corporate proxy is blocking the Teams CDN endpoints again. Seen this before after a firewall policy push.",
    category: "infra",
    credibility: 91,
    tags: ["proxy", "firewall", "teams"],
  },
  {
    text: "AD authentication is slow — the DC in our region seems overloaded. Kerberos ticket took 3 minutes to issue.",
    category: "infra",
    credibility: 86,
    tags: ["active directory", "kerberos", "dc"],
  },
  {
    text: "The global load balancer for our ZTNA solution is having issues — getting 503s on every auth attempt.",
    category: "infra",
    credibility: 89,
    tags: ["ztna", "load balancer", "auth"],
  },
  {
    text: "DNS is resolving internal hostnames to the wrong IPs — looks like a stale cache in our on-prem resolver.",
    category: "infra",
    credibility: 87,
    tags: ["dns", "resolver", "infra"],
  },
  {
    text: "The SASE platform is routing my traffic through a datacenter in Singapore today. Latency is through the roof.",
    category: "infra",
    credibility: 82,
    tags: ["sase", "routing", "latency"],
  },
];

// Export for use in app.js
window.EXCUSES = EXCUSES;
