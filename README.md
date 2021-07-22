API de comércio.

Rotas concebidas para atenderem a um sistema básico de comércio.

Informações necessárias.

Variável de ambiente necessária:
ENVIRONMENT=dev|qas|prd

Banco de dados: mysql

Arquivos de configuração separados por ambiente.

Dentro da pasta .env do projeto existem 3 arquivos,
que será carregado de acordo com a variável de
ambiente ENVIRONMENT definida acima.

estes arquivos poderão ter outras variáveis de
ambiente que serão carregadas na subida do projeto.
Inicialmente as variáveis exigidas são as
mencionadas abaixo e de acordo com implementações
do projeto podem ser definidas novas.

PORT=&lt;porta do serviço&gt;<br>
DATABASE=&lt;nome do banco de dados&gt;<br>
DATABASE_USERNAME=&lt;nome do usuário no mysql&gt;<br>
DATABASE_PASSWORD=&lt;senha do usuário no mysql&gt;

Instalando dependências:<br>
npm instll

Scripts:
Testes: npm run dev
Build: npm run build


