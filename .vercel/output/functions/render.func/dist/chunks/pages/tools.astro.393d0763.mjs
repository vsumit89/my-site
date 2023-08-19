import { c as createAstro, a as createComponent, r as renderTemplate } from '../astro.1d7f3216.mjs';
import 'html-escaper';
import 'cookie';
import 'kleur/colors';
import 'path-to-regexp';
import 'mime';
import 'string-width';

const $$Astro = createAstro();
const $$Tools = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tools;
  return renderTemplate``;
}, "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/pages/tools.astro", void 0);

const $$file = "/Users/sumit/dev/not-factly/knowledge-garden-new/my-site/src/pages/tools.astro";
const $$url = "/tools";

export { $$Tools as default, $$file as file, $$url as url };