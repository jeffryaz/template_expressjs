/**
 * @author Jeffry Azhari Rosman <jeffryazhari@gmail.com>
 */

const path = require('path');
const pdf = require('pdf-creator-node');
const fs = require("fs");

const option = {
    format: "A4", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    orientation: "portrait", // portrait or landscape
    border: "10mm", // allowed units: mm, cm, in, px
    header: {
        height: "45mm", // allowed units: mm, cm, in, px
        contents: '<div style="text-align: center;">Author: Jeffry Azhari Rosman</div>'
    },
    footer: {
        height: "28mm", // allowed units: mm, cm, in, px
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            3: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
}

const createPDF = {
    /**
     * Melakukan pembuatan PDF pada file HTML. Jika type adalah stream maka result di tambahkan pipe(res). const respont = await createPDF.create(); respont.pipe(res); Tanpa res.status(200).send(a)
     *
     * @param {string} urlFile Alamat beserta name file HTML.
     * @param {string} fileDirectory Alamat folder penyimpanan di tambah nama file nya. contoh: /document/testing.pdf dengan extension pdf.
     * @param {string} type "" = PDF, buffer = buffer, stream = stream. feedback.
     * @param {object} data Data binding.
     * @param {object} options Option Custom Layout PDF, pagination, header title, size.
     * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:''}. Jika failed maka respon Objecr Error.
     */
    async create(urlFile, fileDirectory, type = "", data = {}, options = option) {
        try {
            let statusProses = false;
            let returnData = "";
            if (fileDirectory.substring(fileDirectory.length - 4) !== '.pdf') return { status: false, message: 'ouput file extension not pdf' };
            if (urlFile.substring(urlFile.length - 5) !== '.html') return { status: false, message: 'input file extension not html' };
            const htmlFile = fs.readFileSync(path.join(__dirname, urlFile), "utf8");
            const document = {
                html: htmlFile,
                data,
                path: path.join(__dirname, fileDirectory),
                type
            };
            await pdf.create(document, options)
                .then((respons) => {
                    statusProses = true;
                    returnData = respons;
                })
                .catch((error) => {
                    return { status: false, message: error.toString() };
                });
            if (statusProses) {
                if (type === "stream") {
                    return returnData;
                } else {
                    return { status: true, message: 'success', content: returnData }
                }
            };
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
    // async listFileName(urlFile) {
    //     try {
    //         if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
    //         const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
    //         const unzipped = await unzip.memory();
    //         return { status: true, message: 'success', files_list: unzipped.files_list };
    //     } catch (error) {
    //         return { status: false, message: error.toString() };
    //     }
    // },
    // /**
    //  * Melakukan penghapusan file yang berada di zip.
    //  *
    //  * @param {string} urlFile Alamat folder ditambah nama filenya. contoh: /document/testing.zip dengan extension zip.
    //  * @param {any} removeFile List name file yang akan di hapus dalam zip. Bentuk list Array string.
    //  * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:'', files_list: []}. Jika failed maka respon Objecr Error.
    //  */
    // async removeContentFileName(urlFile, removeFile) {
    //     try {
    //         if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
    //         const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
    //         const unzipped = await unzip.memory();
    //         const files = await unzipped.contents();
    //         const listfile = files.filter(element => removeFile.findIndex(item => item === element) !== -1);
    //         if (listfile.length === 0) return { status: false, message: 'file Not found' };
    //         listfile.forEach((file) => {
    //             unzip.lowLevel().remove(file);
    //         });
    //         const cleanUnzippedFS = await unzip.memory();
    //         await zipper.sync.zip(cleanUnzippedFS).compress().save(path.join(__dirname, urlFile));
    //         return { status: true, message: 'success', files_list: cleanUnzippedFS.files_list };
    //     } catch (error) {
    //         return { status: false, message: error.toString() };
    //     }
    // },
    // /**
    //  * Melakukan penambahan file yang berada di zip.
    //  *
    //  * @param {string} urlFile Alamat folder ditambah nama filenya. contoh: /document/testing.zip dengan extension zip.
    //  * @param {any} addFile List Array of object file yang akan di tambah dalam zip. Bentuk list Array of object. contoh: [{name: 'name.pdf', buffer: ''}]. Property name wajib ada extension file.
    //  * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:'', files_list: []}. Jika failed maka respon Objecr Error.
    //  */
    // async addContentFileName(urlFile, addFile) {
    //     try {
    //         if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
    //         const unzip = await zipper.sync.unzip(path.join(__dirname, urlFile));
    //         if (addFile.length === 0) return { status: false, message: "You didn't input the file" };
    //         const waiting = new Promise((resolve, reject) => {
    //             addFile.forEach((file, index, array) => {
    //                 if ((!file.hasOwnProperty('name')) || (!file.hasOwnProperty('buffer'))) {
    //                     reject('the data structure is not suitable');
    //                 }
    //                 if (index === (array.length - 1)) resolve();
    //             });
    //         })
    //         await waiting;
    //         addFile.forEach((file) => {
    //             unzip.lowLevel().file(file.name, file.buffer);
    //         });
    //         const cleanUnzippedFS = await unzip.memory();
    //         await zipper.sync.zip(cleanUnzippedFS).compress().save(path.join(__dirname, urlFile));
    //         return { status: true, message: 'success', files_list: cleanUnzippedFS.files_list };
    //     } catch (error) {
    //         return { status: false, message: error.toString() };
    //     }
    // },
    // /**
    //  * Melakukan unzip file.
    //  *
    //  * @param {string} urlFile Jika melakukan compress hanya 1 file bisa mengisi alamat file di tambah nama filenye. jika mengisingkan multi file maka dapat mengisi alamat foldernya, file yang ada di folder tersebut akan di compress. tanpa terkecuali.
    //  * @param {string} directory Alamat folder extract. contoh: document/.
    //  * @return {object} Respon jika success akan berbentuk Object {status: 'success', message:''}. Jika failed maka respon Objecr Error.
    //  */
    // async unZip(urlFile, directory) {
    //     try {
    //         if (urlFile.substring(urlFile.length - 4) !== '.zip') return { status: false, message: 'extension not zip' };
    //         await zipper.sync.unzip(path.join(__dirname, urlFile)).save(path.join(__dirname, directory));
    //         return { status: true, message: 'success' };
    //     } catch (error) {
    //         return { status: false, message: error.toString() };
    //     }
    // },
}

module.exports = createPDF;