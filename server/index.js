require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { createModel } = require('mongoose-gridfs');
const { uploadFile, getFile, deleteFile } = require('./utils/file-upload');

const { createWorker } = require('./utils/createWorker');
const { DB_URI, PORT, RUN_JOBS, jobs } = require('./config');

(async () => {
    try {
        if (RUN_JOBS) {
            for (let job of jobs) {
                createWorker(job)
            }
        }

        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Connected to database successfully!");

        // const Files = createModel();

        // let file = await uploadFile("./test.rest", 'test_file.rest', Files);
        // console.log("File uploaded: ", file);

        // let file_contents = await getFile(file._id, Files);
        // console.log("File contents: ", file_contents.toString());

        // let delete_response = await deleteFile("612652d000484b3488f01941", Files);
        // console.log("Delete response: ", delete_response);
    }
    catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
})();