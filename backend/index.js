import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"hans11",
    database:"promotion"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Helloooooooo")
})

app.get("/promotions", (req,res)=>{
    res.set('Cache-Control', 'no-store');
    const q = "SELECT * FROM promotions";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/promotions", (req,res)=>{
    const { title, description, start_date, end_date, discount_percentage } = req.body;

    //valida
    if (!title || !description || !start_date || !end_date || discount_percentage === undefined) {
        return res.status(400).json("All fields are required.");
    }

    if (discount_percentage < 0 || discount_percentage > 100) {
        return res.status(400).json("Discount percentage must be between 0 and 100.");
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate < startDate) {
        return res.status(400).json("End date cannot be before start date.");
    }

    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    console.log(`Promotion Duration: ${duration} days`);

    /*console.log("Request Body:", req.body);*/

    const q = "INSERT INTO promotions (`title`,`description`,`start_date`,`end_date`,`discount_percentage`) VALUES (?)";
    const values = [title, description, start_date, end_date, discount_percentage];
    
    /*const values = [
        req.body.title,
        req.body.description,
        req.body.start_date,
        req.body.end_date,
        req.body.discount_percentage,
    ];*/

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Promotion created successfully!");
    });
});


app.put("/promotions/:id", (req,res)=>{
    const { title, description, start_date, end_date, discount_percentage } = req.body;

    // valid
    if (!title || !description || !start_date || !end_date || discount_percentage === undefined) {
        return res.status(400).json("All fields are required.");
    }

    if (discount_percentage < 0 || discount_percentage > 100) {
        return res.status(400).json("Discount percentage must be between 0 and 100.");
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate < startDate) {
        return res.status(400).json("End date cannot be before start date.");
    }

    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    console.log(`Promotion Duration: ${duration} days`);

    const promotionId = req.params.id;
    const q = "UPDATE promotions SET `title` = ?, `description` = ?, `start_date` = ?, `end_date` = ?, `discount_percentage` = ? WHERE id = ?";

    const values = [title, description, start_date, end_date, discount_percentage];
    
    
    /*const values=[
        req.body.title,
        req.body.description,
        req.body.start_date,
        req.body.end_date,
        req.body.discount_percentage,
    ]*/

    db.query(q, [...values, promotionId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Promotion has been updated successfully!");
    });
});

app.delete("/promotions/:id", (req,res)=>{
    const promotionId = req.params.id;
    const q = "DELETE FROM promotions WHERE id = ?";

    db.query(q,[promotionId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Promotion has been deleted successfully!");
    });
});


app.listen(8800, ()=>{
    console.log("Connected to backend!");
});
