
const toggle = document.querySelector(".toggle");
const nav = document.querySelector(".nav");

/* Menu mobile : présent uniquement sur la page d'accueil */
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}



/* Interactions de la carte mentale */
document.addEventListener("DOMContentLoaded", () => {
  const branches = [...document.querySelectorAll(".mindmap-branch")];
  const panel = document.getElementById("mindmap-detail");
  if (!branches.length || !panel) return;
  const data = {
    expansion: ["Expansion", "La France construit un empire sur plusieurs continents, surtout au XIXe siècle et au début du XXe siècle.", [
      ["La conquête de l’Algérie", "La conquête commence en 1830 et la domination française se termine avec l’indépendance de 1962."],
      ["L’expansion en Afrique", "La France étend son contrôle en Afrique de l’Ouest, en Afrique équatoriale, au Maghreb et à Madagascar."],
      ["L’expansion en Asie", "La France établit l’Indochine française en Asie du Sud-Est, comprenant notamment le Vietnam, le Laos et le Cambodge."],
      ["Les motivations", "Les motivations sont économiques, stratégiques et politiques. La « mission civilisatrice » sert aussi à justifier la domination coloniale."]
    ]],
    organisation: ["Fonctionnement", "Les territoires coloniaux ne sont pas tous gouvernés de la même manière, mais le pouvoir reste largement contrôlé par la France.", [
      ["La colonie", "Une colonie est un territoire placé sous la domination directe d’une puissance étrangère."],
      ["Le protectorat", "Le souverain local peut rester en place, mais la puissance coloniale contrôle des décisions essentielles. La Tunisie devient un protectorat en 1881 et le Maroc en 1912."],
      ["L’administration", "Des représentants de la France dirigent les territoires et appliquent les décisions coloniales."],
      ["L’économie coloniale", "Les territoires fournissent des matières premières et servent de marchés. Les infrastructures répondent souvent aux intérêts coloniaux."],
      ["Les inégalités juridiques", "Les populations colonisées ne disposent pas des mêmes droits que les citoyens français."]
    ]],
    societes: ["Sociétés coloniales", "La colonisation transforme la vie politique, économique, sociale et culturelle des populations.", [
      ["Les inégalités", "L’accès au pouvoir, aux droits et aux ressources est inégal."],
      ["La vie quotidienne", "Le travail, l’école, la langue et les pratiques culturelles sont touchés par le système colonial."],
      ["La culture et la langue", "La langue française et certaines institutions se diffusent, sans faire disparaître les langues et les cultures locales."],
      ["Les résistances", "Les résistances prennent la forme de révoltes, de mouvements politiques et de luttes pour l’indépendance."],
      ["La mission civilisatrice", "Ce discours présente la colonisation comme une mission de progrès, mais sert aussi à justifier une domination contraire à l’égalité."]
    ]],
    guerres: ["Guerres mondiales", "Les deux guerres mondiales mobilisent les empires coloniaux et modifient les relations avec la France.", [
      ["Première Guerre mondiale (1914–1918)", "Des soldats et travailleurs venus des colonies participent à l’effort de guerre français."],
      ["Entre les deux guerres", "Les revendications politiques progressent dans plusieurs territoires, alors que la domination coloniale continue."],
      ["Seconde Guerre mondiale (1939–1945)", "Les troupes coloniales participent à différents fronts. La guerre affaiblit les puissances européennes."],
      ["Après 1945", "Les idées de liberté et de droit des peuples à disposer d’eux-mêmes renforcent les mouvements anticoloniaux."]
    ]],
    decolonisation: ["Décolonisation", "Après la Seconde Guerre mondiale, les mouvements indépendantistes s’intensifient.", [
      ["La guerre d’Indochine (1946–1954)", "Le conflit oppose la France au Việt Minh et se termine après la défaite française de Điện Biên Phủ en 1954."],
      ["Maroc et Tunisie (1956)", "Les deux protectorats deviennent indépendants en 1956."],
      ["La guerre d’Algérie (1954–1962)", "La guerre oppose la France au mouvement indépendantiste algérien et se termine par l’indépendance en 1962."],
      ["Les indépendances africaines", "De nombreux territoires d’Afrique subsaharienne deviennent indépendants autour de 1960."],
      ["Les conséquences", "Les relations politiques et économiques avec l’ancienne puissance coloniale continuent d’évoluer après l’indépendance."]
    ]],
    aujourdhui: ["Héritages et monde actuel", "La fin des empires coloniaux ne met pas fin à toutes leurs conséquences.", [
      ["La mémoire coloniale", "Les débats concernent les violences, les responsabilités, les monuments, les archives et l’enseignement de l’histoire."],
      ["Les relations avec la France", "Les relations restent marquées par des liens humains, linguistiques, culturels, politiques et économiques."],
      ["Les formes d’influence", "Un État peut exercer son influence par l’économie, la diplomatie, la culture, la technologie ou l’armée."],
      ["Les États-Unis", "Les États-Unis exercent une influence mondiale militaire, économique, diplomatique et technologique."],
      ["La Chine", "La Chine développe son influence par le commerce, les investissements et les Nouvelles routes de la soie."],
    ]]
  };
  function show(key) {
    const item = data[key];
    if (!item) return;
    branches.forEach(b => b.setAttribute("aria-expanded", String(b.dataset.branch === key)));
    panel.replaceChildren();
    const label = document.createElement("p"); label.className = "mindmap-detail-label"; label.textContent = "Branche sélectionnée";
    const title = document.createElement("h3"); title.textContent = item[0];
    const intro = document.createElement("p"); intro.textContent = item[1];
    const topics = document.createElement("div"); topics.className = "mindmap-subtopics";
    const explanation = document.createElement("p"); explanation.textContent = "Choisissez un sous-thème pour afficher une explication plus précise.";
    item[2].forEach(([name, text], i) => {
      const button = document.createElement("button"); button.type = "button"; button.className = "mindmap-subtopic"; button.textContent = name; button.setAttribute("aria-pressed","false");
      button.addEventListener("click", () => {
        topics.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        explanation.textContent = text;
      });
      topics.appendChild(button); if (i === 0) button.dataset.first = "true";
    });
    panel.append(label, title, intro, topics, explanation);
    topics.querySelector("button")?.click();
  }
  branches.forEach(button => button.addEventListener("click", () => show(button.dataset.branch)));
});
