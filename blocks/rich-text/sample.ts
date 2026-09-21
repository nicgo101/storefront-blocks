import type { RichTextProps } from './rich-text';

export const sample: RichTextProps = {
  eyebrow: 'Om oss',
  title: 'En butik som började i ett garage',
  html: `
<p>Det började 2004 med en pump som ingen kunde laga. Vi lagade den, sedan nästa, och snart hade vi fler kunder än verktyg. I dag är vi tolv personer i Uppsala som säljer, servar och ger råd om samma maskiner som vi själva jobbar med.</p>
<h3>Det vi tror på</h3>
<ul>
  <li><strong>Rätt del första gången.</strong> Vi frågar en gång till hellre än att skicka fel.</li>
  <li><strong>Reparera före byta.</strong> En maskin som går att laga ska lagas.</li>
  <li><strong>Svar samma dag.</strong> Ring, mejla eller kom in.</li>
</ul>
<blockquote>Vi säljer inte det vi inte själva skulle välja.</blockquote>
<p>Läs mer om <a href="/verkstad">verkstaden</a> eller <a href="/kontakt">hör av dig</a>.</p>
`,
  width: 'narrow',
  size: 'base',
};
