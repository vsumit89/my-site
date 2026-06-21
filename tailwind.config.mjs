/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // ── Palette ────────────────────────────────────────────────────────
      colors: {
        paper: {
          DEFAULT: '#f7f4ee',   // page background
          2:       '#fbf9f5',   // card / input background
          3:       '#efe9dc',   // warm tinted surface (callout, tag bg)
        },
        ink: {
          DEFAULT: '#1a1715',   // primary text
          2:       '#3d3631',   // secondary text (excerpt, body links)
          soft:    '#6b635a',   // tertiary text (nav, tagline, meta)
          faded:   '#a39c93',   // disabled / date / footer
        },
        line: {
          DEFAULT: '#e3dccc',   // border, divider
          soft:    '#ede6d5',   // subtle divider
        },
        accent: '#b8451f',      // links, highlights, tags, CTA hover
        status: {
          shipped: '#2f7d4f',   // green label
          wip:     '#b58a1d',   // amber label
        },
      },

      // ── Fonts ──────────────────────────────────────────────────────────
      fontFamily: {
        serif: ['"Instrument Serif"', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans:  ['"Geist"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono:  ['"Geist Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },

      // ── Type scale ─────────────────────────────────────────────────────
      // All fixed sizes are even px. Fluid sizes use clamp() with even bounds.
      fontSize: {
        // Metadata / mono labels
        'label':      ['10px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'caption':    ['12px', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'meta':       ['12px', { lineHeight: '1.4', letterSpacing: '0.06em' }],
        // UI chrome
        'nav':        ['14px', { lineHeight: '1.6' }],
        'small':      ['14px', { lineHeight: '1.7' }],
        // Code blocks
        'code':       ['14px', { lineHeight: '1.65' }],
        'code-sm':    ['12px', { lineHeight: '1.65' }],
        // Article section headings (fixed)
        'prose-h2':   ['22px', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'prose-h3':   ['18px', { lineHeight: '1.4' }],
        // Fluid — scales smoothly between breakpoints
        'display':    ['clamp(30px, 5.5vw, 42px)', { lineHeight: '1',    letterSpacing: '-0.01em' }],
        'h1-fluid':   ['clamp(34px, 6vw,   52px)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'h2-fluid':   ['clamp(26px, 4.5vw, 34px)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'lede':       ['clamp(18px, 2.6vw, 22px)', { lineHeight: '1.4',  letterSpacing: '-0.005em' }],
        'body':       ['clamp(16px, 1.5vw, 18px)', { lineHeight: '1.7' }],
      },

      // ── Layout widths ──────────────────────────────────────────────────
      maxWidth: {
        'content': '1040px',   // outer layout container
        'article': '680px',    // prose reading width
        'about':   '640px',    // about page
        'form':    '380px',    // subscribe form
        'excerpt': '620px',    // essay list excerpt
      },
      width: {
        'sidebar': '220px',
      },

      // ── Grid helpers ───────────────────────────────────────────────────
      gridTemplateColumns: {
        'sidebar': '220px 1fr',
      },

      // ── Responsive breakpoints ─────────────────────────────────────────
      // max-width variants so we can write  tablet:grid-cols-1  etc.
      screens: {
        tablet: { max: '960px' },
        mobile: { max: '640px' },
      },
    },
  },
  plugins: [],
};
