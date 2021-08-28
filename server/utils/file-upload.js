const { createReadStream } = require('fs');

const uploadFile = (filePath, filename, Model) => {
    const readStream = createReadStream(filePath);
    const options = ({ filename, contentType: 'text/plain' });

    return new Promise((resolve, reject) => {
        Model.write(options, readStream, (error, file) => {
            if (error) {
                reject(error);
            }
            resolve(file);
        });
    });
}

const getFile = (file_id, Model) => {
    return new Promise((resolve, reject) => {
        Model.read({ _id: file_id }, (error, buffer) => {
            if (error) {
                reject(error);
            }
            resolve(buffer);
        });
    });
}

const deleteFile = (file_id, Model) => {
    return new Promise((resolve, reject) => {
        Model.unlink({ _id: file_id }, (err) => {
            if (err) {
                reject(err);
            }
            resolve("successfully removed file!");
        });
    });
}

module.exports = { uploadFile, getFile, deleteFile };