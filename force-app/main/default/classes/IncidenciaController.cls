public with sharing class IncidenciaController {
    @AuraEnabled(cacheable=true)
    public static List<Incidencia__c> getIncidencias() {
        return [SELECT Id, Name, Estado__c, Prioridad__c, Fecha_Creacion__c FROM Incidencia__c ORDER BY Fecha_Creacion__c DESC];
    }
}
