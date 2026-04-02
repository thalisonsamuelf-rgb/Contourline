"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  id: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="18" x2="8" y2="11" />
        <line x1="12" y1="18" x2="12" y2="7" />
        <line x1="16" y1="18" x2="16" y2="13" />
      </svg>
    ),
  },
  {
    id: "layers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 22,8.5 12,15 2,8.5" />
        <polyline points="2,12.3 12,18.8 22,12.3" />
        <polyline points="2,16.5 12,23 22,16.5" />
      </svg>
    ),
  },
  {
    id: "wallet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16.5 4.5H7.5a1 1 0 0 0-1 1V7h11V5.5a1 1 0 0 0-1-1z" />
        <circle cx="16.5" cy="14" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function AnimatedPillNav() {
  const [active, setActive] = useState<string>("dashboard");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isDark = theme === "dark";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .dark-cockpit-nav-wrapper {
          --bg:               #0b0b0b;
          --nav-grad-top:     #191919;
          --nav-grad-bot:     #060606;
          --nav-border-top:   rgba(255,255,255,0.16);
          --nav-border-side:  rgba(255,255,255,0.05);
          --nav-border-bot:   rgba(0,0,0,0.98);
          --nav-shadow:       0 2px 0 rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.75);
          --nav-inset:        inset 0 1px 0 rgba(255,255,255,0.04);

          --tab-active-top:   #070707;
          --tab-active-bot:   #131313;
          --tab-active-inset: inset 0 2px 5px rgba(0,0,0,0.7), inset 0 -1px 2px rgba(255,255,255,0.03);

          --divider:          rgba(255,255,255,0.07);
          --icon-off:         rgba(255,255,255,0.38);
          --icon-on:          rgba(255,255,255,0.92);

          --tog-top:          #060606;
          --tog-bot:          #030303;
          --tog-border-top:   rgba(255,255,255,0.10);
          --tog-border-bot:   rgba(0,0,0,0.98);
          --tog-border-side:  rgba(255,255,255,0.04);
          --tog-icon:         rgba(255,255,255,0.68);
          --tog-shadow:       inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 0 rgba(0,0,0,0.85), 0 6px 20px rgba(0,0,0,0.55);
        }

        .dark-cockpit-nav-wrapper.light {
          --bg:               #e6e6e6;
          --nav-grad-top:     #f4f4f4;
          --nav-grad-bot:     #ebebeb;
          --nav-border-top:   rgba(255,255,255,0.90);
          --nav-border-side:  rgba(0,0,0,0.06);
          --nav-border-bot:   rgba(0,0,0,0.18);
          --nav-shadow:       0 2px 0 rgba(0,0,0,0.12), 0 6px 24px rgba(0,0,0,0.10);
          --nav-inset:        inset 0 1px 0 rgba(255,255,255,0.6);

          --tab-active-top:   #e8e8e8;
          --tab-active-bot:   #f2f2f2;
          --tab-active-inset: inset 0 2px 4px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(255,255,255,0.9);

          --divider:          rgba(0,0,0,0.09);
          --icon-off:         rgba(0,0,0,0.30);
          --icon-on:          rgba(0,0,0,0.82);

          --tog-top:          #f8f8f8;
          --tog-bot:          #efefef;
          --tog-border-top:   rgba(255,255,255,0.90);
          --tog-border-bot:   rgba(0,0,0,0.15);
          --tog-border-side:  rgba(0,0,0,0.06);
          --tog-icon:         rgba(0,0,0,0.70);
          --tog-shadow:       inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 0 rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.10);
        }

        .dark-cockpit-nav-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          transition: background 0.45s cubic-bezier(0.4,0,0.2,1);
          gap: 40px;
        }

        .nav-shell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-tabs {
          display: flex;
          align-items: center;
          background: linear-gradient(180deg, var(--nav-grad-top) 0%, var(--nav-grad-bot) 100%);
          border-radius: 20px;
          padding: 7px 8px;
          border-top:    1.5px solid var(--nav-border-top);
          border-left:   1px   solid var(--nav-border-side);
          border-right:  1px   solid var(--nav-border-side);
          border-bottom: 1.5px solid var(--nav-border-bot);
          box-shadow: var(--nav-shadow), var(--nav-inset);
          transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .tab {
          position: relative;
          width: 64px;
          height: 54px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
        }

        .tab::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 26px;
          background: var(--divider);
          border-radius: 1px;
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.3s, background 0.45s ease;
        }
        
        .tab:first-child::before {
          display: none;
        }

        .hide-divider::before { opacity: 0 !important; }

        .tab svg {
          color: var(--icon-off);
          width: 21px;
          height: 21px;
          position: relative;
          z-index: 3;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .tab:not(.active):hover svg {
          color: color-mix(in srgb, var(--icon-off) 50%, var(--icon-on));
        }

        .tab.active {
          background: linear-gradient(180deg, var(--tab-active-top) 0%, var(--tab-active-bot) 100%);
          box-shadow: var(--tab-active-inset);
          transition: background 0.45s ease, box-shadow 0.45s ease;
        }

        .tab.active svg { color: var(--icon-on); }

        .gold-ring {
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: conic-gradient(
            from var(--angle),
            #4a2e0a   0deg,    /* Dark Base */
            #6b4412   20deg,
            #e6b141   45deg,   /* Start of Bright Highlight */
            #ffffff   50deg,   /* Pure White Specular Highlight */
            #ffe07a   55deg,   /* Bright Gold Reflection */
            #e6b141   60deg,
            #6b4412   85deg,
            #2e1b04   110deg,  /* Deepest Shadow */
            #4a2e0a   135deg,
            #8a5e18   180deg,  /* Mid-tone brown */
            #b37b22   225deg,
            #ffffff   230deg,  /* Second Pure White Highlight */
            #e6b141   235deg,
            #6b4412   270deg,
            #2e1b04   315deg,  /* Deep Shadow */
            #4a2e0a   360deg
          );
          animation: spin-gold 3s linear infinite;
          z-index: 0;
        }

        .ring-mask {
          position: absolute;
          inset: 2px;
          border-radius: 12px;
          background: linear-gradient(180deg, #18181A 0%, #080808 100%);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05);
          z-index: 2;
          transition: background 0.45s ease;
        }

        @keyframes spin-gold {
          to { --angle: 360deg; }
        }

        .theme-toggle {
          width: 62px;
          height: 54px;
          background: linear-gradient(180deg, var(--tog-top), var(--tog-bot));
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
          border-top:    1.5px solid var(--tog-border-top);
          border-left:   1px   solid var(--tog-border-side);
          border-right:  1px   solid var(--tog-border-side);
          border-bottom: 1.5px solid var(--tog-border-bot);
          box-shadow: var(--tog-shadow);
          transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .theme-toggle svg {
          color: var(--tog-icon);
          width: 20px;
          height: 20px;
          transition: color 0.35s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        
        .theme-toggle:hover svg { transform: rotate(22deg) scale(1.08); }

        .label {
          font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          font-weight: 500;
          color: var(--icon-off);
          text-transform: uppercase;
          user-select: none;
          transition: color 0.45s;
        }
      `}} />

      <div className={`dark-cockpit-nav-wrapper ${!isDark ? 'light' : ''}`}>
        <div className="nav-shell">
          <div className="nav-tabs">
            {navItems.map((item, index) => {
              const isActive = active === item.id;
              // If current item is active, or the previous item is active, hide the divider
              const hideDivider = isActive || (index > 0 && navItems[index - 1].id === active);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-label={`Open ${item.id}`}
                  className={`tab ${isActive ? "active" : ""} ${hideDivider ? "hide-divider" : ""}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-background"
                      className="absolute inset-0 z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="gold-ring"></div>
                      <div className="ring-mask"></div>
                    </motion.div>
                  )}
                  {item.icon}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4.2" />
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="5.84" y2="5.84" />
                <line x1="18.16" y1="18.16" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.84" y2="18.16" />
                <line x1="18.16" y1="5.84" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                <line x1="17.5" y1="3.5" x2="19.2" y2="1.8" strokeWidth="1.4" />
                <line x1="20" y1="6" x2="22" y2="5" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
