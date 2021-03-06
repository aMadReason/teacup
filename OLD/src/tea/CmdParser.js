import nlp from "compromise";

function cmdParser(input, lexicon = {}) {
  const original = input.toLowerCase().replace(/\.+$/, "");
  const doc = nlp(original, lexicon)
    .normalize({ verbs: true })
    .match("(#Verb|#Noun) .?+");

  const parts = doc.clone().splitAfter("#Noun").out("array");
  const mainPart = parts.find((i) => !i.includes("use")) || parts[0];
  const otherPart = parts.length > 1 ? parts.find((i) => i !== mainPart) : "";
  const actOn = nlp(mainPart, lexicon)
    .match("#Adjective?+ #Noun")
    .first()
    .text();

  const actWith = nlp(otherPart, lexicon)
    .match("#Adjective?+ #Noun")
    .first()
    .text();

  const verbs = doc.verbs().out("array");
  const nouns = doc.nouns().out("array");
  const action = verbs.find((i) => !i.includes("use")) || verbs[0] || "";
  const text = doc.text();
  const terms = nlp(original, lexicon)
    .normalize({ verbs: true }).json().map(i => i.text)

  const results = {
    json: doc.json(),
    parts,
    action,
    actOn,
    actWith,
    text,
    verbs,
    nouns,
    terms,
    original
  };

  return results;
}

export default cmdParser;
