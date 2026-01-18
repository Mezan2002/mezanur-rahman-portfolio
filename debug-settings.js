async function debugSettings() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/site-settings");
    const json = await res.json();
    console.log(JSON.stringify(json.data.aboutPage, null, 2));
  } catch (e) {
    console.error(e);
  }
}

debugSettings();
