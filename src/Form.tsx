import { FormEvent, useRef, useState } from "react";
import { useUser } from "./useUser";

const Form1 = () => {
  const { getNewLogin } = useUser();
  const [first, setFirst] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    await getNewLogin(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      Search gitHub user
      <form onSubmit={handleOnSubmit}>
        <input ref={inputRef} />
      </form>
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          setFirst((x) => x + 1);
        }}
      >
        + {first} not re-render useMe in form
      </button>
    </div>
  );
};

export default Form1;
