import background from "../img/background.jpg";

export const Layout = (props) => {
  return (
    <LayoutFull>
      <div
        className="container col-sm-8 col-md-6 col-lg-4 p-5"
        style={{
          marginTop: 90,
          marginBottom: 30,
          borderRadius: 15,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}>
        <div className="d-flex flex-column row-hl justify-content-center">
          {props.children}
        </div>
      </div>
    </LayoutFull>
  );
};

export const LayoutFull = (props) => {
  return (
    <div
      style={{
        height: "120vh",
        backgroundImage: `url(
          "${background}"
        )`,
        backgroundSize: "100vw",
        backgroundAttachment: "fixed",
        backgroundRepeat: "revert",
        border: "0.1px solid black",
      }}>
      {props.children}
    </div>
  );
};
