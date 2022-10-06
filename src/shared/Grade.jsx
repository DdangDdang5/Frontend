import LogoClassic from "./images/logo/LogoClassic.png";
import LogoWood from "./images/logo/LogoWood.png";
import LogoSilver from "./images/logo/LogoSliver.png";
import LogoGold from "./images/logo/LogoGold.png";
import LogoRainbow from "./images/logo/LogoRainbow.png";

export const findGrade = (trustGrade) => {
  switch (trustGrade) {
    case "rainbow":
      return <img src={LogoRainbow} alt="grade" />;
    case "gold":
      return <img src={LogoGold} alt="grade" />;
    case "silver":
      return <img src={LogoSilver} alt="grade" />;
    case "classic":
      return <img src={LogoClassic} alt="grade" />;
    case "wood":
      return <img src={LogoWood} alt="grade" />;
    default:
      return <img src={LogoClassic} alt="grade" />;
  }
};

export const findNextGrade = (trustGrade) => {
	switch (trustGrade) {
    case "무지개 망치":
			return 100;
    case "금 망치":
      return 50;
    case "은 망치":
      return 25;
    case "기본 망치":
      return 10;
    case "나무 망치":
      return -10;
    default:
      return 10;
  }
};
