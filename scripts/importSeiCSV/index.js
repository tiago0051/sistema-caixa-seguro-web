require("dotenv").config();
const csv = require("csv");
const fs = require("fs");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const companyId = process.env.COMPANY_ID;
const gruposCSV = "CDGRUPOS.csv";
const produtosCSV = "PRODUTOS.csv";

async function loadGruposCSV() {
  const suppliers = [];
  return new Promise((resolve, reject) => {
    // Ler o arquivo CSV
    fs.createReadStream(gruposCSV)

      // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
      // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
      // Delimitador é ; (ponto e vírgula)
      .pipe(csv.parse({ columns: true, delimiter: ";" }))

      // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
      .on("data", (dadosLinha) => {
        suppliers.push(dadosLinha);
      })
      .on("finish", () => resolve(suppliers))
      .on("error", (error) => reject(error));
  });
}

async function loadCSV() {
  const products = [];
  return new Promise((resolve, reject) => {
    // Ler o arquivo CSV
    fs.createReadStream(produtosCSV)

      // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
      // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
      // Delimitador é ; (ponto e vírgula)
      .pipe(csv.parse({ columns: true, delimiter: ";" }))

      // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro
      .on("data", (dadosLinha) => {
        products.push(dadosLinha);
      })
      .on("finish", () => resolve(products))
      .on("error", (error) => reject(error));
  });
}

async function resetDB(pg) {
  await pg.query("DELETE FROM product_storage");
  await pg.query("DELETE FROM product");
  await pg.query("DELETE FROM supplier");
}

async function connect() {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URL,
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

async function createSuppliers(connection) {
  const grupos = [];
  let suppliersCount = 0;

  const suppliersCsv = await loadGruposCSV();

  for (const supplier of suppliersCsv) {
    suppliersCount++;

    const id = uuidv4();
    grupos.push({
      id,
      codGru: supplier.CodGru,
    });

    await connection.query(
      "INSERT INTO supplier (id, name, company_id) VALUES ($1, $2, $3)",
      [id, supplier.DesGru, companyId]
    );

    console.log("- Fornecedor:", suppliersCount, "/", suppliersCsv.length);
  }

  return grupos;
}

async function createProducts(connection, grupos) {
  const products = await loadCSV();
  let productCount = 0;

  for (const dadosLinha of products) {
    productCount++;

    const id = uuidv4();

    await connection.query(
      "INSERT INTO product (id, name, cost_price, sale_price, company_id, supplier_id, ncm) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        dadosLinha.DesPro,
        Number(dadosLinha.PcoCus.replace(",", ".")),
        Number(dadosLinha.PcoVen.replace(",", ".")),
        companyId,
        grupos.find((grupo) => grupo.codGru === dadosLinha.CodGru).id,
        dadosLinha.NCM_SH,
      ]
    );

    const quantity = Number(dadosLinha.EstAtu);

    if (Number.isNaN(quantity)) {
      console.log(dadosLinha.DesPro, "Quantidade inválida:", dadosLinha.EstAtu);
    } else {
      await connection.query(
        "INSERT INTO product_storage (product_id, storage_id, quantity) VALUES ($1, $2, $3)",
        [id, process.env.STORAGE_ID, quantity]
      );
    }

    console.log("- Produto:", productCount, "/", products.length);
  }
}

async function main() {
  const connection = await connect();

  console.log("Resetando banco de dados");
  await resetDB(connection);
  console.log("Banco de dados resetado");

  console.log("Criando fornecedores");
  const suppliers = await createSuppliers(connection);
  console.log("Fornecedores criados");

  console.log("Criando produtos");
  await createProducts(connection, suppliers);
  console.log("Produtos criados");
}

main();
