export const Layout = (props) => {
  return (
    <div
      className="container col-sm-6 col-md-8"
      style={{ marginTop: 90, marginBottom: 30 }}
    >
      {props.children}
    </div>
  );
};
