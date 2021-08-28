import { ElementWithAttributes } from "/sc/generalFunctions/ElementWithAttributesConstructor.js";

function buildImprint(body) {
  const imprintLink = new ElementWithAttributes(
      "div",
      { attribute: "id", value: "imprint" },
      body
    ),
    imprintBody = new ElementWithAttributes(
      "div",
      [
        { attribute: "id", value: "imprintBody" },
        { attribute: "style", value: "visibility:hidden" },
      ],
      body
    ),
    h2Imprint = new ElementWithAttributes(
      "h2",
      { attribute: "id", value: "h2Imprint" },
      imprintBody
    ),
    imprintText = new ElementWithAttributes(
      "ul",
      { attribute: "id", value: "imprintText" },
      imprintBody
    ),
    dataDeclaration = new ElementWithAttributes(
      "p",
      { attribute: "id", value: "dataDeclaration" },
      imprintBody
    );

  async function builder() {
    const imprintDataLoad = await fetch("/imprintData");
    imprintLink.innerHTML = "Impressum & Datenschutz öffnen";
    imprintLink.style.position = "absolute";
    imprintLink.style.textAlign = "center";
    imprintLink.style.bottom = "1rem";
    imprintLink.style.width = "50vw";
    imprintLink.style.left = "25vw";
    imprintLink.style.fontSize = "20px";
    imprintLink.style.color = "var(--text-color-one)";
    imprintLink.style.zIndex = "100";
    imprintLink.onmouseover = () => {
      imprintLink.style.color = "var(--third-bg-color)";
      imprintLink.style.cursor = "pointer";
    };
    imprintLink.onmouseleave = () => {
      imprintLink.style.color = "var(--text-color-one)";
    };
    imprintLink.onclick = () => {
      if (imprintBody.style.visibility == "hidden") {
        imprintBody.style.visibility = "visible";
        imprintLink.innerHTML = "Impressum & Datenschutz schließen";
      } else if (imprintBody.style.visibility == "visible") {
        imprintBody.style.visibility = "hidden";
        imprintLink.innerHTML = "Impressum & Datenschutz öffnen";
      }
      imprintLink.style.color = "var(--text-color-one)";
    };

    imprintBody.style.position = "fixed";
    imprintBody.style.width = "100vw";
    imprintBody.style.height = "100vh";
    imprintBody.style.top = "0";
    imprintBody.style.backdropFilter = "blur(30px)";
    imprintBody.style.backgroundColor = "rgba(0, 0, 0, 0.34)";
    imprintBody.style.visibility = "hidden";

    h2Imprint.innerHTML = "Impressum & Datenschutzerklärung";
    h2Imprint.style.marginTop = "1rem";

    imprintText.style.color = "white";
    imprintText.style.marginTop = "3rem";
    imprintText.style.listStyle = "none";
    imprintText.style.fontSize = "20px";
    if (imprintDataLoad.ok) {
      const imprintData = await imprintDataLoad.json();
      for (let entry in await imprintData) {
        new ElementWithAttributes(
          "li",
          { attribute: "name", value: entry },
          imprintText
        );
        document.querySelector(`[name='${entry}'`).innerHTML =
          imprintData[entry];
      }
    } else {
      alert("HTTP-Error: " + imprintDataLoad.status);
    }

    dataDeclaration.innerHTML = `Wir verwenden keine Cookies. \nDer Localstorage speichert lediglich die Formulardaten in Ihrem Browser. \nWir speichern keine Daten über Sie, außer die, welche für Rechnung und Angebot notwendig sind. \nWir leiten keine Daten für Werbezwecke oder aus sonstigen Gründen an Dritte weiter.`;
    dataDeclaration.style.color = "white";
    dataDeclaration.style.margin = "2rem";
    dataDeclaration.style.fontSize = "20px";

  }
  builder();
}

export { buildImprint };
