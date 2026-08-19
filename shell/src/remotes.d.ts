declare module "mfDetail/DetailApp" {
  import { ComponentType } from "react";
  const DetailApp: ComponentType<{ pokemonId: string | number }>;
  export default DetailApp;
}
declare module "mfHistory/HistoryApp" {
  import { ComponentType } from "react";
  const HistoryApp: ComponentType;
  export default HistoryApp;
}
