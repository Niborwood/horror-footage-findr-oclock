module.exports = {

    resourceNotFound(_, response){
        response.status(404).json({data: [], error: `Il fait noir par ici .. Tu es sûr de vouloir y aller ?`});
    }

}