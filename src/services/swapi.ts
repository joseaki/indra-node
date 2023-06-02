import axios from "axios";
import { plainToClass } from "class-transformer";
import { PlanetResponseDTO } from "src/dto/planet.dto";

export const getPlanet = async (id: number) => {
  try {
    const url = `${process.env.SWAPI}/planets/${id}`;
    const resp = await axios.get(url, { timeout: 4000 });
    console.log("API" + JSON.stringify(resp.data, null, 2));
    const userResponseDTO = plainToClass(PlanetResponseDTO, resp.data, {
      excludeExtraneousValues: true,
    });
    console.log("API 2" + JSON.stringify(userResponseDTO, null, 2));
    return userResponseDTO;
  } catch (error) {
    console.log(error);
  }
};
// export const getPlanet = (id: number): Promise<Planeta> =>
//   new Promise((resolve, reject) => {
//     const options = {
//       host: `${process.env.SWAPI}`,
//       path: `/api/planets/${id}`,
//       method: "GET",
//       port: 443,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const req = https.request(options, (res) => {
//       let buffer = "";
//       res.on("data", (chunk) => (buffer += chunk));
//       res.on("end", () => {
//         console.log(buffer);
//         // console.log(JSON.parse(buffer));
//         // const userResponseDTO = plainToClass(
//         //   PlanetResponseDTO,
//         //   JSON.parse(buffer),
//         //   {
//         //     excludeExtraneousValues: true,
//         //   }
//         // );
//         resolve({});
//       });
//     });
//     req.on("error", (e) => reject(e.message));
//     req.end();
//   });

// export const getPlanet = async (id: number): Promise<Planeta> => {
//   let dataString = "";
//   const response = await new Promise((resolve, reject) => {
//     console.log(`https://${process.env.SWAPI}/api/planets/${id}`);
//     const req = https.get(
//       `https://${process.env.SWAPI}/api/planets/${id}`,
//       function (res) {
//         res.on("data", (chunk) => {
//           dataString += chunk;
//         });
//         res.on("end", () => {
//           resolve({
//             statusCode: 200,
//             body: JSON.stringify(JSON.parse(dataString), null, 4),
//           });
//         });
//       }
//     );

//     req.on("error", (e) => {
//       reject({
//         statusCode: 500,
//         body: "Something went wrong!",
//       });
//     });
//   });
//   return response;
// };
