## Desarrollo local

Deberá tener una base de datos mysql corriendo en ambiente local con una base de datos vacía con el nombre de "swapi"

Las variables de entorno se encuentran en en archivo .env si necesita cambiar algún valor este es el lugar para hacerlo

Ejecutar:

- Correr `npm i` para instalar las dependencias
- Correr `npx sls offline` para desplegar las lambdas localmente

Los endpoints disponibles son:

GET | http://localhost:3000/planet?limit=10&page=1

Retorna una lista de planetas, paginado

GET | http://localhost:3000/planet/{planetId}  
 Retorna un planeta, si no existe en la BD hace una consulta a SWAPI

POST | http://localhost:3000/planet

Crea un planeta personalizado

body:

```json
{
  "nombre": "Bespin",
  "periodo_rotacion": "12",
  "periodo_orbita": "5110",
  "diametro": "118000",
  "clima": "temperate",
  "gravedad": "1.5 (surface), 1 standard (Cloud City)",
  "terreno": "gas giant",
  "superficie_agua": "0",
  "poblacion": "6000000",
  "residentes": ["https://swapi.py4e.com/api/people/26/"],
  "peliculas": ["https://swapi.py4e.com/api/films/2/"],
  "creado": "2014-12-10T11:43:55.240000Z",
  "editado": "2014-12-20T20:58:18.427000Z",
  "url": "https://swapi.py4e.com/api/planets/6/"
}
```

PATCH | http://localhost:3000/planet/{planetId}  
body:

```json
{
  "nombre": "Tatooine"
}
```

Actualiza algunos parámetros de un planeta, si no existe en la BD hace una consulta a SWAPI y actualiza ese objeto

## Desplegar en AWS

- instalar globalmente sls ``
- Correr `npm i` para instalar las dependencias
- Correr `NODE_ENV=production sls deploy` para desplegar en AWS, esto generará todos los servicios necesario para que funcione la aplicación, incluyendo una base de datos

## Tests

- Correr `npm run test` para ejecutar los test unitarios
