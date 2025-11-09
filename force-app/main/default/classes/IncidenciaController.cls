public with sharing class IncidenciaController {
    @AuraEnabled(cacheable=true)
    public static List<Incidencia__c> getIncidencias() {
        return [SELECT Id, Name, Estado__c, Prioridad__c, Fecha_Creacion__c FROM Incidencia__c ORDER BY Fecha_Creacion__c DESC];
    }

    @AuraEnabled
    public static Id crearIncidencia(String titulo, String descripcion, String estado, String prioridad) {
        try {
            Incidencia__c nuevaIncidencia = new Incidencia__c();
            nuevaIncidencia.Titulo__c = titulo;
            nuevaIncidencia.Descripcion__c = descripcion;
            nuevaIncidencia.Estado__c = estado;
            nuevaIncidencia.Prioridad__c = prioridad;
            nuevaIncidencia.Usuario__c = UserInfo.getUserId(); // Usuario logueado
            nuevaIncidencia.Fecha_creacion__c = Date.today();
            insert nuevaIncidencia;
            return nuevaIncidencia.Id;
        } catch (Exception e) {
            // Propaga un mensaje claro al LWC
            throw new AuraHandledException('Error al crear incidencia: ' + e.getMessage());
        }

    }
}