// Example inside App.jsx
import PortalHost from "./components/PortalHost";
import ModalPortal from "./components/ModalPortal";

function App() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal via PortalHost</button>

      {show && (
        <PortalHost>
          <ModalPortal onClose={() => setShow(false)}>
            <h3>Modal from PortalHost</h3>
            <p>This content is rendered via a separate DOM node.</p>
          </ModalPortal>
        </PortalHost>
      )}
    </>
  );
}
