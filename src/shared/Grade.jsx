import {
  LogoClassic,
  LogoGold,
  LogoRainbow,
  LogoSilver,
  LogoWood,
} from "./images";

export const findGrade = (trustGrade) => {
  switch (trustGrade) {
    case "rainbow":
      return <LogoRainbow />;
    case "gold":
      return <LogoGold />;
    case "silver":
      return <LogoSilver />;
    case "classic":
      return <LogoClassic />;
    case "wood":
      return <LogoWood />;
    default:
      return <LogoClassic />;
  }
};

export const findNextGrade = (trustGrade) => {
	switch (trustGrade) {
    case "rainbow":
			return 100;
    case "gold":
      return 50;
    case "silver":
      return 25;
    case "classic":
      return 10;
    case "wood":
      return -10;
    default:
      return 10;
  }
};
