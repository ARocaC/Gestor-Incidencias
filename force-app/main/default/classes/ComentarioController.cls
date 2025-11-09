public with sharing class ComentarioController {

    // Obtener los comentarios de una incidencia concreta
    @AuraEnabled(cacheable=true)
    public static List<Comentario__c> getComentarios(Id incidenciaId) {
        if (incidenciaId == null) {
            throw new AuraHandledException('Debe proporcionarse un Id de incidencia.');
        }

        return [
            SELECT Id, Texto__c, Usuario__r.Name, Fecha__c
            FROM Comentario__c
            WHERE Incidencia__c = :incidenciaId
            ORDER BY Fecha__c DESC
        ];
    }

    // Crear un nuevo comentario asociado a una incidencia
    @AuraEnabled
    public static Id crearComentario(Id incidenciaId, String texto) {
        try {
            if (incidenciaId == null || String.isBlank(texto)) {
                throw new AuraHandledException('Incidencia o texto del comentario no pueden estar vacíos.');
            }

            Comentario__c nuevo = new Comentario__c();
            nuevo.Incidencia__c = incidenciaId;
            nuevo.Texto__c = texto;
            nuevo.Usuario__c = UserInfo.getUserId();
            nuevo.Fecha__c = Date.today();

            insert nuevo;
            return nuevo.Id;

        } catch (Exception e) {
            throw new AuraHandledException('Error al crear comentario: ' + e.getMessage());
        }
    }
}
