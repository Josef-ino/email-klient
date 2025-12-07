import React from "react";

function AccountPicker({accounts,onSelect,onRemove}) {
  return (
    <div style={{margin:"16px 0"}}>
      <h4>Zapamatované účty</h4>
      <ul style={{listStyle:"none",padding:0}}>
        {accounts.map(acc =>
          <li key={acc.email} style={{marginBottom:5}}>
            <span style={{fontWeight:"bold"}}>{acc.email}</span>
            {" "}
            <button onClick={()=>onSelect(acc)} style={{marginRight:4}}>Přihlásit se</button>
            <button onClick={()=>onRemove(acc.email)} style={{color:"red"}}>Smazat</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AccountPicker;
