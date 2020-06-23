var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://njb:njb@cluster0-gvz4q.mongodb.net/<dbname>?retryWrites=true&w=majority');

var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);
var Did = mongoose.model('Did', todoSchema);


//var data = [{item:'item1'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

app.get('/todo', function(req, res){
    Todo.find({},function(err, data){
        if(err) throw err;
        res.render('todo',{todos: data});
    })
});

app.post('/todo', urlencodedParser, function(req, res){
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json({todos: data});
    })
    
});

app.delete('/todo/:item', function(req, res){
    var newDid = Did(req.params.item).save(function(err,data){
        if(err) throw err;
        res.render('todo',{comp: data});
    })
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if(err) throw err;
        res.json({todos: data});
    })
    
});

}