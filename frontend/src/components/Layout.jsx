import background from "../img/background.jpg";

export const Layout = (props) => {
  return (
    <LayoutFull>
      <div
        className="container col-sm-10 col-md-8 col-lg-7 p-5"
        style={{
          marginTop: 120,
          marginBottom: 300,
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
        minHeight: "100%",
        backgroundImage: `url(
          "${background}"
        )`,
        backgroundSize: "100vw",
        backgroundRepeat: "revert",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: "0.1px solid black",
      }}>
      {props.children}
    </div>
  );
};
