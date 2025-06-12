

import { Navigate, Outlet, useParams } from "react-router";
import CollectionComp from "../components/CollectionComp";

function Collections() {
  const { slugName } = useParams();

  if (!slugName) return <Navigate to={"/"} />;
  return (
    <CollectionComp >
      <Outlet/>
    </CollectionComp>
  );
}

export default Collections;
