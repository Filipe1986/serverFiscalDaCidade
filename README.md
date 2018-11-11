# serverFiscalDaCidade
Servidor nodeJs para a aplicação react-native 

# heroku 
heroku login
heroku create <nome-aplicacao> -b heroku/nodejs

Heroku site -> aplicacao criada -> resourses -> add-ons -> mLab MongoDB :: Mongodb
Heroku site -> aplicacao criada -> settings -> reveal Config Vars -> colocar a url na configuração do mongo


https://fiscal-cidade.herokuapp.com/api

Redis para armazenamento de token 
npm install oauth2-server

As rotas protegidas pelo token devem ser criadas após a rota de middleware dentro do arquivo, 
A ordem das rotas é importante, tanto no arquivo routers quando no arquivo server.

//Vídeo para autorização
https://www.youtube.com/watch?v=CUKexA3rNMk