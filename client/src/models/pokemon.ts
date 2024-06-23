import { Type as TypeModel } from "./type";
import { Ability as AbilityModel } from "./ability";

export interface Pokemon {
  _id: string;
  name: string;
  imgUrl: string;
  types: TypeModel[];
  abilities: AbilityModel[];
}
