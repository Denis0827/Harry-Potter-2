<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
</head>

<script>
  import * as d3 from "d3"
  import personajes from "/src/data/personajes.json"
  import { onMount } from 'svelte';
  import { questions, characters } from './quiz.js';
  import { fade, fly } from 'svelte/transition';


  // Variables reactivas
  let currentQuestion = 0;
  let selectedOptions = [];
  let showResult = false;
  let quizStarted = false;
  let matchedCharacter = null;

  // Inicializar puntuaciones
  let userScores = {
    gryffindor: 0,
    ravenclaw: 0,
    hufflepuff: 0,
    slytherin: 0,
    protegerOtros: 0,
    conocimiento: 0,
    pertenencia: 0,
    poderPersonal: 0,
    directo: 0,
    manipulador: 0,
    analitico: 0,
    colaborativo: 0,
    rebelde: 0,
    tradicional: 0,
    innovador: 0,
    pacificador: 0,
  };

  // Función para comenzar el quiz
  function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    selectedOptions = new Array(questions.length).fill(null);
    showResult = false;
    resetScores();
  }

  // Función para resetear puntuaciones
  function resetScores() {
    userScores = {
      gryffindor: 0,
      ravenclaw: 0,
      hufflepuff: 0,
      slytherin: 0,
      protegerOtros: 0,
      conocimiento: 0,
      pertenencia: 0,
      poderPersonal: 0,
      directo: 0,
      manipulador: 0,
      analitico: 0,
      colaborativo: 0,
      rebelde: 0,
      tradicional: 0,
      innovador: 0,
      pacificador: 0,
    };
  }

  // Función para seleccionar opción
  function selectOption(optionIndex) {
    selectedOptions[currentQuestion] = optionIndex;
    
    // Recalcular puntuaciones desde el principio
    resetScores();
    
    // Sumar puntuaciones de todas las respuestas hasta ahora
    for (let i = 0; i <= currentQuestion; i++) {
      if (selectedOptions[i] !== null) {
        const selectedOption = questions[i].options[selectedOptions[i]];
        Object.keys(selectedOption.scores).forEach((key) => {
          userScores[key] += selectedOption.scores[key];
        });
      }
    }
  }

  // Función para ir a la siguiente pregunta
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
    } else {
      finishQuiz();
    }
  }

  // Función para ir a la pregunta anterior
  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
    }
  }

  // Función para finalizar el quiz
  function finishQuiz() {
    matchedCharacter = findBestMatch();
    showResult = true;
  }

  // Función para encontrar el mejor personaje
  function findBestMatch() {
    // Determinar casa principal
    const houses = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];
    const mainHouse = houses.reduce((a, b) =>
      userScores[a] > userScores[b] ? a : b
    );

    // Determinar motivación principal
    const motivations = [
      "protegerOtros",
      "conocimiento",
      "pertenencia",
      "poderPersonal",
    ];
    const mainMotivation = motivations.reduce((a, b) =>
      userScores[a] > userScores[b] ? a : b
    );

    // Determinar método principal
    const methods = ["directo", "manipulador", "analitico", "colaborativo"];
    const mainMethod = methods.reduce((a, b) =>
      userScores[a] > userScores[b] ? a : b
    );

    // Determinar actitud principal
    const attitudes = ["rebelde", "tradicional", "innovador", "pacificador"];
    const mainAttitude = attitudes.reduce((a, b) =>
      userScores[a] > userScores[b] ? a : b
    );

    // Mapear resultados a categorías de personajes
    const motivationMap = {
      protegerOtros: "Proteger Otros",
      conocimiento: "Conocimiento",
      pertenencia: "Pertenencia",
      poderPersonal: "Poder Personal",
    };

    const methodMap = {
      directo: "Directo",
      manipulador: "Manipulador",
      analitico: "Analítico",
      colaborativo: "Colaborativo",
    };

    const attitudeMap = {
      rebelde: "Rebelde",
      tradicional: "Tradicional",
      innovador: "Innovador",
      pacificador: "Pacificador",
    };

    // Buscar el personaje que mejor coincida
    const compatibleCharacters = characters.filter((character) => {
      return (
        character.traits.motivacion === motivationMap[mainMotivation] &&
        character.traits.metodo === methodMap[mainMethod] &&
        character.traits.actitud === attitudeMap[mainAttitude]
      );
    });

    // Si hay coincidencia exacta, devolver el primero
    if (compatibleCharacters.length > 0) {
      return compatibleCharacters[0];
    }

    // Si no hay coincidencia exacta, buscar por casa y motivación
    const houseAndMotivationMatch = characters.filter((character) => {
      return (
        character.house.toLowerCase() === mainHouse &&
        character.traits.motivacion === motivationMap[mainMotivation]
      );
    });

    if (houseAndMotivationMatch.length > 0) {
      return houseAndMotivationMatch[0];
    }

    // Como último recurso, devolver por casa
    const houseMatch = characters.filter(
      (character) => character.house.toLowerCase() === mainHouse
    );

    return houseMatch.length > 0 ? houseMatch[0] : characters[0];
  }

  // Función para reiniciar el quiz
  function resetQuiz() {
    quizStarted = false;
    showResult = false;
    currentQuestion = 0;
    selectedOptions = [];
    matchedCharacter = null;
    resetScores();
  }

  // Variables reactivas computadas
  $: canGoNext = selectedOptions[currentQuestion] !== null && selectedOptions[currentQuestion] !== undefined;
  $: canGoPrev = currentQuestion > 0;
  $: isLastQuestion = currentQuestion === questions.length - 1;

  const imagenCasas = {
    Gryffindor: "/images/gryffindor.svg",
    Hufflepuff: "/images/hufflepuff.svg",
    Ravenclaw: "/images/ravenclaw.svg",
    Slytherin: "/images/slytherin.svg",
  }

  const imagenGenero = {
    HombrePri: "/images/chico_pri.svg",
    HombreSecu: "/images/chico_secu.svg",
    MujerPri: "/images/chica_pri.svg",
    MujerSecu: "/images/chica_secu.svg",
  }

  const imagenMascotas = {
    Gato: "/images/gato.svg",
    Lechuza: "/images/lechuza.svg",
    Sapo: "/images/sapo.svg",
    Rata: "/images/rata.svg",
    Phoenix: "/images/phoenix.svg",
  }

  const imagenBando = {
    Bueno: "/images/bueno.svg",
    Malo: "/images/malo.svg",
  }

  const imagenMagia = "/images/brillo.svg";

  const imagenLibros = {
    1: "/images/libro_uno.svg",
    2: "/images/libro_dos.svg",
    3: "/images/libro_tres.svg",
    4: "/images/libro_cuatro.svg",
    5: "/images/libro_cinco.svg",
    6: "/images/libro_seis.svg",
    7: "/images/libro_siete.svg", 
  }
  
  const luminosidadBrillo = d3.scaleLinear()
    .domain([1, 3])
    .range([0.3, 1]);

  let filtrosActivos = {
  genero: null, // 'Hombre' o 'Mujer'
  protagonismo: null, // 'Principal' o 'Secundario'
  vivo: null, // true o false
  casa: null, // 'Gryffindor', 'Hufflepuff', etc.
  bando: null, // 'Bueno' o 'Malo'
  nivel_magia: null, // 1, 2, o 3
  libros: null, // número de libros
  mascota: null, // 'Gato', 'Lechuza', etc.
};

