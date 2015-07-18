var models = require('../models/models.js');

// GET /quizes/statistics
exports.statistics = function(req,res){
    models.Quiz.count().then(function(preguntas){           // Se cuentan las preguntas existentes
        var Preguntas = preguntas;          // Preguntas = nº total de preguntas

        models.Comment.count().then(function(comentarios){  // Se cuentan todos los comentarios
            // Puede haber preguntas sin comentarios, pero tambien preguntas con varios comentarios
            var Comentarios = comentarios;  // Comentarios = nº total de comentarios

            var mediaComentarios = (Comentarios / Preguntas).toFixed(1) || 0; // en tanto por 1

            models.Quiz.count({distinct: true, include:     // Se cuentan las preguntas que tienen algun comentario
                [{model: models.Comment, required: true}]}).then(function(PregComentadas) {

                var sinComentarios = Preguntas-PregComentadas; // sinComentarios = preguntas sin comentarios

                res.render('quizes/statistics',
                    {totalPreguntas: Preguntas, totalComentarios: Comentarios, mediaComentarios: mediaComentarios,
                        sinComentarios: sinComentarios, conComentarios: PregComentadas, errors: []});
            });
        });
    });
};