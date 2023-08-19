import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot, m as maybeRenderHead } from '../astro.1d7f3216.mjs';
import 'html-escaper';
import { useState } from 'react';
/* empty css                           */import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import 'cookie';
import 'kleur/colors';
import 'path-to-regexp';
import 'mime';
import 'string-width';

const signLogo = "/_astro/signature.3691e00c.png";

function Navbar() {
  const [selectedLink, setSelectedLink] = useState(0);
  const links = [{
    name: "Home",
    url: "/"
  }, {
    name: "About",
    url: "/about"
  }, {
    name: "Project",
    url: "/blog"
  }, {
    name: "Tools",
    url: "/contact"
  }];
  const styles = {
    selected: {
      color: "black",
      backgroundColor: "#f6f6f6",
      fontWeight: "bold"
    },
    notSelected: {
      color: "#6c6c6c",
      backgroundColor: "white",
      fontWeight: "normal"
    }
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "navbar-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "img-container",
        children: /* @__PURE__ */ jsx("img", {
          src: signLogo
        })
      }), /* @__PURE__ */ jsx("ul", {
        children: links.map(({
          name,
          url
        }, index) => /* @__PURE__ */ jsx("li", {
          style: {
            backgroundColor: selectedLink === index ? styles.selected.backgroundColor : styles.notSelected.backgroundColor
          },
          onClick: () => setSelectedLink(index),
          children: /* @__PURE__ */ jsx("a", {
            href: url,
            style: {
              color: selectedLink === index ? styles.selected.color : styles.notSelected.color,
              fontWeight: selectedLink === index ? styles.selected.fontWeight : styles.notSelected.fontWeight
            },
            children: name
          })
        }))
      })]
    })
  });
}
__astro_tag_component__(Navbar, "@astrojs/react");

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="astro-SCKKX6R4">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap" rel="stylesheet">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title}</title>
  ${renderHead()}</head>
  <body class="astro-SCKKX6R4">
    ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/layouts/Navbar/Navbar", "client:component-export": "Navbar", "class": "astro-SCKKX6R4" })}
    <div class="main-wrapper astro-SCKKX6R4">
			<div class="main-page astro-SCKKX6R4">
				${renderSlot($$result, $$slots["default"])}
			</div>
		</div>
  </body></html>`;
}, "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main class="astro-J7PV25F6">
		sumit vishwakarma
	</main>
` })}`;
}, "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/pages/index.astro", void 0);

const $$file = "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
