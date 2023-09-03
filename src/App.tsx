import { useState } from "react";
import Form1 from "./Form";
import { useUser } from "./useUser";
function App() {
  const [first, setFirst] = useState(1);
  const { user, nameLenght } = useUser();

  return (
    <>
      <button
        onClick={() => {
          setFirst((x) => x + 1);
        }}
      >
        + {first} not re-render useMe in app
      </button>

      <br />
      <br />
      <br />
      <br />
      <Form1 />

      <br />
      <br />
      <br />
      <br />
      {user && user.id > 0 && (
        <>
          <div>{user.name}</div>
          <div>{user.login}</div>
          <div>{user.id}</div>
          <div>{nameLenght}</div>
          {user.avatar_url && (
            <img
              style={{ display: "block", margin: "auto" }}
              src={user.avatar_url}
            ></img>
          )}
        </>
      )}
    </>
  );
}

export default App;
