import { Blocks } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <p className="loader-message">
        Due to the fact that we use free versions of the services, the page may
        take some time to be loaded.
        <br />
        Thank you for your patience...
      </p>
      <div className="loader-container">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader;