// Función para filtrar personajes
$: personajesFiltrados = personajes.filter(personaje => {
  if (filtrosActivos.genero && personaje.genero !== filtrosActivos.genero) return false;
  if (filtrosActivos.protagonismo && personaje.protagonismo !== filtrosActivos.protagonismo) return false;
  if (filtrosActivos.vivo !== null && personaje.vivo !== filtrosActivos.vivo) return false;
  if (filtrosActivos.casa && personaje.casa !== filtrosActivos.casa) return false;
  if (filtrosActivos.bando && personaje.bando !== filtrosActivos.bando) return false;
  if (filtrosActivos.nivel_magia && personaje.nivel_magia !== filtrosActivos.nivel_magia) return false;
  if (filtrosActivos.libros && personaje.libros !== filtrosActivos.libros) return false;
  if (filtrosActivos.mascota && personaje.mascota !== filtrosActivos.mascota) return false;
  return true;
});

let codigos = {
  codHombre: true,
  codMujer: true,
  codPrincipal: true,
  codSecundario: true,
  codVivo: true,
  codMuerto: true,
  codGryffindor: true,
  codHufflepuff: true,
  codRavenclaw: true,
  codSlytherin: true,
  codBueno: true,
  codMalo: true,
  codAlto: true,
  codMedio: true,
  codBajo: true,
  codUno: true,
  codDos: true,
  codTres: true,   
  codCuatro: true,   
  codCinco: true, 
  codSeis: true,    
  codSiete: true,    
  codLechuza: true,
  codGato: true,
  codSapo: true,
  codRata: true,
  codPhoenix: true,
};

