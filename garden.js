document.addEventListener("DOMContentLoaded", () => {
  let coins = parseInt(localStorage.getItem("coins")) || 100;
  let gardens = JSON.parse(localStorage.getItem("gardens")) || [];
  let selectedGardenId =
    parseInt(localStorage.getItem("selectedGardenId")) || null;
  let realTrees = parseInt(localStorage.getItem("realTrees")) || 0;

  const coinsDisplay = document.getElementById("coinsDisplay");
  const realTreesDisplay = document.getElementById("realTreesDisplay");
  const buyGardenBtn = document.getElementById("buyGardenBtn");
  const gardensList = document.getElementById("gardensList");
  const gardenDisplay = document.getElementById("gardenDisplay");

  updateCoinsDisplay();
  updateRealTreesDisplay();
  renderGardensList();

  if (selectedGardenId) openGarden(selectedGardenId);

  function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
    localStorage.setItem("coins", coins);
  }

  function updateRealTreesDisplay() {
    realTreesDisplay.textContent = `Real Trees: ${realTrees}`;
    localStorage.setItem("realTrees", realTrees);
  }

  buyGardenBtn.addEventListener("click", () => {
    const gardenCost = 50;
    if (coins >= gardenCost) {
      coins -= gardenCost;
      updateCoinsDisplay();

      const newGarden = {
        id: gardens.length + 1,
        trees: Array(12).fill(false),
        rewarded: false,
      };
      gardens.push(newGarden);
      localStorage.setItem("gardens", JSON.stringify(gardens));

      renderGardensList();
      openGarden(newGarden.id);
    } else {
      alert("Not enough Coins!");
    }
  });

  function renderGardensList() {
    gardensList.innerHTML = "";
    gardens.forEach((garden) => {
      const btn = document.createElement("button");
      btn.className =
        "bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow transform transition-transform hover:scale-105";
      btn.textContent = `Garden #${garden.id}`;
      btn.addEventListener("click", () => openGarden(garden.id));
      gardensList.appendChild(btn);
    });
  }

  function openGarden(id) {
    selectedGardenId = id;
    localStorage.setItem("selectedGardenId", selectedGardenId);
    const selectedGarden = gardens.find((g) => g.id === id);

    gardenDisplay.innerHTML = "";

    selectedGarden.trees.forEach((hasTree, idx) => {
      const plot = document.createElement("div");
      plot.className =
        "w-28 h-28 bg-yellow-200 rounded flex items-center justify-center shadow plot-hover relative";

      if (hasTree) {
        const tree = createTree();
        plot.appendChild(tree);
      }

      plot.addEventListener("click", () => {
        const treeCost = 10;
        if (coins >= treeCost && !selectedGarden.trees[idx]) {
          coins -= treeCost;
          updateCoinsDisplay();

          selectedGarden.trees[idx] = true;
          localStorage.setItem("gardens", JSON.stringify(gardens));

          const tree = createTree();
          plot.appendChild(tree);

          if (
            selectedGarden.trees.every((t) => t) &&
            !selectedGarden.rewarded
          ) {
            selectedGarden.rewarded = true;
            realTrees += 1;
            updateRealTreesDisplay();
            localStorage.setItem("gardens", JSON.stringify(gardens));
            alert(
              "Congratulations! You've completed this garden. One real tree will be planted!"
            );
          }
        }
      });

      gardenDisplay.appendChild(plot);
    });
  }

  function createTree() {
    const tree = document.createElement("div");
    const size = 24 + Math.random() * 12;
    tree.className = "rounded-full animate-grow shadow-md";
    tree.style.width = `${size}px`;
    tree.style.height = `${size}px`;
    tree.style.background = `linear-gradient(to top, #2f7a2f, #6fc36f)`;
    return tree;
  }
});
