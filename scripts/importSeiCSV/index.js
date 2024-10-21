const csv = require("csv");
const fs = require("fs");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

async function loadGruposCSV() {
  const gruposCSV = "CDGRUPOS.csv";

  const grupos = [];

  return new Promise((resolve) => {
    // Ler o arquivo CSV
    fs.createReadStream(gruposCSV)

      // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
      // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
      // Delimitador é ; (ponto e vírgula)
      .pipe(csv.parse({ columns: true, delimiter: ";" }))

      // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
      .on("data", async (dadosLinha) => {
        grupos.push(dadosLinha);
      })
      .on("end", () => resolve(grupos));
  });
}

async function loadCSV(callback) {
  const produtosCSV = "PRODUTOS.csv";

  // Ler o arquivo CSV
  fs.createReadStream(produtosCSV)

    // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
    // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
    // Delimitador é ; (ponto e vírgula)
    .pipe(csv.parse({ columns: true, delimiter: ";" }))

    // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
    .on("data", async (dadosLinha) => {
      await callback(dadosLinha);
    });

  console.log("Importação concluída.");
}

async function connect() {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: "postgresql://postgres:example@localhost:5432/scs-dev",
  });

  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);
  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}

connect()
  .then(async (pg) => {
    const grupos = await loadGruposCSV();

    const gruposPromise = grupos.map(async (grupo) => {
      const id = uuidv4();
      await pg.query("INSERT INTO supplier (id, name) VALUES ($1, $2)", [
        id,
        grupo.DesGru,
      ]);

      return (await pg.query("SELECT * FROM supplier WHERE id=$1", [id])).rows;
    });

    const gruposSalved = await Promise.all(gruposPromise);

    console.log(gruposSalved);

    // loadCSV(async (dadosLinha) => {
    //   const objeto = {
    //     codPro: dadosLinha.CodPro,
    //     codGru: dadosLinha.CodGru,
    //     nome: dadosLinha.DesPro,
    //   };

    //   console.log(objeto);
    // });

    // const res = await pg.query("SELECT * FROM product");
  })
  .catch((error) => console.log(error));
