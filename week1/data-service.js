let data = require('./data/applicants-data.json');
const fs = require('fs');

module.exports = {
    // Add new Employee with a createdAt timestamp
    AddNewEmployee: function(newItem) {
        return new Promise((resolve, reject) => {
            // Add a createdAt timestamp
            newItem.createdAt = new Date().toISOString();
            
            // Add the new item to the array
            data.push(newItem);

            // Save the updated data back to the file
            fs.writeFile('./data/applicants-data.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error("Error writing to file:", err);
                    reject(err);
                } else {
                    resolve(newItem);
                }
            });
        });
    },

    // Get only newly created applicants (within a certain time range)
    GetNewApplicants: function(sinceDate) {
        console.log("hello");
        return new Promise((resolve, reject) => {
            // Filter applicants by createdAt field
            const newApplicants = data.filter(applicant => new Date(applicant.createdAt) >= new Date(sinceDate));
            resolve(newApplicants);
        });
    },

    // Get one Employee
    getEmployeeById: function(id) {
        // return data.find(i => i.employeeId == id);
        return new Promise(function (resolve, reject) {
            resolve(data.find(i => i.employeeId == id));
        });
    }
};
