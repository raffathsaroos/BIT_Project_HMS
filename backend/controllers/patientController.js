import patientService from '../services/patientService.js';



const sendError = (res, statusCode, message) => res.status(statusCode).json({

    success: false,

    message,

});



const getErrorStatusCode = (error) => {

    if (error.message.includes('not found')) return 404;

    if (error.message.includes('Invalid') || error.message.includes('required') || error.message.includes('No allowed')) return 400;

    return 500;

};



export const createPatient = async (req, res) => {

    try {

        const patient = await patientService.createPatient(req.body, req.user.id);



        return res.status(201).json({

            success: true,

            message: 'Patient created successfully',

            patient,

        });

    } catch (error) {

        return sendError(res, getErrorStatusCode(error), error.message);

    }

};



export const getPatients = async (req, res) => {

    try {

        const result = await patientService.getPatients(req.query);



        return res.status(200).json({

            success: true,

            ...result,

        });

    } catch (error) {

        return sendError(res, getErrorStatusCode(error), error.message);

    }

};



export const getPatientById = async (req, res) => {

    try {

        const patient = await patientService.getPatientById(req.params.id);



        return res.status(200).json({

            success: true,

            patient,

        });

    } catch (error) {

        return sendError(res, getErrorStatusCode(error), error.message);

    }

};



export const updatePatient = async (req, res) => {

    try {

        const patient = await patientService.updatePatient(req.params.id, req.body, req.user.role);



        return res.status(200).json({

            success: true,

            message: 'Patient updated successfully',

            patient,

        });

    } catch (error) {

        return sendError(res, getErrorStatusCode(error), error.message);

    }

};



export const deletePatient = async (req, res) => {

    try {

        const patient = await patientService.deletePatient(req.params.id);



        return res.status(200).json({

            success: true,

            message: 'Patient deleted successfully',

            patient,

        });

    } catch (error) {

        return sendError(res, getErrorStatusCode(error), error.message);

    }

};