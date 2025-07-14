let maindomain = "https://bs.futiax.ovh"; // replace with your own domain
async function CalculateClubRanking(playerTag) {
  try {
    const goldformax = await calculatePlayerGold("#YUYP2V22V", false);
    const resultElement = document.getElementById("result");
    let ranking = {};
    let data = await fetch(`${maindomain}/players/%23${playerTag}`);
    data = await data.json();
    let clubTag = data.club.tag.replace("#", "");
    let club = await fetch(`${maindomain}/clubs/%23${clubTag}/members`);
    club = (await club.json()).items;
    let count = club.length - 1;
    await club.forEach(async (player) => {
      count--;
      let playergold = await calculatePlayerGold(player.tag, false);
      ranking[player.tag] = [player.name, player.trophies, playergold];
      resultElement.textContent = `Le classement des plus maxé :\n${Object.values(
        ranking
      )
        .sort((a, b) => (goldformax - a[2]) / a[1] - (goldformax - b[2]) / b[1])
        .map(
          (value) =>
            `${value[0]} : ${value[1]} trophées pour ${
              goldformax - value[2]
            } or soit environ ${(goldformax - value[2]) / value[1]} gs/tr`
        )
        .join("\n")}`;
    });
    console.log(ranking);
  } catch (error) {
    console.error("Erreur:", error);
  }
}

async function calculatePlayerGold(playerTag, bool) {
  try {
    console.log("Tag :", playerTag);
    const ttresponse = await fetch(`${maindomain}/brawlers`);
    const ttdata = await ttresponse.json();
    const nbrofbrawlers = ttdata.items.length - 1;
    const response = await fetch(
      `${maindomain}/players/%23${playerTag.replace("#", "")}`
    );
    const data = await response.json();
    const brawlers = data.brawlers;
    const or_costs = [0, 0, 20, 35, 75, 140, 290, 480, 800, 1250, 1875, 2800];
    let totalGoldNeeded = 0;
    let info = {
      "Brawler(without credit)": nbrofbrawlers,
      Gears: 0,
      Gadgets: 0,
      StarPowers: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    };
    const lvlmax = parseInt(
      document
        .getElementById("flat-slider-vertical-1")
        .getElementsByClassName("ui-slider-tip")[0].textContent
    );
    const gemax = parseInt(
      document
        .getElementById("flat-slider-vertical-2")
        .getElementsByClassName("ui-slider-tip")[0].textContent
    );
    const gamax = parseInt(
      document
        .getElementById("flat-slider-vertical-3")
        .getElementsByClassName("ui-slider-tip")[0].textContent
    );
    const spmax = parseInt(
      document
        .getElementById("flat-slider-vertical-4")
        .getElementsByClassName("ui-slider-tip")[0].textContent
    );
    brawlers.forEach((brawler) => {
      const level = brawler.power;
      info["Brawler(without credit)"] -= 1;

      // Coût pour les niveaux restants
      for (let i = level + 1; i <= lvlmax; i++) {
        totalGoldNeeded += or_costs[i];
        info[i] += 1;
      }

      // Vérifier les équipements
      info["Gears"] += Math.max(0, gemax - brawler.gears.length);
      totalGoldNeeded += Math.max(0, gemax - brawler.gears.length) * 1000;
      // Vérifier les gadgets
      info["Gadgets"] += Math.max(0, gamax - brawler.gadgets.length);
      totalGoldNeeded += Math.max(0, gamax - brawler.gadgets.length) * 1000;
      // Vérifier les star powers
      info["StarPowers"] += Math.max(0, spmax - brawler.starPowers.length);
      totalGoldNeeded += Math.max(0, spmax - brawler.starPowers.length) * 2000;
    });
    for (let i = 1; i < info["Brawler(without credit)"]; i++) {
      for (let i = 1; i <= lvlmax; i++) {
        totalGoldNeeded += or_costs[i];
        info[i] += 1;
      }
      info["Gears"] += gemax;
      totalGoldNeeded += gemax * 1000;
      info["Gadgets"] += gamax;
      totalGoldNeeded += gamax * 1000;
      info["StarPowers"] += spmax;
      totalGoldNeeded += spmax * 2000;
    }
    if (bool) {
      const resultElement = document.getElementById("result");
      resultElement.textContent = `${
        data.name
      } a besoin de ${totalGoldNeeded} or\nenviron ${Math.round(
        totalGoldNeeded / 49.8069
      )} prix star${Object.keys(info)
        .filter((key) => info[key] > 0)
        .sort((a, b) => b.length - a.length || b.localeCompare(a))
        .map((key) => `\n${key} : ${info[key]}`)
        .join("")}`;
    } else {
      return totalGoldNeeded;
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}
