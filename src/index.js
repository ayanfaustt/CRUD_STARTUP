import db from './database.js';
import Startup from './models/Startup.js';
import Linguagem from './models/Linguagem_Programacao.js';
import express from "express";




const server = express();

server.use(express.json());

server.get('/',  async (req, res)=>{
    await db.sync();
    const Startups = await Startup.findAll();
    const Linguagens = await Linguagem.findAll();
    return res.status(200).json({Startups, Linguagens});
});

server.post('/add/startup', async (req, res)=>{
    const {id_startup, nome_startup, cidade_sede} = req.body;

    const novaStartup = await Startup.create({
        id_startup: id_startup,
        nome_startup: nome_startup,
        cidade_sede: cidade_sede
    });

    await db.sync();

    return res.json(novaStartup);
})
server.post('/add/linguagem_programacao', async (req, res)=>{
    const {id_linguagem, nome_linguagem, ano_lancamento} = req.body;

    const novaLinguagem = await Startup.create({
        id_linguagem,
        nome_linguagem,
        ano_lancamento
    });

    await db.sync();

    return res.json(novaLinguagem);
});

server.delete('/startup/:id_startup', async(req, res)=>{
    try {
        await db.sync();
        const startup = await Startup.destroy({where:{id_startup: req.params.id_startup}});
        return res.status(200).json({message:"Deu bom!"})
            
    } catch (error) {
        return res.status(400).json({message:error});
    }
});

server.put('/startup/update/:id_startup', async(req, res)=>{
        await db.sync();
        const startupEdit = await Startup.findAll({where:{id_startup: req.params.id_startup}});
        //console.log(startup);
        const {id_startup, nome_startup, cidade_sede} = req.body;
        await startupEdit.update({
            nome_startup: nome_startup,
            cidade_sede: cidade_sede
        });

        await startupEdit.save();
        return res.status(200).json({message:"Deu bom"})

});

server.listen(3000, (req,res)=>{
    console.log('servidor rodando...');
});