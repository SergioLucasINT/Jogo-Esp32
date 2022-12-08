alert(
  "Seja bem vindo ao jogo do Sergião!\nO Jogador Azul é controlado pelo teclado e o\nJogador Vermelho é controlado pelo clique do mouse.\nPara vencer, o jogador deve chegar a 100 pontos.\nBoa sorte!"
);

document.onclick = function () {
  let number = document.getElementById("current-red").innerHTML;
  number++;
  document.getElementById("current-red").innerHTML = number;
  if (number == 100) {
    alert("Jogador Vermelho Venceu!\nClique em OK para reiniciar o jogo.");
    document.getElementById("current-red").innerHTML = 0;
    document.getElementById("current-blue").innerHTML = 0;
    fetch("https://6zdsbr-3000.preview.csb.app/esp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Winner: "Red" }),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
  }
};

document.addEventListener("keydown", (event) => {
  let number = document.getElementById("current-blue").innerHTML;
  number++;
  document.getElementById("current-blue").innerHTML = number;
  if (number == 100) {
    alert("Jogador Azul Venceu!\nClique em OK para reiniciar o jogo.");
    document.getElementById("current-red").innerHTML = 0;
    document.getElementById("current-blue").innerHTML = 0;
    fetch("https://6zdsbr-3000.preview.csb.app/esp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Winner: "Blue" }),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
  }
});
