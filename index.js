const express = require('express');
const bodyParser = require('body-parser');
const status = require('http-status');
const Application = require('./db/models/Application');
const knex = require('./db/db-setup'); // Ensure to initialize knex and bind it to Objection models
const { DateTime } = require('luxon');



const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);




// Existing routes...

// Get all applications that are not deleted
router.get('/applications', async (req, res) => {
    console.log('In first get');
    try {
        const result = await Application.query()
            .select('application_id', 'name', 'is_active', 'updated_at', 'last_report_generated')
            .where('is_deleted', 0);
        res.status(status.OK).json(result);
    } catch (error) {
        console.error('Error fetching applications', error);
        res.status(status.INTERNAL_SERVER_ERROR).send('Server Error');
    }
});





router.put('/toggleStatus/:applicationId', async (req, res) => {
    const { applicationId } = req.params;
    const userId = 1; // Ensure this is an integer
    const updatedAt = DateTime.now().toISO(); // Use ISO format for timestamp

    console.log(`Toggling app ${applicationId}`);

    try {
        const updatedApplication = await Application.query()
            .patch({
                is_active: Application.raw('CASE WHEN is_active = 1 THEN 0 ELSE 1 END'),
                updated_by: userId,
                updated_at: updatedAt
            })
            .where('application_id', applicationId)
            .returning('is_active');

        if (updatedApplication.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json({ is_active: updatedApplication[0].is_active });
    } catch (error) {
        console.error('Error toggling application status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});









app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
