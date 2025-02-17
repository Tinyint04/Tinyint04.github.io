document.addEventListener("DOMContentLoaded", () => {
    const caballero = document.getElementById("caballero");
    const monstruo = document.getElementById("monstruo");
    const animButton = document.getElementById("animButton");
    const animButtonM = document.getElementById("animButtonM");  // Botón de animación del monstruo
    const contenedorImagenes = document.querySelector(".contenedor-imagenes");
    const containers = document.querySelectorAll(".container");
    const animButtonCD = document.getElementById("animButtonCD");
    const animButtonMD = document.getElementById("animButtonMD");
    const animButtonCW = document.getElementById("animButtonCW");
    let numM = 200;
    let click = 0;

    if (!animButtonCW || !animButtonMD || !animButtonCD || !caballero || !monstruo || !animButton || !animButtonM || !contenedorImagenes || containers.length === 0) {
        return;
    }

    let escalaCaballero = 1;
    let escalaMonstruo = 1;
    let resizeTimer;

    const tamanoOriginal = {
        caballero: { width: 60, height: 150 },
        monstruo: { width: 280, height: 300 }
    };

    function actualizarEscala() {
        let gapValue = 1;
        // Comprobar las condiciones de tamaño
        if (window.innerWidth < 1000 || window.innerHeight < 800) {
            gapValue *= 0.1;
        }

        // Actualizar el gap según el cálculo
        contenedorImagenes.style.gap = `${gapValue}px`;

        // Escalar las imágenes si el tamaño de la pantalla es pequeño
        if (window.innerWidth < 1000 || window.innerHeight < 800) {
            escalaCaballero = 0.8;
            escalaMonstruo = 0.9;
            numM = numM * 1;
        } else {
            escalaCaballero = 1;
            escalaMonstruo = 1;
            numM = numM * 1.15;
        }

        containers.forEach(container => {
            container.style.transform = `scale(${escalaCaballero})`;
        });

        caballero.style.width = `${tamanoOriginal.caballero.width * escalaCaballero}px`;
        caballero.style.height = `${tamanoOriginal.caballero.height * escalaCaballero}px`;

        monstruo.style.width = `${tamanoOriginal.monstruo.width * escalaMonstruo}px`;
        monstruo.style.height = `${tamanoOriginal.monstruo.height * escalaMonstruo}px`;
        if (click !== 0) { animacionCaballeroWin(); }
    }

    actualizarEscala();

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            actualizarEscala();
        }, 500);
    });

    function hacerGolpeCaballero() {
        let golpeAleatorio;
        let time = 0;
        let num = Math.random();

        caballero.style.opacity = "0.05";

        if (num < 0.5) {
            caballero.style.transform = `translateX(${90 * escalaCaballero}%)`;
        } else {
            caballero.style.transform = `translateX(${150 * escalaCaballero}%)`;
        }

        setTimeout(() => {
            caballero.style.opacity = "1";

            if (num < 0.5) {
                golpeAleatorio = "/ProyectoMate/img/hit(1).gif";
                time = 1900;
                caballero.style.width = `${300 * escalaCaballero}px`;
                caballero.style.height = `${280 * escalaCaballero}px`;
            } else {
                golpeAleatorio = "/ProyectoMate/img/hit(2).gif";
                time = 2800;
                caballero.style.width = `${200 * escalaCaballero}px`;
                caballero.style.height = `${200 * escalaCaballero}px`;
            }

            caballero.src = golpeAleatorio;

            setTimeout(() => {
                caballero.style.opacity = "0.05";

                setTimeout(() => {
                    caballero.style.transform = "translateX(0)";
                    caballero.src = "/ProyectoMate/img/static.gif";
                    caballero.style.width = `${tamanoOriginal.caballero.width * escalaCaballero}px`;
                    caballero.style.height = `${tamanoOriginal.caballero.height * escalaCaballero}px`;
                    caballero.style.opacity = "1";
                }, 500);
            }, time);
        }, 500);
        click = 0;
    }

    function hacerGolpeMonstruo() {
        let golpeAleatorio;
        let time = 0;
        let num = Math.random();

        monstruo.style.opacity = "0.05";

        if (num < 0.5) {
            monstruo.style.transform = `translateX(-${95 * escalaMonstruo}%)`;
        } else {
            monstruo.style.transform = `translateX(-${95 * escalaMonstruo}%)`;
        }

        setTimeout(() => {
            monstruo.style.opacity = "1";

            if (num < 0.5) {
                golpeAleatorio = "/ProyectoMate/img/hit(1)M.gif"; //
                time = 1900;
                monstruo.style.width = `${380 * escalaMonstruo}px`;
                monstruo.style.height = `${380 * escalaMonstruo}px`;
            } else {
                golpeAleatorio = "/ProyectoMate/img/hit(2)M.gif";//
                time = 2800;
                monstruo.style.width = `${355 * escalaMonstruo}px`;
                monstruo.style.height = `${355 * escalaMonstruo}px`;
            }

            monstruo.src = golpeAleatorio;

            setTimeout(() => {
                monstruo.style.opacity = "0.05";

                setTimeout(() => {
                    monstruo.style.transform = "translateX(0)";
                    monstruo.src = "/ProyectoMate/img/staticM.gif";
                    monstruo.style.width = `${tamanoOriginal.monstruo.width * escalaMonstruo}px`;
                    monstruo.style.height = `${tamanoOriginal.monstruo.height * escalaMonstruo}px`;
                    monstruo.style.opacity = "1";
                }, 500);
            }, time);
        }, 500);
        click = 0;
    }

    function hacerMuerteCaballero() {
        // Cambiar la imagen del caballero por el gif de la muerte
        caballero.src = "/ProyectoMate/img/death.gif";
        caballero.style.width = `${160 * escalaCaballero}px`;
        caballero.style.height = `${150 * escalaCaballero}px`;
        setTimeout(() => {
            caballero.style.display = "none";
        }, 2000);
        click = 0;
    }

    function hacerMuerteMonstruo() {
        // Cambiar la imagen del monstruo por el gif de la muerte
        monstruo.src = "/ProyectoMate/img/deathM.gif";
        monstruo.style.width = `${300 * escalaMonstruo}px`;
        monstruo.style.height = `${300 * escalaMonstruo}px`;
        setTimeout(() => {
            monstruo.style.display = "none";
        }, 1310);
        click = 0;
    }

    function animacionCaballeroWin() {
        monstruo.style.transition = "opacity 1s ease-out";
        monstruo.style.opacity = "0";

        caballero.style.transition = "transform 2s ease-out, opacity 2s ease-out";
        caballero.style.transform = `translateX(${numM / 2}%)`; // 50% para centrarlo horizontalmente

        // Cambiamos el gif del caballero mientras se mueve hacia el centro
        caballero.src = "img/start-walk.gif";
        caballero.style.width = `${130 * escalaCaballero}px`;
        caballero.style.height = `${155 * escalaCaballero}px`;

        // Después de 2 segundos (durante el movimiento), comenzamos a mostrar el gif de correr
        setTimeout(() => {
            caballero.src = "img/walk.gif";
            caballero.style.width = `${110 * escalaCaballero}px`;
            caballero.style.height = `${175 * escalaCaballero}px`;
            caballero.style.transform = `translateX(${numM}%)`;
        }, 2000);

        // Luego de 4 segundos, una vez que el caballero ha "llegado" al centro
        setTimeout(() => {
            caballero.style.transition = "opacity 1s ease-out";
            caballero.style.opacity = "0.05";
            caballero.style.transform = `translateX(${numM}%)`;
        }, 4000);

        // Al cabo de 6 segundos (después de que cambia al gif de ganador), hacemos que se desvanezca suavemente
        setTimeout(() => {
            // Cambiar el gif del caballero al ganador
            caballero.src = "img/end-game.gif";
            caballero.style.width = `${110 * escalaCaballero}px`;
            caballero.style.height = `${210 * escalaCaballero}px`;
            // Aseguramos que se mantenga en el centro
            caballero.style.transform = `translateX(${numM}%)`;
            // Opcional: Cambiar la opacidad para simular la llegada
            caballero.style.transition = "opacity 2s ease-in"; // Desvanecer en inverso
            caballero.style.opacity = "1";
            click++;
        }, 5000);
    }

    animButton.addEventListener("click", hacerGolpeCaballero);
    animButtonM.addEventListener("click", hacerGolpeMonstruo);
    animButtonCD.addEventListener("click", hacerMuerteCaballero);
    animButtonMD.addEventListener("click", hacerMuerteMonstruo);
    animButtonCW.addEventListener("click", animacionCaballeroWin);
});