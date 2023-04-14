# Teste Dev Fullstack

Este projeto é desenvolvido com Node.js, React.js, tailwindCSS php8 e postgeSQL15.
Desafio técnico.
Foram escolhidos esses frameworks front-end, pois o react, otimiza muito o front-end.
A escolha do tailwindCSS é porque ele faz um build otimizado do CSS, escaneando todos os arquivos do projeto e pegando na sua base de classes customizadas, somente aquelo que é utilizado no projeto. Gerando assim um CSS menor para ser carregado no projeto.

## Instalação

1. Faça Clone do repositório.
2. Rode `npm install` Para Instalat as dependências.

## Usage

O Projeto roda na pasta PROD, então você deve entrar nela com `cd/prod`.
Dentro da pasta rodar o comando do php php -S localhost:8080.
Nesta pasta consta a pasta API que tem o back-end do projeto em php puro com PDO.
Sempre que for atualizado o frontend deve ser minificado para uma versão de produção otimizada
Utilize o comando "npm run build".
Criei este script para um build otimizado em produção:
`"build": "vite build && npm run build:tailwind && npm run prodbuild"`
`"build:tailwind": "npx tailwindcss -i ./src/assets/tailwind.css -o ./dist/assets/style.css"`
`"prodbuild": "cp -r dist/assets prod/ && mv prod/assets/index-*.js prod/assets/index.js && mv prod/assets/index-*.css prod/assets/index.css && mv prod/assets/style.css prod/assets/style.css"`

O projeto conta com o arquivo SQL do banco para ser instalado.
Conta também ja com o arquivo .env para facilitar a conexão.
Os arquivos de frontend então na pasta src, onde o arquivo index.css serve para colocar o CSS customizado que vai ser otimizado no build final.
