document.addEventListener("DOMContentLoaded", () => {
    let currentLevel = 1;
    const levels = document.querySelectorAll(".level");
    const leftCurtain = document.querySelector(".curtain.left");
    const rightCurtain = document.querySelector(".curtain.right");
    const levelsContainer = document.getElementById("levels-container");
    const restartContainer = document.getElementById("restart-container");
    const opcionesContainer = document.getElementById("opciones-container");

    const caballero = document.getElementById("caballero");
    const monstruo = document.getElementById("monstruo");

    const contenedorImagenes = document.querySelector(".contenedor-imagenes");
    const containers = document.querySelectorAll(".container");

    let numM = 200;
    let click = 0;

    let escalaCaballero = 1;
    let escalaMonstruo = 1;
    let resizeTimer;

    const tamanoOriginal = {
        caballero: { width: 60, height: 150 },
        monstruo: { width: 280, height: 300 }
    };

    if (!contenedorImagenes || containers.length === 0) {
        return;
    }

    actualizarEscala();
    mezclarRespuestas();

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            actualizarEscala();
        }, 500);
    });

    window.startLevel = function (level) {
        nivelActual = level;
        console.log("Nivel actual:", nivelActual);
        if (level !== currentLevel) return;
        leftCurtain.style.display = "block";
        rightCurtain.style.display = "block";
        // Llamar a la función y luego ejecutar actualizarEscala()
        resetearAnimaciones().then(() => {
            actualizarEscala();
            let caballero1 = document.getElementById("caballero");
            let monstruo1 = document.getElementById("monstruo");
            caballero1.style.opacity = "1";
            caballero1.style.removeProperty("transition");
            caballero1.style.removeProperty("transform");


            monstruo1.style.opacity = "1";
            monstruo1.style.removeProperty("transition");
            monstruo1.style.removeProperty("transform");
        });
        setTimeout(() => {
            closeCurtain();
        }, 500);
        setTimeout(() => {
            levelsContainer.style.display = "none";
            restartContainer.style.display = "block";
            openCurtain();
        }, 1500);
    }

    window.restart = function () {
        leftCurtain.style.display = "block";
        rightCurtain.style.display = "block";
        setTimeout(() => {
            closeCurtain();
        }, 500);
        setTimeout(() => {
            restartContainer.style.display = "none";
            levelsContainer.style.display = "flex";
            openCurtain();
            setTimeout(() => {
                activateNextLevel();
            }, 2200);
        }, 1500);
    }
    let currentQuestionIndex = 0;
    const preguntas = {
        nivel_1: [
            { pregunta: "∫x² dx=?", opciones: ["x^3/3+C", "1/2x²+C", "x³", "x²"], respuesta: "x^3/3+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio1.png" },
            { pregunta: "∫5x⁷ dx=?", opciones: ["5x⁸/8+C", "x⁸+C", "5/7x⁸+C", "x⁷+C"], respuesta: "5x⁸/8+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio2.png" },
            { pregunta: "∫√x dx=?", opciones: ["2√x³/3+C", "x³", "3/4x²+C", "x³/3"], respuesta: "2√x³/3+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio3.png" }
        ],
        nivel_2: [
            { pregunta: "∫ 5∛x² dx=?", opciones: ["3∛x^5+C", "5/2x³/2", "2/3x³/2", "x³"], respuesta: "3∛x^5+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio4.png" },
            { pregunta: "∫5/x³ dx=?", opciones: ["-5/2x²+C", "5x³", "5x⁴", "15/4x³"], respuesta: "-5/2x²+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio5.png" },
            { pregunta: "∫(3x²+7-∛x7)dx=?", opciones: ["x³+7x-3∛x^10/10", "x⁴+7x-x⁷", "x⁵+7x", "x³+x⁸"], respuesta: "x³+7x-3∛x^10/10", retroalimentacion: "/ProyectoMateC/IMG/ejercicio6.png" }
        ],
        nivel_3: [
            { pregunta: "∫∛x² dx=?", opciones: ["3∛x^5+C", "x³/2", "2x³", "5x²"], respuesta: "3∛x^5+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio7.png" },
            { pregunta: "∫-14√x dx=?", opciones: ["−28x^(3/2)/3+C", "-14x²", "-28x", "-28x³"], respuesta: "−28x^(3/2)/3+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio8.png" },
            { pregunta: "∫7x⁵ dx=?", opciones: ["-7/4x⁴", "x⁶", "7x⁶", "7x⁵"], respuesta: "-7/4x⁴", retroalimentacion: "/ProyectoMateC/IMG/ejercicio9.png" }
        ],
        nivel_4: [
            { pregunta: "∫1 dx=?", opciones: ["1x+C", "1", "x²", "ln(x)"], respuesta: "1x+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio10.png" },
            { pregunta: "∫(4x³-2x+1) dx=?", opciones: ["x⁴-x²+x", "x⁵-x²+x", "x³-2x+x²", "x⁴-2x²+1"], respuesta: "x⁴-x²+x", retroalimentacion: "/ProyectoMateC/IMG/ejercicio11.png" },
            { pregunta: "∫(1/∛x²) dx=?", opciones: ["3∛x+C", "1/2x³", "3/2x²", "x³"], respuesta: "3∛x+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio12.png" },
            { pregunta: "∫(x⁴-6x²-2x+4) dx=?", opciones: ["2x√x-2/x⁵+C", "x⁶-x⁴+2x²", "x⁴-2x²+ x", "x³-x²"], respuesta: "2x√x-2/x⁵+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio13.png" },
            { pregunta: "∫(2-senx) dx=?", opciones: ["2x+cos(x)+C", "2x+senx+C", "2x-cos(x)+C", "x⁴"], respuesta: "2x+cos(x)+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio14.png" },
        ],
        nivel_5: [
            { pregunta: "∫(senx+4x²) dx=?", opciones: ["4x³/3+C", "4x³/3", "4x³+C", "x⁴"], respuesta: "4x³/3+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio15.png" },
            { pregunta: "∫(3+3tan^2x) dx=?", opciones: ["3tan(x)-C", "3Xtan(x)+C", "5x⁸tan(x)", "3tan(x)+C"], respuesta: "3tan(x)+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio16.png" },
            { pregunta: "∫(7/sen^2x)+1 dx=?", opciones: ["7cot(x)+1x+C", "-7cot(x)+1x+C", "-7cot(x)-1x+C", "-7cot(x)+1x"], respuesta: "-7cot(x)+1x+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio17.png" },
            { pregunta: "∫((3/√x)-x√x/4) dx=?", opciones: ["6√x+1x⁵/10+C", "x³/2", "5x²", "6√x-1x⁵/10+C"], respuesta: "6√x-1x⁵/10+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio18.png" },
            { pregunta: "∫(x+√x) dx=?", opciones: ["(x²/2)-2x²√x³+C", "x³/2", "(x/2)+2x²√x³/3+C", "(x²/2)+2x²√x³/3+C"], respuesta: "(x²/2)+2x²√x³/3+C", retroalimentacion: "/ProyectoMateC/IMG/ejercicio19.png" }
        ]
    };

    function cargarPregunta() {
        const pregunta = preguntas[`nivel_${currentLevel}`][currentQuestionIndex]; // Obtén la pregunta actual
        document.getElementById("pregunta").textContent = pregunta.pregunta; // Muestra la pregunta

        const opcionesContainer = document.getElementById("opciones-container");
        opcionesContainer.innerHTML = ''; // Limpiar las opciones anteriores

        pregunta.opciones.forEach((opcion, index) => {
            const opcionHTML = `
                <label class="opcion">
                    <input type="radio" name="respuesta" value="${opcion}">
                    ${String.fromCharCode(65 + index)}) ${opcion}
                </label>
            `;
            opcionesContainer.innerHTML += opcionHTML;
        });
        mezclarRespuestas();
    }

    /************************************************
     *       LÓGICA DE LA PREGUNTA Y RESPUESTAS
     ************************************************/

    let respuestasIncorrectas = 0; // Contador de respuestas incorrectas
    const maxRespuestasIncorrectas = 2; // Número de respuestas incorrectas que causan la muerte del caballero

    // Almacenar respuestas incorrectas
    let errores = [];

    // Función para verificar la respuesta
    window.verificarRespuesta = function () {
        const opciones = document.getElementsByName("respuesta");
        let seleccion = null;

        // Obtener la opción seleccionada
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                seleccion = opciones[i].value;
                break;
            }
        }

        const resultado = document.getElementById("resultado");
        if (!seleccion) {
            resultado.textContent = "Debes seleccionar una respuesta.";
            resultado.style.color = "red";
            return;
        }

        // Obtener la respuesta correcta y su retroalimentación
        const preguntaActual = preguntas[`nivel_${currentLevel}`][currentQuestionIndex];
        const respuestaCorrecta = preguntaActual.respuesta;

        if (seleccion === respuestaCorrecta) {
            resultado.textContent = "¡Correcto! El caballero ataca al monstruo.";
            resultado.style.color = "green";
            hacerGolpeCaballero();
        } else {
            respuestasIncorrectas++;

            resultado.textContent = "Respuesta incorrecta. El monstruo ataca al caballero.";
            resultado.style.color = "red";
            hacerGolpeMonstruo();

            // Guardar la retroalimentación de la respuesta incorrecta
            errores.push(`
                <strong>Pregunta:</strong> ${preguntaActual.pregunta}<br>
                <strong>Explicación:</strong> 
                La respuesta correcta es <strong>${preguntaActual.respuesta}</strong>. Aquí tienes una ilustración:<br>
                <img src="${preguntaActual.retroalimentacion}" alt="Explicación" />
              `);
            // Mostrar botón de retroalimentación si hay errores
            document.getElementById("retroalimentacion-btn").style.display = "block";

            // Verificar si el caballero ha fallado demasiado
            if (respuestasIncorrectas >= maxRespuestasIncorrectas) {
                setTimeout(() => {
                    hacerMuerteCaballero();
                    resultado.textContent = "El monstruo ha vencido al caballero. Vuelva a intentarlo.";
                    resultado.style.color = "blue";
                    setTimeout(() => {
                        reiniciarJuego();
                        // Llamar a la función y luego ejecutar actualizarEscala()
                        resetearAnimaciones().then(() => {
                            actualizarEscala();
                            let caballero1 = document.getElementById("caballero");
                            let monstruo1 = document.getElementById("monstruo");
                            caballero1.style.opacity = "1";
                            caballero1.style.removeProperty("transition");
                            caballero1.style.removeProperty("transform");


                            monstruo1.style.opacity = "1";
                            monstruo1.style.removeProperty("transition");
                            monstruo1.style.removeProperty("transform");
                        });
                    }, 3000);
                }, 1500);
                return;
            }
        }

        // Cargar siguiente pregunta o finalizar nivel
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < preguntas[`nivel_${currentLevel}`].length) {
                cargarPregunta();
                resultado.textContent = "";
            } else {
                if (respuestasIncorrectas < maxRespuestasIncorrectas) {
                    hacerMuerteMonstruo();
                    resultado.textContent = "¡Felicidades! Has completado todas las preguntas.";
                    resultado.style.color = "blue";
                    animacionCaballeroWin();
                    setTimeout(() => {
                        // Mostrar el botón "Terminar Nivel"
                        document.getElementById("terminarNivel").style.display = "block";
                    }, 1000);
                } else {
                    resultado.textContent = "El monstruo ha vencido al caballero. Fin del juego.";
                    resultado.style.color = "blue";
                    setTimeout(() => {
                        reiniciarJuego();
                    }, 3000);
                }
            }
        }, 3600);
    };

    // Mostrar la retroalimentación en un modal
    document.getElementById("retroalimentacion-btn").addEventListener("click", function () {
        let contenido = document.getElementById("retroalimentacion-contenido");
        contenido.innerHTML = errores.join("<hr>"); // Mostrar cada error con una línea separadora
        document.getElementById("retroalimentacion-modal").style.display = "block";
    });

    // Cerrar modal
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("retroalimentacion-modal").style.display = "none";
    });
    
    // Función para reiniciar el juego o pasar al siguiente nivel
    function reiniciarJuego() {
        // Reiniciar el índice de las preguntas y las respuestas incorrectas
        currentQuestionIndex = 0;
        respuestasIncorrectas = 0; // Resetear el contador de respuestas incorrectas
        cargarPregunta(); // Cargar la primera pregunta
    }

    // Inicializar la primera pregunta
    cargarPregunta();

    function mezclarRespuestas() {
        let opciones = Array.from(opcionesContainer.children);
        opciones = opciones.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente

        // Vaciar el contenedor y volver a agregar las opciones en el nuevo orden
        opcionesContainer.innerHTML = "";
        opciones.forEach(opcion => opcionesContainer.appendChild(opcion));
    }
    // Evento para el botón "Terminar"
    document.getElementById("terminarNivel").addEventListener("click", function () {
        if (currentLevel < levels.length) {
            // Ocultar el botón "Terminar"
            document.getElementById("terminarNivel").style.display = "block";

            // Desactivar el nivel actual
            levels[currentLevel - 1].classList.remove("active");
            levels[currentLevel - 1].classList.add("disabled");

            currentLevel++; // Incrementar el nivel

            // Activar el siguiente nivel
            levels[currentLevel - 1].classList.remove("disabled");
            levels[currentLevel - 1].classList.add("active");

            // Agregar evento para iniciar el siguiente nivel
            levels[currentLevel - 1].setAttribute("onclick", `startLevel(${currentLevel})`);

            // Resetear la retroalimentación visual
            document.getElementById("retroalimentacion-btn").style.display = "block";
            document.getElementById("retroalimentacion-contenido").innerHTML = ""; // Limpiar retroalimentación

            //Reiniciar contador de errores al cambiar de nivel
            respuestasIncorrectas = 0;
            errores = []; // Limpiar la lista de errores anteriores

            // Resetear las preguntas del nuevo nivel
            currentQuestionIndex = 0;

            if (typeof preguntasPorNivel !== "undefined") {
                preguntasActuales = preguntasPorNivel[currentLevel - 1]; // Tomar preguntas del nuevo nivel
            }

            // Cerrar cortinas y mostrar niveles
            leftCurtain.style.display = "block";
            rightCurtain.style.display = "block";

            setTimeout(() => {
                closeCurtain();
            }, 2500);

            // Después de cerrar las cortinas, mostrar el siguiente nivel
            setTimeout(() => {
                restartContainer.style.display = "none";
                levelsContainer.style.display = "flex"; // Mostrar niveles
                openCurtain();
            }, 3500);

            // Cargar la nueva pregunta después de abrir las cortinas
            setTimeout(() => {
                cargarPregunta();
            }, 4000);
        } else {
            console.log("Todos los niveles han sido completados.");
        }
    });

    function resetearAnimaciones() {
        return new Promise((resolve) => {
            // Obtener los elementos del caballero y del monstruo
            let caballero = document.getElementById("caballero");
            let monstruo = document.getElementById("monstruo");

            // Resetear las imágenes a su estado inicial
            caballero.src = "/ProyectoMateC/IMG/static.gif"; // Imagen estática inicial del caballero
            monstruo.src = "/ProyectoMateC/IMG/staticM.gif"; // Imagen estática inicial del monstruo

            // Restablecer estilos
            caballero.style.display = "block";  // Asegurar que se muestre
            monstruo.style.display = "block";   // Asegurar que se muestre

            caballero.style.opacity = "1";      // Asegurar que esté completamente visible
            caballero.style.transition = "opacity 0.5sease, transform 0.5sease, width 0.2s, height 0.2s";
            caballero.style.transform = "translateX(0px)"; // Eliminar cualquier transformación previa

            monstruo.style.opacity = "1";       // Asegurar que esté completamente visible
            monstruo.style.transition = "opacity 0.5sease, transform 0.5sease, width 0.2s, height 0.2s"; // Eliminar la transición aplicada
            monstruo.style.transform = "translateX(0px)";  // Eliminar cualquier transformación previa

            // Limpiar el resultado anterior
            resultado.textContent = "";

            // Resolver la promesa después de un pequeño retraso (para asegurar que los cambios se apliquen)
            setTimeout(() => {
                resolve();
            }, 100); // Puedes ajustar este tiempo si es necesario
        });
    }

    function closeCurtain() {
        actualizarEscala();
        leftCurtain.style.transform = "translateX(0)";
        rightCurtain.style.transform = "translateX(0)";
    }

    function openCurtain() {
        setTimeout(() => {
            leftCurtain.style.transform = "translateX(-102%)";
            rightCurtain.style.transform = "translateX(102%)";
        }, 1000);
        setTimeout(() => {
            leftCurtain.style.display = "none";
            rightCurtain.style.display = "none";
        }, 2200);
    }

    function actualizarEscala() {
        let gapValue = 1;
        
        // Comprobar las condiciones de tamaño
        if (window.innerWidth < 1000 || window.innerHeight < 800) {
            gapValue *= 0.1;
        }
    
        // Actualizar el gap según el cálculo
        contenedorImagenes.style.gap = `${gapValue}px`;
    
        // Ajustar escalas según las condiciones de tamaño de pantalla
        if (window.innerWidth >= 600 && window.innerWidth <= 1400 &&
            window.innerHeight >= 600 && window.innerHeight <= 1400) {
            // Primera condición (ancho y alto entre 600 y 1400)
            escalaCaballero = 0.8;
            escalaMonstruo = 0.7;
            numM = numM * 1;
            console.log("nnn");
        } else if (window.innerWidth < 600 || window.innerHeight < 600) {
            // Segunda condición (ancho o alto menor a 600)
            escalaCaballero = 0.7;
            escalaMonstruo = 0.6;
            numM = numM * 0.7;
            console.log("nnn2");
        } else {
            // Caso por defecto (fuera de los rangos anteriores)
            escalaCaballero = 1;
            escalaMonstruo = 1;
            numM = numM * 1.15;
            console.log("nnn3");
        }
    
        // Aplicar la escala a los contenedores y elementos
        containers.forEach(container => {
            container.style.transform = `scale(${escalaCaballero})`;
        });
    
        caballero.style.width = `${tamanoOriginal.caballero.width * escalaCaballero}px`;
        caballero.style.height = `${tamanoOriginal.caballero.height * escalaCaballero}px`;
    
        monstruo.style.width = `${tamanoOriginal.monstruo.width * escalaMonstruo}px`;
        monstruo.style.height = `${tamanoOriginal.monstruo.height * escalaMonstruo}px`;
    }    

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
                golpeAleatorio = "/ProyectoMateC/IMG/hit(1).gif";
                time = 1900;
                caballero.style.width = `${300 * escalaCaballero}px`;
                caballero.style.height = `${280 * escalaCaballero}px`;
            } else {
                golpeAleatorio = "/ProyectoMateC/IMG/hit(2).gif";
                time = 2800;
                caballero.style.width = `${200 * escalaCaballero}px`;
                caballero.style.height = `${200 * escalaCaballero}px`;
            }

            caballero.src = golpeAleatorio;

            setTimeout(() => {
                caballero.style.opacity = "0.05";

                setTimeout(() => {
                    caballero.style.transform = "translateX(0)";
                    caballero.src = "/ProyectoMateC/IMG/static.gif";
                    caballero.style.width = `${tamanoOriginal.caballero.width * escalaCaballero}px`;
                    caballero.style.height = `${tamanoOriginal.caballero.height * escalaCaballero}px`;
                    caballero.style.opacity = "1";
                    let caballero1 = document.getElementById("caballero");
                    let monstruo1 = document.getElementById("monstruo");
                    caballero1.style.opacity = "1";
                    caballero1.style.removeProperty("transition");
                    caballero1.style.removeProperty("transform");


                    monstruo1.style.opacity = "1";
                    monstruo1.style.removeProperty("transition");
                    monstruo1.style.removeProperty("transform");
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
                golpeAleatorio = "/ProyectoMateC/IMG/hit(1)M.gif";
                time = 1900;
                monstruo.style.width = `${380 * escalaMonstruo}px`;
                monstruo.style.height = `${380 * escalaMonstruo}px`;
            } else {
                golpeAleatorio = "/ProyectoMateC/IMG/hit(2)M.gif";
                time = 2800;
                monstruo.style.width = `${355 * escalaMonstruo}px`;
                monstruo.style.height = `${355 * escalaMonstruo}px`;
            }

            monstruo.src = golpeAleatorio;

            setTimeout(() => {
                monstruo.style.opacity = "0.05";

                setTimeout(() => {
                    monstruo.style.transform = "translateX(0)";
                    monstruo.src = "/ProyectoMateC/IMG/staticM.gif";
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
        caballero.src = "/ProyectoMateC/IMG/death.gif";
        caballero.style.width = `${160 * escalaCaballero}px`;
        caballero.style.height = `${150 * escalaCaballero}px`;
        setTimeout(() => {
            caballero.style.display = "none";
        }, 2000);
        click = 0;
    }

    function hacerMuerteMonstruo() {
        // Cambiar la imagen del monstruo por el gif de la muerte
        monstruo.src = "/ProyectoMateC/IMG/deathM.gif";
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
        caballero.src = "IMG/start-walk.gif";
        caballero.style.width = `${130 * escalaCaballero}px`;
        caballero.style.height = `${155 * escalaCaballero}px`;

        // Después de 2 segundos (durante el movimiento), comenzamos a mostrar el gif de correr
        setTimeout(() => {
            caballero.src = "IMG/walk.gif";
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
            caballero.src = "IMG/end-game.gif";
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

});