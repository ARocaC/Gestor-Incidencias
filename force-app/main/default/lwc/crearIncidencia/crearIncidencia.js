import { LightningElement, track } from 'lwc';
import crearIncidencia from '@salesforce/apex/IncidenciaController.crearIncidencia';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CrearIncidencia extends LightningElement {
    @track titulo = '';
    @track descripcion = '';
    @track estado = '';
    @track prioridad = '';

    // Opciones de picklist
    get estadoOptions() {
        return [
            { label: 'Nuevo', value: 'Nuevo' },
            { label: 'En progreso', value: 'En progreso' },
            { label: 'Cerrado', value: 'Cerrado' }
        ];
    }

    get prioridadOptions() {
        return [
            { label: 'Baja', value: 'Baja' },
            { label: 'Media', value: 'Media' },
            { label: 'Alta', value: 'Alta' }
        ];
    }

    handleTituloChange(event) {
        this.titulo = event.target.value;
    }

    handleDescripcionChange(event) {
        this.descripcion = event.target.value;
    }

    handleEstadoChange(event) {
        this.estado = event.detail.value;
    }

    handlePrioridadChange(event) {
        this.prioridad = event.detail.value;
    }

    async handleSubmit() {
        try {
            // Validaciones mínimas
            if (!this.titulo || !this.descripcion || !this.estado || !this.prioridad) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Campos requeridos',
                        message: 'Completa Título, Descripción, Estado y Prioridad.',
                        variant: 'warning'
                    })
                );
                return;
            }

            const resultId = await crearIncidencia({
                titulo: this.titulo,
                descripcion: this.descripcion,
                estado: this.estado,
                prioridad: this.prioridad
            });

            // Limpiamos formulario
            this.titulo = '';
            this.descripcion = '';
            this.estado = '';
            this.prioridad = '';

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Éxito',
                    message: `Incidencia ${resultId} creada correctamente`,
                    variant: 'success'
                })
            );

            // Notificar al contenedor/lista que se ha creado una incidencia (para refrescar)
            this.dispatchEvent(new CustomEvent('incidenciacreated', { detail: { id: resultId } }));
        } catch (error) {
            // Mostrar mensaje del servidor si está disponible
            const message =
                (error && error.body && error.body.message) ||
                (error && error.message) ||
                'Error al crear la incidencia';
            // eslint-disable-next-line no-console
            console.error('Error al crear la incidencia', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message,
                    variant: 'error'
                })
            );
        }
    }
}
