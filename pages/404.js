import React from "react";
import { Layout } from "../components/Layout";

export default function Custom404() {
  return (
    <Layout>
      <div style={{ minHeight: "60vh", marginBottom: "60px" }}>
        <h1 style={{ marginTop: "35px" }}>
          Error: La pagina que solicitaste no existe
        </h1>
        <p>Escribe una URL valida</p>
        <img src="/images/warning404.png" style={{ width: "500px" }} />
      </div>
    </Layout>
  );
}
