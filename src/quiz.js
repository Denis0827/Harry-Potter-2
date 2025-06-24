// Preguntas del quiz (10 originales + 5 nuevas)
export const questions = [
    {
      question: "Encuentras un pasadizo secreto en Hogwarts. ¿Qué haces?",
      options: [
        {
          text: "Lo exploro inmediatamente, sin importar las reglas",
          scores: { gryffindor: 2, rebelde: 1, directo: 2 },
        },
        {
          text: "Lo mapeo cuidadosamente y busco información sobre él",
          scores: { ravenclaw: 2, conocimiento: 3, analitico: 2 },
        },
        {
          text: "Se lo cuento a mis amigos para explorarlo juntos",
          scores: { hufflepuff: 2, pertenencia: 2, colaborativo: 2 },
        },
        {
          text: "Lo guardo como secreto para usarlo cuando me convenga",
          scores: { slytherin: 2, poderPersonal: 2, manipulador: 2 },
        },
      ],
    },
    {
      question: "Un compañero está siendo molestado por estudiantes mayores:",
      options: [
        {
          text: "Intervengo directamente, aunque esté en desventaja",
          scores: { gryffindor: 1, protegerOtros: 3, directo: 3 },
        },
        {
          text: "Busco evidencia y se lo reporto a un profesor",
          scores: { ravenclaw: 2, protegerOtros: 2, analitico: 2 },
        },
        {
          text: "Reúno a otros estudiantes para confrontar a los agresores",
          scores: { hufflepuff: 2, protegerOtros: 2, colaborativo: 3 },
        },
        {
          text: "Ofrezco ayuda solo si me beneficia de alguna manera",
          scores: { slytherin: 2, poderPersonal: 2, manipulador: 1 },
        },
      ],
    },
    {
      question: "Te asignan un proyecto grupal difícil:",
      options: [
        {
          text: "Tomo el liderazgo y divido las tareas",
          scores: { gryffindor: 1, directo: 2, protegerOtros: 2 },
        },
        {
          text: "Investigo todo a fondo para asegurar la excelencia",
          scores: { ravenclaw: 2, conocimiento: 3, analitico: 2 },
        },
        {
          text: "Me aseguro de que todos participen equitativamente",
          scores: { hufflepuff: 3, pertenencia: 2, colaborativo: 3 },
        },
        {
          text: "Hago mi parte pero evito responsabilidades extra",
          scores: { slytherin: 2, poderPersonal: 1, pacificador: 2 },
        },
      ],
    },
    {
      question: "Descubres que un amigo ha roto una regla importante:",
      options: [
        {
          text: "Lo confronto directamente sobre sus acciones",
          scores: { gryffindor: 2, directo: 2, tradicional: 1 },
        },
        {
          text: "Investigo por qué lo hizo antes de juzgar",
          scores: { ravenclaw: 3, conocimiento: 3, analitico: 2 },
        },
        {
          text: "Trato de entender y ayudarlo sin juzgar",
          scores: { hufflepuff: 2, protegerOtros: 2, pacificador: 3 },
        },
        {
          text: "Evalúo cómo esta información me podría ser útil",
          scores: { slytherin: 3, poderPersonal: 2, manipulador: 2 },
        },
      ],
    },
    {
      question: "En una clase aburrida, prefieres:",
      options: [
        {
          text: "Hacer algo emocionante para animar el ambiente",
          scores: { gryffindor: 2, rebelde: 2, directo: 2 },
        },
        {
          text: "Profundizar en el tema por tu cuenta",
          scores: { ravenclaw: 3, conocimiento: 3, innovador: 2 },
        },
        {
          text: "Ayudar discretamente a compañeros que no entienden",
          scores: { hufflepuff: 3, protegerOtros: 2, colaborativo: 2 },
        },
        {
          text: "Planear cómo impresionar al profesor",
          scores: { slytherin: 2, poderPersonal: 2, manipulador: 2 },
        },
      ],
    },
    {
      question: "Si fueras profesor por un día:",
      options: [
        {
          text: "Haría la clase práctica y emocionante",
          scores: { gryffindor: 2, innovador: 2, directo: 2 },
        },
        {
          text: "Enseñaría teoría avanzada que otros no se atreven",
          scores: { ravenclaw: 2, conocimiento: 2, innovador: 3 },
        },
        {
          text: "Me aseguraría de que todos entiendan antes de avanzar",
          scores: { hufflepuff: 2, protegerOtros: 3, pacificador: 2 },
        },
        {
          text: "Usaría métodos tradicionales y probados",
          scores: { slytherin: 2, tradicional: 3, analitico: 1 },
        },
      ],
    },
    {
      question: "Tu mayor temor es:",
      options: [
        {
          text: "No poder proteger a quienes amas",
          scores: { gryffindor: 2, protegerOtros: 3, directo: 1 },
        },
        {
          text: "Permanecer ignorante sobre algo importante",
          scores: { ravenclaw: 3, conocimiento: 3, analitico: 1 },
        },
        {
          text: "Ser rechazado por tu grupo",
          scores: { hufflepuff: 2, pertenencia: 3, colaborativo: 2 },
        },
        {
          text: "Perder control sobre tu situación",
          scores: { slytherin: 2, poderPersonal: 3, manipulador: 2 },
        },
      ],
    },
    {
      question: "Ante un acertijo complejo:",
      options: [
        {
          text: "Lo resuelvo por ensayo y error hasta lograrlo",
          scores: { gryffindor: 2, directo: 2, rebelde: 1 },
        },
        {
          text: "Analizo cada pista metódicamente",
          scores: { ravenclaw: 3, conocimiento: 2, analitico: 3 },
        },
        {
          text: "Busco ayuda de otros para resolverlo juntos",
          scores: { hufflepuff: 3, pertenencia: 2, colaborativo: 3 },
        },
        {
          text: "Busco maneras de evitarlo o que otros lo resuelvan",
          scores: { slytherin: 2, poderPersonal: 1, manipulador: 2 },
        },
      ],
    },
    {
      question: "En tu tiempo libre prefieres:",
      options: [
        {
          text: "Aventuras emocionantes y deportes",
          scores: { gryffindor: 3, rebelde: 1, directo: 2 },
        },
        {
          text: "Leer libros fascinantes o experimentar",
          scores: { ravenclaw: 3, conocimiento: 3, innovador: 2 },
        },
        {
          text: "Pasar tiempo de calidad con amigos y familia",
          scores: { hufflepuff: 3, pertenencia: 3, pacificador: 2 },
        },
        {
          text: "Actividades que mejoren tu estatus social",
          scores: { slytherin: 3, poderPersonal: 2, tradicional: 1 },
        },
      ],
    },
    {
      question: "Tu forma ideal de resolver un problema es:",
      options: [
        {
          text: "Actuar rápido con valentía y determinación",
          scores: { gryffindor: 2, directo: 2, rebelde: 2 },
        },
        {
          text: "Estudiar el problema desde todos los ángulos posibles",
          scores: { ravenclaw: 2, conocimiento: 3, analitico: 3 },
        },
        {
          text: "Buscar consenso y soluciones que beneficien a todos",
          scores: { hufflepuff: 2, protegerOtros: 2, pacificador: 3 },
        },
        {
          text: "Encontrar la estrategia más eficiente para ti",
          scores: { slytherin: 3, poderPersonal: 2, manipulador: 2 },
        },
      ],
    },
    // NUEVAS PREGUNTAS - Más sutiles y menos obvias
    {
      question: "Estás en una librería y solo puedes comprar un libro:",
      options: [
        {
          text: "Una biografía inspiradora de alguien que superó grandes obstáculos",
          scores: {
            hufflepuff: 1,
            gryffindor: 2,
            protegerOtros: 2,
            tradicional: 1,
          },
        },
        {
          text: "Un manual técnico sobre algo que siempre quisiste aprender",
          scores: { ravenclaw: 2, slytherin: 1, conocimiento: 3, analitico: 2 },
        },
        {
          text: "Una novela que te recomendaron varios amigos",
          scores: {
            hufflepuff: 2,
            gryffindor: 1,
            pertenencia: 3,
            colaborativo: 2,
          },
        },
        {
          text: "El bestseller más popular del momento",
          scores: {
            slytherin: 2,
            ravenclaw: 1,
            poderPersonal: 1,
            tradicional: 2,
          },
        },
      ],
    },
    {
      question: "En una conversación grupal, tu tendencia natural es:",
      options: [
        {
          text: "Hacer preguntas que lleven la conversación a temas más profundos",
          scores: { ravenclaw: 2, hufflepuff: 1, conocimiento: 2, analitico: 2 },
        },
        {
          text: "Contar anécdotas divertidas para mantener el ambiente ligero",
          scores: {
            gryffindor: 2,
            hufflepuff: 1,
            pertenencia: 2,
            pacificador: 2,
          },
        },
        {
          text: "Escuchar más que hablar y observar las dinámicas del grupo",
          scores: { slytherin: 2, ravenclaw: 1, analitico: 2, manipulador: 1 },
        },
        {
          text: "Asegurarme de que todos participen y se sientan incluidos",
          scores: { hufflepuff: 3, protegerOtros: 2, colaborativo: 3 },
        },
      ],
    },
    {
      question: "Si pudieras cambiar algo de tu pasado:",
      options: [
        {
          text: "Una decisión impulsiva que lastimó a alguien cercano",
          scores: {
            gryffindor: 1,
            hufflepuff: 2,
            protegerOtros: 3,
            pacificador: 2,
          },
        },
        {
          text: "Una oportunidad de aprendizaje que dejé pasar",
          scores: { ravenclaw: 2, slytherin: 1, conocimiento: 3, innovador: 2 },
        },
        {
          text: "Un momento donde no defendí mis valores por miedo al rechazo",
          scores: { gryffindor: 2, hufflepuff: 1, pertenencia: 2, rebelde: 2 },
        },
        {
          text: "Una situación donde confié demasiado en la persona equivocada",
          scores: { slytherin: 2, ravenclaw: 1, poderPersonal: 2, analitico: 2 },
        },
      ],
    },
    {
      question: "Cuando planeas unas vacaciones, priorizas:",
      options: [
        {
          text: "Lugares que me permitan desconectar completamente de la rutina",
          scores: { gryffindor: 2, hufflepuff: 1, rebelde: 2, innovador: 1 },
        },
        {
          text: "Destinos con rica historia o importancia cultural",
          scores: { ravenclaw: 3, conocimiento: 2, tradicional: 2 },
        },
        {
          text: "Sitios donde pueda crear recuerdos especiales con seres queridos",
          scores: { hufflepuff: 3, pertenencia: 3, pacificador: 1 },
        },
        {
          text: "Lugares exclusivos que poca gente conoce o puede visitar",
          scores: { slytherin: 2, poderPersonal: 2, innovador: 2 },
        },
      ],
    },
    {
      question: "Tu definición personal del éxito se basa más en:",
      options: [
        {
          text: "Haber hecho una diferencia positiva en la vida de otros",
          scores: {
            hufflepuff: 2,
            gryffindor: 1,
            protegerOtros: 3,
            colaborativo: 2,
          },
        },
        {
          text: "Haber dominado habilidades o conocimientos que valoras",
          scores: { ravenclaw: 2, slytherin: 1, conocimiento: 3, analitico: 1 },
        },
        {
          text: "Mantener relaciones auténticas y significativas",
          scores: { hufflepuff: 3, pertenencia: 3, pacificador: 2 },
        },
        {
          text: "Alcanzar independencia y autonomía en tus decisiones",
          scores: { slytherin: 2, gryffindor: 1, poderPersonal: 2, rebelde: 2 },
        },
      ],
    },
  ];
  
  // Datos de los 30 personajes con sus características
  export const characters = [
    {
      name: "Harry Potter",
      house: "Gryffindor",
      image: "/characters/harry_potter.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Rebelde",
      },
      description:
        "Valiente y leal, siempre dispuesto a proteger a sus amigos. Tu naturaleza rebelde y tu fuerte sentido de la justicia te impulsan a actuar directamente contra las injusticias.",
    },
    {
      name: "Ron Weasley",
      house: "Gryffindor",
      image: "/characters/ron_weasley.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Pacificador",
      },
      description:
        "Leal y valiente, eres el tipo de amigo en quien todos pueden confiar. Tu naturaleza pacificadora y tu tendencia a actuar directamente te hacen indispensable en cualquier grupo.",
    },
    {
      name: "Hermione Granger",
      house: "Gryffindor",
      image: "/characters/hermione_granger.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Analítico",
        actitud: "Innovador",
      },
      description:
        "Brillante y analítica, combinas la valentía con la sabiduría. Tu enfoque innovador y tu deseo de proteger a otros te convierten en una líder natural.",
    },
    {
      name: "Ginny Weasley",
      house: "Gryffindor",
      image: "/characters/ginny_weasley.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Pacificador",
      },
      description:
        "Feroz y directa, no temes enfrentar los desafíos de frente. Tu espíritu independiente y tu lealtad inquebrantable te convierten en una aliada formidable.",
    },
    {
      name: "Neville Longbottom",
      house: "Gryffindor",
      image: "/characters/neville_longbottom.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Pacificador",
      },
      description:
        "Valiente de corazón y naturalmente pacificador, tu crecimiento personal es inspirador. Proteges a otros con determinación y siempre buscas hacer lo correcto.",
    },
    {
      name: "James Potter",
      house: "Gryffindor",
      image: "/characters/james_potter.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Rebelde",
      },
      description:
        "Carismático y valiente, tu naturaleza rebelde se combina con un fuerte deseo de proteger a quienes amas. Tu enfoque directo refleja tu honestidad y determinación.",
    },
    {
      name: "Lily Evans",
      house: "Gryffindor",
      image: "/characters/lily_evans.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Colaborativo",
        actitud: "Pacificador",
      },
      description:
        "Compasiva y valiente, tu naturaleza colaborativa te permite unir a las personas. Tu instinto protector y tu búsqueda de la armonía te hacen una persona excepcional.",
    },
    {
      name: "Remus Lupin",
      house: "Gryffindor",
      image: "/characters/remus_lupin.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Analítico",
        actitud: "Pacificador",
      },
      description:
        "Sabio y compasivo, tu enfoque analítico te ayuda a entender a las personas profundamente. Tu naturaleza pacificadora y protectora te convierte en un mentor natural.",
    },
    {
      name: "Rubeus Hagrid",
      house: "Gryffindor",
      image: "/characters/hagrid.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Pacificador",
      },
      description:
        "Gentil gigante con un corazón enorme, tu naturaleza protectora y pacificadora hace que todos se sientan bienvenidos. Tu enfoque directo refleja tu honestidad.",
    },
    {
      name: "Nymphadora Tonks",
      house: "Hufflepuff",
      image: "/characters/nymphadora_tonks.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Colaborativo",
        actitud: "Rebelde",
      },
      description:
        "Divertida y leal, tu espíritu rebelde se combina con un fuerte deseo de proteger a otros. Tu naturaleza colaborativa te hace una excelente compañera de equipo.",
    },
    {
      name: "Cedric Diggory",
      house: "Hufflepuff",
      image: "/characters/cedric_diggory.png",
      traits: {
        motivacion: "Proteger Otros",
        metodo: "Directo",
        actitud: "Pacificador",
      },
      description:
        "Honorable y justo, representas lo mejor de la lealtad y el trabajo duro. Tu naturaleza pacificadora y tu deseo de proteger a otros te convierten en un líder respetado.",
    },
    {
      name: "Luna Lovegood",
      house: "Ravenclaw",
      image: "/characters/luna_lovegood.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Analítico",
        actitud: "Innovador",
      },
      description:
        "Única e innovadora, ves el mundo de manera diferente. Tu búsqueda constante de conocimiento y tu enfoque analítico te permiten encontrar soluciones creativas.",
    },
    {
      name: "Albus Dumbledore",
      house: "Gryffindor",
      image: "/characters/albus_dumbledore.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Analítico",
        actitud: "Innovador",
      },
      description:
        "Sabio e innovador, combinas un vasto conocimiento con un profundo deseo de proteger a otros. Tu enfoque analítico te permite ver el panorama completo.",
    },
    {
      name: "Severus Snape",
      house: "Slytherin",
      image: "/characters/severus_snape.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Manipulador",
        actitud: "Innovador",
      },
      description:
        "Complejo y misterioso, tu búsqueda de conocimiento se combina con métodos poco convencionales. Aunque manipulador, tienes una profundidad emocional que pocos comprenden.",
    },
    {
      name: "Quirinus Quirrell",
      house: "Ravenclaw",
      image: "/characters/quirinus_quirrell.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Analítico",
        actitud: "Innovador",
      },
      description:
        "Tu sed de conocimiento puede llevarte por caminos peligrosos. Tu naturaleza analítica y tu búsqueda de innovación a veces te hace vulnerable a influencias externas.",
    },
    {
      name: "Pomona Sprout",
      house: "Hufflepuff",
      image: "/characters/pomona_sprout.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Analítico",
        actitud: "Tradicional",
      },
      description:
        "Paciente y sabia, tu amor por el conocimiento se combina con métodos tradicionales probados. Tu enfoque analítico te permite dominar tu campo de especialización.",
    },
    {
      name: "Horace Slughorn",
      house: "Slytherin",
      image: "/characters/horace_slughorn.png",
      traits: {
        motivacion: "Conocimiento",
        metodo: "Colaborativo",
        actitud: "Pacificador",
      },
      description:
        "Sociable y conocedor, disfrutas rodearte de personas talentosas. Tu enfoque colaborativo y tu naturaleza pacificadora te ayudan a formar conexiones valiosas.",
    },
    {
      name: "Fred Weasley",
      house: "Gryffindor",
      image: "/characters/fred_weasley.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Directo",
        actitud: "Rebelde",
      },
      description:
        "Divertido y rebelde, tu espíritu libre y tu lealtad hacia tus seres queridos te definen. Tu enfoque directo y tu naturaleza innovadora hacen la vida más emocionante.",
    },
    {
      name: "George Weasley",
      house: "Gryffindor",
      image: "/characters/george_weasley.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Directo",
        actitud: "Rebelde",
      },
      description:
        "Creativo y leal, formas vínculos profundos con quienes te rodean. Tu naturaleza rebelde y tu enfoque directo te permiten crear momentos memorables con tus seres queridos.",
    },
    {
      name: "Cho Chang",
      house: "Ravenclaw",
      image: "/characters/cho_chang.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Analítico",
        actitud: "Pacificador",
      },
      description:
        "Inteligente y reflexiva, valoras profundamente tus relaciones. Tu enfoque analítico te ayuda a entender a las personas, mientras buscas mantener la armonía en tu círculo social.",
    },
    {
      name: "Padma Patil",
      house: "Ravenclaw",
      image: "/characters/padma_patil.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Colaborativo",
        actitud: "Tradicional",
      },
      description:
        "Inteligente y tradicionalista, valoras la estabilidad en tus relaciones. Tu naturaleza colaborativa te permite trabajar bien en equipo mientras mantienes tus valores.",
    },
    {
      name: "Parvati Patil",
      house: "Gryffindor",
      image: "/characters/parvati_patil.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Colaborativo",
        actitud: "Tradicional",
      },
      description:
        "Social y leal, tu naturaleza colaborativa te permite formar amistades duraderas. Valoras las tradiciones y encuentras comodidad en la familiaridad de tu grupo.",
    },
    {
      name: "Colin Creevey",
      house: "Gryffindor",
      image: "/characters/colin_creevey.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Colaborativo",
        actitud: "Pacificador",
      },
      description:
        "Entusiasta y leal, tu deseo de pertenecer te impulsa a apoyar a quienes admiras. Tu naturaleza colaborativa y pacificadora te convierte en un amigo devoto.",
    },
    {
      name: "Lavender Brown",
      house: "Gryffindor",
      image: "/characters/lavender_brown.png",
      traits: {
        motivacion: "Pertenencia",
        metodo: "Colaborativo",
        actitud: "Pacificador",
      },
      description:
        "Emotiva y social, tu necesidad de conexión humana define muchas de tus acciones. Tu naturaleza colaborativa te ayuda a formar vínculos profundos con otros.",
    },
    {
      name: "Voldemort",
      house: "Slytherin",
      image: "/characters/voldemort.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Rebelde",
      },
      description:
        "Ambicioso hasta el extremo, tu búsqueda de poder personal no conoce límites. Tu naturaleza manipuladora y rebelde te lleva a rechazar las normas sociales establecidas.",
    },
    {
      name: "Bellatrix Lestrange",
      house: "Slytherin",
      image: "/characters/bellatrix_lestrange.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Rebelde",
      },
      description:
        "Feroz e intensa, tu lealtad hacia el poder es absoluta. Tu naturaleza manipuladora y rebelde te convierte en una fuerza destructiva cuando te lo propones.",
    },
    {
      name: "Lucius Malfoy",
      house: "Slytherin",
      image: "/characters/lucius_malfoy.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Tradicional",
      },
      description:
        "Elegante y calculador, valoras el poder y el estatus social. Tu enfoque manipulador se combina con un respeto por las tradiciones que te benefician.",
    },
    {
      name: "Draco Malfoy",
      house: "Slytherin",
      image: "/characters/draco_malfoy.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Tradicional",
      },
      description:
        "Ambicioso y orgulloso, has crecido valorando el poder y el estatus. Tu naturaleza manipuladora se combina con un respeto por las tradiciones familiares.",
    },
    {
      name: "Dolores Umbridge",
      house: "Slytherin",
      image: "/characters/dolores_umbridge.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Tradicional",
      },
      description:
        "Autoritaria y controladora, usas tu posición para mantener el orden según tu visión. Tu enfoque manipulador se disfraza bajo una fachada de tradicionalismo y respeto por las reglas.",
    },
    {
      name: "Gilderoy Lockhart",
      house: "Ravenclaw",
      image: "/characters/gilderoy_lockhart.png",
      traits: {
        motivacion: "Poder Personal",
        metodo: "Manipulador",
        actitud: "Innovador",
      },
      description:
        "Carismático y vanidoso, tu búsqueda de fama y reconocimiento define tus acciones. Tu naturaleza manipuladora te ayuda a crear una imagen que no siempre refleja la realidad.",
    },
  ];