const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    workNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    division: {
        type: Number,
        required: true
    },
    holidays: [
        {
            id: Number,
            workNumber: String,
            title: String,
            date: String,
            division: Number,
        }
    ]

});

const Employee = mongoose.model("Employee", employeeSchema, "Employees");

module.exports = Employee;