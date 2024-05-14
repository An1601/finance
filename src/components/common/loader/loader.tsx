import { FC, Fragment } from "react";
import loader from "../../../assets/images/media/loader.svg";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <Fragment>
    <div id="loader">
      <img src={loader} alt="" />
    </div>
  </Fragment>
);

export default Loader;
