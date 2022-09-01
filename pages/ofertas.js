import React from "react";
import { Layout } from "../components/Layout";
import { Ofertas } from "../components/Ofertas/Ofertas";
import { getAllOfertas } from "../lib/api";

export default function OfertasPage({ allOfertas }) {
  return (
    <Layout>
      <Ofertas allOfertas={allOfertas} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allOfertas = await getAllOfertas();

  return {
    props: {
      allOfertas,
    },
  };
}
