/**
 * @author Jeffry Azhari Rosman <jeffryazhari@gmail.com>
 */

const path = require('path');
const zipper = require('zip-local');

const CompressZip = {
    /**
     * Melakukan compress file atau multi file dalam satu folder.
     *
     * @param {string} urlFileOrFolder Jika melakukan compress hanya 1 file bisa mengisi alamat file di tambah nama filenye. jika mengisingkan multi file maka dapat mengisi alamat foldernya, file yang ada di folder tersebut akan di compress. tanpa terkecuali.
     * @param {string} fileDirectory Alamat folder penyimpanan di tambah nama file nya. contoh: /document/testing.zip dengan extension zip.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:''}. Jika failed maka respon Objecr Error.
     */
    async zip(urlFileOrFolder, fileDirectory) {
        try {
            if (fileDirectory.substring(fileDirectory.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
            await zipper.sync.zip(path.join(__dirname, urlFileOrFolder)).compress().save(path.join(__dirname, fileDirectory));
            return { status: true, message: 'success' };
        } catch (error) {
            return { status: false, message: error.toString() };
        }
    },
    /**
     * Melakukan pengecekan nama file yang berada di zip.
     *
     * @param {string} urlFile Alamat folder ditambah nama filenya. contoh: /document/testing.zip dengan extension zip.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:'', files_list: []}. Jika failed maka respon Objecr Error.
     */
    async listFileName(urlFile) {
        try {
            if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
            const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
            const unzipped = await unzip.memory();
            return { status: true, message: 'success', files_list: unzipped.files_list };
        } catch (error) {
            return { status: false, message: error.toString() };
        }
    },
    /**
     * Melakukan penghapusan file yang berada di zip.
     *
     * @param {string} urlFile Alamat folder ditambah nama filenya. contoh: /document/testing.zip dengan extension zip.
     * @param {any} removeFile List name file yang akan di hapus dalam zip. Bentuk list Array string.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:'', files_list: []}. Jika failed maka respon Objecr Error.
     */
    async removeContentFileName(urlFile, removeFile) {
        try {
            if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
            const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
            const unzipped = await unzip.memory();
            const files = await unzipped.contents();
            const listfile = files.filter(element => removeFile.findIndex(item => item === element) !== -1);
            if (listfile.length === 0) return { status: false, message: 'file Not found' };
            listfile.forEach((file) => {
                unzip.lowLevel().remove(file);
            });
            const cleanUnzippedFS = await unzip.memory();
            await zipper.sync.zip(cleanUnzippedFS).compress().save(path.join(__dirname, urlFile));
            return { status: true, message: 'success', files_list: cleanUnzippedFS.files_list };
        } catch (error) {
            return { status: false, message: error.toString() };
        }
    },
    /**
     * Melakukan penambahan file yang berada di zip.
     *
     * @param {string} urlFile Alamat folder ditambah nama filenya. contoh: /document/testing.zip dengan extension zip.
     * @param {any} addFile List Array of object file yang akan di tambah dalam zip. Bentuk list Array of object. contoh: [{name: 'name.pdf', buffer: ''}]. Property name wajib ada extension file.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:'', files_list: []}. Jika failed maka respon Objecr Error.
     */
    async addContentFileName(urlFile, addFile) {
        try {
            if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
            const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
            if (addFile.length === 0) return { status: false, message: "You didn't input the file" };
            const waiting = new Promise((resolve, reject) => {
                addFile.forEach((file, index, array) => {
                    if ((!file.hasOwnProperty('name')) || (!file.hasOwnProperty('buffer'))) {
                        reject('the data structure is not suitable');
                    }
                    if (index === (array.length - 1)) resolve();
                });
            })
            await waiting;
            addFile.forEach((file) => {
                unzip.lowLevel().file(file.name, file.buffer);
            });
            const cleanUnzippedFS = await unzip.memory();
            await zipper.sync.zip(cleanUnzippedFS).compress().save(path.join(__dirname, urlFile));
            return { status: true, message: 'success', files_list: cleanUnzippedFS.files_list };
        } catch (error) {
            return { status: false, message: error.toString() };
        }
    },
    /**
     * Melakukan unzip file.
     *
     * @param {string} urlFile Jika melakukan compress hanya 1 file bisa mengisi alamat file di tambah nama filenye. jika mengisingkan multi file maka dapat mengisi alamat foldernya, file yang ada di folder tersebut akan di compress. tanpa terkecuali.
     * @param {string} directory Alamat folder extract. contoh: document/.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:''}. Jika failed maka respon Objecr Error.
     */
    async unZip(urlFile, directory) {
        try {
            if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
            await zipper.sync.unzip(path.join(__dirname, urlFile)).save(path.join(__dirname, directory));
            return { status: true, message: 'success' };
        } catch (error) {
            return { status: false, message: error.toString() };
        }
    },
}

module.exports = CompressZip;