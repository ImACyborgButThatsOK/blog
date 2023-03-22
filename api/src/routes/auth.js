/* eslint-disable import/no-extraneous-dependencies */
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../connection.js";

const router = Router();

router.post("/auth/login", (req, res) => {
    const q = "SELECT * FROM users WHERE email=? ";
    const data = [[req.body.email]];

    connection.query(q, data, (err, result) => {
        if (err) res.status(500).json(err);

        const compare = bcrypt.compareSync(
            req.body.password,
            result[0].password,
        );

        if (!compare) {
            res.status(500).json("EMAIL OR PASSWORD INCORRECT!");
        }

        const token = jwt.sign({ id: result.id }, "SECRET", {
            expiresIn: "1",
        });

        res.status(200).json({
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            token,
        });
    });
});

router.post("/auth/register", (req, res) => {
    const q = "INSERT INTO users(`email`,`password`,`username`) VALUE(?)";
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(req.body.password, salt);
    const data = [[req.body.email, passwordHashed, req.body.username]];

    connection.query(q, data, (err) => {
        if (err) res.status(500).json(err);

        res.status(200).json("user has been created!");
    });
});

export default router;
