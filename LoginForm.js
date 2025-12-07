import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (email) {
          onLogin({ email }, remember);
          setEmail(""); setPass(""); setRemember(false);
        }
      }}
      style={{marginTop:16,marginBottom:16}}
    >
      <div>
        <label>Email:{" "}
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>Heslo:{" "}
          <input type="password" required value={pass} autoComplete="current-password" onChange={e => setPass(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
            Zapamatovat si mě
        </label>
      </div>
      <button type="submit">Přihlásit</button>
    </form>
  );
}

export default LoginForm;
