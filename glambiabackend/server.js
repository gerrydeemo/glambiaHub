
const express = require( 'express' );
var cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const Employee = require( './Schemas/employeeSchema.js' );
const app = express();


app.use( cors(corsOptions) );
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

mongoose.connect("mongodb+srv://gerrydeemo:Gerald2482@cluster0.zceun7u.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log( 'Connected to MongoDB' );
});

app.post('/register', ( req, res ) => { 
    var employee = new Employee( req.body );
    employee.save( ( err, data ) => {
        if ( err ) {
            res.send( err );
        }
        else {
            res.send( data );
        }
    }
);
}
);
app.get('/empdivtype', ( req, res ) => {
    Employee.find( {}, ( err, data ) => {
        if ( err ) {
            res.send( err );
        }
        else {
            res.json( data );
        }
    });
});


app.get('/getEmployeeData', (req, res) => {
    Employee.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
           
            const dates = data.map(employee => {
                return employee.holidays.map(holiday=> {
                    var holidayDates = holiday.date
                    var holidayTypes = holiday.title
                    var holidayDivision = holiday.division
                    var workNumber = holiday.workNumber
                    return (
                        {
                            holidayDates: holidayDates,
                            holidayTypes: holidayTypes,
                            holidayDivision: holidayDivision,
                            workNumber: workNumber
                        }
                    )
                })
            })
            res.send(dates)
           
            
                
                
            
            

        }
    })
});


app.post("/getMyData", (req, res) => {
    const workNumber = req.body.workNumber
    Employee.findOne({workNumber: workNumber}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data.holidays)
            
        }
    })


    
});


app.post("/deleteHoliday", (req, res) => {
    const workNumber = req.body.workNumber
    const date = req.body.date
    Employee.findOneAndUpdate({workNumber: workNumber}, {$pull: {holidays: {date: date}}}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
            console.log("update")
        }
    }
    )
}
)







app.post("/addHoliday", (req, res) => {
    const workNumber = req.body.workNumber
    const date = req.body.date
    const division = req.body.division
    const type = req.body.type
    Employee.findOne({ workNumber: workNumber }, (err, employee) => {
        if (err) {
            console.log(err);
        }
        else {
            employee.holidays.push({
                id: employee.holidays.length + 1,
                workNumber: workNumber,
                title: type,
                division: division,
                date: date,
                reason: "My dad is coming over"
            });
            employee.save();
            res.send(employee);
        }
    })


    
});

app.post("/login", async function (req, res) {
    const workNumber = req.body.workNumber
    const password = req.body.password
    const admin = req.body.admin
    const employee = await Employee.findOne({ workNumber: workNumber })
    if (employee) {
        console.log({a: employee.admin})
        console.log({b: employee})
        if (employee.password === password) {
            if(employee.admin === admin) {
                console.log(employee)
                res.send(employee)
            }
            else {
                res.send("You are not an admin")
            }
        } else {
            res.send("Incorrect Password")
        }
    }
    else {
        res.send("Employee not found")
    }


})

app.listen(5000, () => {
    console.log( `Server started on port 5000` );
} );

