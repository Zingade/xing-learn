import useSound from 'use-sound'
import audioFileA from "../../assets/sounds/Kannada-a.ogg.mp3"
import audioFileAA from "../../assets/sounds/Kannada-aa.ogg.mp3"
import audioFileI from "../../assets/sounds/Kannada-i.ogg.mp3"
import audioFileII from "../../assets/sounds/Kannada-ii.ogg.mp3"
import audioFileU from "../../assets/sounds/Kannada-u.ogg.mp3"
import audioFileUU from "../../assets/sounds/Kannada-uu.ogg.mp3"
import audioFileRU from "../../assets/sounds/Kannada-ru.ogg.mp3"
import audioFileAE from "../../assets/sounds/Kannada-ae.ogg.mp3"
import audioFileAEE from "../../assets/sounds/Kannada-aee.ogg.mp3"
import audioFileAI from "../../assets/sounds/Kannada-ai.ogg.mp3"
import audioFileO from "../../assets/sounds/Kannada-o.ogg.mp3"
import audioFileOO from "../../assets/sounds/Kannada-oo.ogg.mp3"
import audioFileOW from "../../assets/sounds/Kannada-ow.ogg.mp3"
import audioFileAM from "../../assets/sounds/Kannada-am.ogg.mp3"
import audioFileAHA from "../../assets/sounds/Kannada-aha.ogg.mp3"
import gifFileA from "../../assets/gifs/Kannada-alphabet-a.gif"
import gifFileAA from "../../assets/gifs/Kannada-alphabet-aa.gif"
import gifFileI from "../../assets/gifs/Kannada-alphabet-e.gif"
import gifFileII from "../../assets/gifs/Kannada-alphabet-ee.gif"
import gifFileU from "../../assets/gifs/Kannada-alphabet-u.gif"
import gifFileUU from "../../assets/gifs/Kannada-alphabet-uu.gif"
import gifFileRU from "../../assets/gifs/Kannada-alphabet-ru.gif"
import gifFileAE from "../../assets/gifs/Kannada-alphabet-ae.gif"
import gifFileAEE from "../../assets/gifs/Kannada-alphabet-aee.gif"
import gifFileAI from "../../assets/gifs/Kannada-alphabet-ai.gif"
import gifFileO from "../../assets/gifs/Kannada-alphabet-o.gif"
import gifFileOO from "../../assets/gifs/Kannada-alphabet-oo.gif"
import gifFileOW from "../../assets/gifs/Kannada-alphabet-ou.gif"
import gifFileAM from "../../assets/gifs/Kannada-alphabet-am.gif"
import gifFileAHA from "../../assets/gifs/Kannada-Alphabet-Aha.gif"
import Arasa from '../../assets/images/kan-alphabet/Arasa.jpg'
import Aata from '../../assets/images/kan-alphabet/Aata.jpg'
import Ina from '../../assets/images/kan-alphabet/Ina.jpg'
import Eesha from '../../assets/images/kan-alphabet/Eesha.jpg'
import Uraga from '../../assets/images/kan-alphabet/Snake.jpg'
import Oota from '../../assets/images/kan-alphabet/Oota.jpg'
import Ruta from '../../assets/images/kan-alphabet/Ruta.jpg'
import Ele from '../../assets/images/kan-alphabet/Ele.jpg'
import Eeta from '../../assets/images/kan-alphabet/Pulley.png'
import Aidala from '../../assets/images/kan-alphabet/FivePetals.png'
import Onte from '../../assets/images/kan-alphabet/Camel.jpg'
import Oolaga from '../../assets/images/kan-alphabet/Shehanayee.jpg'
import Aushad from '../../assets/images/kan-alphabet/Medicine.jpg'
import Angi from '../../assets/images/kan-alphabet/Angi.jpg'
import Aha from '../../assets/images/kan-alphabet/Aha.jpg'


export const PlayA = () => {
    const [pA] = useSound(audioFileA);
    return pA;
}

export const PlayAA = () => {
    const [pA] = useSound(audioFileAA);
    return pA;
}

export const PlayI = () => {
    const [pA] = useSound(audioFileI);
    return pA;
}

export const PlayII = () => {
    const [pA] = useSound(audioFileII);
    return pA;
}

export const PlayU = () => {
    const [pA] = useSound(audioFileU);
    return pA;
}

export const PlayUU = () => {
    const [pA] = useSound(audioFileUU);
    return pA;
}

export const PlayRU = () => {
    const [pA] = useSound(audioFileRU);
    return pA;
}

export const PlayAE = () => {
    const [pA] = useSound(audioFileAE);
    return pA;
}

export const PlayAEE = () => {
    const [pA] = useSound(audioFileAEE);
    return pA;
}

