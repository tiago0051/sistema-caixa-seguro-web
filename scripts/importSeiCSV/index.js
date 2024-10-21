const csv = require("csv");
const fs = require("fs");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const companyId = "da0fa60d-907a-4cde-bd48-2e88946eda68";
const gruposCSV = "CDGRUPOS.csv";
const produtosCSV = "PRODUTOS.csv";

async function loadGruposCSV(callback) {
  return new Promise((resolve, reject) => {
    // Ler o arquivo CSV
    fs.createReadStream(gruposCSV)

      // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
      // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
      // Delimitador é ; (ponto e vírgula)
      .pipe(csv.parse({ columns: true, delimiter: ";" }))

      // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
      .on("data", async (dadosLinha) => {
        await callback(dadosLinha);
      })
      .on("end", () => resolve())
      .on("error", (error) => reject(error));
  });
}

async function loadCSV(callback) {
  return new Promise((resolve, reject) => {
    // Ler o arquivo CSV
    fs.createReadStream(produtosCSV)

      // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
      // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
      // Delimitador é ; (ponto e vírgula)
      .pipe(csv.parse({ columns: true, delimiter: ";" }))

      // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
      .on("data", async (dadosLinha) => {
        await callback(dadosLinha);
      })
      .on("end", () => resolve())
      .on("error", (error) => reject(error));
  });
}

async function resetDB(pg) {
  await pg.query("DELETE FROM product");
  await pg.query("DELETE FROM supplier");
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
    await resetDB(pg);

    const grupos = [];

    await loadGruposCSV(async (dadosLinha) => {
      const id = uuidv4();

      grupos.push({
        id,
        codGru: dadosLinha.CodGru,
      });

      await pg.query("INSERT INTO supplier (id, name) VALUES ($1, $2)", [
        id,
        dadosLinha.DesGru,
      ]);
    });

    let productsLength = 0;

    await loadCSV(async (dadosLinha) => {
      const id = uuidv4();

      productsLength++;

      await pg.query(
        "INSERT INTO product (id, name, cost_price, sale_price, company_id, supplier_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          id,
          dadosLinha.DesPro,
          dadosLinha.PcoCus,
          dadosLinha.PcoVen,
          companyId,
          grupos.find((grupo) => grupo.codGru === dadosLinha.CodGru).id,
        ]
      );
    });

    console.log(
      `total categorias: ${grupos.length}, total produtos: ${productsLength}`
    );
  })
  .catch((error) => console.log(error));
