import chaosCover from '@/shared/assets/images/projects/chaos-office-cover.jpg'
import chaosHud from '@/shared/assets/images/projects/chaos-office-hud.png'
import chaosKeypad from '@/shared/assets/images/projects/chaos-office-keypad.png'
import chaosMenu from '@/shared/assets/images/projects/chaos-office-menu.png'
import echoesGameplay from '@/shared/assets/images/projects/echoes-gameplay.webp'
import echoesMenu from '@/shared/assets/images/projects/echoes-menu.webp'
import kidsRoom from '@/shared/assets/images/projects/unity-essentials-kids-room.webp'
import sceneSelect from '@/shared/assets/images/projects/unity-essentials-scene-select.webp'
import bedroom from '@/shared/assets/images/projects/unity-essentials-bedroom.webp'
import type { Project } from '../types'

export const PROJECTS: readonly Project[] = [
  {
    slug: 'chaos-in-the-office',
    title: 'Chaos in the Office',
    tags: ['Unity', 'C#', 'UI Toolkit', 'Música y SFX'],
    badges: ['Game Jam · 48 h', 'Dos mundos', 'WebGL'],
    description:
      'Un juego de suspenso en primera persona. Un ascensor te lleva a una versión alterada de la oficina, donde debes resolver acertijos y escapar de una araña que te persigue.',
    contribution: {
      title: 'Mi aporte · Interfaz, música y efectos de sonido',
      body: 'Diseñé e implementé la interfaz con UI Toolkit, incluidos el menú principal con estética de carpeta de archivo, los menús de pausa y opciones y las pantallas de victoria y derrota. Integré la música y los efectos de sonido de los menús, el ascensor, los acertijos y la persecución.',
    },
    image: {
      src: chaosCover,
      alt: 'Portada de Chaos in the Office con la oficina normal y su versión caótica separadas por una grieta luminosa.',
      fit: 'contain',
    },
    gallery: [
      { src: chaosMenu, alt: 'Menú principal con pestañas y una carpeta de archivo.' },
      { src: chaosKeypad, alt: 'Panel de acceso con teclado para introducir un código.' },
      {
        src: chaosHud,
        alt: 'Interfaz del acertijo con el objetivo y el contador de huevos devueltos al nido.',
      },
    ],
    links: [{ label: 'Jugar en itch.io', href: 'https://lausmp.itch.io/chao-in-the-office' }],
  },
  {
    slug: 'echoes',
    title: 'Echoes',
    tags: ['Unity', 'C#', 'UI Toolkit', 'Audio'],
    badges: ['Game Jam · 48 h', 'Unity', 'Equipo Ctrl + Z'],
    description:
      'Un juego de suspenso narrativo en 2D: una biblioteca, un asesino y un bucle temporal. Cada intento invita a observar el entorno y descubrir cómo cambiar el desenlace.',
    contribution: {
      title: 'Mi aporte · UI, sonidos y efectos',
      body: 'Me encargué de toda la interfaz de usuario, los sonidos y los efectos. Implementé el menú principal y las opciones con UI Toolkit, el control de volumen y la navegación hacia la escena de juego.',
    },
    details: [
      'Mi trabajo conectó la presentación del juego con su uso: organizar los menús, ajustar su apariencia e integrar el audio y los efectos en la experiencia.',
      'Desarrollado junto a Juan, Adrián y Eli. Aquí presento mi contribución al proyecto colectivo.',
    ],
    gallery: [
      {
        src: echoesGameplay,
        alt: 'Escena de juego de Echoes en acuarela: la protagonista en un sillón de la biblioteca mientras una figura triangular con un arma aparece por la puerta.',
      },
    ],
    image: {
      src: echoesMenu,
      alt: 'Menú principal de Echoes: una biblioteca ilustrada y un pergamino con los botones Jugar, Opciones y Salir.',
    },
    links: [{ label: 'Jugar en itch.io', href: 'https://adrede.itch.io/echoes' }],
  },
  {
    slug: 'unity-essentials',
    title: 'Unity Essentials',
    tags: ['Unity', 'C#', 'Física', '2D y 3D'],
    badges: ['Unity Essentials Pathway', '2026 – Actualidad', 'Proyecto académico'],
    description:
      'Escenas interactivas 2D y 3D construidas durante el Unity Essentials Pathway: físicas, audio e interacciones básicas con scripts en C#.',
    contribution: {
      title: 'Mi rol · Desarrolladora',
      body: 'Construí escenas interactivas 2D y 3D e incorporé físicas, audio e interacciones básicas con scripts en C# como parte de mi aprendizaje.',
    },
    details: [
      "El proyecto reúne seis escenas a las que se accede desde un selector: Playground (navegación), Kid's Room (3D), Kitchen (audio), Living Room (programación), Top Down (2D) y una escena personalizada.",
    ],
    gallery: [
      {
        src: sceneSelect,
        alt: 'Selector de escenas con el letrero "Laura M." y botones para Playground, Kid\'s Room, Kitchen, Living Room, Top Down y una escena personalizada.',
      },
      {
        src: bedroom,
        alt: "Escena Kid's Room en 3D: un cuarto infantil con cama, caballito de madera, canasta de baloncesto y una pelota roja.",
      },
      {
        src: kidsRoom,
        alt: "Escena Kid's Room en 3D: un ratón de juguete recorre un cuarto infantil recogiendo trozos de queso.",
      },
    ],
    image: { logo: 'unity', alt: 'Logo de Unity' },
    links: [
      {
        label: 'Jugar en Unity Play',
        href: 'https://play.unity.com/en/games/14de6029-abee-4abd-b26d-3607a4014b75/my-unity-essentials-project',
      },
    ],
  },
]

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}