export const PlayAI = () => {
    const [pA] = useSound(audioFileAI);
    return pA;
}

export const PlayO = () => {
    const [pA] = useSound(audioFileO);
    return pA;
}

export const PlayOO = () => {
    const [pA] = useSound(audioFileOO);
    return pA;
}

export const PlayOW = () => {
    const [pA] = useSound(audioFileOW);
    return pA;
}

export const PlayAM = () => {
    const [pA] = useSound(audioFileAM);
    return pA;
}

export const PlayAHA = () => {
    const [pA] = useSound(audioFileAHA);
    return pA;
}

export const swarList = [
    {
      id:1,
      charecter: "ಅ",
      audio: PlayA,
      gif:gifFileA,
      description:"ಅರಸ",
      width_adjust:false,
      image:Arasa,
      audioEx: PlayA,
      english:"King"
      },
    {
      id:2,
      charecter: "ಆ",
      audio: PlayAA,
      gif:gifFileAA,
      description:"ಆಟ",
      width_adjust:false,
      image:Aata,
      audioEx: PlayAA,
      english:"Play"
    },
    {
      id:3,
      charecter: "ಇ",
      audio: PlayI,
      gif:gifFileI,
      description:"ಇನ",
      width_adjust:false,
      image:Ina,
      audioEx: PlayI,
      english:"Sun"
    },
    {
      id:4,
      charecter: "ಈ",
      audio: PlayII,
      gif:gifFileII,
      description:"ಈಶ",
      width_adjust:false,
      image:Eesha,
      audioEx: PlayII,
      english:"God"
    },
    {
      id:5,
      charecter: "ಉ",
      audio: PlayU,
      gif:gifFileU,
      description:"ಉರಗ",
      width_adjust:false,
      image:Uraga,
      audioEx: PlayU,
      english:"Snake"
    },
    {
      id:6,
      charecter: "ಊ",
      audio: PlayUU,
      gif:gifFileUU,
      description:"ಊಟ",
      width_adjust:true,
      image:Oota,
      audioEx: PlayUU,
      english:"Eat"
    },
    {
      id:7,
      charecter: "ಋ",
      audio: PlayRU,
      gif:gifFileRU,
      description:"ಋತ",
      width_adjust:false,
      image:Ruta,
      audioEx: PlayRU,
      english:"Season"
    },
    {
      id:8,
      charecter: "ಎ",
      audio: PlayAE,
      gif:gifFileAE,
      description:"ಎಲೆ",
      width_adjust:false,
      image:Ele,
      audioEx: PlayAE,
      english:"Leave"
    },
    {
      id:9,
      charecter: "ಏ",
      audio: PlayAEE,
      gif:gifFileAEE,
      description:"ಏತ",
      width_adjust:false,
      image:Eeta,
      audioEx: PlayAEE,
      english:"Pulley"
    },
    {
      id:10,
      charecter: "ಐ",
      audio: PlayAI,
      gif:gifFileAI,
      description:"ಐದಳ",
      width_adjust:false,
      image:Aidala,
      audioEx: PlayAI,
      english:"Five Petals"
    },
    {
      id:11,
      charecter: "ಒ",
      audio: PlayO,
      gif:gifFileO,
      description:"ಒಂಟೆ",
      width_adjust:false,
      image:Onte,
      audioEx: PlayO,
      english:"Camel"
    },
    {
      id:12,
      charecter: "ಓ",
      audio: PlayOO,
      gif:gifFileOO,
      description:"ಓಲಗ",
      width_adjust:false,
      image:Oolaga,
      audioEx: PlayOO,
      english:"Trumplate"
    },
    {
      id:13,
      charecter: "ಔ",
      audio: PlayOW,
      gif:gifFileOW,
      description:"ಔಷಧ",
      width_adjust:false,
      image:Aushad,
      audioEx: PlayOW,
      english:"Medicine"
    },
    {
      id:14,
      charecter: "ಅಂ",
      audio: PlayAM,
      gif:gifFileAM,
      description:"ಅಂಗಿ",
      width_adjust:false,
      image:Angi,
      audioEx: PlayAM,
      english:"Shirt"
    },
    {
      id:15,
      charecter: "ಅಃ",
      audio: PlayAHA,
      gif:gifFileAHA,
      description:"ಅಃ",
      width_adjust:false,
      image:Aha,
      audioEx: PlayAHA,
      english:"Aha"
    },
];

export const swarQuestions = [
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
  {
    category: "Kannada Swargalu",
    correct_answer: "ಋ",
    difficulty: "easy",
    incorrect_answers: [
      "ಈ",
      "ಒ",
      "ಔ",
    ],
    question:"What comes after ಊ ?",
    type: "multiple"
  },
];