function aplicarFiltro(categoria, valor) {
  // Si ya está activo el mismo filtro, lo desactivamos
  if (filtrosActivos[categoria] === valor) {
    filtrosActivos[categoria] = null;
  } else {
    filtrosActivos[categoria] = valor;
  }
  
  // Mantener la funcionalidad visual original
  const keys = Object.keys(codigos);
  keys.forEach(key => codigos[key] = true);
  
  setTimeout(() => {
    keys.forEach(key => codigos[key] = true);
  }, 100);
}
  // Reorganizar todos los personajes en grupos de 8 (4 izquierda, 4 derecha)
  const gruposPersonajes = [];
  for (let i = 0; i < personajes.length; i += 8) {
    gruposPersonajes.push({
      izquierda: personajes.slice(i, i + 4),
      derecha: personajes.slice(i + 4, i + 8)
    });
  }
  
  // Inicializar índice actual
  let grupoActualIndex = 0;

  // Variables para controlar el scroll y las animaciones
  let transitionInProgress = false;

  // Función para transición al siguiente grupo
  function transitionToNextGroup() {
    if (transitionInProgress) return;
    transitionInProgress = true;
    
    // Aplicar animación de desvanecimiento
    const personajeElements = document.querySelectorAll('.personaje-container');
    personajeElements.forEach(el => {
      el.classList.add('fade-out-left');
      // Aseguramos que no hay otras clases de animación
      el.classList.remove('fade-in-right', 'fade-out-up', 'fade-in-down');
    });
    
    setTimeout(() => {
      grupoActualIndex = (grupoActualIndex + 1) % gruposPersonajes.length;
      
      // Pequeño retraso para asegurar que el DOM se actualiza
      setTimeout(() => {
        const newPersonajeElements = document.querySelectorAll('.personaje-container');
        newPersonajeElements.forEach(el => {
          // Limpiar todas las clases de animación y aplicar la nueva
          el.classList.remove('fade-out-left', 'fade-out-up', 'fade-in-down');
          el.classList.add('fade-in-right');
        });
        
        // Tiempo suficiente para completar la animación
        setTimeout(() => {
          newPersonajeElements.forEach(el => {
            // Limpieza final de todas las clases de animación
            el.classList.remove('fade-in-right', 'fade-out-left', 'fade-out-up', 'fade-in-down');
          });
          // Permitir que la siguiente transición ocurra solo después de completar todo
          setTimeout(() => {
            transitionInProgress = false;
          }, 100);
        }, 500);
      }, 100);
    }, 500);
  }

  function transitionToPreviousGroup() {
    if (transitionInProgress) return;
    transitionInProgress = true;
    
    // Aplicar animación de desvanecimiento
    const personajeElements = document.querySelectorAll('.personaje-container');
    personajeElements.forEach(el => {
      el.classList.add('fade-out-up');
      // Aseguramos que no hay otras clases de animación
      el.classList.remove('fade-in-down', 'fade-out-left', 'fade-in-right');
    });
    
    setTimeout(() => {
      grupoActualIndex--;
      
      // Pequeño retraso para asegurar que el DOM se actualiza
      setTimeout(() => {
        const newPersonajeElements = document.querySelectorAll('.personaje-container');
        newPersonajeElements.forEach(el => {
          // Limpiar todas las clases de animación y aplicar la nueva
          el.classList.remove('fade-out-up', 'fade-out-left', 'fade-in-right');
          el.classList.add('fade-in-down');
        });
        
        // Tiempo suficiente para completar la animación
        setTimeout(() => {
          newPersonajeElements.forEach(el => {
            // Limpieza final de todas las clases de animación
            el.classList.remove('fade-in-down', 'fade-out-up', 'fade-out-left', 'fade-in-right');
          });
          // Permitir que la siguiente transición ocurra solo después de completar todo
          setTimeout(() => {
            transitionInProgress = false;
          }, 100);
        }, 500);
      }, 100);
    }, 500);
  }

  // Navegar manualmente entre grupos con los botones - FUNCIÓN CORREGIDA
  function navegarGrupo(direccion) {
    if (transitionInProgress) return;
    
    if (direccion === 'anterior' && grupoActualIndex > 0) {
      transitionToPreviousGroup();
    } else if (direccion === 'siguiente' && grupoActualIndex < gruposPersonajes.length - 1) {
      transitionToNextGroup();
    }
  }

  // Función para navegar directamente a una página - FUNCIÓN CORREGIDA
  function navegarAPagina(index) {
    if (transitionInProgress || index === grupoActualIndex) return;
    
    transitionInProgress = true;
    const personajeElements = document.querySelectorAll('.personaje-container');
    
    // Determinar dirección de animación basada en el índice objetivo
    const isForward = index > grupoActualIndex;
    
    personajeElements.forEach(el => {
      el.classList.add(isForward ? 'fade-out-left' : 'fade-out-up');
    });
    
    setTimeout(() => {
      grupoActualIndex = index;
      
      setTimeout(() => {
        const newPersonajeElements = document.querySelectorAll('.personaje-container');
        newPersonajeElements.forEach(el => {
          el.classList.remove('fade-out-left', 'fade-out-up');
          el.classList.add(isForward ? 'fade-in-right' : 'fade-in-down');
        });
        
        setTimeout(() => {
          newPersonajeElements.forEach(el => {
            el.classList.remove('fade-in-right', 'fade-in-down');
          });
          setTimeout(() => {
            transitionInProgress = false;
          }, 100);
        }, 500);
      }, 100);
    }, 500);
  }

  // Función para inicializar el componente de Flourish y tomar el script que nos permite hacer el scrolly gratis!
  // Array para guardar la data de cada slide. Cambiar cada uno con el epígrafe específico para cada slide.
  const slides = [
    "En el mundo mágico hay muchos personajes, cada uno con su propia historia, origen y habilidades. Pero todos tienen algo en común: pertenecen a una de las cuatro casas de Hogwarts.",
    
    "Al organizarlos por casa, empezamos a ver sus identidades más claramente. Leones valientes, serpientes astutas, tejones leales y águilas sabias comparten el mismo espacio, pero no la misma esencia.",
    
    "Ahora los miramos en detalle: cada casa por separado, cada personaje con su poder. El tamaño del círculo revela cuán potente es su magia. Algunos destacan con fuerza, otros acompañan desde el fondo."
  ]

  function loadFlourishScrolly() {
    const script = document.createElement('script')
    script.src = "https://cdn.flourish.rocks/flourish-scrolly-v3.1.0.min.js"
    script.type = "text/javascript"
    script.onload = () => initFlourishScrolly()
    document.body.appendChild(script)
  }


  onMount(() => {
    loadFlourishScrolly()
  });
  
  const casas = [
    {
      nombre: "Gryffindor",
      color: "#ae0001",
      imagen: "/images/rojo.png", // Ruta ajustala si cambia
      valores: ["Brave", "Chivalrous", "Courageous"]
    },
    {
      nombre: "Slytherin",
      color: "#2a623d",
      imagen: "/images/verde.png",
      valores: ["Cunning", "Ambitious", "Influential"]
    },
    {
      nombre: "Hufflepuff",
      color: "#ffdb00",
      imagen: "/images/amarillo.png",
      valores: ["Loyal", "Patient", "Hard Working"]
    },
    {
      nombre: "Ravenclaw",
      color: "#222f5b",
      imagen: "/images/azul.png",
      valores: ["Clever", "Thoughtful", "Intuitive"]
    }
  ];

  // --- NAVBAR SECCIÓN ACTIVA ---
  let seccionActiva = 'home';
  const secciones = [
    { id: 'home', label: 'Home' },
    { id: 'codificacion', label: 'Codificación' },
    { id: 'representacion', label: 'Representación' },
    { id: 'filtro', label: 'Filtrado' }
  ];

  function handleScroll() {
    for (const sec of secciones) {
      const el = document.getElementById(sec.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          seccionActiva = sec.id;
          break;
        }
      }
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const extraOffset = 40; // Offset extra para dejar más espacio visual
      const yOffset = -navbarHeight + extraOffset;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'auto' });
      seccionActiva = id;
    }
  }
  // --- FIN NAVBAR SECCIÓN ACTIVA ---
