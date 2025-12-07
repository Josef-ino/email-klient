import React, { useState } from "react";

export default function RealLoginForm({onLogin, emails}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    user: "",
    password: "",
    host: "imap.seznam.cz",
    port: 993,
    tls: true,
    smtpHost: "smtp.seznam.cz",
    smtpPort: 465,
    smtpTls: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendLogin = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      let r = await fetch("http://localhost:4000/login", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      let data = await r.json();
      if (!data.ok) throw new Error(data.error);
      setLoading(false);
      onLogin({ ...form }, data.emails);
      setStep(1);
    } catch (e) {
      setLoading(false);
      setError(String(e));
    }
  };

  return (
    <div>
      <form onSubmit={sendLogin}>
        <div>
          <label>Email:{" "}
            <input value={form.user} onChange={e=>setForm({...form, user:e.target.value})} type="email" required />
          </label>
        </div>
        <div>
          <label>Heslo:&nbsp;
            <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} type="password" required />
          </label>
        </div>
        <div>
          <label>IMAP server: <input value={form.host} onChange={e=>setForm({...form,host:e.target.value})} /></label>
          <label>Port: <input value={form.port} onChange={e=>setForm({...form,port:Number(e.target.value)})} type="number" /></label>
          <label>TLS: <input type="checkbox" checked={form.tls} onChange={e=>setForm({...form, tls:e.target.checked})} /></label>
        </div>
        <div>
          <label>SMTP server: <input value={form.smtpHost} onChange={e=>setForm({...form,smtpHost:e.target.value})} /></label>
          <label>Port: <input value={form.smtpPort} onChange={e=>setForm({...form,smtpPort:Number(e.target.value)})} type="number" /></label>
          <label>TLS: <input type="checkbox" checked={form.smtpTls} onChange={e=>setForm({...form, smtpTls:e.target.checked})} /></label>
        </div>
        <button type="submit" disabled={loading}>Přihlásit a načíst maily</button>
        {loading && " načítám..."}
      </form>
      {error && <div style={{color:"red"}}>{error}</div>}
      <div style={{fontSize:12, marginTop:12}}>
        <b>Seznam (IMAP/SMTP):</b><br/>
        Uživatelské jméno: celá adresa<br/>
        IMAP: imap.seznam.cz, port 993, TLS ano<br/>
        SMTP: smtp.seznam.cz, port 465, TLS ano<br/>
        <b>Gmail: používej App Password!</b>
      </div>
    </div>
  );
}
