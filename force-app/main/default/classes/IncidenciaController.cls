public with sharing class IncidenciaController {

    @AuraEnabled(cacheable=true)
    public static List<Incidencia__c> getIncidencias() {
        return [
            SELECT Id, Name, Titulo__c, Estado__c, Prioridad__c, Fecha_Creacion__c
            FROM Incidencia__c
            ORDER BY Fecha_Creacion__c DESC
        ];
    }

    @AuraEnabled
    public static Id crearIncidencia(String titulo, String descripcion, String estado, String prioridad) {
        try {
            Incidencia__c nuevaIncidencia = new Incidencia__c();
            nuevaIncidencia.Titulo__c = titulo;
            nuevaIncidencia.Descripcion__c = descripcion;
            nuevaIncidencia.Estado__c = estado;
            nuevaIncidencia.Prioridad__c = prioridad;
            nuevaIncidencia.Usuario__c = UserInfo.getUserId();
            nuevaIncidencia.Fecha_Creacion__c = Date.today();
            insert nuevaIncidencia;
            return nuevaIncidencia.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error al crear incidencia: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void actualizarIncidencia(Id incidenciaId, String estado, String prioridad) {
        Incidencia__c inc = [
            SELECT Id, Estado__c, Prioridad__c
            FROM Incidencia__c
            WHERE Id = :incidenciaId
            LIMIT 1
        ];

        inc.Estado__c = estado;
        inc.Prioridad__c = prioridad;

        update inc;
    }

    @AuraEnabled
    public static void cerrarIncidencia(Id incidenciaId) {
        Incidencia__c inc = [
            SELECT Id, Estado__c
            FROM Incidencia__c
            WHERE Id = :incidenciaId
            LIMIT 1
        ];
        
        inc.Estado__c = 'Cerrado';
        update inc;
    }
}
