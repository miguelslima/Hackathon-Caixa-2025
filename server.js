const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

// Função para ler o db.json
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read db.json', err);
    return { produtos: [], simulacoes: [] };
  }
};

// Função para escrever no db.json
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write to db.json', err);
  }
};

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const db = readDB();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite requisições de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Tratar requisições OPTIONS (pré-voo CORS)
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /produtos
  if (url === '/produtos' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(db.produtos));
    return;
  }

  // POST /produtos
  if (url === '/produtos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newProduct = JSON.parse(body);
        const newId = db.produtos.length > 0 ? Math.max(...db.produtos.map(p => p.id)) + 1 : 1;
        const finalProduct = { id: newId, ...newProduct };
        db.produtos.push(finalProduct);
        writeDB(db);
        res.writeHead(201);
        res.end(JSON.stringify(finalProduct));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
    return;
  }

  // POST /simulacoes
  if (url === '/simulacoes' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const simulationData = JSON.parse(body);
        const newId = db.simulacoes.length > 0 ? Math.max(...db.simulacoes.map(s => s.id)) + 1 : 1;
        const finalSimulation = { id: newId, ...simulationData };
        db.simulacoes.push(finalSimulation);
        writeDB(db);
        res.writeHead(201);
        res.end(JSON.stringify(finalSimulation));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not Found' }));
});

module.exports = (req, res) => {
  server.emit('request', req, res);
};
