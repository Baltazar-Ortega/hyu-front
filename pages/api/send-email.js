import { sendEmail } from "../../utils/sendEmail";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      nombre,
      personEmail,
      telefono,
      empresa,
      asunto,
      mensaje,
    } = req.body;
    // console.log("Entra el POST. Este es el email de la persona: ", personEmail)
    await sendEmail({
      nombre,
      personEmail,
      telefono,
      empresa,
      asunto,
      mensaje,
    });
    return res.status(200).end();
  }
  return res.status(404).json({
    error: {
      code: "not_found",
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};
