/**
 * @param (*) tipo  |  "image" o "auto"
 * @param {*} imagenFile   |  binario
 * @param {*} cloudinaryUsername  |  variable de entorno
 * @param {*} uploadPreset   |  variable de entorno
 * Se sube el archivo con una llamada directa a la REST API, mediante unauthenticated request.
 */
export const crearUrlConCloudinary = async (
  tipo,
  archivo,
  cloudinaryUsername,
  uploadPreset
) => {
  return new Promise(async (resolve) => {
    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudinaryUsername}/${tipo}/upload`;

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("upload_preset", uploadPreset);
    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch(urlCloudinary, options);
      const resJson = await res.json();
      // console.log(resJson);
      const url = resJson.secure_url;
      resolve(url);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  });
};
