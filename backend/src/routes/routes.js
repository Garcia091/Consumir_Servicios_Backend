const {Router} = require('express');
const router = Router();

const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

        // Tipo usuario
    //Petición get
router.get('/Tipo_usuario',(req,res)=>{
    mysqlConnection.query('SELECT * FROM TIPO_USUARIO',
    (err,rows,fields)=>{
      if(!err)
     {
       res.json(rows);
     }else{
       console.log(err);
     }
    })
}) 

    //Petición post
   router.post('/Tipo_usuario', (req, res) => {
    const {ID_TIPO,TIPO_USUARIO} = req.body
    let tipo = [ID_TIPO,TIPO_USUARIO];
    let nuevoTipo = `INSERT INTO TIPO_USUARIO VALUES (?,?);`

   mysqlConnection.query(nuevoTipo,tipo, (err,results,fields) => {
     if(err){
       return console.error(err.message);
     }
     res.json({message:`Tipo Usuario Ingresado`})
   });
  });
  
     //Petición put
  router.put('/Tipo_usuario/:id', (req,res) => {
  const {TIPO_USUARIO} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE TIPO_USUARIO SET TIPO_USUARIO = ? WHERE ID_TIPO = ?`,[TIPO_USUARIO,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `Tipo usuario ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

  //PETICIÓN O SERVICIO DELETE - ELIMINACIÓN DE DATOS
  router.delete('/Tipo_usuario/:id', (req,res) => {
    const { id } = req.params;
    mysqlConnection.query(`DELETE FROM TIPO_USUARIO WHERE ID_TIPO =?`,[id],(err,rows,fields) => {
      if("!err"){
        res.json({status: `El tipo usuario ha sido eliminado`})
      }else{
        console.log(err);
      }
    });
  });

module.exports = router;