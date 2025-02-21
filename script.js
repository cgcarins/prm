document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    let selectedStars = 0;

    stars.forEach((star) => {
        star.addEventListener("click", function () {
            selectedStars = parseInt(this.getAttribute("data-value"));

            stars.forEach((s, i) => {
                if (i < selectedStars) {
                    s.classList.add("active");
                } else {
                    s.classList.remove("active");
                }
            });
        });
    });

    // Garantir que a máscara seja aplicada corretamente
    document.addEventListener("DOMContentLoaded", function () {
        var telefoneMask = new Inputmask("(99) 99999-9999");
        telefoneMask.mask(document.getElementById("telefone"));
    });

    document.getElementById("arinsForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const url = "https://script.google.com/macros/s/AKfycbzsVk9gKChuAMZYlVW60WhjoMNTCgBc0pZ951PCpBWMamE-8GwsxmE806gni6MVuOsh5w/exec"; 

        const formData = new FormData(this);
        formData.append("feedback", selectedStars);

        // Ajuste para valores numéricos com vírgula
        let valorCampo = document.getElementById("valores").value;
        let valorFormatado = valorCampo.replace(/\./g, "").replace(",", ".");
        formData.set("valores", valorFormatado);

        // Adicionar o novo campo "cargo" no envio
        formData.append("cargo", document.getElementById("cargo").value);

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert("Dados enviados com sucesso! Seus registros foram armazenados.");
            document.getElementById("arinsForm").reset();
            stars.forEach(s => s.classList.remove("active"));
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao enviar os dados. Verifique a conexão ou tente novamente.");
        });
    });
});
