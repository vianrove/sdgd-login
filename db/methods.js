import ClientSchema from './model.js';
import { insert, read } from './mysql.js';

export const viewAll = (req, res)=>{
    read((result)=>{
        if(result.length == 0){
            res.status(500).json({"status":"error interno"})
        }
        res.json(result)
    })
}
export const createClient = (req, res) => {
    const client = ClientSchema(req.body)
    client.save().then(
        (doc)=>{
            console.log(`Usuario con id: ${client.id} creado`,doc);
            res.json({response:'success'})        
        }
    ).catch((error) => res.json({ message: error}))
}

export const updateClient = (req, res) => {
    const { id } = req.params;
    ClientSchema.updateOne({_id:id},{$set:{
        firstName: req.body.nombre,
        lastName: req.body.apellido,
        age:req.body.age,
        email: req.body.correo,
        password:req.body.password,
        contactNumber: req.body.contactNumber
    }}).then(
        doc =>{
            res.json({doc})
        }
    ).catch(
        err=>{
            console.log('Error al actualizar ',err.message)
            res.json({message:'failed to update'})
        })
}


export const deleteUser = (req,res)=>{
    const {id} = req.params;
    ClientSchema.deleteOne({_id:id})
    .then(
        res.json({response:'success'})
    )
    .catch(
        err => {
            console.log('error al eliminar ',err);
            res.json({message:'failed'})
        })
}


export const login = (req,res)=>{
    const { email, password } = req.body;
    if (!email) return res.status(200).send({success:false, message:'no se digito email'})
    if (!password) return res.status(200).send({success:false, message:'no se digito password'})
    ClientSchema.find({email:email, password:password}).then(
        doc =>{
            if(doc[0]["_id"] == undefined){
                res.status(500).json({message:'failed'})
            }else{
                res.status(200).json({message:'success',data:doc[0]})
                const cache = {
                    _id: doc[0]['_id'],
                    fecha: new Date()
                }
                insert(cache,(result)=>console.log(result))
            }
        }
    ).catch(err=>{
        console.log(err.message)
        res.status(500).json({message:'failed'})
    })

}

