import React, { useState } from "react";
import LoginForm from "./LoginForm";
import AccountPicker from "./AccountPicker";
import EmailClient from "./EmailClient";

function App() {
  const [user, setUser] = useState(null);
  const [savedAccounts, setSavedAccounts] = useState(() => {
    const fromStorage = localStorage.getItem("emailAccounts");
    return fromStorage ? JSON.parse(fromStorage) : [];
  });

  const handleLogin = (account, remember) => {
    setUser(account);
    if (remember) {
      const exists = savedAccounts.find((a) => a.email === account.email);
      if (!exists) {
        const newAccounts = [...savedAccounts, account];
        setSavedAccounts(newAccounts);
        localStorage.setItem("emailAccounts", JSON.stringify(newAccounts));
      }
    }
  };

  const handleLogout = () => setUser(null);

  const handleRemoveAccount = (email) => {
    const next = savedAccounts.filter(acc => acc.email !== email);
    setSavedAccounts(next);
    localStorage.setItem("emailAccounts", JSON.stringify(next));
  };

  return (
    <div style={{maxWidth:600,margin:"24px auto",fontFamily:"sans-serif"}}>
      {!user ? (
        <>
          <h2>Přihlášení do e-mailu</h2>
          {savedAccounts.length > 0 &&
            <AccountPicker accounts={savedAccounts} onSelect={setUser} onRemove={handleRemoveAccount} />
          }
          <LoginForm onLogin={handleLogin} />
        </>
      ) : (
        <EmailClient user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
