@isTest
private class IncidenciaControllerTest {
    @isTest
    static void testGetIncidencias() {
        // Preparar datos de prueba
        Incidencia__c testInc = new Incidencia__c(
            Titulo__c = 'Error en login',
            Descripcion__c = 'No carga la página de login',
            Estado__c = 'En progreso',
            Prioridad__c = 'Alta'
        );
        insert testInc;

        // Llamar al método
        List<Incidencia__c> resultados = IncidenciaController.getIncidencias();

        // Verificar resultados
        System.assertNotEquals(0, resultados.size(), 'Debe devolver al menos una incidencia');
    }

    @isTest
    static void testCerrarIncidencia() {
    // Crear usuario
    User u = [SELECT Id FROM User LIMIT 1];

    // Crear incidencia de prueba
    Incidencia__c inc = new Incidencia__c(
        Titulo__c = 'Test cerrar',
        Descripcion__c = 'Prueba',
        Estado__c = 'Nueva',
        Prioridad__c = 'Media',
        Usuario__c = u.Id,
        Fecha_Creacion__c = Date.today()
    );
    insert inc;

    // Ejecutar método
    Test.startTest();
    IncidenciaController.cerrarIncidencia(inc.Id);
    Test.stopTest();

    // Comprobar
    Incidencia__c updated = [SELECT Estado__c FROM Incidencia__c WHERE Id = :inc.Id];
    System.assertEquals('Cerrado', updated.Estado__c, 'La incidencia debe quedar Cerrada');
}

}
