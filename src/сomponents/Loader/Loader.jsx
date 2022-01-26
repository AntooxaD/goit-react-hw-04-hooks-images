import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";

export default function LoaderSpin() {
  return <Puff color="#00a3e9" wrapperClass={s.Spinner} />;
}
