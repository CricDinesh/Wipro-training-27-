import React, { useEffect } from "react";

function withLogger<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const LoggedComponent: React.FC<P> = (props) => {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);
      return () => console.log(`${WrappedComponent.name} unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return LoggedComponent;
}

export default withLogger;
