import fetch from "node-fetch";

const SENDGRID_API = "https://api.sendgrid.com/v3/mail/send";
const SENDGRID_API_KEY = process.env.SEND_GRID_API;

const sendEmail = async ({
  nombre,
  personEmail,
  telefono,
  empresa,
  asunto,
  mensaje,
}) => {
  const email = "venta.clientes@hyubi.com.mx";

  await fetch(SENDGRID_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          subject: `Contacto | ${asunto} - ${nombre} - ${empresa}`,
        },
      ],
      from: {
        email: "kalbertog121@gmail.com",
        name: "Website HyU",
      },
      content: [
        {
          type: "text/html",
          value: `<b>${nombre}</b>, manda un mensaje con asunto: <b>${asunto}</b><br /> 

              <h4>Contenido del mensaje</h4><p> ${mensaje}</p>  <br />
              <h5>Datos de ${nombre} </h5>
              <p>Telefono: ${telefono}</p>
              <p>Email: ${personEmail}</p>
              <p>Empresa: ${empresa}</p>
              `,
        },
      ],
    }),
  });
};

export { sendEmail };
