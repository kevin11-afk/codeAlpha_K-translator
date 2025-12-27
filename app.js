async function loadLanguages() {
  const res = await fetch("http://127.0.0.1:8000/languages");
  const langs = await res.json();

  const src = document.getElementById("sourceLang");
  const tgt = document.getElementById("targetLang");

  for (const [name, code] of Object.entries(langs)) {
    src.innerHTML += `<option value="${code}">${name}</option>`;
    tgt.innerHTML += `<option value="${code}">${name}</option>`;
  }
}

loadLanguages();

async function translateText() {
  const text = document.getElementById("inputText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!text.trim()) {
    alert("Type something da 🤦‍♂️");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target })
    });

    const data = await res.json();
    document.getElementById("outputText").innerText = data.translated;

  } catch (err) {
    console.error(err);
    document.getElementById("outputText").innerText =
      "💥 Backend not responding da";
  }
}

function swapLang() {
  const src = document.getElementById("sourceLang");
  const tgt = document.getElementById("targetLang");
  [src.value, tgt.value] = [tgt.value, src.value];
}
