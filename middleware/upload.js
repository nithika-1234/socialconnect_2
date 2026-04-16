    import multer from 'multer'
    //to store file in local storage
    const storage=multer.diskStorage({


      destination:function(req,file,cb){

      cb(null,"uploads/")

      },
      //filename is optional 
      filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)//1234566-photo.png
      }





    })
    const upload=multer({storage})
    export default upload;