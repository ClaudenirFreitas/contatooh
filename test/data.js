var MongoClient = require("mongodb").MongoClient;

function Contato (nome, email) {
    this.nome = nome;
    this.email = email;
}

var contatos = [
    new Contato("nome1", "nome1@gmail.com"),
    new Contato("nome2", "nome2@gmail.com"),
    new Contato("nome3", "nome3@gmail.com"),
    new Contato("nome4", "nome4@gmail.com")
];

MongoClient.connect("mongodb://127.0.0.1:27017/contatooh_test", function(err, db) {
   
    if (err) {
        throw err;
    }
    
    db.dropDatabase(function(err) {
        if (err) {
            console.log(err);
        }
        
        console.log("clear database");
        db.collection("contatos").insert(contatos, function(err, inserted) {
           if (err) {
               console.log(err);
           } 
           
           console.log("Banco de dados populado com sucesso!");
           process.exit(0);
        });
    });
    
});