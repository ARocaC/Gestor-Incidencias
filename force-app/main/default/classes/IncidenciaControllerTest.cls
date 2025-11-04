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
}
