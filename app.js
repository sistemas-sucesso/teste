const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        styleSrcElem: ["'self'", "https:", "'unsafe-inline'"]
      }
    }
  }));
const port = 3000;

// Configura o EJS como view engine
app.set('view engine', 'ejs');

// Configura o diretório de views
app.set('views', './views');

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello World!' });
});

// Rota para verificar a idade
app.get('/check-age', (req, res) => {
  const age = parseInt(req.query.age, 10);
  let result;

  if (isNaN(age)) {
    result = 'Idade inválida!';
  } else if (age >= 18) {
    result = 'O aluno é maior de idade.';
  } else {
    result = 'O aluno é menor de idade.';
  }

  res.render('index', { message: result });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
