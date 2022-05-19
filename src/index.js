import db from './database.js';
import Startup from './models/Startup.js';
import Linguagem from './models/Linguagem_Programacao.js';
import Programador from './models/Programador.js'
import Programador_Linguagem from './models/Programador_Linguagem.js';
import cors from 'cors';
import express from "express";
import bodyParser from 'body-parser'




const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//server.use(express.json());
server.use(cors());

//geral
/*server.get('/',  async (req, res)=>{
    await db.sync();
    const Startups = await Startup.findAll();
    const Linguagens = await Linguagem.findAll();
    const Programadores = await Programador.findAll(); 
    const Programador_Linguagens = await Programador_Linguagem.findAll();
    return res.status(200).json({Startups, Linguagens,
         Programadores, Programador_Linguagens});
}); */

//Startup
server.get('/startup',  async (req, res)=>{
    await db.sync();
    const Startups = await Startup.findAll();

    return res.status(200).json(Startups);
});
// linhaespecifica.html
server.get('/startup/:id_startup',  async (req, res)=>{
    await db.sync();
    const StartupOne = await Startup.findOne({where: {id_startup: req.params.id_startup }});

    return res.status(200).json(StartupOne);
});


server.post('/add/startup', async (req, res)=>{
    console.log(req)
    const {id_startup, nome_startup, cidade_sede} = req.body;

    const novaStartup = await Startup.create({
        id_startup: id_startup,
        nome_startup: nome_startup,
        cidade_sede: cidade_sede
    });

    await db.sync();

    return res.json(novaStartup);
})

server.delete('/startup/delete/:id_startup', async(req, res)=>{
    try {
        await db.sync();
        const startup = await Startup.destroy({where:{id_startup: req.params.id_startup}});
        return res.status(202).json({message:"Startup deletada com sucesso!"})
            
    } catch (error) {
        return res.status(400).json({message:error});
    }
});

server.put('/startup/update/:id_startup', async(req, res)=>{
        await db.sync();
        const {id_startup, nome_startup, cidade_sede} = req.body;
        const startupEdit = await Startup.update({nome_startup, cidade_sede},{where:{id_startup: req.params.id_startup}});
        return res.status(200).json({message:"Deu bom"})

});

//Linguagem Programação
server.get('/linguagem_programacao',  async (req, res)=>{
    await db.sync();
    const Linguagens = await Linguagem.findAll();

    return res.status(200).json(Linguagens);
});

server.get('/linguagem_programacao/:id_linguagem',  async (req, res)=>{
    await db.sync();
    const Linguagens = await Linguagem.findOne({where: {id_linguagem: req.params.id_linguagem }});

    return res.status(200).json(Linguagens);
});
server.post('/add/linguagem_programacao', async (req, res)=>{
    const {id_linguagem, nome_linguagem, ano_lancamento} = req.body;

    const novaLinguagem = await Linguagem.create({
        id_linguagem,
        nome_linguagem,
        ano_lancamento
    });

    await db.sync();

    return res.json(novaLinguagem);
});

server.delete('/linguagem_programacao/delete/:id_linguagem', async(req, res)=>{
    try {
        await db.sync();
        const startup = await Linguagem.destroy({where:{id_linguagem: req.params.id_linguagem}});
        return res.status(200).json({message:"Linguagem deletada com sucesso!"})
            
    } catch (error) {
        return res.status(400).json({message:error});
    }
});

server.put('/linguagem_programacao/:id_linguagem', async(req, res)=>{
    await db.sync();
    const {nome_linguagem, ano_lancamento} = req.body;
    const linguagemEdit = await Linguagem.update({nome_linguagem: nome_linguagem, ano_lancamento: ano_lancamento}, {where:{id_linguagem: req.params.id_linguagem}});
    return res.status(200).json({message:'Deu bom'});

});

//programador

server.get('/programador',  async (req, res)=>{
    await db.sync();
    const Programadores = await Programador.findAll();

    return res.status(200).json(Programadores);
});

server.post('/add/programador', async (req, res)=>{
    const {id_programador, nome_programador, genero, data_nascimento, email, id_startup } = req.body;

    const novaProgramador = await Programador.create({
        id_programador,
        nome_programador,
        genero,
        data_nascimento,
        email,
        id_startup
    });

    await db.sync();

    return res.status(200).json(novaProgramador);
})

server.delete('/programador/:id_programador', async(req, res)=>{
    try {
        await db.sync();
        const programador = await Programador.destroy({where:{id_programador: req.params.id_programador}});
        return res.status(200).json({message:"Deu bom!"})
            
    } catch (error) {
        return res.status(400).json({message:error});
    }
});

server.put('/programador/:id_linguagem', async(req, res)=>{
    await db.sync();
    const {id_programador, nome_programador, genero, data_nascimento, email, id_startup } = req.body;
    const linguagemEdit = await Linguagem.update({nome_programador, genero, data_nascimento, email, id_startup }, {where:{id_programador: req.params.id_programador}});
    return res.status(200).json({message:'Deu bom'});

});


//programador_linguagem
server.post('/add/programador_linguagem', async (req, res)=>{
    const {id_programador, id_linguagem } = req.body;

    const novaProgramadorLinguagem = await Programador_Linguagem.create({
        id_programador,
        id_linguagem
    });

    await db.sync();

    return res.status(200).json(novaProgramadorLinguagem);
})

server.delete('/programador_linguagem/:id_programador', async(req, res)=>{
    try {
        await db.sync();
        const programadorLinguagem = await Programador_Linguagem.destroy({where:{id_programador: req.params.id_programador}});
        return res.status(200).json({message:"Deu bom!"})
            
    } catch (error) {
        return res.status(400).json({message:error});
    }
});
/*server.put('/programador_linguagem/:id_programador', async(req, res)=>{
    await db.sync();
    const {id_programador, id_linguagem } = req.body;
    const linguagemLinguagemEdit = await Programador_Linguagem.update({id_programador, id_linguagem }, {where:{id_programador: req.params.id_programador}});
    return res.status(200).json({message:'Deu bom'});

});*/




server.listen(3000, (req,res)=>{
    console.log('servidor rodando...');
});