</script>

<style>
  html {
    scroll-behavior: auto !important;
  }
  #home, #codificacion, #representacion, #filtro {
    scroll-margin-top: 70px;
  }
  .navbar-nav .nav-link {
    color: #fff !important;
    font-weight: bold;
    font-size: 1.1rem;
    padding-left: 18px;
    padding-right: 18px;
    text-align: center;
    border-bottom: 2px solid transparent;
    /* Sin transición para cambio instantáneo */
  }
  .navbar-nav .nav-link.active {
    color: #ffd700 !important;
    /* border-bottom: 2px solid #ffd700; */
    text-shadow: 0 0 8px #ffd70099;
    background: rgba(255, 215, 0, 0.08);
    border-radius: 6px;
  }
  .navbar-nav {
    align-items: center;
  }
</style>


<body>
  <main>    

  <div class="home" id="home">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top magical-header" style="background-image: var(--color-nav); border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
      <div style="padding-left: 35px; display: flex; gap: 20px; align-items: center;" class="container-fluid">
        <a class="navbar-brand" href="https://www.harrypotter.com/es" target="_blank">
          <img src="/images/hogwarts.png" alt="Logo" width="70px" height="40">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="align-items: center;">
            {#each secciones as sec}
              <li class="nav-item">
                <a
                  class="nav-link {seccionActiva === sec.id ? 'active' : ''}"
                  aria-current={seccionActiva === sec.id ? 'page' : undefined}
                  href={"#" + sec.id}
                  style="font-weight: {seccionActiva === sec.id ? 'bold' : 'normal'};"
                  on:click|preventDefault={() => scrollToSection(sec.id)}
                >
                  {sec.label}
                </a>
              </li>
            {/each}
          </ul>
          <!-- Texto a la derecha -->
          <span style="padding-right: 30px;" class="navbar-text ms-auto d-none d-lg-block">
            Marcas y Canales | Visualización de Datos
          </span>
        </div>
      </div>
    </nav>


    <div class="contenedor">
      <img src="/images/fondo.jpg" alt="Fondo" class="fondo" />
      <div class="texto-superpuesto">
        <h1 style="font-family: 'HarryPotter'; font-size: 51px;">Bienvenidos a Hogwarts</h1>
        <h2 style="font-size: 27px;">¿Cuánto conoces de nuestros personajes?</h2>
        <p class="scroll-indicador" style="font-size: 20px; font-weight: bold;"> ↆ  Scrollea para empezar la visualización</p>
      </div>
    </div>  

  </div>

  <div class="color-fondo" id="codificacion" style="padding: 3rem;">
    <h1 class="cod-titulo">Codificación de las marcas</h1>
    <div class="cod-fila">

      <div class="cod">
        <div><p class="categoria-texto"><b>Género</b></p></div>
        <div class="columna" style="align-items: center; gap: 10px;">
          <div>
            <img style="height: 14vh;" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
            <img style="height: 14vh;" src={imagenGenero["MujerSecu"] || "/placeholder.svg"} alt="MujerSecundaria" />
          </div>
          <div class="fila" style = "gap: 10px; font-size: 14px;">
            <p>Hombre</p>
            <p>Mujer</p>
          </div>
        </div>
      </div>

      <div class="cod">
        <div><p class="categoria-texto"><b>Nivel de protagonismo</b></p></div>
        <div class="cod-protagonismo-img columna" style="align-items: center; gap: 10px;">
          <div>
            <img style="height: 14vh;" src={imagenGenero["HombrePri"] || "/placeholder.svg"} alt="HombrePrincipal" />
            <img style="height: 14vh;" src={imagenGenero["MujerPri"] || "/placeholder.svg"} alt="MujerPrincipal" />
            <img style="height: 14vh;" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
            <img style="height: 14vh;" src={imagenGenero["MujerSecu"] || "/placeholder.svg"} alt="MujerSecundaria" />
          </div>
          <div class="fila" style="gap: 10px; font-size: 14px;">
            <p>Principal</p>
            <p>Secundario</p>
          </div>
        </div>
      </div>

      <div class="cod" style="justify-content: center; align-items: center;">
        <div><p class="categoria-texto"><b>Estado de vida</b></p></div>
        <div class="columna" style="align-items: center; gap: 10px;">
          <div>
            <img style="height: 14vh;" src={imagenGenero["HombrePri"] || "/placeholder.svg"} alt="HombrePrincipal" />
            <img style="height: 14vh;" class="personaje-fantasma" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
          </div>
          <div class="fila" style="gap: 10px; font-size: 14px;">
            <p>Vivo</p>
            <p>Muerto</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cod-fila">
      <div class="cod">
        <div><p class="categoria-texto"><b>Casa</b></p></div>
        <div class="columna" style="align-items: center; gap: 10px;">
          <div>
            <img style="height: 9vh;" src={imagenCasas["Gryffindor"] || "/placeholder.svg"} alt="Gryffindor" />
            <img style="height: 9vh;" src={imagenCasas["Hufflepuff"] || "/placeholder.svg"} alt="Hufflepuff" />
            <img style="height: 9vh;" src={imagenCasas["Ravenclaw"] || "/placeholder.svg"} alt="Ravenclaw" />
            <img style="height: 9vh;" src={imagenCasas["Slytherin"] || "/placeholder.svg"} alt="Slytherin" />
          </div>
          <div class="fila" style="gap: 5px; font-size: 14px;">
            <p>Gryffindor</p>
            <p>Hufflepuff</p>
            <p>Ravenclaw</p>
            <p>Slytherin</p>
          </div>
        </div>
      </div>

      <div class="cod">
        <div>
          <div><p class="categoria-texto"><b>Bando</b></p></div>
          <div class="columna" style="align-items: center; gap: 10px;">
            <div>
              <img style="height: 9vh;" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bueno" />
              <img style="height: 9vh;" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Malo" />
            </div>
            <div class="fila" style="gap: 30px; font-size: 14px;">
              <p>Bueno</p>
              <p>Malo
            </div>
          </div>
        </div>
      </div>

      <div class="cod">
        <div>
          <div><p class="categoria-texto"><b>Nivel de magia</b></p></div>
          <div class="columna" style="align-items: center; gap: 10px;">
            <div>
              <img style="height: 9vh; opacity: {luminosidadBrillo(1)}" src={imagenMagia || "/placeholder.svg"} alt="Alto" />
              <img style="height: 9vh; opacity: {luminosidadBrillo(2)}" src={imagenMagia || "/placeholder.svg"} alt="Medio" />
              <img style="height: 9vh; opacity: {luminosidadBrillo(3)}" src={imagenMagia || "/placeholder.svg"} alt="Bajo" />
            </div>
            <div class="fila" style="gap: 2.4rem; font-size: 14px;">
              <p>Bajo</p>
              <p>Medio</p>
              <p>Alto</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cod-fila">
      <div class="cod">
        <div class="columna" style="align-items: center; gap: 10px;">
          <div><p class="categoria-texto"><b>Apariciones en libros</b></p></div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; align-items: flex-end;">
            <img style="height: 3vh;" src={imagenLibros[1] || "/placeholder.svg"} alt="Libro 1" />
            <img style="height: 3.5vh;" src={imagenLibros[2] || "/placeholder.svg"} alt="Libro 2" />
            <img style="height: 4vh;" src={imagenLibros[3] || "/placeholder.svg"} alt="Libro 3" />
            <img style="height: 4.5vh;" src={imagenLibros[4] || "/placeholder.svg"} alt="Libro 4" />
            <img style="height: 5vh;" src={imagenLibros[5] || "/placeholder.svg"} alt="Libro 5" />
            <img style="height: 5.5vh;" src={imagenLibros[6] || "/placeholder.svg"} alt="Libro 6" />
            <img style="height: 6vh;" src={imagenLibros[7] || "/placeholder.svg"} alt="Libro 7" />
          </div>
          <div class="fila" style="gap: 2.2rem; font-size: 14px;">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
          </div>
        </div>
      </div>

      <div class="cod">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div><p class="categoria-texto"><b>Mascota (si tiene)</b></p></div>
          <div class="columna" style="align-items: center; gap: 10px;">
            <div class="cod-mascotas-img">
              <img style="height: 6vh;" src={imagenMascotas["Lechuza"] || "/placeholder.svg"} alt="Lechuza" />
              <img style="height: 9vh;" src={imagenMascotas["Gato"] || "/placeholder.svg"} alt="Gato" />
              <img style="height: 4vh;" src={imagenMascotas["Sapo"] || "/placeholder.svg"} alt="Sapo" />
              <img style="height: 4vh;" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
              <img style="height: 12vh;" src={imagenMascotas["Phoenix"] || "/placeholder.svg"} alt="Phoenix" />
            </div>
            <div class="fila" style="gap: 1.8rem; font-size: 14px;">
              <p>Lechuza</p>
              <p>Gato</p>
              <p>Sapo</p>
              <p>Rata</p>
              <p>Fénix</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

                
    <div class="book-container" id="representacion">
      <div id="libro-animado2" > </div>

      <!-- Imagen del libro como fondo -->
      <img src="/images/librofondo.jpeg" alt="Libro abierto" class="book-background" >
        
      <div class="book-pages"  >
        <!-- Navegación del libro con event handlers corregidos -->
        <div class="book-navigation">
          <!-- Flechas de navegación -->
          <button tabindex="0" class="nav-arrow nav-arrow-up" on:click={() => navegarGrupo('anterior')} disabled={grupoActualIndex === 0} aria-label="Previous Page">
            <i class="bi bi-chevron-left"></i>
          </button>

          <button tabindex="0" class="nav-arrow nav-arrow-down" on:click={() => navegarGrupo('siguiente')} disabled={grupoActualIndex === gruposPersonajes.length - 1} aria-label="Next Page">
            <i class="bi bi-chevron-right"></i>
          </button>  
          <!-- Indicador de páginas -->
          <!-- Indicador de páginas con números -->
          <div class="page-indicators">
            <span class="page-counter">Página {grupoActualIndex + 1} de {gruposPersonajes.length}</span>
            <div class="page-dots">
              {#each gruposPersonajes as grupo, index}
                <div 
                  class="page-dot {index === grupoActualIndex ? 'active' : ''}"
                  on:click={() => navegarAPagina(index)}
                  on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navegarAPagina(index);
                    }
                  }}
                  title="Página {index + 1}"
                  role="button"
                  tabindex="0"
                  aria-label="Ir a página {index + 1}"
                ></div>
              {/each}
            </div>
          </div>
        </div>

        <div style="margin-top: 80vh;" id="libro-animado"> </div>

          <!-- Página izquierda -->
          <div class="catalogo-container book-page">
            {#each gruposPersonajes[grupoActualIndex].izquierda as personaje}
              <div class="columna">
                <div class="personaje-container superpuesto">
                  {#if personaje.genero == "Hombre"}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombrePri"] || "/placeholder.svg"} alt="HombrePrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {:else}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" style="left: 8px;" src={imagenGenero["MujerPri"] || "/placeholder.svg"} alt="MujerPrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["MujerSecu"] || "/placeholder.svg"} alt="MujerSecundaria" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {/if}
                  {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_hp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_hp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_hp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_hp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else if personaje.genero == "Mujer" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_mp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_mp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_mp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_mp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {/if}

                  {#if personaje.mascota == "Gato"}
                    <img class="gato" src={imagenMascotas["Gato"] || "/placeholder.svg"} alt="Gato" />
                  {:else if personaje.mascota == "Lechuza"}
                    <img class="lechuza" src={imagenMascotas["Lechuza"] || "/placeholder.svg"} alt="Lechuza" />
                  {:else if personaje.mascota == "Sapo"}
                    <img class="sapo" src={imagenMascotas["Sapo"] || "/placeholder.svg"} alt="Sapo" />
                  {:else if personaje.mascota == "Rata"}
                    {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                      <img class="rata rata_hp" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                    {:else}
                      <img class="rata" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                    {/if}
                  {:else if personaje.mascota == "Phoenix"}
                    <img class="phoenix" src={imagenMascotas["Phoenix"] || "/placeholder.svg"} alt="Phoenix" />
                  {/if}
                </div>

                <div class="nombre-personaje">
                  <p style="margin-top: 8px;">{personaje.personaje}</p>
                </div>

              </div>
            {/each}
          </div>

          <!-- Página derecha -->
          <div class="catalogo-container book-page">
            {#each gruposPersonajes[grupoActualIndex].derecha as personaje}
              <div class="columna">
                <div class="personaje-container superpuesto">
                  {#if personaje.genero == "Hombre"}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombrePri"] || "/placeholder.svg"} alt="HombrePrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {:else}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" style="left: 8px;" src={imagenGenero["MujerPri"] || "/placeholder.svg"} alt="MujerPrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["MujerSecu"] || "/placeholder.svg"} alt="MujerSecundaria" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {/if}
                  {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_hp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_hp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_hp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_hp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else if personaje.genero == "Mujer" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_mp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_mp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_mp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_mp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {/if}

                  {#if personaje.mascota == "Gato"}
                    <img class="gato" src={imagenMascotas["Gato"] || "/placeholder.svg"} alt="Gato" />
                  {:else if personaje.mascota == "Lechuza"}
                    <img class="lechuza" src={imagenMascotas["Lechuza"] || "/placeholder.svg"} alt="Lechuza" />
                  {:else if personaje.mascota == "Sapo"}
                    <img class="sapo" src={imagenMascotas["Sapo"] || "/placeholder.svg"} alt="Sapo" />
                  {:else if personaje.mascota == "Rata"}
                    {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                      <img class="rata rata_hp" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                    {:else}
                      <img class="rata" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                    {/if}
                  {:else if personaje.mascota == "Phoenix"}
                    <img class="phoenix" src={imagenMascotas["Phoenix"] || "/placeholder.svg"} alt="Phoenix" />
                  {/if}
                </div>

                <div class="nombre-personaje">
                  <p style="margin-top: 8px;">{personaje.personaje}</p>
                </div>

              </div>
            {/each}
          </div>

        </div>
    </div>

    <div class="filtro-container color-fondo" id="filtro">
      <h1 class="filtro-titulo">Catálogo de personajes</h1>

      <!-- Sección de resultados filtrados -->
      <div class="resultados-container color-fondo">
        
        {#if personajesFiltrados.length === 0}
          <div class="text-center">
            <h3>No se encontraron personajes que coincidan <br> con los filtros seleccionados</h3>
            <p>Intenta ajustar los filtros para ver más resultados</p>
          </div>
        {:else}
          <div class="personajes-filtrados-grid">
            {#each personajesFiltrados as personaje}
              <div class="personaje-filtrado">
                <div class="personaje-container superpuesto">
                  {#if personaje.genero == "Hombre"}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombrePri"] || "/placeholder.svg"} alt="HombrePrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["HombreSecu"] || "/placeholder.svg"} alt="HombreSecundario" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-hombre" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {:else}
                    {#if personaje.protagonismo == "Principal"}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" style="left: 8px;" src={imagenGenero["MujerPri"] || "/placeholder.svg"} alt="MujerPrincipal" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-principal-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {:else}
                      <img class="personaje {!personaje.vivo ? 'personaje-fantasma' : ''}" src={imagenGenero["MujerSecu"] || "/placeholder.svg"} alt="MujerSecundaria" />
                      <!-- Brillo de varita según nivel de magia -->
                      <img 
                        class="brillo-varita brillo-varita-secundario-mujer" 
                        src={imagenMagia || "/placeholder.svg"} 
                        alt="Brillo" 
                        style="opacity: {luminosidadBrillo(personaje.nivel_magia)}"
                      />
                    {/if}
                  {/if}
                  
                  {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_hp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_hp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_hp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_hp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else if personaje.genero == "Mujer" && personaje.protagonismo == "Principal"}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero sombrero_mp" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero sombrero_mp" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros libros_mp" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa casa_mp" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {:else}
                    {#if personaje.bando == "Bueno"}
                      <img class="sombrero" src={imagenBando["Bueno"] || "/placeholder.svg"} alt="Bando" />
                    {:else}
                      <img class="sombrero" src={imagenBando["Malo"] || "/placeholder.svg"} alt="Bando" />
                    {/if}
                    <img class="libros" src={imagenLibros[personaje.libros] || "/placeholder.svg"} alt="Libros" />
                    <img class="casa" src={imagenCasas[personaje.casa] || "/placeholder.svg"} alt="Casa" />
                  {/if}

                  {#if personaje.mascota == "Gato"}
                    <img class="gato" src={imagenMascotas["Gato"] || "/placeholder.svg"} alt="Gato" />
                  {:else if personaje.mascota == "Lechuza"}
                    <img class="lechuza" src={imagenMascotas["Lechuza"] || "/placeholder.svg"} alt="Lechuza" />
                  {:else if personaje.mascota == "Sapo"}
                    <img class="sapo" src={imagenMascotas["Sapo"] || "/placeholder.svg"} alt="Sapo" />
                  {:else if personaje.mascota == "Rata"}
                    {#if personaje.genero == "Hombre" && personaje.protagonismo == "Principal"}
                      <img class="rata rata_hp" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                    {:else}
                      <img class="rata" src={imagenMascotas["Rata"] || "/placeholder.svg"} alt="Rata" />
                  {/if}
                  {:else if personaje.mascota == "Phoenix"}
                    <img class="phoenix" src={imagenMascotas["Phoenix"] || "/placeholder.svg"} alt="Phoenix" />
                  {/if}
                </div>

                <div class="nombre-personaje-resultados">
                  <p style="margin-top: 8px;">{personaje.personaje}</p>
                </div>

              </div>
            {/each}
          </div>
          
        {/if}
      </div>
    </div>

    <div class="color-fondo">
      <div class="texto_container">
        <h2 class="subtitulo">Un mapa del mundo mágico</h2>
      </div>

      <!-- Contenedor de la story de flourish (scrolly)-->
      <div id="my-wrapper">
        <!-- Reemplazar el ID de jeemplo por el de la story propia -->
        <div class="flourish-embed" data-src="story/3189577" data-url="https://flo.uri.sh/story/3189577/embed" data-height="80vh">
          
          <!-- <script src="https://public.flourish.studio/resources/embed.js"></script> -->
        </div>

        <!-- Iteramos sobre las distintas slides del componente de Flourish -->
        {#each slides as slide, index}
          <p>
            {@html slide}
            <!-- svelte-ignore a11y-missing-content -->
            <a href={"#story/3189577/slide-" + (index + 1)}></a>
          </p>
        {/each}
      </div>

      <div class="texto_container_con_imagen">
        <div class="texto_parrafo_contenido">
          <p class="texto_parrafo">
            Esta es solo una forma de recorrer el universo mágico. Al visualizar a sus personajes según su casa y poder, emergen patrones, sorpresas y contrastes. Algunos nombres conocidos, otros que rara vez son mencionados, pero todos forman parte de una red que sostiene los encantos, desafíos y secretos de este mundo compartido. Y como en toda buena historia, lo visible es solo el principio.
          </p>
        </div>
        <div class="imagen_parrafo">
          <img src="/images/hogsmeade.jpg" alt="Descripción de la imagen" />
        </div>
      </div>

    <div>
      {#each casas as casa, i (casa.nombre)}
        <section class="section" style="background-color: {casa.color}">
          <h2 class="casa-title">{casa.nombre}</h2>
          <!-- Imagen con transición animada al cambiar de casa -->
          <img
            class="pocion-img"
            src={casa.imagen}
            alt="Poción {casa.nombre}"
            in:fade={{ duration: 400 }}
            out:fade={{ duration: 400 }}
            key={casa.imagen}
          />
          <ul class="valores">
            {#each casa.valores as valor}
              <li>{valor}</li>
            {/each}
          </ul>
        </section>
      {/each}
    </div>
    </div>


    <div class="quiz-container color-fondo2">
      <div class="quiz-header">
        <h3>¿Qué Personaje de Harry Potter Eres?</h3>
        <p class="quiz-subtitle">Descubre cuál de los 30 personajes refleja mejor tu personalidad</p>
      </div>
    
      {#if !quizStarted && !showResult}
        <!-- Pantalla inicial -->
        <div class="quiz-content">
          <button class="boton" on:click={startQuiz}>Comenzar Test</button>
        </div>
      {/if}
    
      {#if quizStarted && !showResult}
        <!-- Quiz en progreso -->
        <div class="quiz-content">
          <div class="question-container">
            <div class="question">{questions[currentQuestion].question}</div>
            <div class="options">
              {#each questions[currentQuestion].options as option, index}
                <button
                  type="button"
                  class="option {selectedOptions[currentQuestion] === index ? 'selected' : ''}"
                  on:click={() => selectOption(index)}
                  aria-pressed={selectedOptions[currentQuestion] === index}
                >
                  {option.text}
                </button>
              {/each}
            </div>
          </div>
    
          <div class="quiz-navigation">
            <button 
              class="nav-btn" 
              disabled={!canGoPrev}
              on:click={previousQuestion}
            >
              Anterior
            </button>
            <span class="question-counter">{currentQuestion + 1} / {questions.length}</span>
            <button 
              class="nav-btn" 
              disabled={!canGoNext}
              on:click={nextQuestion}
            >
              {isLastQuestion ? 'Ver Resultado' : 'Siguiente'}
            </button>
          </div>
        </div>
      {/if}
    
      {#if showResult && matchedCharacter}
        <!-- Resultado -->
    <div class="result-container">
      <div class="character-result">
          <!-- Agrega esta línea para la imagen del personaje -->
          <img 
              src={matchedCharacter.image} 
              alt={matchedCharacter.name} 
              class={`character-image ${matchedCharacter.house.toLowerCase()}`}
          />
          
          <div class="character-name">{matchedCharacter.name}</div>
          <div class="character-house">Casa: {matchedCharacter.house}</div>
          <div class="character-traits">
              <p><strong>Motivacion:</strong> {matchedCharacter.traits.motivacion}</p>
              <p><strong>Metodo:</strong> {matchedCharacter.traits.metodo}</p>
              <p><strong>Actitud:</strong> {matchedCharacter.traits.actitud}</p>
          </div>
          <div class="character-description">
              <p>{matchedCharacter.description}</p>
          </div>
          <button class="boton" on:click={resetQuiz}>Hacer el Test de Nuevo</button>
      </div>
    </div>
      {/if}
    </div>
    
  </main>

  <footer class="footer-container">
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    
    <div class="footer-info">
        <p>
            <strong>Proyecto II: Marcas y Canales</strong><br>
            Visualización de Datos - Licenciatura en Tecnología Digital 2025
        </p>
    </div>
    
    <div class="footer-team">
        <div class="team-info">
            Josefina Casas Pardo, Luisina Cubilledo y Denis Wu
        </div>
        <a href="https://github.com/Denis0827/Parcial2-VD" class="github-link" target="_blank" rel="noopener noreferrer">
            <svg class="github-icon" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver en GitHub
        </a>
    </div>
</footer>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>